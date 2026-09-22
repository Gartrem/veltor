const menuBtn=document.querySelector('.menu');
const nav=document.querySelector('.nav');
menuBtn?.addEventListener('click',()=>{
  const open=nav.classList.toggle('is-open');
  menuBtn.setAttribute('aria-expanded',String(open));
});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('is-open')));
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
