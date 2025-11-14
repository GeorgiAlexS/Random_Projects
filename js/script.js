// Simple JS for smooth reveal animations and lightbox
(function(){
  // Reveal on scroll (simple)
  const revealEls = document.querySelectorAll('.card, .project-row, .job-card, .gallery-img, .type');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.transform = 'translateY(0)';
        e.target.style.opacity = 1;
        io.unobserve(e.target);
      }
    });
  },{threshold:0.1});
  revealEls.forEach(el=>{
    el.style.transform='translateY(12px)';
    el.style.opacity=0;
    el.style.transition='all .6s cubic-bezier(.2,.9,.2,1)';
    io.observe(el);
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  function openLight(src, alt){
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  }
  function closeLight(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    lightboxImg.src = '';
  }
  document.addEventListener('click', function(e){
    const t = e.target;
    if(t.matches('.gallery-img')){
      openLight(t.dataset.full || t.src, t.alt);
    }
    if(t === lightboxClose || t === lightbox) closeLight();
  });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeLight(); });

  // Smooth anchor scroll with offset (if needed)
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.getAttribute('href');
      const el = document.querySelector(id);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
})();