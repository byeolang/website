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

    window.removeEventListener('click', onClickGlobal);
}

export function showPopup() {
    const result = document.getElementById('result');
    result.style.visibility = 'visible';
    result.style.opacity = '0.8';
    result.classList.remove('hidden-popup');

    setTimeout(() => {
      window.addEventListener('click', onClickGlobal);
    }, 500);
}

function onClickGlobal(e) {
  const result = document.getElementById('result');

  if(!result.contains(e.target))
    onClickCloseButton()
}
