export function enableDragScroll() {
  const isDesktop = window.matchMedia("(pointer: fine)").matches;
  if(!isDesktop) return;

  const slider = document.scrollingElement || document.documentElement;
  let isDown = false;
  let startY;
  let scrollTop;

  window.addEventListener('mousedown', (e) => {
    if(e.button !== 0) return;

    isDown = true;
    startY = e.clientY;
    scrollTop = window.scrollY || document.documentElement.scrollTop;
    document.body.style.cursor = 'grabbing';
  });

  window.addEventListener('mouseleave', () => {
    isDown = false;
    document.body.style.cursor = '';
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
    document.body.style.cursor = '';
  });

  window.addEventListener('mousemove', (e) => {
    if(!isDown) return;

    e.preventDefault();
    const y = e.clientY;
    const walk = (y - startY) * 1.3;

    window.scrollTo(0, scrollTop - walk);
  });
}