# byeol 홈페이지 Scrollytelling 작업 메모 (최신 인계)

이 문서는 2026-04-03 기준 최신 상태를 반영한 Scene 인계 문서다.
초기에는 Scene2 리소스 생성 프롬프트와 자산 생성 초안 중심으로 작성됐지만, 현재는 Scene2 자산이 거의 준비된 상태이므로 그 단계의 메모는 대부분 효용이 떨어진다.

따라서 이 문서는 이제 아래 목적에 맞춰 다시 정리한다.

- 현재 실제 프로젝트 구조 파악
- Scene1이 어떻게 구현되어 있는지 요약
- Scene2에서 이미 준비된 자산과 프로토타입 파일 정리
- 실제 프로젝트로 Scene2를 옮길 때의 주의사항과 단계별 계획 기록

중요: 이 문서는 이제 "리소스 생성 프롬프트 모음"이 아니라 "실제 구현 인계 문서"다.

## 현재 결론 요약

- Scene1(`TakeOff`)은 실제 홈페이지에 구현되어 있다.
- Scene2는 실제 프로젝트 기준으로 아직 미구현이다.
- Scene2용 PNG 자산은 거의 생성 완료됐다.
- Scene2용 standalone 프로토타입 HTML도 추가됐다.
- 아직 Scene2를 실제 홈페이지 파일에 반영하는 작업은 시작하지 않았다.

## 실제 프로젝트 구조

### 진입점

- `index.html`은 front matter만 포함하고, 홈 화면의 실체는 `_layouts/home.html`이다.
- `_layouts/home.html`에서 `assets/css/home.css`, `assets/css/scenes.css`, `assets/js/scenes.mjs` 등을 모두 로드한다.
- 스크롤 기반 씬의 루트는 `div#scroll-section`이다.

### 씬 DOM 구조

현재 `_layouts/home.html` 기준 씬 구조는 아래와 같다.

- `section#UprisingRocket`
- `section#TakeOff`

즉 Scene2 자리는 이미 DOM 상으로는 존재하지만, `UprisingRocket` 섹션은 현재 비어 있다.

### 씬 엔진

공통 씬 엔진은 `assets/js/scene.mjs`에 있다.

핵심 규칙:

- 각 Scene 클래스 이름이 곧 section id와 대응된다.
- `Scene` 생성자에서 `heightRatio`를 받아 section 높이를 `vh` 단위로 설정한다.
- 각 scene 내부에는 반드시 `.pin-bg` 요소가 있어야 한다.
- pin은 `ScrollTrigger`로 걸린다.
- `pinSpacing: false`를 사용한다.
- 타임라인 진행도는 `tl.progress(1 - self.progress)`로 반전해서 넣는다.

이 말은, standalone 프로토타입의 `progress` 공식을 실제 프로젝트로 옮길 때 그대로 복붙하면 방향이 어긋날 수 있다는 뜻이다.

### 부팅 동작

`assets/js/scenes.mjs`의 `Scener.init()`은 일반적인 top-start 페이지처럼 동작하지 않는다.

현재 부팅 로직 특징:

- `ScrollTrigger.refresh()`를 여러 번 호출한다.
- 페이지 로드 직후 최하단으로 스크롤을 이동시키는 로직이 있다.
- 사용자가 부팅 중 직접 스크롤하면 그 동작을 존중한다.

즉 Scene2를 붙일 때는 단순히 "스크롤하면 위에서 아래로 재생"한다고 생각하면 안 된다.

### 배경 시스템

홈페이지는 Scene 외에도 별도 배경 시스템을 이미 사용 중이다.

- `assets/js/homeBg.mjs`
- `assets/js/seaBg.mjs`
- `assets/css/home.css`

특히 아래 CSS 변수가 이미 사용된다.

- `--vh`
- `--vfooter`
- `--vheader`

`#main-bg` 높이와 배경 레이아웃이 이 값들에 의존하므로, Scene2를 실제 프로젝트에 넣을 때 기존 배경 시스템과 충돌하지 않게 주의해야 한다.

## Scene1 구현 상태 요약

Scene1은 `TakeOff`이며, 현재 홈페이지의 기준 구현이다.

### Scene1의 성격

- "적은 문법, 빠른 이해"를 보여주는 장면
- 단순 이미지 한 장이 아니라, 실제 배경 / 카피 / 로켓 / 연기 / FX / 지형 / 푸터까지 포함한 큰 pin shell 구조

### Scene1 DOM

`_layouts/home.html`의 `section#TakeOff` 안에는 아래 요소들이 함께 들어 있다.

- `#main-bg`
- `#scene1-stage`
- `#scene1-copy`
- `#scene1-smoke-stage`
- 산 / 잔디 / 바다 / terrain anchor / footer

즉 Scene1은 독립 무대 하나가 아니라, 홈 배경 세계 전체를 안고 있는 대형 씬이다.

### Scene1 스타일

`assets/css/scenes.css`에서 대부분의 위치와 크기를 `--scene1-*` 커스텀 프로퍼티로 관리한다.

예:

- 로켓 위치 / 크기
- 불꽃 위치 / 크기
- 연기 위치 / 크기
- copy 카드 위치
- glow / haze / shockwave / flare / gust / trail 위치

즉 이 프로젝트는 Scene 레이아웃을 "절대배치 + CSS 변수" 방식으로 조절하는 스타일이다.

### Scene1 애니메이션

`assets/js/scenes.mjs`의 `TakeOff` 클래스가 Scene1 전체 연출을 담당한다.

포함된 요소:

- 헤더 퇴장
- Scene1 copy 등장
- 점화 연출
- smoke 확장
- flare / shockwave / gust / trail
- 로켓 상승
- 보조 FX 모듈 연동

보조 모듈:

- `assets/js/scene1-ignition-light.mjs`
- `assets/js/scene1-sparks.mjs`

### Scene1 텍스트 시스템

Scene1 텍스트는 하드코딩이 아니라 `data-lang` 기반이다.

관련 파일:

- `assets/js/lang-ko.mjs`
- `assets/js/lang-en.mjs`
- `assets/js/lang-toggle.mjs`

Scene1 설명 텍스트는 단순 치환만 하는 것이 아니라, 강조 처리와 코드 하이라이트까지 추가로 수행한다.

따라서 Scene2를 실제 프로젝트에 넣을 때도, 프로토타입의 하드코딩 텍스트를 그대로 박는 방향은 맞지 않는다.

## Scene2 현재 확보 자산

현재 Scene2 관련 실제 파일은 `resource-generation/`에 있다.

### Scene2 레이어 PNG

- `resource-generation/scene2-rocket.png`
- `resource-generation/scene2-rocket-fire.png`
- `resource-generation/scene2-rocket-smoke.png`
- `resource-generation/scene2-cloud-far.png`
- `resource-generation/scene2-cloud-mid.png`
- `resource-generation/scene2-cloud-near.png`
- `resource-generation/scene2-cloud-overlay-mist.png`
- `resource-generation/scene2-background-concept-art.png`

### Scene2 레퍼런스 이미지

- `resource-generation/scene2_컨셉아트.png`

이 파일은 텍스트와 비교 카드까지 박혀 있는 레퍼런스 이미지다.
즉 실제 구현용 레이어가 아니라, 장면 분위기와 배치 기준을 보여주는 용도다.

### Scene2 프로토타입 HTML

- `resource-generation/scene2-scroll-prototype-baseline-visible.html`

이 파일이 현재 실제로 읽어야 하는 Scene2 프로토타입이다.

예전 `scene2-scroll-prototype-stable.html`은 현재 기준으로 비어 있거나 폐기된 파일로 간주해도 된다.

## Scene2 프로토타입에서 확인한 사실

### 프로토타입의 목적

`scene2-scroll-prototype-baseline-visible.html`은 최종 구현본이 아니다.

이 파일의 목적은 아래와 같다.

- 깜빡임 원인 분리
- Three.js 제거
- PNG + CSS gradient + GSAP ScrollTrigger만 남긴 베이스라인 확인

즉 Scene2 최종 소스가 아니라, "안정적으로 보이는 최소 구성"을 검증하는 파일이다.

### 프로토타입의 좋은 점

이 파일은 Scene2 실제 구현을 위한 중요한 기준을 이미 제공한다.

- 레이어 분해 방식이 정리돼 있다.
- 로켓 스택 구조가 정리돼 있다.
- 구름 레이어 깊이 순서가 정리돼 있다.
- copy 카드의 대략적 배치가 정리돼 있다.
- progress에 따른 transform 공식이 이미 있다.

프로토타입 기준 레이어 구조:

- far
- mid
- deck
- front
- mist
- rocket-smoke
- rocket-flame
- rocket-core
- HUD copy

### 프로토타입의 한계

하지만 이 파일은 실제 프로젝트로 바로 옮길 수는 없다.

이유:

- standalone HTML이다.
- GSAP / ScrollTrigger를 CDN으로 직접 불러온다.
- 텍스트가 하드코딩이다.
- debug UI가 포함돼 있다.
- 현재 프로젝트의 `Scene` 추상 클래스 구조를 따르지 않는다.
- 실제 프로젝트는 진행도 반전 로직을 쓰는데, 프로토타입은 일반적인 정방향 progress를 쓴다.

## 현재 코드베이스 기준 Scene2 상태

Scene2는 현재 코드상으로 아래 상태다.

### DOM

- `section#UprisingRocket`가 비어 있음

### CSS

- `assets/css/scenes.css`에는 `section#UprisingRocket { background-color: transparent; }` 정도만 있음

### JS

- `assets/js/scenes.mjs`에 `class UprisingRocket extends Scene`는 존재함
- 하지만 `_onAnimate(tl)`는 비어 있음

즉 "Scene2 자리는 예약돼 있지만, 실제 무대는 아직 없는 상태"라고 보면 된다.

## Scene2 실제 반영 시 중요한 규칙

### 1. 프로토타입 HTML 전체를 그대로 복붙하지 않는다

실제 프로젝트는 이미 아래 구조를 갖고 있다.

- `_layouts/home.html`이 씬 DOM을 만듦
- `assets/css/scenes.css`가 씬 레이아웃을 잡음
- `assets/js/scenes.mjs`가 애니메이션을 제어함
- `lang-*.mjs`와 `lang-toggle.mjs`가 텍스트를 관리함

따라서 Scene2는 "DOM / CSS / JS / i18n / 자산 경로"로 분해해서 이식해야 한다.

### 2. `resource-generation/`는 운영 자산 폴더가 아니다

현재 Scene2 PNG는 `resource-generation/`에만 있다.
실제 홈페이지는 Scene 이미지 자산을 `assets/images/scenes/`에서 불러오고 있다.

즉 Scene2를 실제 반영하려면, 자산을 production asset 경로로 정리하는 단계가 필요하다.

### 3. Scene2 텍스트도 `data-lang` 경로를 타는 쪽이 맞다

현재 Scene1은 이미 다국어 체계를 사용 중이다.
Scene2를 하드코딩 텍스트로 넣으면 구조가 어색해진다.

즉 Scene2 반영 시 아래 항목은 번역 키로 분리하는 것이 맞다.

- eyebrow
- 제목
- 설명
- 비교 카드 라벨
- 비교 카드 항목

### 4. 진행도 방향을 반드시 재해석해야 한다

프로토타입은 `progress = 0 -> 1` 기준으로 작성돼 있다.
하지만 실제 홈페이지는 공통 Scene 엔진에서 `tl.progress(1 - self.progress)`를 사용한다.

즉 프로토타입 수식을 그대로 붙이면 장면이 반대로 움직일 수 있다.

### 5. Scene2는 Scene1 세계를 그대로 복제할 필요가 없다

Scene1은 `#main-bg`, 바다, 산, 잔디, footer까지 포함하는 큰 무대다.
Scene2는 지금 자산 성격상 "독립적인 하늘 + 구름 + 로켓 + copy 무대"로 분리하는 쪽이 더 자연스럽다.

즉 Scene2를 실제로 넣을 때 Scene1 구조를 통째로 복제하기보다, `UprisingRocket` 안에 Scene2 전용 `pin-bg` shell을 새로 만드는 편이 안전하다.

## Scene2 실제 반영 계획

아래는 현재 기준으로 가장 합리적인 이식 순서다.

### 1단계. Scene2의 실제 자리와 방향을 확정

- `UprisingRocket`를 Scene2 자리로 그대로 사용할지 확정한다.
- 현재 DOM 순서와 `Scener.scenes` 배열 순서가 직관적이지 않으므로, Scene2가 스크롤 흐름상 어디에 놓이는지 먼저 확인한다.
- 현재 홈페이지는 부팅 시 맨 아래로 이동하는 특성이 있으므로, 일반적인 상단 시작 페이지처럼 생각하지 않는다.

### 2단계. 운영용 자산 경로 정리

- 현재 `resource-generation/`에 있는 Scene2 PNG를 실제 운영 자산 경로로 옮길 준비를 한다.
- Scene1과 같은 계열이라면 `assets/images/scenes/` 쪽이 우선 후보다.
- 실제 반영 전에는 어떤 파일을 production source로 쓸지 이름과 경로를 정리해야 한다.

### 3단계. Scene2 DOM 구조를 `_layouts/home.html`에 이식

프로토타입에서 실제로 가져올 구조:

- Scene2 전용 `.pin-bg` shell
- background layer
- far / mid / deck / front / mist 레이어
- rocket-smoke / rocket-flame / rocket-core
- Scene2 copy 카드

프로토타입에서 버릴 구조:

- toolbar
- spacer
- progress-readout
- fallback-note
- debug 문구

### 4단계. `assets/css/scenes.css`에 Scene2 전용 레이아웃 추가

프로토타입의 위치값을 그대로 박지 말고, 아래 방식으로 정리한다.

- `--scene2-*` 커스텀 프로퍼티 기반 좌표계
- 레이어별 z-index 정의
- 데스크탑 / 중간 높이 / 모바일 대응
- 로켓과 copy가 겹치지 않도록 responsive 조정

즉 Scene1처럼 Scene2도 "CSS 변수 + 절대배치" 패턴으로 맞추는 것이 자연스럽다.

### 5단계. Scene2 배경 전략 결정

배경은 두 방향 중 하나로 선택하면 된다.

- `scene2-background-concept-art.png`를 실제 배경 레이어로 사용
- 프로토타입처럼 CSS gradient를 기본 배경으로 두고 구름 PNG만 얹음

현재 단계에서는 둘 중 하나를 먼저 고르고 일관되게 가는 것이 중요하다.

### 6단계. 번역 키 추가

Scene2는 아직 `lang-ko.mjs`, `lang-en.mjs`에 관련 키가 없다.

따라서 실제 반영 단계에서는 최소한 아래를 번역 체계에 추가해야 한다.

- Scene2 eyebrow
- Scene2 title
- Scene2 description
- Scene2 flow left label
- Scene2 flow right label
- Scene2 flow item texts

### 7단계. `assets/js/scenes.mjs`의 `UprisingRocket` 구현

여기서 핵심은 프로토타입의 `setStaticScene(progress)`를 그대로 재사용하지 말고, 현재 Scene 엔진에 맞게 옮기는 것이다.

권장 방향:

- 프로토타입의 레이어 transform 공식은 최대한 유지
- 하지만 진행도 계산은 실제 Scene 엔진 규칙에 맞게 재해석
- `UprisingRocket` 타임라인이 Scene1과 같은 방식으로 작동하도록 맞춤

즉 "프로토타입 감각 유지 + 현재 엔진 문법에 맞는 재조립"이 핵심이다.

### 8단계. `heightRatio`와 체감 길이 조정

프로토타입은 `+=420%` pin 길이 감각을 사용한다.
실제 프로젝트는 `heightRatio` 기반으로 pin 길이를 만든다.

따라서 Scene2는 아래를 조정해야 한다.

- `super(...)`에 넣을 `heightRatio`
- copy 등장 시점
- deck 관통 시점
- rocket shrink / move timing
- mist peak timing

### 9단계. 실제 홈페이지 기준 검증

최종적으로 아래를 반드시 확인한다.

- 초기 부팅 시 스크롤 최하단 이동과 Scene2가 충돌하지 않는가
- masthead / background / Scene1 / Scene2 z-index가 충돌하지 않는가
- 모바일에서 copy와 로켓이 겹치지 않는가
- prototype에서 목표였던 anti-flicker 조건이 실제 홈페이지에서도 유지되는가

### 10단계. 안정화 후 추가 FX 판단

현재 Scene2 프로토타입은 일부러 Three.js를 뺀 상태다.

따라서 순서는 아래가 맞다.

1. PNG + CSS + GSAP baseline 이식
2. 실제 홈페이지에서 안정화 확인
3. 필요할 때만 추가 FX 검토

Three.js나 렌즈 플레어 같은 확장은 baseline이 안정된 뒤에 다시 판단한다.

## 현재 기준 가장 중요한 사실

이 문서를 읽는 다음 작업자는 아래 5가지만 기억하면 된다.

1. Scene2 자산 생성은 거의 끝났다. 지금 해야 할 일은 생성보다 이식이다.
2. 실제 참고 프로토타입은 `scene2-scroll-prototype-baseline-visible.html`이다.
3. Scene2는 현재 프로젝트에서 `UprisingRocket` 자리가 비어 있으므로, 그 자리에 들어갈 가능성이 높다.
4. 하지만 standalone 프로토타입을 그대로 넣는 것이 아니라, `_layouts/home.html` / `assets/css/scenes.css` / `assets/js/scenes.mjs` / `lang-*.mjs` 구조로 분해해서 이식해야 한다.
5. 실제 프로젝트는 진행도 반전, bottom-start 부팅, 기존 배경 시스템이 있으므로 프로토타입보다 구조적으로 더 까다롭다.

## 마지막 메모

2026-04-03 기준으로는 코드 수정 없이 구조 파악과 이식 계획 정리까지만 끝난 상태다.

즉 다음 단계는 아래 중 하나다.

- Scene2를 실제 프로젝트에 붙이기 시작
- 또는 Scene2 이식 전에 자산 경로 / 배경 전략 / 텍스트 구조를 먼저 확정

이 문서는 그 결정을 빠르게 내리기 위한 최신 기준 문서다.
