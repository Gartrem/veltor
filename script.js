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


/* VELTOR high-quality hero loader v42 */
(async()=>{
  const hero=document.querySelector('.hero__media');
  if(!hero) return;
  try{
    const parts=await Promise.all(
      [0,1,2,3,4,5].map(async i=>{
        const response=await fetch(`assets/hero-v42/part${i}.txt?v=42`,{cache:'force-cache'});
        if(!response.ok) throw new Error(`hero-v42 part ${i}: ${response.status}`);
        return (await response.text()).trim();
      })
    );
    const source=`data:image/webp;base64,${parts.join('')}`;
    const test=new Image();
    test.decoding='async';
    test.onload=()=>{
      hero.style.setProperty('--hero-v42',`url("${source}")`);
      hero.classList.add('is-hq-loaded');
    };
    test.onerror=()=>console.warn('VELTOR hero v42 could not be decoded');
    test.src=source;
  }catch(error){
    console.warn('VELTOR hero v42 load failed',error);
  }
})();
