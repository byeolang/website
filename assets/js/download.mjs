import { i18n } from './lang-toggle.mjs';

class Package {
    constructor() {
        this.pkg = document.getElementById('package');
        this.messageDiv = document.getElementById('packaging-message');
        this.messageText = document.getElementById('packaging-text');
    }

    animate() {
        document.documentElement.style.setProperty('--packaged', 0);
        this.pkg.innerHTML = `
          <div class="scene">
            <div class="package__wrapper">
              <div class="package__shadow"></div>
              <div class="package">
                <div class="package__content">
                  <img class="package__icon package__icon--html" src="../assets/images/cdcase.png" />
                  <img class="package__icon package__icon--css" src="../assets/images/manual.png" />
                  <img class="package__icon package__icon--js" src="../assets/images/thankyou.png" />
                </div>
                <div class="package__side package__side--main">
                  <div class="package__flap package__flap--top">
                    <div class="package__tape package__tape--top"></div>
                  </div>
                  <div class="package__flap package__flap--bottom">
                    <div class="package__tape package__tape--bottom"></div>
                  </div>
                  <div class="package__side package__side--tabbed">
                    <img class="package__branding package__branding--shadow" src="https://assets.codepen.io/605876/avatar.png"/><img class="package__branding" src="https://assets.codepen.io/605876/avatar.png"/>
                    <div class="package__flap package__flap--top"></div>
                    <div class="package__flap package__flap--bottom"></div>
                  </div>
                  <div class="package__side package__side--extra">
                    <div class="package__flap package__flap--top"></div>
                    <div class="package__flap package__flap--bottom"></div>
                    <div class="package__side package__side--flipped">
                        <span class="package__direction">
                          <img src="../assets/images/svg4.svg" />
                          <span>THIS WAY UP</span>
                          <img src="../assets/images/svg4.svg" />
                        </span>
                        <span class="package__label package__label--shadow"></span>
                        <span class="package__label"></span>
                      <div class="package__flap package__flap--top"></div>
                      <div class="package__flap package__flap--bottom"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        const button = document.getElementById('downloadButton');
        button.onclick = null;
        this.pkg.classList.remove('fade-in', 'fade-out');
        this.messageText.textContent = i18n.t('packaging message');
        this.messageDiv.style.display = 'block';

        setTimeout(() => {
          this.pkg.classList.add('fade-in');
        }, 50);

        setTimeout(() => {
          document.documentElement.style.setProperty('--packaged', 1);
        }, 950);

        setTimeout(() => {
          this.messageText.textContent = i18n.t('thank you message');
        }, 5800);

        setTimeout(() => {
          this.pkg.classList.remove('fade-in');
          this.pkg.classList.add('fade-out');

          this.messageDiv.style.display = 'none';
          setTimeout(() => {
            this.pkg.classList.remove('fade-out');
            button.onclick = onClick;
          }, 700);
        }, 8200);
    }
};

const pkgAnimation = new Package();

function onClick() {
    pkgAnimation.animate();
}


window.addEventListener('load', function() {
  const button = document.getElementById('downloadButton');
  button.onclick = onClick;
});