/* KG-WEB-001: dependency-free navigation and buyer/supplier email handoff. */
(function () {
'use strict';
var toggle=document.querySelector('.nav-toggle'),nav=document.getElementById('site-nav');
function setOpen(open){document.documentElement.classList.toggle('nav-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.querySelector('.nav-label').textContent=open?'Close':'Menu';}
toggle.addEventListener('click',function(){setOpen(toggle.getAttribute('aria-expanded')!=='true');});
nav.addEventListener('click',function(e){if(e.target.closest('a'))setOpen(false);});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(toggle.getAttribute('aria-expanded')==='true')toggle.focus();setOpen(false);}});
Array.prototype.forEach.call(document.querySelectorAll('form[data-enquiry]'),function(form){
 form.addEventListener('submit',function(e){
  e.preventDefault();
  if(!form.reportValidity())return;
  var buyer=form.getAttribute('data-enquiry')==='buyer',d=new FormData(form);
  var fields=buyer?[['name','Name'],['company','Company'],['email','Business email'],['market','Buying market'],['requirement','Requirement'],['quantity','Approximate quantity'],['timing','Timing']]:[['name','Name'],['company','Company'],['email','Business email'],['country','Country'],['sector','Sector / products'],['purpose','Reason for enquiry'],['experience','Export experience'],['target','Target market']];
  var body=fields.map(function(field){var v=String(d.get(field[0])||'').trim();return v?field[1]+': '+v:'';}).filter(Boolean).join('\n');
  var subject=buyer?'Karatas Global — sourcing requirement':'Karatas Global — partnership enquiry';
  window.location.href='mailto:omer@karatasglobal.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
 });
});
})();