# byeol 홈페이지 Scrollytelling 작업 메모 (프롬프트)

다음 작업자가 재부팅 후에도 동일한 정보를 바로 확인할 수 있도록 현재까지 파악한 사항을 아래에 정리했다.

## 현재 구조 요약
- `index.html`은 front matter만 포함하며 실질적인 홈 뷰는 `_layouts/home.html`에 있다.
- `_layouts/home.html`에서 필요한 CSS/JS를 모두 로드하고 `div#scroll-section` 내에 `section#UprisingRocket`, `section#TakeOff` 두 개의 씬을 정의한다. Scene1 무대(`scene1-stage`, 연기 스테이지, 산·잔디 SVG 등)는 이미 구현돼 있다.
- 사이트 공통 스타일과 배경 레이어는 `assets/css/home.css`, 씬 전용 스타일은 `assets/css/scenes.css`에 분리되어 있다.
- ScrollTrigger 기반 씬 엔진은 `assets/js/scene.mjs`(추상 클래스)와 `assets/js/scenes.mjs`(실제 씬 등록)로 구성된다. 현재는 Scene1(`TakeOff`) 타임라인만 구현돼 있으며 `UprisingRocket`은 빈 씬으로 남아 있다.

## Scene1 구현 현황
- Scene1 컨셉은 "적은 문법, 빠른 이해"이며 `_layouts/home.html`의 `section#TakeOff` 내부에서 마크업이 완성돼 있다.
- 사용되는 이미지 자산: `assets/images/scenes/rocket.png`, `rocket-fire.png`, `rocket-smoke-left/right.png`, `launchpad.png`.
- Scene1 FX 모듈:
  - `assets/js/scene1-ignition-light.mjs`: WebGL(또는 Canvas)로 발사광 표현.
  - `assets/js/scene1-sparks.mjs`: Canvas 기반 점화 스파크.
- Scene1 타임라인(`assets/js/scenes.mjs`): 연기 가시성, 불꽃 스케일, 플레어 싱크, 로켓 상승 애니메이션 등을 ScrollTrigger 진행도에 맞춰 제어한다.

## 리소스 & 컨셉 가이드
- `../리소스 생성/scene_resource_spec.md`: 4개 Scene의 리소스·기술분담·화법 요약.
- `../리소스 생성/scene 별 스토리 보드.txt`: 각 Scene의 기능/핵심화면/필요 이미지/애니메이션/텍스트 배치/전환 규칙.
- `../리소스 생성/scene의 리소스 생성 규약.txt`: 자산 우선순위, 스타일 잠금 규칙, 프롬프트 초안.
- `../리소스 생성/기능 4개 설명.txt`: Scene별 카피 및 UI 카드 구성 지침.
- `../리소스 생성/scene*_컨셉아트.png`: Scene1~4 시네마틱 픽셀아트 레퍼런스.

## 구현 시 유의사항
1. 씬 추가 시 `_layouts/home.html`에 새로운 `<section id="...">`와 핀 배경 구조를 추가하고, `assets/css/scenes.css`에서 레이아웃·레이어 z-index를 정의한다.
2. 애니메이션 로직은 `assets/js/scenes.mjs`에 Scene 클래스를 추가해 ScrollTrigger에 등록한다. 필요하면 공용 유틸을 `assets/js/sceneX-*.mjs` 형태로 분리한다.
3. Scene 전환은 ScrollTrigger scrub 기반이므로 `Scene` 생성자에 넘기는 `heightRatio`를 적절히 지정해 스크롤 진행 길이를 맞춘다.
4. 기존 home 배경(`assets/js/homeBg.mjs`, `assets/js/seaBg.mjs`)에서 뷰포트/푸터 높이를 CSS 변수 `--vh`, `--vfooter`로 노출하므로 Scene CSS에서 이 값을 활용할 수 있다.
5. 픽셀아트 자산 생성 시 리소스 규약의 공통 조건(시네마틱 픽셀아트, 텍스트·UI 없음, 투명 배경, 로켓 디자인 잠금 등)을 프롬프트에 반드시 포함한다.

## 다음 단계 제안
1. Scene2용 마크업/스타일/타임라인을 추가해 구름층 돌파 구간을 구현한다. (컨셉: 빌드 벽 없는 개발)
2. 이후 Scene3, Scene4 순으로 무대·자산을 확장하고, Three.js를 활용하는 부분(Scene3 우주 파트, Scene4 행성/별자리)을 분리 모듈로 개발한다.
3. UI 카드 텍스트는 `기능 4개 설명.txt`를 그대로 사용하며, Storyboard에 정의된 위치와 등장 순서를 GSAP로 제어한다.

이 문서를 계속 갱신하면서 진행 상황과 규칙을 덧붙이면, 재부팅 이후에도 동일한 컨텍스트를 빠르게 공유할 수 있다.
