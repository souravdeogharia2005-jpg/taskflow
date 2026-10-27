import gsap from 'gsap';

export const animateTaskEnter = (el) => {
  if (!el) return;
  gsap.fromTo(el, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' });
};

export const animateTaskComplete = (el, onComplete) => {
  if (!el) return onComplete?.();
  const tl = gsap.timeline({ onComplete });
  tl.to(el, { scale: 1.02, duration: 0.12, ease: 'power2.out' })
    .to(el, { scale: 1, duration: 0.18, ease: 'elastic.out(1, 0.5)' });
};

export const animateTaskDelete = (el, onComplete) => {
  if (!el) return onComplete?.();
  gsap.to(el, {
    opacity: 0, x: 40, scale: 0.96, duration: 0.3, ease: 'power3.in',
    onComplete,
  });
};

export const animateCheckboxCheck = (el) => {
  if (!el) return;
  gsap.fromTo(el, { scale: 0.7 }, { scale: 1, duration: 0.25, ease: 'elastic.out(1, 0.4)' });
};
