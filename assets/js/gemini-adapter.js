(function(){
  'use strict';
  const KEY='hpco.provider.gemini.v1';
  const DEFAULT_MODEL='gemini-3.8-flash';
  const MODELS=[
    {id:'gemini-3.8-flash',label:'Gemini 3.8 Flash — recommended'},
    {id:'gemini-3.1-flash-lite',label:'Gemini 3.1 Flash-Lite — lighter option'}
  ];
  function read(){try{return Object.assign({provider:'gemini',key:'',model:DEFAULT_MODEL},JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(_){return {provider:'gemini',key:'',model:DEFAULT_MODEL}}}
  function save(key,model){const current=read();const next={provider:'gemini',key:typeof key==='string'&&key.trim()?key.trim():current.key,model:MODELS.some(m=>m.id===model)?model:current.model||DEFAULT_MODEL};try{localStorage.setItem(KEY,JSON.stringify(next));return {ok:true,config:{provider:next.provider,model:next.model,connected:!!next.key}}}catch(_){return {ok:false,error:'This browser could not save the provider settings. Check available storage and try again.'}}}
  function disconnect(){try{localStorage.removeItem(KEY);return true}catch(_){return false}}
  function status(){const c=read();return {provider:'gemini',connected:!!c.key,model:c.model||DEFAULT_MODEL,models:MODELS.map(m=>({...m}))}}
  function errorMessage(status,body){
    const msg=body&&body.error&&body.error.message?String(body.error.message):'';
    if(status===400)return 'The request was rejected. Check the selected model and API key setup.'+(msg?' Details: '+msg:'');
    if(status===401||status===403)return 'Gemini rejected this key or its restrictions. Confirm the key is valid and allowed to use the Gemini API.';
    if(status===404)return 'The selected Gemini model or endpoint was not found. Choose another available model in Settings.';
    if(status===429)return 'Gemini rate limit or quota reached. Wait for the quota window to reset, or connect another provider in a later update.';
    if(status>=500)return 'Gemini is temporarily having a server problem. Try again later.';
    return 'Gemini request failed'+(status?' (HTTP '+status+')':'')+'.'+(msg?' Details: '+msg:'');
  }
  async function request(prompt,options){
    const c=read();if(!c.key)throw new Error('Connect Gemini in Settings before generating writing.');
    const model=(options&&options.model)||c.model||DEFAULT_MODEL;
    const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),65000);
    let response,body;
    try{
      response=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+encodeURIComponent(model)+':generateContent',{
        method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':c.key},
        body:JSON.stringify({contents:[{role:'user',parts:[{text:prompt}]}],generationConfig:{temperature:0.65,maxOutputTokens:(options&&options.maxOutputTokens)||2200}}),
        signal:controller.signal
      });
      body=await response.json().catch(()=>({}));
    }catch(error){
      if(error&&error.name==='AbortError')throw new Error('Gemini took too long to respond. Check your connection and try again.');
      throw new Error('Could not reach Gemini. Check your internet connection, browser network access, and API-key restrictions.');
    }finally{clearTimeout(timer)}
    if(!response.ok)throw new Error(errorMessage(response.status,body));
    const text=(body.candidates||[]).flatMap(c=>c.content&&c.content.parts||[]).map(p=>p.text||'').join('').trim();
    if(!text)throw new Error('Gemini returned no text. Try again or choose a different model.');
    return {text,model,usage:body.usageMetadata||null};
  }
  async function test(){
    const result=await request('Reply with exactly this sentence and nothing else: HP Copywriter OS connection test passed.',{maxOutputTokens:40});
    return {ok:true,text:result.text,model:result.model};
  }
  window.HPCOS_GEMINI={models:MODELS,status,save,disconnect,request,test};
})();