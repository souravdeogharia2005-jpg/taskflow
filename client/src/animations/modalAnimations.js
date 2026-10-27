import gsap from 'gsap';

export const animateModalOpen = (backdrop, box) => {
  gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
  gsap.fromTo(box,
    { opacity: 0, scale: 0.92, y: 30 },
    { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power3.out' }
  );
};

export const animateModalClose = (backdrop, box, onComplete) => {
  const tl = gsap.timeline({ onComplete });
  tl.to(box, { opacity: 0, scale: 0.94, y: 20, duration: 0.25, ease: 'power3.in' }, 0);
  tl.to(backdrop, { opacity: 0, duration: 0.25, ease: 'power2.in' }, 0);
};
