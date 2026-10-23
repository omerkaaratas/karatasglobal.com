/* KG-WEB-001 — Formspark direct enquiry path; original KG contact email retained.
   ACTIVATION GATE: A distinct Karatas Global Formspark ID is required.
   Formspark IDs are public endpoint identifiers, NOT passwords or API secrets.
   Leave empty to retain a truthful mailto fallback. Never reuse Granite & Lime's ID. */
(function () {
'use strict';
var EMAIL='omer@karatasglobal.com';
var FORMSPARK_FORM_ID=''; // Founder to provide new Karatas Global form ID; blank means NOT connected.
var endpoint=/^[A-Za-z0-9_-]{6,80}$/.test(FORMSPARK_FORM_ID)?'https://submit-form.com/'+FORMSPARK_FORM_ID:'';
var toggle=document.querySelector('.nav-toggle'),nav=document.getElementById('site-nav');
function setOpen(open){if(!toggle)return;document.documentElement.classList.toggle('nav-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.querySelector('.nav-label').textContent=open?'Close':'Menu';}
if(toggle&&nav){
toggle.addEventListener('click',function(){setOpen(toggle.getAttribute('aria-expanded')!=='true');});
nav.addEventListener('click',function(e){if(e.target.closest('a'))setOpen(false);});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){toggle.focus();setOpen(false);}});
}
var modeNote=document.getElementById('contact-mode-note');
if(endpoint&&modeNote)modeNote.textContent='Your enquiry is submitted securely through our form provider. You will see confirmation if the provider accepts it. No files or confidential drawings, please.';
var emailRe=/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/;
var forms=document.querySelectorAll('form[data-enquiry]');
Array.prototype.forEach.call(forms,function(form){
var sending=false,button=form.querySelector('button[type=submit]'),status=form.querySelector('.form-feedback'),recovery=form.querySelector('.form-recovery'),copyEmail=recovery.querySelector('.recovery-email'),originalLabel=button.innerHTML;
var fields=Array.prototype.slice.call(form.querySelectorAll('input:not([type=hidden]):not([name="_gotcha"]), textarea'));
var TYPE=form.getAttribute('data-enquiry');
function info(){return Object.fromEntries(new FormData(form));}
function subject(){return TYPE==='buyer'?'Karatas Global — sourcing requirement':'Karatas Global — commercial partnership enquiry';}
function message(data){var fieldsForMessage=TYPE==='buyer'?[['name','Name'],['company','Company'],['email','Business email'],['market','Buying market'],['requirement','Requirement'],['quantity','Approximate quantity'],['timing','Timing']]:[['name','Name'],['company','Company'],['email','Business email'],['country','Country'],['sector','Sector / products'],['purpose','Reason for enquiry'],['experience','Export experience'],['target','Target market']];
return fieldsForMessage.map(function(entry){var v=String(data[entry[0]]||'').trim();return v?entry[1]+': '+v:'';}).filter(Boolean).join('\n');}
function mailFallback(data){var url='mailto:'+EMAIL+'?subject='+encodeURIComponent(subject())+'&body='+encodeURIComponent(message(data));window.location.href=url;}
function showStatus(text,tone){status.hidden=false;status.textContent=text;status.dataset.tone=tone;status.focus({preventScroll:true});}
function errorCheck(){var input=form.querySelector('input[name=email]');input.setCustomValidity('');var value=input.value.trim().toLowerCase();if(value&&(!emailRe.test(value)||/\\.(com|ie|net|org)\\.\\1$/.test(value)))input.setCustomValidity('Please check your email address, including the ending (for example name@company.ie).');return form.reportValidity();}
form.querySelector('input[name=email]').addEventListener('input',function(){this.setCustomValidity('');});
copyEmail.addEventListener('click',function(){mailFallback(info());});
form.addEventListener('submit',async function(event){
event.preventDefault();if(sending)return;if(!errorCheck())return;
var data=info(),payload={};
Object.keys(data).forEach(function(key){if(key!=='_gotcha')payload[key]=String(data[key]||'').trim();});
payload._gotcha=data._gotcha||'';
payload._email={subject:subject()};
status.hidden=true;recovery.hidden=true;
if(!endpoint){mailFallback(data);showStatus('Your email application should open with your message ready. Please review it and press Send there; nothing has been submitted by this website.','error');recovery.hidden=false;return;}
sending=true;button.disabled=true;button.setAttribute('aria-busy','true');button.textContent='Sending enquiry…';
var controller='AbortController' in window?new AbortController():null;
var timeout=controller?setTimeout(function(){controller.abort();},20000):null;
try{
var response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload),signal:controller?controller.signal:undefined});
if(!response.ok)throw new Error('Provider did not accept submission');
showStatus('Thank you. Our form service has accepted your '+(TYPE==='buyer'?'sourcing':'partnership')+' enquiry. We will review it and respond where appropriate.','success');
form.reset(); // prevents accidental duplicate and clears sensitive data from fields after acknowledged POST
}catch(err){
showStatus('We could not confirm that your enquiry was received. Your details remain below. You can retry or open your email app instead.','error');recovery.hidden=false;
}finally{
if(timeout)clearTimeout(timeout);sending=false;button.disabled=false;button.removeAttribute('aria-busy');button.innerHTML=originalLabel;
}
});
});
})();