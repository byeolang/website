# Scene4 구현 계획: 대기권 하강 + 조용한 착륙

너는 웹 랜딩페이지의 Scene4를 구현하는 코드 작성 AI다.

이 문서는 Scene4의 새 스토리보드, 연출 방향, 작업 단계, 검증 루프를 정리한다.

## 핵심 목표

기존 Scene4는 정적인 착륙 완료 전경처럼 보였고, Scene1~3의 동적인 흐름과 대비되어 힘이 빠졌다.

새 Scene4는 로켓이 이미 외계 행성 대기 중에 진입한 상태에서 시작한다. 카메라는 로켓을 화면 가운데에 잡고, 로켓은 지표면에서 아직 떨어져 있다. 이후 지표면이 아래에서 카메라 안으로 올라오고, atmosphere 레이어는 위로 밀려나며, 로켓이 감속 후 조용히 착륙한다.

이번 단계에서는 문구와 CTA는 작업하지 않는다. Scene4의 주인공은 착륙 연출이다.

## 사용 가능한 자산

새 이미지를 만들거나 존재하지 않는 이미지 파일을 가정하지 않는다.
현재 `assets/images/scenes/`에 존재하는 자산만 사용한다.

Scene4 이미지:

- `scene4-sky-backdrop.png`
- `scene4-upper-atmosphere-vail.png`
- `scene4-horizon-glow.png`
- `scene4-horizon-ridge.png`
- `scene4-surface-backdrop.png`
- `scene4-landing-dust-soft.png`
- `scene4-crystal-cluster-01.png`
- `scene4-crystal-cluster-02.png`

공용 로켓 이미지:

- `rocket.png`
- `rocket-fire.png`

사용하면 안 되는 가정 자산:

- planet 이미지
- planet glow 이미지
- engine-glow-soft 이미지
- data-rain 이미지
- starfield 전용 이미지
- 별도 foreground 이미지
- 새로 생성한 이미지

## 새 스토리보드

### Phase 1 - 대기 중 하강 시작

카메라는 로켓을 화면 가운데에 포커싱한다.

초기 상태:

- 배경은 우주와 외계 행성 대기가 섞인 느낌이다.
- 로켓은 지표면에서 아직 떨어져 있다.
- 화면 하단에는 아직 행성 지표면이 보이지 않는다.
- `scene4-upper-atmosphere-vail.png`가 로켓 주변을 감싸며 대기 중 하강 느낌을 만든다.
- 로켓은 작게 멀리 있는 물체가 아니라 Scene4의 중심 피사체로 보여야 한다.

목표:

- Scene3의 운동감이 끊기지 않게 한다.
- 사용자가 "아직 이동 중이고, 착륙 직전 구간에 들어왔다"고 느껴야 한다.

### Phase 2 - 지표면 접근

로켓은 화면 중앙 중심을 유지하고, 카메라는 로켓과 함께 내려가는 듯한 느낌을 준다.

연출:

- `scene4-surface-backdrop.png`와 `scene4-horizon-ridge.png`, `scene4-horizon-glow.png`가 화면 아래에서 올라온다.
- 같은 속도감으로 `scene4-upper-atmosphere-vail.png`는 화면 위로 밀려난다.
- sky는 크게 흔들지 말고 약한 scale/pan만 허용한다.
- crystal cluster는 아직 강하게 드러내지 않는다.

목표:

- 지표면이 프레임 안으로 들어오는 것 자체가 착륙 이벤트의 시작처럼 보여야 한다.
- 단순히 배경 레이어가 켜지는 것이 아니라 카메라가 하강하는 것처럼 보여야 한다.

### Phase 3 - 감속

로켓이 지표면에 가까워지면서 속도를 줄인다.

연출:

- `rocket-fire.png`가 점점 강해진다.
- fire는 로켓 바로 아래에 붙어야 하고, 화염 기둥처럼 커지면 안 된다.
- `scene4-landing-dust-soft.png`는 touchdown 전에 아주 약하게 보이기 시작할 수 있다.
- atmosphere와 dust가 겹치며 일시적으로 프레임이 조금 자욱해져도 된다.

목표:

- 착륙 직전의 긴장과 감속이 보여야 한다.
- 폭발, 전투, 발사 장면처럼 보이면 실패다.

### Phase 4 - touchdown

로켓이 지표면에 닿고 안정적으로 멈춘다.

연출:

- 로켓은 최종 위치에서 회전 없이 거의 수직으로 정지한다.
- `rocket-fire.png`는 touchdown 직후 빠르게 약해지거나 꺼진다.
- `scene4-landing-dust-soft.png`는 낮고 넓게 바닥을 따라 퍼진다.
- dust는 `scaleX` 위주로 키우고, `scaleY`는 크게 키우지 않는다.
- 연기와 대기감은 차츰 옅어진다.

목표:

- 조용한 착륙 완료 장면으로 끝난다.
- 마지막 프레임은 차분하고 안정적이어야 한다.

## 이미지별 역할

### `scene4-sky-backdrop.png`

가장 뒤 배경이다.
우주/외계 하늘 분위기를 담당한다.
화면 전체를 덮고, 움직임은 약하게만 준다.

### `scene4-upper-atmosphere-vail.png`

새 연출의 핵심 자산이다.
로켓 주변을 감싸는 대기층, 구름 베일, 진입감 표현에 사용한다.
초기 프레임에서는 강하게 보이고, 지표면 접근과 함께 화면 위로 밀려난다.

주의:

- 고정 장식처럼 보이면 안 된다.
- 로켓을 완전히 가리면 안 된다.
- 마법 이펙트처럼 과하게 빛나면 안 된다.

### `scene4-horizon-glow.png`

지평선 뒤쪽의 얇은 대기광이다.
지표면이 화면 안으로 올라올 때 함께 등장한다.
opacity는 낮게 유지하고, 착륙 후반에도 은은하게 남긴다.

### `scene4-horizon-ridge.png`

먼 산등성이 레이어다.
surface보다 뒤, horizon glow보다 앞 또는 가까운 지평선 레이어로 사용한다.
지표면과 함께 아래에서 올라와 거리감을 만든다.

### `scene4-surface-backdrop.png`

착륙할 행성 표면이다.
초기 프레임에서는 화면 하단 밖에 있어야 한다.
중반부터 아래에서 올라오고, 후반에는 로켓의 접지 기준이 된다.

### `rocket.png`

Scene4의 주 피사체다.
초기부터 화면 중앙에 보여야 한다.
많이 흔들지 말고, 감속 구간에서 아주 작은 흔들림과 scale 변화만 허용한다.

### `rocket-fire.png`

착륙 감속용 엔진 불꽃이다.
초기에는 거의 보이지 않거나 약해야 한다.
지표면에 가까워질수록 강해지고, touchdown 직후 빠르게 약해진다.

### `scene4-landing-dust-soft.png`

touchdown 먼지 레이어다.
로켓 하단 중심과 정확히 맞춘다.
낮고 넓게 퍼져야 하며, 위로 솟는 smoke column처럼 보이면 안 된다.

### `scene4-crystal-cluster-01.png`

큰 전경 크리스탈 클러스터다.
착륙 완료 구간에서 외계 행성 분위기를 보강한다.
중앙 로켓 착륙 영역을 방해하지 않는다.

### `scene4-crystal-cluster-02.png`

낮고 넓은 중경/후경 크리스탈 지형이다.
cluster-01보다 작거나 멀리 보이게 배치한다.
초기에는 눈에 띄지 않고, surface가 올라온 뒤 자연스럽게 드러나는 편이 좋다.

## 권장 레이어 순서

기본 z-index 방향:

0. `scene4-sky-backdrop`
1. Three.js background atmosphere
2. `scene4-upper-atmosphere-vail`
3. `scene4-horizon-glow`
4. `scene4-horizon-ridge`
5. `scene4-surface-backdrop`
6. `scene4-crystal-cluster-02`
7. `scene4-crystal-cluster-01`
8. `scene4-landing-dust-soft`
9. `rocket-fire`
10. `rocket`
11. Three.js foreground dust / subtle light
12. text copy, if later added

실제 합성에서 atmosphere가 로켓을 과하게 가리면 로켓보다 뒤로 보내거나 opacity를 낮춘다.
rocket-fire가 dust에 너무 묻히면 fire와 dust의 z-index는 조정해도 된다.

## 전체 작업 단계

### 0단계 - 기존 Scene4 코드 분석

목표:

- 기존 Scene4 구현의 구조와 문제를 정확히 파악한다.

확인할 파일:

- `_layouts/home.html`
- `assets/css/scenes.css`
- `assets/js/scenes.mjs`
- `assets/js/scene.mjs`
- `assets/images/scenes/scene4-*.png`

확인할 것:

- `DreamLanding` 타임라인 구조
- 현재 reverse scroll 구조와 ScrollTrigger pin 방식
- Scene1~3과의 전환/속도감 차이
- 현재 Scene4 레이어별 z-index, 위치, opacity
- 기존 코드를 유지할 부분과 버릴 부분

산출물:

- 수정 대상 목록
- 새 레이어 구조 초안
- 기존 타임라인에서 재사용 가능한 값과 폐기할 값 정리

### 1단계 - 초안 완성

목표:

- 새 스토리보드가 읽히는 수준의 기본 배치와 애니메이션을 완성한다.
- 사용자 검토를 받는다.

포함할 작업:

- `scene4-upper-atmosphere-vail.png` 레이어 추가
- 시작 시 로켓 중앙 포커싱
- 초기 프레임에서 surface/horizon을 화면 밖 또는 거의 보이지 않게 설정
- surface/horizon이 아래에서 올라오는 GSAP 애니메이션
- atmosphere가 위로 밀려나는 GSAP 애니메이션
- rocket-fire 점등/강화/소등 타이밍
- landing dust 기본 확산 애니메이션
- crystal cluster 기본 등장 타이밍
- Three.js는 이 단계에서 최소 구조만 두거나, 필요하면 매우 제한적으로 사용한다.

이 단계의 검토 기준:

- 기존보다 정적인 느낌이 줄었는가
- "대기권 하강 -> 지표면 접근 -> 감속 -> 착륙"으로 읽히는가
- 로켓이 화면의 주인공처럼 보이는가
- surface가 처음부터 보이지 않는가
- atmosphere가 실제 하강감을 만드는가
- fire와 dust가 과하지 않은가

### 2단계 - Three.js FX 추가

목표:

- 대기감과 착륙감을 보강한다.
- 사용자 검토를 받는다.

추가할 FX 후보:

- 하늘/대기 미세 입자
- atmosphere 주변의 느린 parallax particle
- horizon 주변의 아주 약한 shimmer
- rocket-fire 주변의 낮은 intensity light pulse
- touchdown 순간 낮게 퍼지는 dust particle
- 착륙 후 아주 적은 foreground motes

주의:

- Three.js는 주연이 아니라 보조다.
- Scene3 우주 비행 FX처럼 보이면 안 된다.
- 별 폭풍, data rain, 마법 glow, 폭발 particle은 금지한다.
- dust particle은 낮게 제한한다.

이 단계의 검토 기준:

- 정적 PNG 합성보다 공기감이 살아났는가
- FX가 과시적이지 않은가
- 착륙 순간이 더 명확해졌는가
- 마지막 프레임이 여전히 차분한가

### 3단계 - 반응형 레이아웃

목표:

- 데스크톱에서 확정한 연출을 모바일/태블릿에서도 유지한다.

포함할 작업:

- desktop/tablet/mobile별 로켓 크기 조정
- surface 진입 높이와 최종 접지점 조정
- atmosphere crop과 이동량 조정
- horizon/glow 위치 조정
- crystal cluster 크기와 표시 여부 조정
- dust 크기와 확산 범위 조정
- viewport별 screenshot 검증

이 단계의 검토 기준:

- 모바일에서 로켓이 너무 작거나 잘리지 않는가
- 모바일에서 surface가 너무 빨리/늦게 들어오지 않는가
- crystal이 중앙 착륙 영역을 침범하지 않는가
- fire/dust가 화면 밖으로 잘리지 않는가
- text/CTA가 나중에 들어갈 공간을 해치지 않는가

## 검증 루프

사용자가 매번 결과 확인 후 수정 요청을 반복하지 않도록, 구현자는 직접 결과물을 확인하고 수정한다.

로컬 사이트를 실행한 뒤 Playwright 또는 동등한 브라우저 자동화로 Scene4 진행률별 스크린샷을 캡처한다.

필수 캡처 지점:

- 0%: 로켓 중앙 포커싱, surface는 아직 보이지 않음, atmosphere가 로켓 주변을 감쌈
- 25%: atmosphere가 위로 밀리고, horizon/surface가 아래에서 들어오기 시작
- 50%: surface가 명확히 들어오고, 로켓이 착륙점 위로 접근, fire가 켜짐
- 75%: 감속 구간, fire가 가장 눈에 띄고, dust/연기가 낮게 퍼지기 시작
- 100%: 착륙 완료, fire는 거의 꺼짐, dust는 옅게 남음

권장 캡처 대상:

- desktop
- mobile

1단계에서는 desktop 우선으로 검증한다.
3단계에서 mobile/tablet 검증을 본격적으로 수행한다.

## 실패 기준

아래 중 하나라도 해당하면 조정한다.

- 시작 프레임에서 surface가 명확히 보인다.
- 시작 프레임에서 로켓이 작거나 배경에 묻힌다.
- atmosphere가 고정 장식처럼 보인다.
- surface가 아래에서 올라오는 움직임으로 읽히지 않는다.
- fire가 착륙 전부터 너무 강하다.
- fire가 화염 기둥처럼 보인다.
- dust가 위로 솟는 폭발/연기 기둥처럼 보인다.
- touchdown 이후 fire가 계속 눈에 띈다.
- crystal cluster가 로켓보다 주목도를 가져간다.
- Scene1~3 이후 갑자기 정지 화면처럼 느껴진다.

## 톤 가이드

유지할 톤:

- cinematic pixel art
- alien atmosphere descent
- quiet sci-fi landing
- controlled deceleration
- low dust
- restrained atmospheric depth

피할 톤:

- 폭발
- 전투
- 화염 기둥
- 마법 이펙트
- 과한 파티클 쇼
- generic SaaS hero
- 지나치게 화려한 glow/bloom
