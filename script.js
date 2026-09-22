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

const mapEl=document.getElementById('veltor-map');
if(mapEl && window.L){
  const veltorCoords=[55.0764,83.0344];
  const map=L.map(mapEl,{
    center:veltorCoords,
    zoom:16,
    zoomControl:true,
    scrollWheelZoom:false,
    doubleClickZoom:true,
    dragging:true,
    tap:true,
    attributionControl:true
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{
    maxZoom:20,
    subdomains:'abcd',
    attribution:'&copy; OpenStreetMap contributors &copy; CARTO'
  }).addTo(map);

  const markerIcon=L.divIcon({
    className:'',
    html:'<div class="veltor-map-marker"><div class="veltor-map-marker__pin"></div><div class="veltor-map-marker__label"><b>ВЕЛТОР</b><span>Проспект Дзержинского, 144а</span></div></div>',
    iconSize:[190,54],
    iconAnchor:[24,48]
  });

  L.marker(veltorCoords,{icon:markerIcon,title:'ВЕЛТОР — проспект Дзержинского, 144а'}).addTo(map);

  map.zoomControl.setPosition('bottomright');

  const media=window.matchMedia('(max-width: 820px)');
  const adjustMap=()=>{
    if(media.matches){
      map.setView([55.0762,83.0344],15,{animate:false});
    }else{
      map.setView([55.0764,83.0309],16,{animate:false});
    }
    setTimeout(()=>map.invalidateSize(),50);
  };
  adjustMap();
  media.addEventListener?.('change',adjustMap);
}
