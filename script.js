const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('.service-carousel').forEach((carousel, cardIndex) => {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const dotsWrap = carousel.querySelector('.carousel-dots');
  const delay = Number(carousel.dataset.delay) || 3500;
  let current = 0;
  let timerId = null;

  const dots = slides.map(() => {
    const dot = document.createElement('span');
    dotsWrap.appendChild(dot);
    return dot;
  });

  const show = (next) => {
    slides.forEach((slide, i) => {
      slide.classList.remove('active', 'exit-left');
      if (i === next) slide.classList.add('active');
      else if (i === current && current !== next) slide.classList.add('exit-left');
    });
    dots.forEach((dot, i) => dot.classList.toggle('on', i === next));
    current = next;
  };

  const tick = () => {
    show((current + 1) % slides.length);
    timerId = setTimeout(tick, delay);
  };
  const start = () => { clearTimeout(timerId); timerId = setTimeout(tick, delay); };
  const stop = () => clearTimeout(timerId);

  show(0);
  if (reduceMotion) return;

  // Autoplay, staggered so the three cards don't flip in unison; pause on hover/focus.
  setTimeout(start, cardIndex * 900);
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);
});
