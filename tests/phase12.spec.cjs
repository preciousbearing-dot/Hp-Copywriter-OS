const { test, expect } = require('@playwright/test');
const DATA_KEY='hpco.workspace.v1';
const PREF_KEY='hpco.preferences.v1';
const PROVIDER_KEY='hpco.provider.gemini.v1';
async function view(page,name){await page.locator('.mobile-nav-item[data-view="'+name+'"]').click()}
async function makeProject(page,name='PW Test Landing Page'){
  await view(page,'projects');
  await page.locator('button[data-action="new-project"]').first().click();
  await page.locator('#p-name').fill(name);
  await page.locator('#p-goal').fill('Explain the offer and encourage qualified enquiries');
  await page.locator('#p-audience').fill('Small business owners comparing providers');
  await page.locator('#p-context').fill('Introductory consultation. No testimonials supplied. Do not invent results.');
  await page.getByRole('button',{name:/Save project/i}).click();
  await expect(page.getByRole('heading',{name})).toBeVisible();
}
test('homepage loads without JavaScript errors or failed local assets',async({page})=>{
  const errors=[],failed=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('requestfailed',r=>{if(new URL(r.url()).origin==='http://127.0.0.1:4173')failed.push(r.url())});
  await page.goto('/');
  await expect(page.locator('#view-root')).toBeVisible();
  await expect(page.getByText('Good writing starts with understanding.')).toBeVisible();
  expect(errors).toEqual([]);expect(failed).toEqual([]);
});
test('primary navigation opens every view and returns home',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
  for(const [v,h] of [['projects','Projects'],['clients','Clients'],['skills','Writing skills'],['settings','Settings']]){
    await view(page,v);await expect(page.getByRole('heading',{name:h}).first()).toBeVisible();
  }
  await view(page,'home');await expect(page.getByRole('heading',{name:/Make room for/})).toBeVisible();expect(errors).toEqual([]);
});
test('client create, edit and persistence across reload',async({page})=>{
  await page.goto('/');await view(page,'clients');await page.getByRole('button',{name:/Add client/i}).click();
  await page.locator('#c-name').fill('PW Test Client');await page.locator('#c-business').fill('Education business');
  await page.locator('#c-audience').fill('Working adults');await page.locator('#c-offer').fill('Weekend workshops');
  await page.locator('#c-voice').fill('Warm and direct');await page.locator('#c-proof').fill('Verified course dates only');
  await page.getByRole('button',{name:/Save client/i}).click();await expect(page.getByText('PW Test Client')).toBeVisible();
  await page.getByRole('button',{name:'Edit'}).click();await page.locator('#c-voice').fill('Clear, practical and encouraging');
  await page.getByRole('button',{name:/Save client/i}).click();await page.reload();await view(page,'clients');
  await expect(page.getByText('PW Test Client')).toBeVisible();await expect(page.getByText(/Clear, practical and encouraging/)).toBeVisible();
  const w=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),DATA_KEY);expect(w.clients).toHaveLength(1);expect(w.clients[0].proof).toBe('Verified course dates only');
});
test('project creation, vague brief analysis and persistence',async({page})=>{
  await page.goto('/');await view(page,'projects');await page.locator('button[data-action="new-project"]').first().click();
  await page.locator('#p-name').fill('PW Test Vague Brief');await page.locator('#p-goal').fill('Get more sales');
  await page.getByRole('button',{name:/Save project/i}).click();await expect(page.getByRole('heading',{name:'PW Test Vague Brief'})).toBeVisible();
  await page.getByRole('button',{name:/Review brief completeness/i}).click();await expect(page.getByText(/planning checks covered/i)).toBeVisible();
  await page.reload();await view(page,'projects');await expect(page.getByText('PW Test Vague Brief')).toBeVisible();
  const w=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),DATA_KEY);expect(w.projects).toHaveLength(1);expect(w.projects[0].goal).toBe('Get more sales');
});
test('draft saves and previous version remains in revision snapshots after reload',async({page})=>{
  await page.goto('/');await makeProject(page);await page.locator('#draft-editor').fill('Version one draft.');await page.getByRole('button',{name:/Save draft/i}).click();
  await page.locator('#draft-editor').fill('Version two draft.');await page.getByRole('button',{name:/Save draft/i}).click();await page.reload();await view(page,'projects');await page.locator('.project-open').filter({hasText:'PW Test Landing Page'}).click();
  await expect(page.locator('#draft-editor')).toHaveValue('Version two draft.');
  const w=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),DATA_KEY);expect(w.projects[0].revisions).toHaveLength(1);expect(w.projects[0].revisions[0].content).toBe('Version one draft.');
});
test('malformed workspace JSON does not crash homepage',async({page})=>{
  await page.goto('/');await page.evaluate(k=>localStorage.setItem(k,'{not valid JSON'),DATA_KEY);await page.reload();
  await expect(page.getByText('Good writing starts with understanding.')).toBeVisible();await expect(page.locator('#view-root')).toBeVisible();
});
test('local-storage write failure displays a warning',async({page})=>{
  await page.goto('/');await page.evaluate(()=>{const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='hpco.workspace.v1')throw new DOMException('Storage quota exceeded','QuotaExceededError');return original.call(this,k,v)}});
  await view(page,'projects');await page.locator('button[data-action="new-project"]').first().click();await page.locator('#p-name').fill('PW Storage Failure');await page.locator('#p-goal').fill('Test failure handling');
  await page.getByRole('button',{name:/Save project/i}).click();await expect(page.getByText(/could not save locally/i)).toBeVisible();
});
test('provider key removal clears saved key and settings show security warning',async({page})=>{
  await page.goto('/');await page.evaluate(k=>localStorage.setItem(k,JSON.stringify({provider:'gemini',key:'FAKE_TEST_KEY_NOT_REAL',model:'gemini-3.8-flash'})),PROVIDER_KEY);
  await view(page,'settings');await expect(page.getByLabel('Gemini API key')).toBeVisible();await expect(page.getByLabel('Model')).toBeVisible();
  await expect(page.getByText(/local storage, which is not encrypted/i)).toBeVisible();
  page.once('dialog',d=>d.accept());await page.getByRole('button',{name:/Disconnect|Remove key/i}).click();
  expect(await page.evaluate(k=>localStorage.getItem(k),PROVIDER_KEY)).toBeNull();
});
test('theme choice persists across reload',async({page})=>{
  await page.goto('/');const before=await page.locator('html').getAttribute('data-theme');await page.locator('#theme-toggle').click();
  const after=await page.locator('html').getAttribute('data-theme');expect(after).not.toBe(before);await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme',after);expect((await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),PREF_KEY)).theme).toBe(after);
});

test('Gemini connection test discovers models supported by the saved key',async({page})=>{
  const fakeKey='FAKE_TEST_KEY_NOT_REAL';
  const seen=[];
  await page.route('https://generativelanguage.googleapis.com/**',async route=>{
    const request=route.request();seen.push({url:request.url(),method:request.method(),keyHeader:request.headers()['x-goog-api-key']});
    if(request.method()==='GET'){
      await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({models:[
        {name:'models/gemini-3.8-flash',displayName:'Gemini Flash',supportedGenerationMethods:['generateContent']},
        {name:'models/text-embedding-test',displayName:'Embedding only',supportedGenerationMethods:['embedContent']},
        {name:'models/gemini-3.1-flash-lite',displayName:'Gemini Flash Lite',supportedGenerationMethods:['generateContent']}
      ]})});
    }else{
      await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({candidates:[{content:{parts:[{text:'HP Copywriter OS connection test passed.'}]}}]})});
    }
  });
  await page.goto('/');await view(page,'settings');
  await page.getByLabel('Gemini API key').fill(fakeKey);
  await page.getByRole('button',{name:/Discover models & test/i}).click();
  await expect(page.getByText(/Discovered 2 model\(s\)/i)).toBeVisible();
  const options=await page.locator('#provider-model option').evaluateAll(nodes=>nodes.map(n=>n.value));
  expect(options).toHaveLength(2);expect(options).toContain('gemini-3.8-flash');expect(options).toContain('gemini-3.1-flash-lite');
  expect(seen).toHaveLength(2);
  expect(seen.every(x=>x.keyHeader===fakeKey)).toBeTruthy();
  expect(seen.every(x=>!x.url.includes(fakeKey))).toBeTruthy();
  const saved=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),PROVIDER_KEY);
  expect(saved.key).toBe(fakeKey);
});
test('Gemini quota failures show a useful message without exposing the key',async({page})=>{
  await page.route('https://generativelanguage.googleapis.com/**',async route=>{
    if(route.request().method()==='GET'){
      await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({models:[{name:'models/gemini-3.8-flash',displayName:'Gemini Flash',supportedGenerationMethods:['generateContent']}]})});
    }else{
      await route.fulfill({status:429,contentType:'application/json',body:JSON.stringify({error:{message:'quota exceeded'}})});
    }
  });
  await page.goto('/');await view(page,'settings');await page.getByLabel('Gemini API key').fill('FAKE_QUOTA_KEY');
  await page.getByRole('button',{name:/Discover models & test/i}).click();
  await expect(page.getByText(/rate limit or quota reached/i)).toBeVisible();
  await expect(page.getByText(/FAKE_QUOTA_KEY|quota exceeded/i)).toHaveCount(0);
});
