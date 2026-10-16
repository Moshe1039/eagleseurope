
document.documentElement.classList.add('js');
(function(){
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function mix(id){ return ['https://assets.mixkit.co/videos/'+id+'/'+id+'-1080.mp4','https://assets.mixkit.co/videos/'+id+'/'+id+'-720.mp4','https://assets.mixkit.co/videos/'+id+'/'+id+'-360.mp4']; }

  // ---------- Nav ----------
  var nav = document.getElementById('nav'), menuBtn = document.getElementById('menu-btn');
  function onScroll(){ nav.classList.toggle('solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  function closeMenu(){ nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false'); }
  menuBtn.addEventListener('click', function(){
    var open = menuBtn.getAttribute('aria-expanded') === 'true';
    nav.classList.toggle('open', !open); menuBtn.setAttribute('aria-expanded', String(!open));
  });
  document.getElementById('nav-links').addEventListener('click', function(e){ if(e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && nav.classList.contains('open')){ closeMenu(); menuBtn.focus(); } });

  // ---------- Reveal (only elements still below the fold are hidden, so nothing flashes) ----------
  if(!reduce && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.remove('pending'); io.unobserve(en.target); } });
    }, {threshold: .12});
    document.querySelectorAll('.reveal').forEach(function(el){
      if(el.getBoundingClientRect().top > window.innerHeight){ el.classList.add('pending'); io.observe(el); }
    });
  }

  // ---------- Film player: plays clips in sequence with a crossfade ----------
  function Film(container, clips, toggleBtn, onChange){
    var vids = container.querySelectorAll('video.film'), cur = 0, idx = 0, paused = false;
    function load(v, clip){
      while(v.firstChild) v.removeChild(v.firstChild);
      clip.src.forEach(function(u){ var s = document.createElement('source'); s.src = u; s.type = 'video/mp4'; v.appendChild(s); });
      v.load();
    }
    function show(i){
      idx = (i + clips.length) % clips.length;
      var next = vids[1 - cur], prev = vids[cur];
      load(next, clips[idx]);
      next.onended = function(){ show(idx + 1); };
      var go = function(){ next.removeEventListener('canplay', go); next.classList.add('on'); prev.classList.remove('on'); prev.pause(); cur = 1 - cur; if(!paused) next.play().catch(function(){}); };
      next.addEventListener('canplay', go);
      if(onChange) onChange(idx);
    }
    function setPaused(p){
      paused = p;
      toggleBtn.setAttribute('aria-pressed', String(p));
      toggleBtn.querySelector('span').textContent = p ? 'Play film' : 'Pause film';
      toggleBtn.querySelector('svg').innerHTML = p
        ? '<path d="M3 1l10 6-10 6z" fill="currentColor"/>'
        : '<rect x="2" y="1" width="3" height="12" fill="currentColor"/><rect x="9" y="1" width="3" height="12" fill="currentColor"/>';
      var v = vids[cur];
      if(p) v.pause(); else if(v.currentSrc) v.play().catch(function(){}); else show(idx);
    }
    toggleBtn.addEventListener('click', function(){ setPaused(!paused); });
    return { start: function(i){ show(i || 0); }, go: function(i){ show(i); }, setPaused: setPaused, isPaused: function(){ return paused; } };
  }

  // Hero film
  var heroClips = [
    { src: ['https://videos.pexels.com/video-files/34350685/14552949_2560_1440_30fps.mp4'] },
    { src: mix(8675) },
    { src: mix(44912) }
  ];
  if(document.getElementById('hero-media')){
    var hero = Film(document.getElementById('hero-media'), heroClips, document.getElementById('hero-toggle'));
    if(reduce){ hero.setPaused(true); } else { hero.start(0); }
  }

  // A day with us
  var dayClips = [
    { t:'08:00', title:'Morning light',          src: mix(25988) },
    { t:'11:00', title:'Out on the water',       src: mix(11318) },
    { t:'13:00', title:'Lunch among the olives', src: mix(22430) },
    { t:'16:00', title:'Nowhere to be',          src: mix(47286) },
    { t:'19:00', title:'The first glass',        src: mix(41257) },
    { t:'21:00', title:'Dinner with friends',    src: mix(13261) }
  ];
  if(document.getElementById('day-player')){
  var chapterBtns = document.querySelectorAll('#day-chapters button');
  var day = Film(document.getElementById('day-player'), dayClips, document.getElementById('day-toggle'), function(i){
    document.getElementById('day-time').textContent = dayClips[i].t;
    document.getElementById('day-title-now').textContent = dayClips[i].title;
    chapterBtns.forEach(function(b, j){ b.setAttribute('aria-current', j === i ? 'true' : 'false'); });
  });
  chapterBtns.forEach(function(b){ b.addEventListener('click', function(){ var i = +b.getAttribute('data-i'); if(day.isPaused()) day.setPaused(false); day.go(i); }); });
  var dayStarted = false;
  if(reduce){ day.setPaused(true); }
  else if('IntersectionObserver' in window){
    new IntersectionObserver(function(entries, obs){
      entries.forEach(function(en){ if(en.isIntersecting && !dayStarted){ dayStarted = true; day.start(0); obs.disconnect(); } });
    }, {threshold: .25}).observe(document.getElementById('day-player'));
  } else { day.start(0); }
  }

  // ---------- Form ----------
  var form = document.getElementById('enquiry');
  if(!form) return;
  var destParam = new URLSearchParams(location.search).get('dest');
  if(destParam){ var sel = document.getElementById('f-where'); for(var k = 0; k < sel.options.length; k++){ if(sel.options[k].text === destParam){ sel.value = destParam; } } }
  function updateBtn(){ document.getElementById('submit-btn').textContent = document.getElementById('pref-call').checked ? 'Book a call' : 'Request information'; }
  document.querySelectorAll('input[name="pref"]').forEach(function(r){ r.addEventListener('change', updateBtn); });
  document.querySelectorAll('[data-call]').forEach(function(a){ a.addEventListener('click', function(){ document.getElementById('pref-call').checked = true; updateBtn(); }); });

  function setErr(input, errId, msg){
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    document.getElementById(errId).textContent = msg;
  }
  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(form.website.value){ return; } // spam trap
    var first = null;
    var name = document.getElementById('f-name').value.trim(), email = form.email.value.trim();
    setErr(document.getElementById('f-name'), 'e-name', name ? '' : 'Please enter your name.'); if(!name) first = first || document.getElementById('f-name');
    var okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setErr(form.email, 'e-email', okEmail ? '' : 'Please enter a valid email address, for example name@example.com.'); if(!okEmail) first = first || form.email;
    setErr(form.consent, 'e-consent', form.consent.checked ? '' : 'Please confirm that we may use your details to reply.'); if(!form.consent.checked) first = first || form.consent;
    if(first){ first.focus(); return; }
    var btn = document.getElementById('submit-btn'), formErr = document.getElementById('e-form');
    formErr.textContent = ''; btn.disabled = true;
    var val = function(id){ return document.getElementById(id).value.trim(); };
    var payload = {
      pref: document.getElementById('pref-call').checked ? 'call' : 'info',
      name: val('f-name'), email: val('f-email'), phone: val('f-phone'),
      couples: val('f-couples'), destination: val('f-where'), when: val('f-when'), note: val('f-note'),
      consent: form.consent.checked, website: form.website.value
    };
    fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(function(r){ return r.json().catch(function(){ return {}; }).then(function(d){ if(!r.ok || !d.ok) throw new Error(d.error || 'failed'); }); })
      .then(function(){ var t = document.getElementById('thanks'); t.hidden = false; t.focus(); form.querySelectorAll('input,select,textarea').forEach(function(el){ el.disabled = true; }); })
      .catch(function(){ btn.disabled = false; formErr.textContent = 'Sorry, something went wrong and your details were not sent. Please try again, or email us at hello@eagleseurope.com.'; });
  });
})();
