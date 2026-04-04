# Scene3 구현 브리프 (Codex 전달용)

## 0. 목적
이 문서는 **byeol 홈페이지 Scrollytelling의 Scene3**를 Codex가 바로 구현할 수 있도록,
장면의 **스토리/흐름**, **레퍼런스**, **자산 사용 계획**, **현재까지 생성된 이미지의 용도**,
**이미지로 만들지 않고 코드로 처리할 효과**, **레이어/깊이/성능/반응형 규칙**을 하나로 정리한 문서다.

이 문서 기준으로 Scene3는 다음 원칙을 따른다.

- Scene3 기능 메시지: **스크립트처럼 가볍게, 오류는 먼저**
- 장면 역할: **지구를 떠난 뒤 우주를 항해하며 소행성 벨트를 통과하는 구간**
- 핵심 감정: **빠르고 가볍게 전진하지만, 위험은 미리 읽고 피하는 지적인 긴장감**
- 핵심 시각 은유: **충돌 후 실패가 아니라, 충돌 전 경고와 회피**
- 구현 원칙: **우주 포스터 한 장**이 아니라 **배경 / 성운 / 로켓 / 소행성 / 파티클 / UI를 분리 합성**
- 기술 원칙: Scene3는 **Three.js 비중이 가장 큰 씬**이며, 형태가 필요한 자산만 이미지로 쓰고, 동적 공간감과 파티클은 코드로 만든다.

---

## 1. Scene3 한 줄 요약
로켓이 지구를 뒤로 하고 깊은 우주로 진입한다. 전방에는 소행성 벨트가 나타나고, 로켓은 민첩하게 진로를 조정하며 위험을 피한다. 특정 장애물에는 **충돌 전 경고**가 먼저 나타나고, 우측에는 코드/오류 카드가 함께 떠서 **실행 전 감지** 메시지를 강화한다. 이후 벨트를 통과하면 새로운 행성이 전방에 커지며 Scene4로 이어진다.

---

## 2. Story / Animation Flow

### Scene2 → Scene3 전환
- Scene2 끝에서 카메라가 넓어지며 아래쪽에 지구가 보이기 시작한다.
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
- small asteroid single 4~5개를 군집처럼 배치한 묶음들이 통과
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
- Scene4로 넘길 준비

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

### 지향 방향
- 깊은 우주 + 성운 + 별빛은 **넓고 시원한 공간감**
- 소행성 통과는 **속도감과 긴장감**
- 오류 감지는 **기계적 HUD**보다 **제품 UI 카드 + 경고 마커**로 명확히 읽힘

---

## 4. Reference Art / Files

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
- Scene3는 **Scene3 컨셉아트의 화풍을 통째로 복제**하는 작업이 아니라,
  **실제 Scene1 / Scene2 구현 자산 문법을 우주 장면으로 확장**하는 작업이다.
- 로켓은 끝까지 **2.5D 스프라이트 계열**로 유지한다.

---

## 5. Asset Policy (중요)

### 원안 대비 실무 결정 변경점
문서 원안에는 small-cluster, foreground-blur, particle-atlas가 이미지 자산으로 포함되어 있었지만,
실제 생성 테스트 결과를 반영해 아래와 같이 변경한다.

#### 유지
- large asteroid 이미지
- medium asteroid 이미지
- small asteroid single 이미지
- deep space backdrop 이미지
- nebula band 이미지
- rocket rear-oblique 이미지

#### 이미지 생성 중단 / 코드 처리 전환
- `small-cluster-01.png`, `small-cluster-02.png`
  - **생성 중단**
  - **small single 4~5개를 GSAP 배치로 군집 구성**
- `foreground-blur-01.png`, `foreground-blur-02.png`
  - **생성 중단**
  - **existing small single sprite + GSAP/CSS blur/afterimage 처리**
- `space-dust-particle-atlas.png`
  - **생성 중단**
  - **Three.js procedural particles로 구현**

이 결정은 Scene3 원칙과도 맞는다. Scene3의 별/우주먼지/파티클은 원래도 **Three.js 또는 2.5D 파티클**로 처리 가능한 영역이며, Scene3는 Three.js 비중이 가장 높은 씬이다.

---

## 6. Final Asset List (구현 기준)

### A. 이미지 자산 (실제 사용)

#### 배경 / 환경
- `assets/images/scenes/scene3-space-backdrop-deep.png`
  - 깊은 우주 기본 배경
  - very far background
- `assets/images/scenes/scene3-nebula-band-diagonal.png`
  - 성운 띠 / 방향성 있는 공간감
  - backdrop 위 중첩 레이어
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
  - 큰 덩어리 / hero obstacle
  - far-mid depth에서 진입

#### 장애물 - medium
- `assets/images/scenes/scene3-asteroid-medium-01.png`
- `assets/images/scenes/scene3-asteroid-medium-02.png`
  - large보다 작고 회피용 리듬을 만드는 메인 장애물

#### 장애물 - small singles (현재 승인 방향)
- `assets/images/scenes/scene3-asteroid-small-01.png`
- `assets/images/scenes/scene3-asteroid-small-02.png`
- `assets/images/scenes/scene3-asteroid-small-03.png`
- `assets/images/scenes/scene3-asteroid-small-04.png`
- `assets/images/scenes/scene3-asteroid-small-05.png`

용도:
- 개별 small obstacle
- 여러 개를 GSAP 배치로 묶어 pseudo-cluster 구성
- foreground blur의 원본 소스 재사용 가능

### B. 이미지 자산 (채택 안 함 / 참고용 실패 샘플)
- `resource-generation/운석 파편의 빠른 비행.jpeg`
  - foreground blur 이미지 생성 실패 샘플
  - 사용하지 않음
- particle atlas 관련 생성 결과물 전부
  - 사용하지 않음

### C. 코드로 구현할 것
- far stars
- mid stars
- space dust / tiny particles
- short streak particles
- warning marker
- code card / error card / title / description / black gradient backplate
- foreground blur asteroid afterimage effect

---

## 7. Layer Ownership Table

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

## 8. Depth Bands / Render Order
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
10. foreground blur asteroid layers (generated from existing sprite)
11. warning marker layer
12. text + code card + error card + gradient backplate

주의:
- foreground blur asteroid는 UI보다 아래, 일반 asteroid보다 위
- warning marker는 asteroid와 시각적으로 연결되지만, 시독성을 위해 asteroid보다 위
- code/error cards는 항상 최상단 정보 계층

---

## 9. Three.js Particle Design
이번 작업에서는 particle atlas 이미지를 쓰지 않는다.

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

### 추천
- 먼지 점들: `THREE.Points + BufferGeometry`
- 아주 짧은 streak: 작은 sprite/plane 또는 stretched point effect

---

## 10. Foreground Blur Asteroid Policy
이미지 생성으로 새로 뽑지 않는다.

### 이유
- 생성기로 만들면 운석 비행 일러스트처럼 굳어짐
- 배경/붓터치/장면 찌꺼기가 붙음
- 이미 맞춘 소행성 세트 스타일이 흔들림

### 구현 방식
- `scene3-asteroid-small-0X.png` 중 하나를 원본으로 사용
- 동일 이미지를 2~3장 겹침
  - 본체 레이어: blur 없음
  - afterimage-1: 낮은 opacity + blur + 진행 반대 방향 offset
  - afterimage-2: 더 낮은 opacity + 더 큰 blur + 더 긴 offset
- 필요 시 scaleX / skew 약간 적용
- 일부는 프레임 밖으로 잘리게 배치

---

## 11. Small Asteroid Cluster Policy
small-cluster는 별도 이미지 생성하지 않는다.

### 구현 방식
- `scene3-asteroid-small-01 ~ 05`를 재사용
- 한 컨테이너 안에 3~5개 배치
- scale / rotate / x / y를 약간씩 다르게
- 좌우 반전은 광원 방향 깨질 수 있으니 기본적으로 지양

### 장점
- 스타일 유지
- 군집 밀도 조절 가능
- 반복 재사용 가능
- Scene3 진행도에 따라 흩어지거나 모이게 연출 가능

---

## 12. Code Card / Error Card Content
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

### Message Point
- 실행 후 실패가 아니라 실행 전 감지
- 우주 장면에서는 충돌 전 경고 UI와 시각적으로 대응

---

## 13. Responsive Rules

### Desktop
- 텍스트/UI는 우측 상단 또는 우측 중앙
- 코드 카드와 오류 카드는 세로 배치
- 로켓 진행 방향과 반대편에 정보 카드 배치

### Tablet
- 카드 폭 축소
- 카드 수를 줄이지는 않되 간격 압축

### Mobile
- 카드 2장을 동시에 크게 띄우기 어렵다면,
  핵심 타이틀 + 짧은 오류 카드 중심으로 축소
- 별/파티클 수량 감소
- asteroid 수량과 blur 강도 감소

---

## 14. Performance Budget (권장 상한)
Codex가 과하게 구현하지 않도록 권장 예산을 준다.

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

---

## 15. What Not To Generate As Images
아래는 이미지 생성 대상이 아니다.

- 경고 마커
- 코드 카드 / 오류 카드 / 타이틀 / 설명
- 검정 → 투명 그라데이션 백플레이트
- particle atlas
- foreground blur 전용 신규 이미지
- small-cluster 완성 이미지

---

## 16. Implementation Notes for Codex
- Scene3는 **포스터 일러스트 한 장 방식으로 구현하지 말 것**
- 반드시 **레이어 합성 / depth separation / procedural particles**로 갈 것
- rocket은 끝까지 **2.5D sprite** 유지
- earth는 가능하면 **Three.js sphere** 사용, `scene3-earth-horizon-fallback.png`는 fallback만
- small asteroid는 canonical rename 후 바로 재배치 가능하게 구성
- Scene2 → Scene3 → Scene4 연결을 progress 기반으로 끊김 없이 설계

---

## 17. 최종 요약
Scene3는
**지구를 떠난 로켓이 우주를 항해하며 소행성 벨트를 통과하는 구간**이고,
**빠르고 가볍지만 위험은 미리 감지하는 지적인 긴장감**을 보여줘야 한다.

자산 전략은 다음처럼 고정한다.

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

이 문서의 핵심 실무 결정은 아래 세 줄이다.

- `small-cluster`는 이미지 생성 포기, **small single 4~5개를 GSAP로 군집화**
- `foreground-blur asteroid`는 이미지 생성 포기, **existing small sprite + blur/afterimage**
- `space dust / particle atlas`는 이미지 생성 포기, **Three.js procedural particles**
