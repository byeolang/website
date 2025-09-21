class Package {
    constructor() {
        this.pkg = document.getElementById('package');
    }

    animate() {
        document.documentElement.style.setProperty('--packaged', 0);
        this.pkg.innerHTML = `
          <div class="scene">
            <div class="package__wrapper">
              <div class="package__shadow"></div>
              <div class="package">
                <div class="package__content">
                  <img class="package__icon package__icon--html" src="svg1.svg" />
                  <img class="package__icon package__icon--css" src="svg2.svg" />
                  <img class="package__icon package__icon--js" src="svg3.svg" />
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
                          <img src="svg4.svg" />
                          <span>THIS WAY UP</span>
                          <img src="svg4.svg" />
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
        // 초기 상태: 완전히 안 보이도록
        this.pkg.classList.remove('fade-in', 'fade-out');

        // 약간 지연 후 fade-in
        setTimeout(() => {
          this.pkg.classList.add('fade-in');
        }, 50);

        // 패키지 애니메이션 실행
        setTimeout(() => {
          document.documentElement.style.setProperty('--packaged', 1);
        }, 750);

        // 끝나면 fade-out
        setTimeout(() => {
          this.pkg.classList.remove('fade-in');
          this.pkg.classList.add('fade-out');
        }, 5750);
    }
};

export const pkgAnimation = new Package();

window.addEventListener('load', function() {
  const button = document.getElementById('downloadButton');
  button.onclick = function() {
    pkgAnimation.animate();
  };
});