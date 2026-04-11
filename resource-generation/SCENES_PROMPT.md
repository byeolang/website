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
- large / medium asteroid가 depth band 별로 진입
- small asteroid single 3~5개를 군집처럼 배치한 묶음들이 통과
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
  - far dust
  - mid particles
  - short streaks
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

    <div class="scene3-shell__asteroids scene3-shell__asteroids--mid" aria-hidden="true"></div>
    <div class="scene3-shell__asteroids scene3-shell__asteroids--near" aria-hidden="true"></div>
    <div class="scene3-shell__clusters" aria-hidden="true"></div>
    <div class="scene3-shell__foreground-blur" aria-hidden="true"></div>
    <div class="scene3-shell__warnings" aria-hidden="true"></div>

    <article id="scene3-copy" class="scene3-copy">
      <!-- title / desc / code card / error card / gradient backplate -->
    </article>
  </div>
</section>
```

설명:

- 로켓은 WebGL로 옮기지 않는다.
- 소행성도 mesh로 만들지 않는다. **이미지 sprite + GSAP**가 맞다.
- Three.js 레이어에는 **earth + stars + dust + streaks**만 둔다.
- 텍스트 카드와 warning marker는 DOM 위계에서 가장 위에 둔다.

---

## 10. Layer Ownership Table

### Image + GSAP
- deep space backdrop
- nebula band
- rocket rear-oblique sprite
- large asteroid sprites
- medium asteroid sprites
- small asteroid single sprites

### Three.js
- earth sphere (main)
- far space particles
- mid particles
- short streak particles
- optional near-depth floating specks
- far preview planet glow or silhouette

### DOM + GSAP
- title
- description
- code card
- error card
- black gradient backplate
- warning markers

### GSAP/CSS post effect
- foreground blur asteroid
  - small single sprite를 재사용
  - blur / opacity / offset / scale / rotation을 코드로 처리

---

## 11. Depth Bands / Render Order
권장 depth band:

1. far background color / gradient base
2. deep space backdrop image
3. far nebula band
4. far star / dust particles
5. earth sphere
6. rocket sprite
7. medium-depth asteroids
8. near-depth asteroids
9. small asteroid pseudo-clusters
10. foreground blur asteroid layers
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

### Large / Medium Asteroids
- large active count: 2 ~ 4
- medium active count: 4 ~ 8
- depth band 별 속도 차이가 분명해야 한다
- large는 hero obstacle 성격, medium은 리듬과 회피 유도 성격

### Small Asteroid Clusters
- small active count: 8 ~ 15
- pseudo-cluster instance count: 2 ~ 4 groups
- 한 컨테이너에 3~5개의 small sprite를 배치한다
- scale / rotate / x / y를 약간씩 다르게 한다
- 좌우 반전은 광원 방향이 깨질 수 있으니 기본적으로 지양한다

### Foreground Blur Asteroid
- 동시에 1~2개면 충분하다
- 일부는 프레임 밖으로 잘리게 배치한다
- 동일 small sprite를 2~3장 겹쳐 afterimage를 만든다

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
- small active count: 8 ~ 15
- pseudo-cluster instance count: 2 ~ 4 groups

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
- small-cluster와 foreground blur가 기존 small sprite 재사용으로 구현된다
- particle atlas 없이도 공간감이 성립한다
- 모바일에서 밀도와 이펙트가 적절히 줄어든다
- WebGL fallback에서도 레이아웃이 깨지지 않는다

---

## 20. 최종 요약
Scene3는 **지구를 떠난 로켓이 우주를 항해하며 소행성 벨트를 통과하는 구간**이고, **빠르고 가볍지만 위험은 미리 감지하는 지적인 긴장감**을 보여줘야 한다.

이 문서의 핵심 실무 결정은 아래 다섯 줄이다.

- Scene3는 현재 저장소 기준으로 **새 섹션 + 새 GSAP 타임라인 + 새 Three.js 레이어**를 추가하는 작업이다
- `small-cluster`는 이미지 생성 포기, **small single 3~5개를 GSAP로 군집화**
- `foreground-blur asteroid`는 이미지 생성 포기, **existing small sprite + blur/afterimage**
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
