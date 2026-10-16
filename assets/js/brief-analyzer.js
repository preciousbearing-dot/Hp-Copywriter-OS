(function(){
  'use strict';
  window.HPCOS_ANALYZER={
    analyze(project){
      const p=project||{}, checks=[
        {label:'Desired outcome',ok:!!String(p.goal||'').trim(),tip:'Define the outcome the writing should achieve.'},
        {label:'Target audience',ok:!!String(p.audience||'').trim(),tip:'Describe who the reader is, what they care about, and what they already know.'},
        {label:'Offer or central message',ok:/offer|product|service|message|topic|about|selling|promot|announce/i.test(String(p.brief||'')),tip:'Explain what is being offered or what central message must be communicated.'},
        {label:'Evidence and proof',ok:/proof|evidence|testimonial|review|result|data|source|case stud|research|demonstrat/i.test(String(p.brief||'')),tip:'Add verifiable proof, examples, sources, or explicitly state that proof is not available.'},
        {label:'Call to action / next step',ok:/call to action|\bcta\b|sign up|buy|book|register|download|contact|reply|click|next step|subscribe/i.test(String(p.brief||'')),tip:'State what the reader should do after reading, if an action is needed.'},
        {label:'Constraints and requirements',ok:/must|avoid|don.t|do not|limit|maximum|minimum|deadline|tone|voice|format|length/i.test(String(p.brief||'')),tip:'Record required inclusions, exclusions, tone, length, format, and deadlines.'}
      ];
      const missing=checks.filter(c=>!c.ok);
      let summary=missing.length===0?'The brief covers the main planning areas. Review the details manually before drafting.':missing.length<=2?'This brief has a useful starting point, but a few details could materially improve the result.':'This brief is still early. Clarify the highest-impact details before investing in a full draft.';
      return {checks,missing,summary,score:checks.length-missing.length};
    }
  };
})();