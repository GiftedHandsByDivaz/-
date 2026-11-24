const SLIDE_DELAY = 3500; // 3.5 seconds between slides

document.querySelectorAll('.service-carousel').forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const dotsWrap = carousel.querySelector('.carousel-dots');
  let current = 0;

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

  show(0);

  // Scrolls on its own every 3.5s, no hover needed.
  setInterval(() => {
    if (!document.hidden) show((current + 1) % slides.length);
  }, SLIDE_DELAY);
});
