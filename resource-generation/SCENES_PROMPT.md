# Scene3 구현 및 코드베이스 통합 브리프 (Codex 전달용)

## 0. 문서 역할
이 문서는 **byeol 홈페이지 Scrollytelling의 Scene3**를 현재 저장소 구조에 맞춰 바로 구현하기 위한 최종 브리프다.

기존의 무드 설명만이 아니라 다음을 함께 다룬다.

- 장면의 스토리와 감정선
- 실제 코드베이스 확인 결과
- 현재 존재하는 자산의 source of truth
- 이미지로 하지 말아야 하는 것
- 레이어 분리, depth, 성능, 반응형 규칙
- 실제로 어느 파일을 어떻게 손대야 하는지에 대한 구현 계획

이 문서를 기준으로 Scene3는 아래를 동시에 만족해야 한다.

- Scene3 기능 메시지: **스크립트처럼 가볍게, 오류는 먼저**
- 장면 역할: **지구를 떠난 뒤 우주를 항해하며 소행성 벨트를 통과하는 구간**
- 핵심 감정: **빠르고 가볍게 전진하지만, 위험은 미리 읽고 피하는 지적인 긴장감**
- 핵심 시각 은유: **충돌 후 실패가 아니라, 충돌 전 경고와 회피**
- 구현 원칙: **우주 포스터 한 장**이 아니라 **배경 / 성운 / 로켓 / 소행성 / 파티클 / UI를 분리 합성**
- 기술 원칙: Scene3는 **Three.js 비중이 가장 큰 씬**이며, 형태가 필요한 자산만 이미지로 쓰고, 동적 공간감과 파티클은 코드로 만든다.

---

## 1. 현재 코드베이스 확인 결과
Scene3 구현 전에 확인된 현재 저장소 상태는 다음과 같다.

- 홈 스크롤 섹션은 현재 `section#UprisingRocket`와 `section#TakeOff`만 있다.
- `assets/js/scenes.mjs`에는 `TakeOff`, `UprisingRocket`만 등록돼 있다.
- 홈은 init 시 하단으로 점프하므로, 사용자는 현재 **DOM 마지막 섹션부터 먼저 본다**.
- 지금의 UX를 유지한다면 Scene3는 DOM상 `#UprisingRocket`보다 **위쪽**에 배치해야 Scene2 다음 구간으로 체감된다.
- GSAP, ScrollTrigger, Three.js는 홈에서 이미 로드되고 있다. Scene3는 별도 프레임워크를 추가하는 작업이 아니라, **기존 런타임 위에 레이어를 더하는 작업**이다.
- Scene3 자산은 대부분 이미 `assets/images/scenes`에 존재한다. 새로 생성해야 하는 필수 이미지는 없다.
- 기존 문서의 `scene3-nebula-band-diagonal.png` 표기와 달리, 현재 저장소에 실제로 있는 파일명은 `scene3-nebular-band-diagonal.png`다. **현 저장소 기준 source of truth는 실제 파일명**이다. 구현 중 이름을 정리할 수는 있지만, 그 경우 문서/마크업/파일명을 함께 맞춘다.

이 문서의 Scene3 지침은 위 현재 구조를 기준으로 작성한다.

---

## 2. Scene3 한 줄 요약
로켓이 지구를 뒤로 하고 깊은 우주로 진입한다. 전방에는 소행성 벨트가 나타나고, 로켓은 민첩하게 진로를 조정하며 위험을 피한다. 특정 장애물에는 **충돌 전 경고**가 먼저 나타나고, 우측에는 코드/오류 카드가 함께 떠서 **실행 전 감지** 메시지를 강화한다. 이후 벨트를 통과하면 새로운 행성이 전방에 커지며 Scene4 프리뷰로 이어진다.

주의:

- 여기서 구현하는 것은 **Scene4 전체가 아니다**.
- Scene3 마지막에 **전방 행성 프리뷰**만 넣는다.

---

## 3. Mood / Atmosphere Rules

### 기본 분위기
- Scene2보다 더 차갑고 더 높은 고도의 느낌
- 하지만 너무 공포스럽거나 무겁게 가지 않음
- **정교하고 지적인 우주 항법**의 느낌이 중요

### 금지 방향
- 우주 포스터 한 장처럼 완결된 일러스트 느낌
- 과도한 SF HUD 세계관 이미지
- 지나치게 현실적인 NASA 시뮬레이션 풍
- 소행성 장면이 공포/재난 영화처럼 과하게 어두워지는 방향
- 경고 UI가 군용 인터페이스처럼 과해지는 방향

### 지향 방향
- 깊은 우주 + 성운 + 별빛은 **넓고 시원한 공간감**
- 소행성 통과는 **속도감과 긴장감**
- 오류 감지는 **기계적 HUD**보다 **제품 UI 카드 + 경고 마커**로 명확히 읽힘
- Scene2의 추진 감각이 Scene3에서 끊기지 않고 **우주 항해의 관성**으로 이어져야 함

---

## 4. Scene3 메인 스토리 / Animation Flow

### Scene2 → Scene3 전환
- Scene2 끝에서 카메라가 와이드하게 열리며 아래쪽 또는 후방에 지구가 보이기 시작한다.
- 구름/대기권의 밝은 톤에서 딥스페이스의 어두운 톤으로 자연스럽게 넘어간다.
- Scene2의 상승 추진력이 끊기지 않은 채, Scene3에서 "우주 항해"로 해석이 전환되어야 한다.

### Scene3 메인 흐름 (권장 progress 구간)
이 퍼센트는 실제 구현용 기준치다. 수치 미세조정은 가능하되, 서사는 유지한다.

#### 0% ~ 15%
- Scene2 → Scene3 전환 완료
- 카메라가 와이드하게 열림
- 하단 또는 후방에 지구가 보임
- 성운/별 레이어가 서서히 드러남
- 로켓은 이미 진행 중인 상태로 시작

#### 15% ~ 35%
- 딥스페이스 안정화 구간
- 배경 성운, 원경 별, 중경 별의 패럴랙스 차이 정착
- 지구는 천천히 뒤로 멀어짐
- 로켓은 후방-사선 구도 유지

#### 35% ~ 70%
- 소행성 벨트 접근 및 통과 메인 구간
- 전방 공간 전체에 이미 펼쳐진 `small` asteroid field가 기본 환경을 이룸
- `small`은 화면 전역에 다수 분포하며, 원경 배경처럼 거의 정지에 가깝게 유지되다가 진행에 따라 아주 약하게 카메라 방향 / 방사 방향으로 drift
- `large`는 소수만 카메라 근처로 스치는 flyby 이벤트로 동작
- `medium`은 `large` route 모델이 안정화된 뒤 같은 문법의 중간 거리 레이어로 추가
- 로켓은 미세하게 좌우/상하 궤적을 바꿔 회피
- 특정 위험 소행성 근처에서 경고 마커가 먼저 등장

#### 45% ~ 65%
- 코드 카드와 오류 카드가 강조되는 구간
- 경고 마커와 시각적으로 연결되도록 timing을 맞춤
- 메시지 포인트: "실행 후 실패"가 아니라 "실행 전 감지"

#### 70% ~ 85%
- 벨트 이탈 구간
- 소행성 밀도 감소
- 파티클 수와 속도감도 조금 줄어듦
- 카메라 시선이 다시 전방으로 집중됨

#### 85% ~ 100%
- Scene4 프리뷰 전환
- 전방에 새로운 행성이 커지기 시작
- 로켓 진행 방향을 따라 카메라가 앞으로 당겨짐
- Scene4 전체를 구현하지는 않고, **Scene4의 색과 방향성만 예고**

---

## 5. Reference Art / Files

### 무드/장면 레퍼런스
- `resource-generation/scene3_컨셉아트.png`
  - Scene3 전체 톤과 우주 항해 무드의 1순위 레퍼런스
- `resource-generation/scene2_컨셉아트.png`
  - Scene2 → Scene3 전환 톤 참고
- `resource-generation/scene2-background-concept-art.png`
  - Scene2 말미에서 Scene3로 넘어올 때 색 전환 참고
- `resource-generation/scene4_컨셉아트.png`
  - Scene3 마지막에서 Scene4 프리뷰 연결 시 전방 행성 톤 참고

### 실제 구현 스타일 기준
- `assets/images/scenes/rocket.png`
- `assets/images/scenes/rocket-fire.png`
- `assets/images/scenes/scene2-rocket.png`
- `assets/images/scenes/scene2-rocket-fire.png`
- `resource-generation/scene2-background-concept-art.png`

주의:

- Scene3는 **Scene3 컨셉아트의 화풍을 통째로 복제**하는 작업이 아니다.
- 목표는 **실제 Scene1 / Scene2 구현 자산 문법을 우주 장면으로 확장**하는 것이다.
- 로켓은 끝까지 **2.5D 스프라이트 계열**로 유지한다.

---

## 6. Asset Policy (중요)
Scene3는 형태가 필요한 것만 이미지로 쓰고, 동적인 공간감은 코드로 만든다.

### 유지
- large asteroid 이미지
- medium asteroid 이미지
- small asteroid single 이미지
- deep space backdrop 이미지
- nebula band 이미지
- rocket rear-oblique 이미지
- earth fallback 이미지

### 이미지 생성 중단 / 코드 처리 전환
- `small-cluster-01.png`, `small-cluster-02.png`
  - **생성 중단**
  - **small single 3~5개를 GSAP 배치로 군집 구성**
- `foreground-blur-01.png`, `foreground-blur-02.png`
  - **생성 중단**
  - **existing small single sprite + GSAP/CSS blur/afterimage 처리**
- `space-dust-particle-atlas.png`
  - **생성 중단**
  - **Three.js procedural particles로 구현**

이 결정은 Scene3 원칙과 맞는다. Scene3의 별/우주먼지/파티클은 원래도 **Three.js 또는 2.5D 파티클**로 처리 가능한 영역이며, Scene3는 Three.js 비중이 가장 높은 씬이다.

---

## 7. Final Asset List (현재 저장소 기준 source of truth)

### A. 실제 사용 이미지 자산

#### 배경 / 환경
- `assets/images/scenes/scene3-space-backdrop-deep.png`
  - 깊은 우주 기본 배경
  - very far background
- `assets/images/scenes/scene3-nebular-band-diagonal.png`
  - 성운 띠 / 방향성 있는 공간감
  - backdrop 위 중첩 레이어
  - 현재 저장소 기준 실제 파일명
- `assets/images/scenes/scene3-earth-horizon-fallback.png`
  - fallback 전용
  - 기본 우선순위는 **Three.js sphere 지구**

#### 주인공
- `assets/images/scenes/scene3-rocket-rear-oblique.png`
  - 후방-사선 구도의 Scene3 전용 로켓
  - Scene1/2 계열 디자인 유지

#### 장애물 - large
- `assets/images/scenes/scene3-asteroid-large-01.png`
- `assets/images/scenes/scene3-asteroid-large-02.png`

#### 장애물 - medium
- `assets/images/scenes/scene3-asteroid-medium-01.png`
- `assets/images/scenes/scene3-asteroid-medium-02.png`

#### 장애물 - small singles
- `assets/images/scenes/scene3-asteroid-small-01.png`
- `assets/images/scenes/scene3-asteroid-small-02.png`
- `assets/images/scenes/scene3-asteroid-small-03.png`
- `assets/images/scenes/scene3-asteroid-small-04.png`
- `assets/images/scenes/scene3-asteroid-small-05.png`

용도:

- 개별 small obstacle
- 여러 개를 GSAP 배치로 묶어 pseudo-cluster 구성
- foreground blur의 원본 소스 재사용

### B. 사용하지 않는 이미지 자산
- foreground blur 전용 신규 이미지
- particle atlas
- 완성형 small-cluster 이미지

### C. 코드로 구현할 것
- far stars
- mid stars
- space dust / tiny particles
- short streak particles
- warning marker
- code card / error card / title / description / black gradient backplate
- foreground blur asteroid afterimage effect
- far preview planet glow

---

## 8. Repository Implementation Plan
이 문서에서 새로 추가된 가장 중요한 내용은 이 섹션이다. Scene3는 아래 파일 단위로 나눠 구현한다.

### 8.1 반드시 수정할 파일
- `_layouts/home.html`
  - Scene3 섹션 마크업 추가
  - 현재 UX를 유지한다면 `section#UprisingRocket`보다 위에 배치
- `assets/css/scenes.css`
  - `.scene3-shell` 및 하위 레이어 스타일 추가
  - 반응형 규칙 추가
- `assets/js/scenes.mjs`
  - `class AsteroidBelt extends Scene` 추가
  - ScrollTrigger / GSAP timeline 연결
  - `Scener`에 Scene3 등록
- `assets/js/lang-ko.mjs`
  - Scene3 한국어 텍스트 추가
- `assets/js/lang-en.mjs`
  - Scene3 영어 텍스트 추가

### 8.2 권장 분리 파일
- `assets/js/scene3-space-field.mjs`
  - Three.js renderer
  - earth sphere
  - asteroid sprite depth layers
  - far dust
  - mid particles
  - short streaks
  - preview target planet
  - WebGL fallback 처리

설명:

- Scene3는 Three.js 비중이 커서, `scenes.mjs` 하나에 전부 몰아 넣으면 읽기 어려워질 가능성이 높다.
- 따라서 **Three.js 전용 로직은 별도 파일로 분리하고**, `scenes.mjs`는 DOM/GSAP orchestration에 집중하는 구성이 권장된다.
- 다만 저장소를 간단히 유지하고 싶다면 helper class를 `scenes.mjs` 내부에 둬도 된다.

### 8.3 권장 클래스 / 섹션 명
- Scene class: `AsteroidBelt`
- section id: `AsteroidBelt`
- shell root class: `scene3-shell`

### 8.4 Scene 높이 권장값
- 초기값은 `super(14)` 또는 `super(15)` 권장
- 첫 구현은 `super(14)`로 시작하고, 리듬이 짧으면 15로 늘린다

### 8.5 중요한 구조 메모
- `Scener.scenes` 배열은 반드시 Scene3를 포함해야 한다.
- 하지만 현재 홈페이지는 init 시 하단으로 점프하므로, **사용자 체감 순서는 DOM 배치의 영향이 더 크다**.
- 즉, Scene3를 어디에 추가할지 결정할 때는 `scenes` 배열보다 **홈 마크업 내 section 위치**를 먼저 생각한다.

---

## 9. Scene3 DOM Skeleton (권장)
구현 시 대략 아래 구조를 권장한다.

```html
<section id="AsteroidBelt" class="scene">
  <div class="pin-bg scene3-shell">
    <div class="scene3-shell__bg" aria-hidden="true"></div>

    <div class="scene3-shell__layer scene3-shell__layer--backdrop" aria-hidden="true">
      <img class="scene3-shell__image scene3-shell__image--backdrop" src="assets/images/scenes/scene3-space-backdrop-deep.png" alt="" />
    </div>

    <div class="scene3-shell__layer scene3-shell__layer--nebula" aria-hidden="true">
      <img class="scene3-shell__image scene3-shell__image--nebula" src="assets/images/scenes/scene3-nebular-band-diagonal.png" alt="" />
    </div>

    <div class="scene3-shell__three" aria-hidden="true"></div>
    <div class="scene3-shell__earth-fallback" aria-hidden="true"></div>

    <div class="scene3-shell__rocket" aria-hidden="true"></div>

    <div class="scene3-shell__warnings" aria-hidden="true"></div>

    <article id="scene3-copy" class="scene3-copy">
      <!-- title / desc / code card / error card / gradient backplate -->
    </article>
  </div>
</section>
```

설명:

- 로켓은 WebGL로 옮기지 않는다.
- 소행성은 mesh가 아니라 **텍스처 sprite**를 쓰되, 주 연출은 **Three.js 공간에서 처리**한다.
- DOM asteroid 레이어는 fallback 또는 legacy 보조 수단일 뿐, 주 연출 경로로 삼지 않는다.
- Three.js 레이어에는 **earth + asteroid sprites + stars + dust + streaks + preview planet**를 둔다.
- 텍스트 카드와 warning marker는 DOM 위계에서 가장 위에 둔다.

---

## 10. Layer Ownership Table

### Image + GSAP
- deep space backdrop
- nebula band
- rocket rear-oblique sprite

### Three.js
- earth sphere (main)
- asteroid sprites
  - small depth field
  - large flyby
  - medium layer (추가 예정)
- far space particles
- mid particles
- short streak particles
- optional near-depth floating specks
- preview target planet

### DOM + GSAP
- title
- description
- code card
- error card
- black gradient backplate
- warning markers

### GSAP/CSS post effect
- foreground blur asteroid
  - 필요 시에만 보조적으로 사용
  - 현재 우선순위는 아님

---

## 11. Depth Bands / Render Order
권장 depth band:

1. far background color / gradient base
2. deep space backdrop image
3. far nebula band
4. far star / dust particles
5. small asteroid far field
6. earth sphere / preview target planet
7. rocket sprite
8. medium asteroid layer
9. large asteroid flyby layer
10. foreground blur asteroid layers (optional)
11. warning marker layer
12. text + code card + error card + gradient backplate

주의:

- foreground blur asteroid는 UI보다 아래, 일반 asteroid보다 위
- warning marker는 asteroid와 시각적으로 연결되지만, 시독성을 위해 asteroid보다 위
- code/error cards는 항상 최상단 정보 계층
- Scene3는 모든 레이어를 하나의 합성 이미지처럼 보이게 만들어야 하지만, 실제 구현은 분리되어 있어야 한다

---

## 12. Three.js Particle Design
이번 작업에서는 particle atlas 이미지를 쓰지 않는다.

### 렌더러 정책
- 투명 배경의 Three.js renderer를 `scene3-shell__three`에 올린다
- Scene3에서는 **지구와 파티클만 WebGL 담당**
- 카메라는 공간감이 필요한 만큼 perspective 성격이 있는 구성이 더 자연스럽다
- 로켓과 UI는 DOM으로 유지한다

### Far dust
- `THREE.Points`
- 매우 작은 점
- 수량 많음
- opacity 낮음
- 매우 천천히 이동

### Mid particles
- `THREE.Points` 또는 small billboards
- far dust보다 조금 밝음
- twinkle 약간 허용

### Short streak particles
- 소량
- 진행 방향에 맞는 짧은 streak 느낌
- 이미지 자산이 아니라 코드로 방향/속도 기반 처리

### 추천 수치
- far dust: 400 ~ 800
- mid particles: 120 ~ 250
- short streaks: 20 ~ 40

### 모바일 하향 규칙
- far dust: 220 ~ 420
- mid particles: 60 ~ 140
- short streaks: 8 ~ 18

### Fallback 정책
- WebGL이 비활성화되거나 초기화에 실패하면 `scene3-earth-horizon-fallback.png`를 보여준다
- fallback 시에도 Scene3는 망가지면 안 된다
- fallback에서는 streak 수를 줄이거나 제거하고, 별은 CSS/DOM 레벨의 가벼운 처리로 축소 가능

### 구현 인터페이스 권장
Three.js 전용 helper는 아래 메서드를 갖는 구성이 권장된다.

- `setProgress(progress)`
- `resize(width, height)`
- `destroy()`

---

## 13. Asteroid / Rocket Motion Plan

### Rocket
- 후방-사선 구도를 유지한다
- Scene2의 강한 상승에서 Scene3의 빠른 순항으로 해석이 바뀌어야 한다
- 벨트 구간에서는 크게 흔들지 말고, **작고 영리한 회피** 느낌으로만 움직인다
- 회피 동작은 35% ~ 70% 구간에 집중한다

### Small Asteroid Field
- `small`은 Scene3 전방 공간 전체를 채우는 원경/배경 레이어다
- 수량이 많아야 하고, opacity는 항상 1이다
- 화면 중심에 가까운 `small`일수록 더 작게 읽히는 편이 자연스럽다
- 진행 시에는 타겟 행성의 화면상 위치를 기준으로 바깥쪽으로 방사형 drift가 있어야 한다
- 중요한 점은 "제자리 scale-up"이 아니라 "이미 공간에 떠 있는 필드가 아주 약하게 스쳐 지나가는 것"처럼 보여야 한다

### Large Asteroids
- `large`는 소수만 존재하는 근경 flyby 레이어다
- `large`는 행성 중심에서 발사되면 안 된다
- `large`의 경로는 `행성 world 좌표 -> 카메라 기준 주변부 목표점`을 잇는 **하나의 3D 직선**이어야 한다
- 애니메이션은 scale 보정이 아니라 **직선 translate**만으로 처리한다
- 커져 보이는 것은 원근 때문이다. scale을 직접 키우는 방식으로 풀지 않는다
- opacity는 항상 1이다
- 현재 남은 핵심 과제는 `large`가 행성을 뚫고 지나가지 않도록 route 시작점/목표점 분포를 다듬는 것이다

### Medium Asteroids
- `medium`은 `large`와 같은 경로 문법을 쓰되, 더 먼 시작점 / 더 느린 속도 / 더 작은 체감 크기로 구현한다
- `large` route 모델이 안정화된 뒤 그 중간값으로 추가한다

### Foreground Blur Asteroid
- 현재 우선순위는 낮다
- 필요해도 large/medium의 주 연출을 대체하면 안 된다

### Warning Marker
- 실제 충돌보다 먼저 등장해야 한다
- 이상적 타이밍은 asteroid closest-pass보다 약간 앞선 시점이다
- marker는 HUD처럼 무겁지 않게, 제품 UI의 경고 배지 또는 라이트 링에 가깝게 처리한다

---

## 14. Copy / UI Card Content
Scene3는 **실행 전 감지**를 직관적으로 보여줘야 한다.

### Title
스크립트처럼 가볍게, 오류는 먼저

### Description
가볍게 시작할 수 있는 스크립트 언어이지만,
실수는 실행 전에 최대한 먼저 잡아내도록.
빠른 실험과 정적 검사를 함께 노립니다.

### Example Code
```byeol
let hp: int = "low"
print(move(player, hp))
```

### Error Markers
- type mismatch: `int` expected, got `string`
- invalid call or incompatible argument in `move(...)`

### UI 방향
- Scene2의 copy block과 완전히 다른 시스템을 만들 필요는 없다
- Scene2의 제목/설명/article 구조를 참고하되, Scene3는 **code card + error card + warning marker** 중심으로 재구성한다
- 검정 → 투명 gradient backplate를 깔아 정보 계층을 분명히 한다

### 메시지 포인트
- 실행 후 실패가 아니라 실행 전 감지
- 우주 장면에서는 충돌 전 경고 UI와 시각적으로 대응

---

## 15. Translation Key Plan
Scene3는 다국어 사이트이므로 텍스트 키도 함께 추가해야 한다.

권장 키:

- `scene3-kicker`
- `scene3-title-line1`
- `scene3-title-line2`
- `scene3-desc-line1-prefix`
- `scene3-desc-line1-em`
- `scene3-desc-line1-rest`
- `scene3-desc-line2-prefix`
- `scene3-desc-line2-em`
- `scene3-desc-line2-rest`
- `scene3-code-label`
- `scene3-error-label`
- `scene3-error-line1`
- `scene3-error-line2`

원칙:

- 코드 예시는 언어 중립성이 높으므로 양쪽 언어에서 동일해도 된다
- 기술 용어는 영어를 일부 유지해도 되지만, 문장 구조는 각 언어에 맞게 자연스럽게 조정한다
- Scene2와 비슷한 naming pattern을 유지해 구현 비용을 낮춘다

---

## 16. Responsive Rules

### Desktop
- 텍스트/UI는 우측 상단 또는 우측 중앙
- 코드 카드와 오류 카드는 세로 배치
- 로켓 진행 방향과 반대편에 정보 카드 배치
- 카드가 너무 오른쪽으로 붙어 브라우저 가장자리에서 답답해 보이지 않게 한다

### Tablet
- 카드 폭 축소
- 카드 수를 줄이지는 않되 간격 압축
- asteroid 수량과 blur 강도 약간 감소

### Mobile
- 카드 2장을 동시에 크게 띄우기 어렵다면, 핵심 타이틀 + 짧은 오류 카드 중심으로 축소
- 별/파티클 수량 감소
- asteroid 수량과 blur 강도 감소
- 로켓과 카드가 서로 겹쳐 읽기 어려워지지 않게 한다

---

## 17. Performance Budget
Codex가 과하게 구현하지 않도록 권장 예산을 둔다.

### Particles
- far dust: 400 ~ 800
- mid particles: 120 ~ 250
- short streaks: 20 ~ 40

### Asteroids
- large active count: 2 ~ 4
- medium active count: 4 ~ 8
- small active count: 160 ~ 260

### Notes
- 모바일에서는 모든 수량 하향
- drawcall / transparency / blur filter 비용 주의
- foreground blur asteroid는 동시에 1~2개 정도면 충분
- Scene3는 Three.js 비중이 크지만, DOM 레이어까지 무겁기 때문에 **각 계층을 동시에 과도하게 늘리지 않는다**

---

## 18. What Not To Generate As Images
아래는 이미지 생성 대상이 아니다.

- 경고 마커
- 코드 카드 / 오류 카드 / 타이틀 / 설명
- 검정 → 투명 그라데이션 백플레이트
- particle atlas
- foreground blur 전용 신규 이미지
- small-cluster 완성 이미지
- Scene4 전체 프리뷰 일러스트

---

## 19. Acceptance Checklist
최종 구현은 아래를 만족해야 한다.

- Scene3가 한 장의 포스터 이미지처럼 구현되지 않는다
- 배경 / 성운 / 로켓 / 소행성 / 파티클 / UI가 분리된 상태로 합성된다
- 지구가 초반에 보이고, 중반엔 소행성 벨트가 주도하며, 후반엔 전방 행성 프리뷰가 등장한다
- warning marker가 실제 위험보다 먼저 보인다
- code/error card가 경고 타이밍과 연결되어 읽힌다
- `small` asteroid field가 화면 전역의 원경 환경으로 읽힌다
- `large` asteroid는 scale 애니메이션 없이 3D 직선 translate로 카메라 근처를 스친다
- asteroid opacity fade-in/fade-out에 의존하지 않는다
- particle atlas 없이도 공간감이 성립한다
- 모바일에서 밀도와 이펙트가 적절히 줄어든다
- WebGL fallback에서도 레이아웃이 깨지지 않는다

---

## 20. 최종 요약
Scene3는 **지구를 떠난 로켓이 우주를 항해하며 소행성 벨트를 통과하는 구간**이고, **빠르고 가볍지만 위험은 미리 감지하는 지적인 긴장감**을 보여줘야 한다.

이 문서의 핵심 실무 결정은 아래 다섯 줄이다.

- Scene3는 현재 저장소 기준으로 **새 섹션 + 새 GSAP 타임라인 + 새 Three.js 레이어**를 추가하는 작업이다
- 소행성의 주 연출은 DOM/GSAP가 아니라 **Three.js sprite depth field / flyby route**로 처리한다
- `foreground-blur asteroid`는 필요 시에만 보조 연출로 사용한다
- `space dust / particle atlas`는 이미지 생성 포기, **Three.js procedural particles**
- 현재 UX를 유지한다면 Scene3는 홈 마크업에서 **`#UprisingRocket`보다 위에 둔다**

이 문서를 기준으로 구현할 때의 기본 전략은 다음처럼 고정한다.

- **형태가 필요한 것만 이미지**
  - rocket
  - deep backdrop
  - nebula band
  - large / medium / small asteroid singles
- **동적 공간감은 Three.js**
  - earth
  - asteroid depth layers
  - stars
  - space dust
  - tiny particles
  - short streaks
- **정보 표현은 DOM + GSAP**
  - title
  - description
  - code card
  - error card
  - warning marker
- **foreground blur / cluster는 새 이미지 생성 대신 기존 sprite 재사용 + 코드 처리**

이 문서는 이후 Scene3 구현의 source of truth로 사용한다.

---

## 21. 2026-04-10 작업 기록 / 재개 메모

### 오늘 확인한 상태
- `resource-generation/`은 Scene1~4 전체 기획/자산 폴더이고, 현재 코드베이스에서는 **Scene3 draft 구현이 이미 들어간 상태**다.
- 최근 커밋 흐름은 아래 순서다.
  - `8fd19d2d` `chore: scene3: add resoures`
  - `9f4d1625` `feat(home): scene3: initial layout`
- 즉, Scene3는 여러 차례 버그픽스가 누적된 형태가 아니라, **자산 추가 후 초기 draft 구현이 크게 한 번 들어간 상태**로 봐야 한다.

### 오늘 실제로 수정한 것
- `assets/js/scenes.mjs`
  - `addFlight(element, config)` 호출 버그 수정
  - 첫 소행성 배열이 `forEach(addFlight)`로 호출돼 `config` 자리에 index가 들어가던 문제 수정
  - 방어 코드 추가: `config.start / mid / end`가 없으면 early return
- `assets/js/scenes.mjs`
  - `settleBootScroll()` 관련 부트 로직 제거
  - 원인: 추가 `ScrollTrigger.refresh()` 호출이 pin swap과 충돌하면서 아래 예외를 만들었음
  - 예외:
    - `Failed to execute 'insertBefore' on 'Node'`
    - stack에 `ScrollTrigger._swapPinOut`, `settleBootScroll` 표시
  - 조치: Scene3 이전의 안정적인 부트 시퀀스로 되돌림
- `assets/js/scene3-space-field.mjs`
  - Scene3 후반 프리뷰 행성을 **DOM gradient 원형** 대신 **Three.js procedural 3D planet**로 바꾸기 시작
  - sphere geometry + emissive material + atmosphere shell 추가
  - progress에 따라 멀리서 작게 보이다가 점점 커지며 가까워지는 구조로 변경 시도
- `assets/js/scenes.mjs`
  - 기존 DOM planet GSAP 애니메이션 제거
- `assets/css/scenes.css`
  - 정상 WebGL 경로에서는 DOM planet를 숨기고, fallback일 때만 보이도록 변경

### 오늘 사용자 피드백으로 확정된 방향
- Scene3의 샷 문법이 현재 잘못되어 있다.
- 스토리보드 기준 Scene3는 아래처럼 보여야 한다.
  - 카메라가 우주선 뒤에 붙어 있다
  - 우주선은 착륙할 행성을 향해 전진한다
  - 소행성 벨트를 통과한다
  - 행성은 전방 목표물처럼 멀리서부터 점점 가까워져야 한다
- 현재 draft의 문제:
  - 우주선이 좌하단에서 시작해 로켓처럼 상단으로 치솟는다
  - 중간에 내려왔다가 다시 올라가며 화면 밖으로 사라진다
  - 그 뒤 우상단에서 행성이 따로 뜬다
  - 소행성은 거의 보이지 않는다
- 결론:
  - **Scene2의 상승 연출 문법이 Scene3에 잘못 이어져 있다**
  - Scene3는 `우주선이 화면 안에 유지되는 후방 추적 샷`으로 바뀌어야 한다

### 사용자와 합의한 기술 방향
- 소행성은 Three.js 공간에서 표현하는 방향이 좋다.
- 행성은 **풀 3D**로 표현한다.
  - 이유:
    - 텍스처도 없고 스프라이트도 없다
    - 멀리서 다가오는 입체감을 3D 쪽이 훨씬 자연스럽게 줄 수 있다

### 현재 막힌 상태
- 사용자 피드백: "아무것도 다른게 없다", "ThreeJs 안된거 같아", "일단 동작 안해"
- 즉, 오늘 넣은 3D planet 변경은 **화면상 체감되지 않았고, 실제로는 WebGL 경로가 정상 동작하지 않았을 가능성**이 높다.
- 내일 첫 작업은 "행성 퀄리티 조정"이 아니라 **Three.js가 실제로 렌더링되고 있는지 확인**하는 것이다.

### 내일 재개 시 첫 체크리스트
- `Scene3SpaceField`가 실제로 초기화되는지 확인
  - `window.THREE` 존재 여부
  - renderer 생성 성공 여부
  - console warning: `Scene3SpaceField WebGL disabled:` 발생 여부
  - `.scene3-shell--fallback` 클래스가 붙는지 확인
- `.scene3-shell__three` 컨테이너 크기가 0이 아닌지 확인
- DOM planet가 아니라 Three.js planet가 실제로 그려지는지 확인
- fallback 경로가 켜졌다면 왜 켜졌는지 원인부터 해결

### 내일 우선순위
1. **Three.js 경로가 실제로 동작하게 만들기**
2. **우주선을 "상승"이 아니라 "후방 추적 샷"으로 재설계**
3. **소행성을 DOM 비중에서 줄이고 Three.js depth 공간으로 이동**
4. **행성이 전방 목표물처럼 지속적으로 보이도록 샷을 고정**
5. 마지막에 배경/성운 패럴랙스 톤 조정

### 중요한 메모
- 오늘은 행성을 3D로 바꾸는 방향까지만 합의했고, **시각적으로 성공한 상태는 아니다**.
- 내일은 무조건 "왜 Three.js가 안 보였는지"부터 잡고 시작해야 한다.
- 사용자 의도보다 먼저 판단해서 작업 순서를 밀어붙이지 말 것.
- 다음 턴에서는 먼저 사용자에게 **어느 요소가 어떻게 보이길 원하는지** 확인하고, 그 기준으로만 수정한다.

---

## 22. 2026-04-12 작업 기록 / 다음 AI 인수인계 메모

### 오늘 실제로 확인된 핵심 진실
- Scene3의 목적지 행성/우주 공간은 이제 **Three.js 경로가 실제로 동작**한다.
- 한동안 행성이 그림판처럼 보였던 이유는, 실제로는 Three.js가 아니라 **fallback DOM planet**가 보이고 있었기 때문이다.
- 원인은 `window.THREE` 의존이었다. 이 문제는 `scene3-space-field.mjs`에서
  - `import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";`
  - 로 직접 module import 하는 구조로 바꾸면서 해결했다.
- 중간에 `CanvasTexture` undefined 에러가 났던 이유는 `this.THREE` 잔존 참조 때문이었다. 이건 제거 완료.

### 지금까지 Scene3에서 비교적 잘 정리된 것
- 행성 위치/진행 방향은 사용자 피드백 기준으로 상당히 맞춰졌다.
  - 행성은 **우상단 목표물**처럼 보여야 한다.
  - 행성은 화면을 가로질러 지나가면 안 되고, **거의 제자리에서 커지며 다가오는 느낌**이어야 한다.
- 우주선 위치도 비교적 안정화되었다.
  - 화면 밖으로 나가면 안 된다.
  - 후방 추적 샷 느낌으로, 화면 안에 유지되어야 한다.
- 행성 표면 텍스처는 이제 사용자 제공 이미지 2장으로 대체되었다.
  - `assets/images/scenes/scene3-target-planet-surface-texture.png`
  - `assets/images/scenes/scene3-target-planet-atmosphere.png`
- 행성 관련 사용자의 현재 입장:
  - **행성은 이제 그만 건드려도 된다. 오케이 상태다.**
  - 단, 고리는 너무 크게 손대지 말고 현재 상태에서 과도한 변경은 피한다.

### 행성/고리 관련 현재 합의 상태
- 행성은 Three.js sphere + surface texture map + atmosphere texture map 구조를 유지한다.
- 고리는 존재해도 되지만, 핵심 작업 우선순위는 아니다.
- 사용자가 한때 요구했던 고리 관련 조건:
  - 앞쪽 고리는 보이고, 뒤쪽 고리는 행성에 가려져야 한다.
- 다만 마지막 사용자 지시 기준으로는 **행성/고리보다 소행성이 훨씬 더 중요한 미완성 항목**이다.
- 따라서 다음 작업에서는 행성/고리 쪽을 함부로 재개하지 말고, **소행성 문제 해결에 집중**한다.

### 오늘 소행성에서 실패한 시도들
아래 방향들은 사용자가 원하는 장면과 맞지 않는 것으로 판명났다.

#### 실패 1. DOM/GSAP 평면 소행성
- 큰 소행성/중간 소행성을 DOM 레이어에서 x/y/scale로 날리는 방식은
  - 행성 옆을 스쳐 지나가는 2D 물체처럼 읽혔다.
  - 사용자는 이것을 원하지 않았다.

#### 실패 2. large/medium/foreground blur 위주 접근
- 전경에서 크게 스치는 large/medium asteroid는
  - 사용자가 원한 “벨트 내부” 느낌보다
  - 특정 장애물이 화면을 가로지르는 느낌에 가까웠다.
- 특히 사용자는 “행성 주변을 스치는 소행성”을 원하지 않는다.

#### 실패 3. opacity fade-in/fade-out
- 사용자 피드백으로 확정:
  - **행성도, 소행성도, 애니메이션 시작 시 opacity 0에서 올라오면 안 된다.**
  - 처음부터 존재해야 한다.
- 이 문제는 Three.js asteroid swarm과 preview planet 모두에서 한 번씩 발생했고,
  현재는 해당 fade-in 계열 smoothstep을 제거하거나 약화한 상태다.

### 현재 사용자가 원하는 소행성 장면의 정확한 의미
이 문장이 가장 중요하다.

> 사용자는 “행성 근처에 돌 몇 개가 있는 장면”을 원하는 것이 아니라,
> **우주선이 이미 소행성 벨트 안으로 들어와 있고, 전방 공간 전체에 small asteroid들이 퍼져 있는 장면**을 원한다.

즉:
- 소행성의 기준점은 **행성**이 아니다.
- 기준은 **우주선의 진행 방향과 카메라가 바라보는 전방 공간 전체**다.
- “행성 쪽에서 출발해서 날아온다”는 감각은 약해야 하고,
  오히려 “이미 벨트 안에 있다”는 환경 감각이 강해야 한다.

### 사용자와 오늘 최종 합의한 소행성 설계
이 설계가 다음 AI가 이어받아야 할 현재 정답이다.

#### 1. large / medium은 일단 제거
- 현재 단계에서는 소행성 레이어를 **small만** 사용한다.
- 이유:
  - large/medium은 장면을 무겁게 만들고,
  - 벨트 내부를 통과하는 느낌보다 특정 장애물 회피처럼 읽히기 쉽기 때문이다.

#### 2. small만으로도 depth band를 나눈다
- small은 하나의 균일 레이어가 아니라 다음 3개의 깊이대로 나눈다.
  - far small
  - mid small
  - near small
- 모두 small이지만, 깊이대에 따라
  - 개수
  - 속도
  - 크기
  - opacity 최대치
  - 퍼짐 반경
  을 다르게 준다.

#### 3. far / mid / near small의 성격
- **far small**
  - 아주 멀리
  - 가장 작음
  - 가장 느림
  - 개수 많음
  - 거의 별처럼 보일 정도로 환경 밀도 담당
- **mid small**
  - 가장 많이 보이는 층
  - 장면의 기본 질감 담당
  - 크기/속도 중간
- **near small**
  - 여전히 small이지만 slightly larger
  - 조금 더 빠름
  - 개수 적음
  - 전경 직전의 속도감을 살려줌

#### 4. 출발 위치 규칙
- 모든 small asteroid가 행성 정확히 한 점에서 출발하면 안 된다.
- 대신 **전방 공간 전체에 퍼져 있는 cone / volume** 안에서 시작해야 한다.
- 일부는 행성 주변에 걸쳐 있어도 되지만,
  일부는 이미 우주선 주변 전방 공간에 퍼져 있어야 한다.
- 즉, “행성 부속물”이 아니라 “우주 환경”처럼 보여야 한다.

#### 5. 진행 궤적 규칙
- 소행성은 화면 정중앙으로 계속 수렴하면 안 된다.
- 멀리 있을 때는 비교적 시선 중심 근처에 있지만,
  가까워질수록 **좌우 + 상하로 방사형으로 벌어지며 화면 바깥으로 스쳐 지나가야 한다.**
- 사용자는 특히 다음을 명시했다:
  - “위 아래로 퍼져나가는 게 왜 없냐”
- 즉, x축뿐 아니라 y축도 반드시 크게 퍼져야 한다.

#### 6. opacity 규칙
- 사용자가 명시적으로 거부했다.
- 소행성은 **투명에서 나타나는 것처럼 보이면 안 된다.**
- “처음부터 존재한다”는 느낌이 필요하다.
- 따라서 asteroid visibility는 기본적으로 on 상태여야 하고,
  끝에서만 정리하는 정도로 최소화하는 것이 맞다.

#### 7. 크기 규칙
- 파일명 kind와 일치하는 체감 크기를 유지해야 한다.
- 과거 실패처럼 모든 소행성이 xlarge처럼 보이면 안 된다.
- 현재는 small만 쓰므로,
  - near band라도 medium처럼 커져 보이면 실패다.
  - small이 small답게 유지되면서 depth만 달라져야 한다.

### 현재 코드 상태 (다음 AI가 꼭 알아야 할 것)
- `assets/js/scene3-space-field.mjs`
  - Three.js asteroid swarm이 이미 존재한다.
  - 지금은 small only + depth band 구조로 한 차례 재구성된 상태다.
  - 하지만 사용자 기준으로는 아직 “완성”이 아니다.
  - 이유:
    - 여전히 행성 주변 오브젝트처럼 읽힐 여지가 있음
    - 벨트 내부 환경감이 충분히 강하지 않음
    - far/mid/near small의 시각적 역할 차이가 더 정교해야 함
- `assets/js/scenes.mjs`
  - DOM 기반 asteroid 연출 흔적이 남아 있을 수 있다.
  - 다음 작업에서는 Scene3 소행성의 주역을 **Three.js swarm**으로 두고,
    DOM asteroid는 필요 최소한으로 줄이거나 제거하는 쪽이 맞다.
- `_layouts/home.html`, `assets/css/scenes.css`
  - 디버그용 테스트 asteroid는 제거된 상태여야 한다.
  - 향후 디버깅이 필요해도, 이번에는 임시 DOM asteroid 테스트부터 다시 넣지 말고
    Three.js 쪽 분포/궤적을 먼저 조정하는 것이 좋다.

### 다음 AI가 바로 해야 할 일
1. `scene3-space-field.mjs`의 asteroid swarm만 집중적으로 다룬다.
2. small asteroid를
   - far / mid / near depth band
   - 전방 cone/volume 분포
   - 시작점의 행성 의존성 축소
   - x/y 방사형 퍼짐 강화
   기준으로 재조정한다.
3. asteroid는 opacity fade-in 없이 **처음부터 존재**하게 유지한다.
4. near small이라도 medium처럼 커지지 않도록 `scaleBase / scaleBoost`를 보수적으로 유지한다.
5. Scene3가 “행성 주변 장애물”이 아니라
   **이미 벨트 내부에 들어온 우주선 시점**으로 읽히는지 우선 확인한다.

### 다음 AI가 하지 말아야 할 일
- 행성/고리를 다시 크게 뜯지 말 것
- large / medium asteroid를 다시 섣불리 되살리지 말 것
- DOM asteroid를 또 평면 애니메이션으로 크게 날리지 말 것
- opacity 0에서 시작하는 asteroid fade-in을 다시 넣지 말 것
- “행성 주변에서 무엇이 날아온다”는 문법으로 되돌리지 말 것

### 한 줄 요약
지금 Scene3의 남은 핵심 과제는 행성이 아니라 **small asteroid belt의 공간 문법**이다.
다음 작업은 “돌 몇 개를 더 보이게 하는 것”이 아니라,
**우주선이 이미 소행성 벨트 내부를 통과 중인 것처럼 느껴지는 small-depth-field를 설계하는 것**이어야 한다.

---

## 23. 2026-04-17 작업 기록 / 다음 AI 인수인계 메모

이 섹션은 위의 오래된 소행성 메모보다 최신 상태를 반영한다. 특히 `large / medium을 다시 섣불리 되살리지 말 것` 같은 문장은 이제 유효하지 않다. 현재 기준은 아래가 source of truth다.

### 오늘 확정된 장면 해석
- 사용자가 원하는 것은 `scale을 따로 애니메이션하는 2D 소행성`이 아니다.
- 특히 `large`는 다음 문장으로 이해해야 한다.
  - **타겟 행성의 3D 좌표와 카메라 기준 주변부 목표점을 잇는 직선 위를, 일정한 벡터로 translate하는 물체**
- 즉, large가 커져 보이는 이유는 별도 scale 연출이 아니라 **카메라에 가까워지기 때문**이다.
- 이 원칙은 medium에도 그대로 이어진다. medium은 large와 같은 경로 문법의 중간값 레이어다.

### 오늘 실제로 정리된 것
- `assets/js/scenes.mjs`
  - Scene3 backdrop / nebula의 수평 drift를 제거했다.
  - 사용자 기준으로 카메라는 행성 쪽으로 안쪽 전진 중이므로, 배경은 옆으로 흐르면 안 된다.
  - 현재는 **거의 정지 + 아주 약한 scale-up**만 허용하는 방향으로 정리되어 있다.
- `assets/js/scene3-space-field.mjs`
  - `small` asteroid는 화면 전역에 분포하는 원경 필드로 재구성되었다.
  - `small`은 opacity 1 고정이다.
  - `small`은 화면 중심 쪽에서 더 작게 읽히며,
    타겟 행성의 화면상 위치를 기준으로 방사형으로 아주 약하게 drift한다.
  - 사용자가 현재 `small`에 대해 "아주 좋아"라고 한 상태까지는 도달했다.
- `assets/js/scene3-space-field.mjs`
  - `large`는 기존의 `제자리 scale-up` 문법을 버리고,
    **planet world position -> camera-near peripheral target** 직선 경로 위 translate 모델로 다시 바꾸기 시작했다.
  - 현재 large는 이전보다 훨씬 나아졌지만, 아직 완성은 아니다.

### 현재 large의 정확한 문제
- large가 일부 경로에서 **행성 원판을 뚫고 나오는 것처럼 보인다**.
- 즉, 경로 모델 자체는 맞아졌지만, `route start / route target` 선택이 아직 충분히 정교하지 않다.
- 사용자는 이 large 문제를 다음 우선순위로 미뤄도 된다고 했지만,
  다음 작업의 첫 번째 대상은 여전히 large다.

### 다음 AI가 바로 해야 할 일
1. `scene3-space-field.mjs`의 `large` route만 집중적으로 조정한다.
2. `large`가 행성 중심에서 시작하지 않도록, 시작점을 행성 중심이 아니라 **행성 실루엣 바깥 / 행성 edge 기준**으로 옮기거나, 행성 원판을 관통하는 route를 배제한다.
3. `large`의 목표점은 계속 **카메라 기준 주변부**여야 한다.
   - 완전 정중앙으로 오면 안 된다.
   - 근경 flyby처럼 카메라를 스치고 화면 밖으로 빠져야 한다.
4. `large`에는 scale 애니메이션을 다시 넣지 말 것.
   - 원근으로 커져 보이게 해야 한다.
5. opacity fade-in/fade-out을 다시 넣지 말 것.
6. large가 안정화되면, 그 다음에야 `medium`을 large의 중간값 레이어로 추가한다.

### medium 구현 규칙
- medium은 large와 같은 문법을 사용한다.
- 차이는 다음뿐이다.
  - 더 먼 시작점
  - 더 느린 속도
  - 더 작은 체감 크기
  - 카메라를 스치되, large보다 덜 공격적인 flyby
- medium도 scale을 직접 키우지 않는다.
- medium도 opacity fade-in에 의존하지 않는다.

### 다음 AI가 하지 말아야 할 일
- large를 다시 `제자리에서 커졌다 사라지는` 방식으로 되돌리지 말 것
- large/medium을 DOM x/y/scale 애니메이션으로 되돌리지 말 것
- opacity 0에서 시작하는 소행성 fade-in을 다시 넣지 말 것
- large를 `행성이 발사한 장애물`처럼 보이게 만들지 말 것
- small을 다시 cluster 중심 사고로 되돌리지 말 것

### 현재 Scene3 소행성의 최신 기준 요약
- `small`
  - 화면 전역의 원경 필드
  - opacity 1
  - 거의 정지에 가까운 약한 이동
  - 행성의 화면상 위치를 기준으로 방사형 drift
- `large`
  - 소수의 근경 flyby
  - 3D 직선 route translate
  - scale 직접 애니메이션 금지
  - opacity fade 금지
  - 현재 남은 과제는 `행성 관통 방지`
- `medium`
  - 아직 본격 구현 전
  - large route 안정화 후 같은 문법의 중간값으로 추가

### 한 줄 요약
지금 Scene3의 남은 핵심 과제는 `large flyby route를 행성 실루엣과 분리해 안정화`하는 것이다. 그 다음 단계가 `medium` 추가다.
