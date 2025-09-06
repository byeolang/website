export function showCloseButton() {
    const close = document.getElementById('bt-close');
    close.style.setProperty('display', 'block');
}

export function onClickCloseButton() {
    const close = document.getElementById('bt-close');
    close.style.setProperty('display', 'hidden-popup');

    var result = document.getElementById('result');
    result.classList.add('hidden-popup');
    result.style.opacity = '0';

    setTimeout(() => {
      // trigger window resize event:
      //  for some unknown reason, monaco editor's with will expand to out of boundary.
      window.dispatchEvent(new Event('resize'))
    }, 500);
}

export function showPopup() {
    const result = document.getElementById('result');
    result.style.display = 'block';
    result.style.opacity = '0.8';
    result.classList.remove('hidden-popup');

    setTimeout(() => {
      // trigger window resize event:
      //  for some unknown reason, monaco editor's with will expand to out of boundary.
      window.dispatchEvent(new Event('resize'))
    }, 500);
}