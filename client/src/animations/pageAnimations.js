import gsap from 'gsap';

export const animatePageEnter = (container) => {
  if (!container) return;
  const children = container.querySelectorAll('.animate-in');
  gsap.fromTo(children,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power3.out', clearProps: 'all' }
  );
};

export const animateListEnter = (items) => {
  if (!items || !items.length) return;
  gsap.fromTo(items,
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out', clearProps: 'all' }
  );
};
