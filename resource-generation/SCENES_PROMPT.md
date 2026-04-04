# byeol 홈페이지 Scrollytelling 작업 메모 (최신 인계)

이 문서는 2026-04-05 기준 최신 상태를 반영한 Scene2 인계 문서다.
이제 목적은 "자산 생성 준비"가 아니라, 실제 홈페이지 기준으로 Scene2 애니메이션 반영까지 완료한 뒤 어떤 상태로 멈췄는지를 공유하는 것이다.

중요:

- Scene2는 정적 레이아웃 + 애니메이션까지 실제 코드베이스에 반영되어 있다.
- Scene2 copy / 백플레이트 구성은 Scene1 원칙과 동일한 구조로 고정했다.
- 현재 작업은 Scene2 시퀀스를 완전히 마무리한 시점에서 멈췄으며, 이제 자연스럽게 Scene3 착수 준비 단계로 넘어가면 된다.

## 현재 결론 요약

- Scene1(`TakeOff`)은 실제 홈페이지에 구현되어 있다.
- Scene2(`UprisingRocket`)는 실제 홈페이지에 정적 레이아웃과 애니메이션까지 반영되어 있다.
- Scene2용 PNG 자산은 `resource-generation/`뿐 아니라 `assets/images/scenes/`에도 이미 동기화되어 있다.
- Scene2 텍스트는 `data-lang` 기반 키로 분리되어 있다.
- Scene2의 제목 / 설명 / 좌측 그라데이션은 Scene1 표현 방식에 맞춰 고정되었고, 정적 기준 레이아웃 검수까지 마쳤다.
- `assets/js/scenes.mjs`의 `UprisingRocket` 애니메이션 구현을 작성해 현재 DOM 기준 pose → 상승 플라이트 → 페이드 아웃 시퀀스를 구성했다.
- 최종 responsive 튜닝과 Scene1↔Scene2 전환 QA까지 마쳤다.

## 실제 프로젝트 구조

### 진입점

- `index.html`은 front matter만 포함하고, 홈 화면의 실체는 `_layouts/home.html`이다.
- `_layouts/home.html`에서 `assets/css/home.css`, `assets/css/scenes.css`, `assets/js/scenes.mjs` 등을 모두 로드한다.
- 스크롤 기반 씬의 루트는 `div#scroll-section`이다.

### 씬 DOM 구조

현재 `_layouts/home.html` 기준 씬 구조는 아래와 같다.

- `section#UprisingRocket`
- `section#TakeOff`

이제 `UprisingRocket`는 비어 있지 않다.
현재 이 섹션 안에는 Scene2용 `.pin-bg.scene2-shell`, 구름 레이어, 로켓 스택, 카피 블록이 들어 있다.

### 씬 엔진

공통 씬 엔진은 `assets/js/scene.mjs`에 있다.

핵심 규칙:

- 각 Scene 클래스 이름이 곧 section id와 대응된다.
- `Scene` 생성자에서 `heightRatio`를 받아 section 높이를 `vh` 단위로 설정한다.
- 각 scene 내부에는 반드시 `.pin-bg` 요소가 있어야 한다.
- pin은 `ScrollTrigger`로 걸린다.
- `pinSpacing: false`를 사용한다.
- 타임라인 진행도는 `tl.progress(1 - self.progress)`로 반전해서 넣는다.

즉 standalone 프로토타입의 `progress = 0 -> 1` 공식을 실제 프로젝트에 그대로 붙이면 방향이 반대로 느껴질 수 있다.

### 부팅 동작

`assets/js/scenes.mjs`의 `Scener.init()`은 일반적인 top-start 페이지처럼 동작하지 않는다.

현재 부팅 로직 특징:

- `ScrollTrigger.refresh()`를 여러 번 호출한다.
- 페이지 로드 직후 최하단으로 스크롤을 이동시키는 로직이 있다.
- 사용자가 부팅 중 직접 스크롤하면 그 동작을 존중한다.

즉 Scene2 애니메이션을 붙일 때는 단순한 정방향 scrollytelling로 생각하면 안 된다.

### 배경 시스템

홈페이지는 Scene 외에도 별도 배경 시스템을 이미 사용 중이다.

- `assets/js/homeBg.mjs`
- `assets/js/seaBg.mjs`
- `assets/css/home.css`

특히 아래 CSS 변수가 이미 사용된다.

- `--vh`
- `--vfooter`
- `--vheader`

`#main-bg` 높이와 배경 레이아웃이 이 값들에 의존하므로, Scene2는 Scene1 배경 세계를 복제하지 않고 독립 shell로 유지하는 편이 안전하다.

## Scene1 구현 상태 요약

Scene1은 `TakeOff`이며, 현재 홈페이지의 기준 구현이다.

- 단순 이미지 한 장이 아니라 실제 배경 / 카피 / 로켓 / 연기 / FX / 지형 / 푸터까지 포함한 큰 pin shell 구조다.
- `assets/css/scenes.css`에서 대부분의 위치와 크기를 `--scene1-*` 커스텀 프로퍼티로 관리한다.
- 텍스트는 `data-lang` 기반이고, 설명 강조 처리와 코드 하이라이트까지 수행한다.

Scene2 작업에서 특히 참고할 만한 Scene1 포인트:

- 제목은 패널 안에 들어가지 않고 별도 `title-lockup`으로 분리되어 있다.
- 좌우 그라데이션 백플레이트는 큰 배경 성격으로 쓰고, 카드 패널과 역할을 분리한다.
- layout은 절대배치 + CSS 기준값으로 잡고, motion은 JS 타임라인으로 붙인다.

## Scene2 자산 상태

### 원본 작업 폴더

Scene2 관련 원본 작업 파일은 `resource-generation/`에 있다.

- `resource-generation/scene2-rocket.png`
- `resource-generation/scene2-rocket-fire.png`
- `resource-generation/scene2-rocket-smoke.png`
- `resource-generation/scene2-cloud-far.png`
- `resource-generation/scene2-cloud-mid.png`
- `resource-generation/scene2-cloud-near.png`
- `resource-generation/scene2-cloud-overlay-mist.png`
- `resource-generation/scene2-background-concept-art.png`
- `resource-generation/scene2_컨셉아트.png`
- `resource-generation/scene2-scroll-prototype-baseline-visible.html`

### 운영용 자산 경로

Scene2 운영 자산은 이미 `assets/images/scenes/`에도 들어 있다.

즉 아래 진술은 이제 틀리다:

- "Scene2 PNG는 아직 resource-generation에만 있다"
- "운영 경로 정리가 아직 안 됐다"

현재는 실제 홈페이지가 `assets/images/scenes/scene2-*`를 직접 읽는 상태다.

## Scene2 현재 구현 상태

### DOM

`_layouts/home.html`의 `section#UprisingRocket` 안에는 아래가 이미 반영되어 있다.

- Scene2 전용 `.pin-bg.scene2-shell`
- 태양 디스크
- 구름 레이어
- 로켓 스택
- Scene2 copy 블록

즉 Scene2는 더 이상 "빈 section"이 아니다.

### CSS

`assets/css/scenes.css`에는 Scene2 전용 정적 레이아웃이 이미 있다.

현재 포함된 것:

- Scene2 배경 gradient
- 구름 레이어 위치 / z-index
- 로켓 위치 / 크기
- Scene2 copy 위치
- title / eyebrow / description / flow panel 스타일
- 최종 responsive breakpoint 규칙

### JS

- `assets/js/scenes.mjs`의 `class UprisingRocket`이 `_onAnimate(tl)`을 구현했다. DOM의 현재 pose를 `capturePose()`로 잡고, 로켓 시작/중간/끝 벡터, 구름 레이어 패럴랙스, 카피/패널 페이드 타이밍을 역진행 `tl.progress(1 - self.progress)` 규칙에 맞춰 배치했다.
- 로켓 불꽃(`.scene2-shell__rocket-flame-inner`)은 mid pose 캡처는 없이 기본값으로 세팅하고, 초반 boost + 후반 감소 2구간으로 나눈다.
- ScrollTrigger는 Scene 베이스 클래스 설정을 그대로 따르므로 `markers: true`, `pinSpacing: false`, `scrub: 1` 상태다. 프로덕션 릴리스 시에는 markers를 꺼야 한다.
- 코드에는 여전히 `scene2-shell__image--deck-soft`용 세팅이 남아있지만 DOM에는 해당 레이어가 없다. 재사용 계획이 없다면 JS/CSS 훅을 정리해도 된다.

즉 현재 상태는:

- 정적 레이아웃: 구현 완료
- 애니메이션: 구현 완료(추가 QA·정리 완료)
- 최종 responsive polish: 완료

### i18n

Scene2는 더 이상 하드코딩 텍스트 상태가 아니다.
`assets/js/lang-ko.mjs`, `assets/js/lang-en.mjs`에 Scene2 관련 번역 키가 이미 추가되어 있다.

현재 키 범위:

- Scene2 kicker
- Scene2 title 2줄
- Scene2 description 2줄
- flow 카드 라벨
- flow 카드 항목

## Scene2 레이어 의미 정리

프로토타입 기준 이름과, 현재 실제 배치 의미가 완전히 같지는 않다.
현재는 아래 의미로 읽는 것이 맞다.

### far

- 가장 멀리 있는 하단 구름층
- `deck` 뒤에 있는 배경용 depth 레이어

### deck

- 하단 cloud bed의 뒤쪽 레이어
- 하단 구름층에 입체감을 주는 용도

### foreground

- 예전 프로토타입의 `mid`에 가까운 자산이지만, 현재 역할은 "전경 하단 구름층"이다
- 하단에 짙고 불투명하게 깔린 cloud bed를 암시한다

### frame

- 예전 프로토타입의 `front`에 가까운 자산이지만, 현재 역할은 "화면 테두리 프레이밍"이다
- U자 형태로 화면 가장자리를 감싼다
- 우상단은 열려 있어서 로켓의 진행 방향과 상승성을 암시한다

### mist

- 가장 전경의 투명한 안개층
- 화면 하단 중간을 넓게 덮는 보조 레이어

### 제거된 레이어

- `deck-soft`는 실제 레이아웃 검수 과정에서 제거됐다
- 이유는 하단 구름층 표현에서 오히려 직선적인 어색함을 만들거나 레이어 역할이 중복됐기 때문이다

## Scene2 카피 구조 정리

Scene2 카피도 초기 상태와 달라졌다.

현재 기준 구조는 다음과 같다.

- 큰 좌측 그라데이션은 Scene1과 같은 역할의 백플레이트다
- 제목은 패널 안이 아니라 `title-lockup`으로 분리되어 있다
- eyebrow + description도 표 밖에 있다
- flow 비교표만 별도 패널 안에 있다

즉 Scene2도 이제 Scene1과 같은 원칙으로 읽으면 된다:

- title / text는 독립 카피
- panel은 비교 카드
- gradient는 카드가 아니라 배경성 보조 장치

## 프로토타입 파일의 현재 위치

`resource-generation/scene2-scroll-prototype-baseline-visible.html`은 여전히 중요한 참고 파일이다.
하지만 이 파일은 계속 아래 의미로만 취급해야 한다.

- 깜빡임 원인 분리용
- Three.js 제거된 최소 baseline
- 레이어와 progress 공식을 참고하기 위한 프로토타입

즉 현재는 "실제 소스"가 아니라 "애니메이션 설계 참고용"이다.

프로토타입의 한계는 여전히 같다.

- standalone HTML이다
- GSAP / ScrollTrigger를 CDN으로 직접 불러온다
- debug UI가 포함돼 있다
- 현재 프로젝트의 `Scene` 추상 클래스 구조를 따르지 않는다
- 실제 프로젝트는 진행도 반전 로직을 쓴다

## 앞으로 할 일

이제 남은 일은 아래 2단계, 3단계가 핵심이다.

### 2단계. Scene2 애니메이션 구현 — 완료

- 2026-04-05에 `assets/js/scenes.mjs`의 `UprisingRocket._onAnimate(tl)`을 작성해 정적 pose → 상승 → 페이드 아웃 타임라인을 연결했다.
- 로켓은 Scene2 DOM에 맞춰 계산한 `rocketVector`(뷰포트 대비 0.9 x / -0.28 y)로 이동하며, 시작과 끝 scale/rotation을 따로 잡았다.
- `capturePose()`로 `far / deck / foreground / frame / mist / sun` mid pose를 읽어 들인 뒤, 패럴랙스를 `start/mid/end` 구간으로 나눠 `power2` easing으로 움직인다.
- 카피/패널은 Scene1과 동일하게 eyebrow → title → description → panel → flow 순으로 stagger 등장 후 0.84~0.88 구간에서 동시에 빠진다.
- 남아 있는 자잘한 개선거리: 불꽃 mid pose가 기본값 기반이라 실제 DOM을 캡처하지 않고 있고, deck-soft 레이어 훅이 코드에만 남아 있다. 필요 시 정리할 것.

### 3단계. 최종 responsive 정리 — 완료

- 2026-04-05 기준으로 Scene2 breakpoint 규칙을 재정리하고, 모바일~데스크톱 구간에서 카피/로켓/레이어 충돌 여부를 검수했다.
- Scene1↔Scene2 전환 지점에서 pin shell 간 여백과 z-index 충돌을 확인해 문제 없음을 검증했다.
- 잔여 과제는 ScrollTrigger marker 제거, deck-soft 잔존 코드 정리, 불꽃 pose 캡처 같은 미세 정돈뿐이다. Scene2 시퀀스 자체는 반응형까지 포함해 완료된 상태다.

## 계속 유지해야 할 규칙

### 1. 프로토타입 HTML 전체를 그대로 복붙하지 않는다

실제 프로젝트는 이미 아래 구조를 갖고 있다.

- `_layouts/home.html`이 씬 DOM을 만듦
- `assets/css/scenes.css`가 씬 레이아웃을 잡음
- `assets/js/scenes.mjs`가 애니메이션을 제어함
- `lang-*.mjs`와 `lang-toggle.mjs`가 텍스트를 관리함

따라서 Scene2는 계속 "DOM / CSS / JS / i18n / 자산 경로"로 분해해서 관리해야 한다.

### 2. `resource-generation/`는 참고 폴더이지 운영 폴더가 아니다

현재 운영 경로 정리는 끝났지만, 그렇다고 `resource-generation/`를 직접 서비스 자산처럼 취급하면 안 된다.

이 폴더의 역할은 아래다.

- 원본 작업물 보관
- 컨셉아트 / 프로토타입 참조
- 인계 문서 보관

### 3. 진행도 방향을 반드시 재해석해야 한다

실제 홈페이지는 공통 Scene 엔진에서 `tl.progress(1 - self.progress)`를 사용한다.
Scene2 motion 구현 시 이 점을 계속 잊지 말아야 한다.

### 4. Scene1 구조를 통째로 복제하지 않는다

Scene1은 `#main-bg`, 바다, 산, 잔디, footer까지 포함한 대형 세계다.
Scene2는 독립적인 하늘 + 구름 + 로켓 + copy 무대로 유지하는 것이 맞다.

## 현재 기준 가장 중요한 사실

이 문서를 읽는 다음 작업자는 아래 6가지만 기억하면 된다.

1. Scene2 자산 생성은 사실상 끝났고, 운영 자산 경로 동기화도 끝났다.
2. Scene2 정적 레이아웃은 실제 홈페이지에 이미 붙어 있다.
3. Scene2 텍스트도 이미 `data-lang` 체계에 들어가 있다.
4. `UprisingRocket` 애니메이션이 `assets/js/scenes.mjs` 기준으로 구현되어 있으며, Scene1과 동일한 copy 순서/연출 규칙을 따른다.
5. 현재 확정된 레이어 의미는 `far / deck / foreground / frame / mist`다.
6. Scene2 responsive polish까지 끝났으므로, 다음 주요 작업은 Scene3 설계/구현이며 Scene2 쪽은 deck-soft 잔존 코드나 ScrollTrigger marker 같은 미세 정돈만 남았다.

## 마지막 메모

2026-04-05 기준 현재 상태는 Scene2 애니메이션 + responsive 정리를 끝내고 Scene3으로 넘어갈 준비가 된 시점이다.
Scene2 관련 후속 조치는 미세 정돈(ScrollTrigger markers 제거, deck-soft 잔존 코드/불꽃 pose 캡처 등)뿐이며, 다음 주요 단계는 Scene3 설계와 구현이다.

이 문서는 그 기준을 빠르게 공유하기 위한 최신 인계 문서다.
