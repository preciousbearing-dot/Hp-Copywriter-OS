(function(){
  'use strict';
  const KEY='hpco.provider.gemini.v1';
  const DEFAULT_MODEL='gemini-3.8-flash';
  const FALLBACK_MODELS=[
    {id:DEFAULT_MODEL,label:'Gemini 3.8 Flash — default selection'},
    {id:'gemini-3.1-flash-lite',label:'Gemini 3.1 Flash-Lite — fallback selection'}
  ];
  let discoveredModels=[];
  function read(){
    try{
      const raw=JSON.parse(localStorage.getItem(KEY)||'{}');
      return {provider:'gemini',key:typeof raw.key==='string'?raw.key:'',model:typeof raw.model==='string'?raw.model:DEFAULT_MODEL};
    }catch(_){return {provider:'gemini',key:'',model:DEFAULT_MODEL}}
  }
  function save(key,model){
    const current=read();
    const next={
      provider:'gemini',
      key:typeof key==='string'&&key.trim()?key.trim():current.key,
      model:typeof model==='string'&&/^[a-zA-Z0-9._-]+$/.test(model)?model:(current.model||DEFAULT_MODEL)
    };
    try{
      localStorage.setItem(KEY,JSON.stringify(next));
      return {ok:true,config:{provider:next.provider,model:next.model,connected:!!next.key}};
    }catch(_){return {ok:false,error:'This browser could not save the provider settings. Check available storage and try again.'}}
  }
  function disconnect(){try{localStorage.removeItem(KEY);discoveredModels=[];return true}catch(_){return false}}
  function status(){
    const c=read();
    return {provider:'gemini',connected:!!c.key,model:c.model||DEFAULT_MODEL,models:(discoveredModels.length?discoveredModels:FALLBACK_MODELS).map(m=>({...m})),modelsDiscovered:discoveredModels.length>0};
  }
  function errorMessage(status,body){
    if(status===400)return 'Gemini rejected the request. Check the selected model and API-key setup.';
    if(status===401||status===403)return 'Gemini rejected this key or its restrictions. Confirm the key is valid and allowed to use the Gemini API.';
    if(status===404)return 'The selected Gemini model or endpoint was not found. Discover available models and select one that supports content generation.';
    if(status===429)return 'Gemini rate limit or quota reached. Wait for the quota window to reset, or check the limits for your Google AI Studio project.';
    if(status>=500)return 'Gemini is temporarily having a server problem. Try again later.';
    return 'Gemini request failed'+(status?' (HTTP '+status+')':'')+'. Please try again.';
  }
  async function apiFetch(url,options,timeoutMs){
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),timeoutMs||20000);
    try{
      return await fetch(url,{...options,signal:controller.signal});
    }catch(error){
      if(error&&error.name==='AbortError')throw new Error('Gemini took too long to respond. Check your connection and try again.');
      throw new Error('Could not reach Gemini. Check your internet connection, browser network access, and API-key restrictions.');
    }finally{clearTimeout(timer)}
  }
  async function parseResponse(response){
    const body=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(errorMessage(response.status,body));
    return body;
  }
  async function discoverModels(){
    const c=read();
    if(!c.key)throw new Error('Add and save a Gemini API key before discovering models.');
    const response=await apiFetch('https://generativelanguage.googleapis.com/v1beta/models',{
      method:'GET',headers:{'x-goog-api-key':c.key}
    },20000);
    const body=await parseResponse(response);
    const models=(Array.isArray(body.models)?body.models:[])
      .filter(m=>m&&typeof m.name==='string'&&Array.isArray(m.supportedGenerationMethods)&&m.supportedGenerationMethods.includes('generateContent'))
      .map(m=>({id:m.name.replace(/^models\//,''),label:(m.displayName||m.name.replace(/^models\//,''))+' · '+m.name.replace(/^models\//,'')}))
      .filter((m,i,a)=>a.findIndex(x=>x.id===m.id)===i)
      .sort((a,b)=>a.label.localeCompare(b.label));
    if(!models.length)throw new Error('Gemini accepted the request but returned no models supporting text generation for this key.');
    discoveredModels=models;
    return models.map(m=>({...m}));
  }
  async function request(prompt,options){
    const c=read();
    if(!c.key)throw new Error('Connect Gemini in Settings before generating writing.');
    const model=(options&&options.model)||c.model||DEFAULT_MODEL;
    const response=await apiFetch('https://generativelanguage.googleapis.com/v1beta/models/'+encodeURIComponent(model)+':generateContent',{
      method:'POST',
      headers:{'Content-Type':'application/json','x-goog-api-key':c.key},
      body:JSON.stringify({contents:[{role:'user',parts:[{text:prompt}]}],generationConfig:{temperature:0.65,maxOutputTokens:(options&&options.maxOutputTokens)||2200}})
    },65000);
    const body=await parseResponse(response);
    const text=(body.candidates||[]).flatMap(candidate=>candidate.content&&candidate.content.parts||[]).map(part=>part.text||'').join('').trim();
    if(!text)throw new Error('Gemini returned no text. The response may have been blocked or the model may not support this request.');
    return {text,model,usage:body.usageMetadata||null};
  }
  async function test(){
    const models=await discoverModels();
    let c=read();
    let model=c.model;
    if(!models.some(m=>m.id===model)){
      model=models[0].id;
      const saved=save('',model);
      if(!saved.ok)throw new Error(saved.error);
    }
    const result=await request('Reply with exactly this sentence and nothing else: HP Copywriter OS connection test passed.',{model,maxOutputTokens:40});
    return {ok:true,text:result.text,model:result.model,models};
  }
  window.HPCOS_GEMINI={models:()=>status().models,status,save,disconnect,request,test,discoverModels};
})();