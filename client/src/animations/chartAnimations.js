import gsap from 'gsap';

export const animateProgressBar = (el, targetWidth) => {
  if (!el) return;
  gsap.fromTo(el,
    { width: '0%' },
    { width: targetWidth, duration: 1.2, ease: 'power3.out', delay: 0.3 }
  );
};

export const animateCountUp = (setter, target, duration = 1) => {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration,
    ease: 'power3.out',
    delay: 0.4,
    onUpdate: () => setter(Math.round(obj.val)),
  });
};
