너는 웹 랜딩페이지의 Scene4를 구현하는 코드 작성 AI다.

중요:
이 작업은 이미지 생성 작업이 아니다.
새 이미지를 만들거나, 존재하지 않는 이미지 파일을 가정하지 마라.
아래에 명시된 9개 이미지 파일만 사용한다.
추가 분위기나 동적 효과는 Three.js로만 보강한다.

사용 가능한 Scene4 이미지 파일은 전부 아래 9개다.

- scene4-crystal-cluster-01.png
- scene4-crystal-cluster-02.png
- scene4-horizon-glow.png
- scene4-horizon-ridge-WIP.png
- scene4-landing-dust-soft.png
- scene4-sky-backdrop.png
- scene4-surface-backdrop.png
- rocket.png
- rocket-fire.png

사용하면 안 되는 가정 자산:
- planet 이미지 없음
- planet glow 이미지 없음
- engine-glow-soft 이미지 없음
- data-rain 이미지 없음
- starfield 전용 이미지 없음
- 별도 foreground 이미지 없음

따라서 Scene4는 “우주에서 행성을 발견하는 장면”이 아니다.
이미 외계 행성의 하늘과 지표면 근처에 진입한 상태에서, 로켓이 표면에 조용히 착륙하는 장면으로 구현한다.

Scene4의 핵심 콘셉트:
외계 행성의 하늘과 지표면이 보인다.
로켓이 위쪽에서 천천히 내려온다.
착륙 직전 rocket-fire가 약하게 켜진다.
착륙 순간 scene4-landing-dust-soft.png가 바닥을 따라 낮고 넓게 퍼진다.
크리스탈 클러스터는 외계 행성 분위기를 보강한다.
Three.js는 하늘의 깊이감, 미세 입자, 지평선 대기감, 착륙 먼지 보조 효과만 추가한다.
마지막은 조용한 착륙 완료 장면으로 끝난다.

전체 톤:
- calm alien landing
- cinematic pixel art
- quiet sci-fi
- low dust
- soft atmospheric depth
- restrained, elegant, cinematic

피해야 할 톤:
- 폭발
- 전투
- 화염 기둥
- 마법 이펙트
- 과한 파티클 쇼
- 우주 행성 발견 장면
- generic SaaS hero 느낌
- 지나치게 화려한 glow/bloom

이미지별 역할:

1. scene4-sky-backdrop.png
Scene4의 가장 뒤 배경이다.
화면 전체를 덮는 sky/background 레이어로 사용한다.
object-fit: cover로 viewport 전체를 채운다.
거의 고정에 가깝게 두고, 필요하면 아주 약한 scale/pan만 준다.
이 위에 Three.js 미세 입자나 대기 효과를 얹는다.

2. scene4-horizon-glow.png
지평선 뒤쪽의 얇은 대기광이다.
sky와 surface 사이를 자연스럽게 이어주는 완충 레이어다.
horizon ridge보다 뒤에 배치한다.
opacity는 낮게 유지하고, 착륙 후반에도 은은하게 남긴다.
강한 오로라나 마법 glow처럼 보이면 안 된다.

3. scene4-horizon-ridge-WIP.png
먼 지평선 산등성이 레이어다.
horizon glow 앞, surface backdrop 뒤에 배치한다.
배경 원근감과 외계 표면의 거리감을 만든다.
파일명이 WIP이므로 실제 배치 후 너무 강하거나 거슬리면 opacity를 낮추거나 sky/surface 사이에 자연스럽게 묻히게 조정한다.

4. scene4-surface-backdrop.png
착륙할 행성 표면이다.
화면 하단에 고정한다.
rocket, rocket-fire, landing dust의 위치 기준이다.
최종 장면에서 로켓이 실제 표면 위에 서 있는 접지감을 만들어야 한다.
너무 많이 움직이지 말고 안정적인 기준선 역할을 하게 한다.

5. rocket.png
Scene4의 주 피사체다.
화면 위쪽에서 천천히 내려와 중앙 착륙 지점에 정렬된다.
초반에는 작고 멀게 보일 수 있고, 하강하면서 살짝 scale이 증가해도 된다.
최종 상태에서는 회전 없이 거의 수직으로 안정적으로 멈춘다.
급강하나 폭발 착륙처럼 보이면 안 된다.

6. rocket-fire.png
엔진 불꽃이다.
engine-glow-soft가 아니라 실제 rocket-fire 이미지이므로 과하게 쓰면 안 된다.
로켓 바로 아래에 붙인다.
착륙 직전에는 opacity/scale이 약간 증가해 추진력을 표현한다.
touchdown 이후에는 빠르게 약해지거나 거의 꺼져야 한다.
최종 장면에서는 fire가 거의 보이지 않거나 아주 약하게만 남아야 한다.
큰 화염, 화염 기둥, 폭발처럼 보이면 실패다.

7. scene4-landing-dust-soft.png
착륙 먼지 레이어다.
surface 바로 위, rocket-fire/rocket 중심과 정확히 맞춘다.
touchdown 순간 opacity를 올리고 scaleX를 키워 낮고 넓게 퍼지게 한다.
scaleY는 거의 키우지 않는다.
위로 솟는 smoke column처럼 보이면 안 된다.
마지막에는 낮은 opacity로 잔잔하게 남겨 calm landing의 접지감을 만든다.

8. scene4-crystal-cluster-01.png
외계 행성 지형 장식이다.
좌하단 또는 우하단 foreground 쪽에 배치한다.
중앙 로켓 착륙 영역을 방해하지 않는다.
약간의 parallax를 줄 수 있다.
너무 크게 배치해서 로켓보다 시선을 뺏으면 안 된다.

9. scene4-crystal-cluster-02.png
두 번째 외계 지형 장식이다.
cluster-01과 반대편 또는 더 뒤쪽에 배치한다.
cluster-01보다 작거나 멀리 보이게 배치해 거리감을 만든다.
모바일에서는 둘 중 하나를 숨기거나 둘 다 작게 줄여도 된다.
중앙 착륙 영역을 침범하지 않아야 한다.

권장 z-index 레이어 순서:

0  scene4-sky-backdrop
1  Three.js background effects
2  scene4-horizon-glow
3  scene4-horizon-ridge-WIP
4  scene4-surface-backdrop
5  scene4-crystal-cluster-02
6  scene4-crystal-cluster-01
7  scene4-landing-dust-soft
8  rocket-fire
9  rocket
10 Three.js foreground particles / subtle light
11 text copy, if any

실제 합성에서 rocket-fire가 dust에 너무 묻히면 z-index는 조정해도 된다.
기본 원칙은 surface 위에 dust, dust 위나 사이에 fire, fire 위에 rocket이다.

Scene4 애니메이션 흐름:

Phase 1 — 외계 표면 진입
사용 이미지:
- scene4-sky-backdrop.png
- scene4-horizon-glow.png
- scene4-horizon-ridge-WIP.png
- scene4-surface-backdrop.png

연출:
sky backdrop은 처음부터 깔린다.
horizon glow가 천천히 드러난다.
horizon ridge가 살짝 올라오거나 opacity가 증가한다.
surface backdrop이 하단에서 안정적으로 자리 잡는다.

목표:
여기는 이미 외계 행성 근처이고, 이제 착륙 장면이 시작된다는 느낌.

Phase 2 — 로켓 접근
사용 이미지:
- rocket.png
- rocket-fire.png

연출:
rocket은 화면 위쪽에서 등장한다.
처음에는 작고 약간 멀게 보인다.
스크롤이 진행되며 아래로 내려오고 scale이 살짝 증가한다.
rocket-fire는 초반에는 약하거나 안 보이다가, 중반부터 켜진다.

목표:
로켓이 착륙 지점으로 접근하고 있다는 흐름을 만든다.

Phase 3 — 착륙 직전 감속
사용 이미지:
- rocket.png
- rocket-fire.png
- scene4-surface-backdrop.png

연출:
rocket의 하강 속도가 느려지는 느낌을 준다.
rocket-fire opacity/scale이 일시적으로 증가한다.
rocket이 착륙 지점 중앙에 정확히 정렬된다.
surface와의 거리가 점점 줄어든다.

목표:
touchdown 직전의 조용한 긴장감을 만든다.
과격하거나 폭발적인 느낌은 피한다.

Phase 4 — touchdown
사용 이미지:
- rocket.png
- rocket-fire.png
- scene4-landing-dust-soft.png

연출:
rocket이 최종 위치에 멈춘다.
landing dust가 갑자기 폭발하듯 나타나는 것이 아니라, 짧고 낮게 퍼진다.
dust는 scaleX 중심으로 좌우로 넓어진다.
scaleY는 거의 키우지 않는다.
rocket-fire는 touchdown 직후 빠르게 약해진다.

목표:
바닥에 닿았다는 접지감을 만든다.
폭발이 아니라 부드러운 착륙이어야 한다.

Phase 5 — calm ending
사용 이미지:
- 전체 배경
- rocket.png
- scene4-landing-dust-soft.png
- crystal clusters

연출:
rocket은 완전히 정지한다.
rocket-fire는 거의 꺼진다.
dust는 낮은 opacity로 남는다.
horizon glow는 은은하게 유지된다.
Three.js 입자는 아주 천천히 흐른다.
마지막 프레임은 안정적이고 조용해야 한다.

목표:
긴 여정 끝의 도착감.

Three.js로 추가할 효과:

Three.js는 주연이 아니라 대기감 보강용이다.
이미지 배치와 GSAP 애니메이션이 먼저 완성된 뒤 마지막에 얹어라.

1. 하늘 깊이감용 미세 입자
목적:
sky-backdrop 위에 미세한 공기 입자/별빛 같은 깊이를 추가한다.
정적인 PNG 배경이 덜 평면적으로 보이게 한다.

형태:
작은 점 입자, 낮은 opacity, 느린 parallax, cyan/blue-gray 계열.

주의:
별 폭풍처럼 보이면 안 된다.
Scene3의 우주 비행 느낌과 겹치면 안 된다.
Scene4에서는 표면 근처의 대기 입자처럼 보여야 한다.

2. horizon atmospheric shimmer
목적:
horizon glow 주변에 아주 약한 공기 흔들림을 추가한다.
alien atmosphere 느낌을 보강한다.

형태:
얇은 수평 계열의 부드러운 shader glow.
아주 낮은 alpha.
느린 noise movement.

주의:
강한 오로라처럼 보이면 안 된다.
horizon-glow PNG를 보조하는 정도만 사용한다.

3. 착륙 순간 dust particles
목적:
landing-dust-soft PNG에 약간의 생동감을 추가한다.
착륙 순간 몇 개의 작은 먼지 입자가 바닥 근처에서 튀고 가라앉게 한다.

형태:
작은 particle points.
로켓 하단 중심에서 좌우로 낮게 퍼짐.
높이는 낮게 제한.
짧은 시간만 활성.

주의:
dust PNG가 주 역할이다.
Three.js dust는 보조만 한다.
위로 높게 솟으면 smoke/explosion처럼 보이므로 금지.

4. rocket/fire light interaction
목적:
rocket-fire가 켜질 때 주변 dust/surface에 약한 빛이 있는 듯한 느낌을 준다.
PNG fire를 더 자연스럽게 합성한다.

형태:
작은 point light 느낌.
짧은 pulse.
fire asset 색에 맞춘 약한 빛.

주의:
실제 조명처럼 과하게 번지면 안 된다.
landing-dust가 빛나는 마법 가루처럼 보이면 실패다.

5. foreground floating motes
목적:
마지막 착륙 장면에 미세한 먼지 잔류감을 만든다.
정지 화면이 죽어 보이지 않게 한다.

형태:
매우 적은 수의 느린 입자.
화면 하단 위주.
opacity 낮음.

주의:
눈/비처럼 보이면 안 된다.
data rain처럼 보이면 안 된다.
사용량은 아주 적게 한다.

Crystal cluster 배치 계획:

scene4-crystal-cluster-01.png:
좌하단 또는 우하단 foreground에 약간 크게 배치한다.

scene4-crystal-cluster-02.png:
반대편 하단 또는 더 뒤쪽 midground에 작게 배치한다.

중앙 영역은 비워야 한다.
중앙에는 rocket, rocket-fire, landing-dust가 들어간다.
crystal이 이 영역을 침범하면 안 된다.

텍스트 사용 여부:

Scene4에 텍스트가 필요하다면 아주 절제한다.
텍스트는 좌상단 또는 우상단에 배치하고, 로켓 착륙 중심부를 피한다.
착륙 직전 또는 착륙 완료 후에 등장시키는 것이 좋다.
중앙 대형 텍스트, 로켓 위를 덮는 텍스트, SaaS식 과한 헤드라인은 피한다.
Scene4의 주인공은 텍스트가 아니라 착륙 장면이다.

구현 우선순위:

1순위 — 정적 합성
먼저 애니메이션 없이 모든 레이어가 맞아야 한다.

확인할 것:
- sky-backdrop이 화면 전체를 자연스럽게 덮는가
- surface-backdrop이 하단에 정확히 앉는가
- horizon-glow와 horizon-ridge가 자연스럽게 이어지는가
- rocket 최종 위치가 surface 위에 맞는가
- rocket-fire가 rocket 아래에 정확히 붙는가
- landing-dust 중심이 rocket-fire 중심과 맞는가
- crystal들이 중앙 착륙 영역을 방해하지 않는가

2순위 — GSAP ScrollTrigger 애니메이션
정적 합성이 맞은 뒤에만 스크롤 애니메이션을 넣는다.

우선순위:
- surface/horizon 등장
- rocket 하강
- rocket-fire 점등
- landing-dust 발생
- calm ending hold

기존 프로젝트의 Scene1~3 ScrollTrigger 구조와 일관되게 작성한다.
기존 프로젝트가 reverse scroll 구조라면 Scene4도 그 방식에 맞춘다.
Scene4만 스크롤 방향이나 pin 처리 방식이 튀면 안 된다.

3순위 — Three.js 이펙트
Three.js는 마지막에 얹는다.

우선순위:
- 하늘 미세 입자
- horizon shimmer
- 착륙 먼지 보조 particle
- fire 주변 약한 light
- foreground motes

처음부터 Three.js를 넣지 마라.
먼저 이미지 배치와 GSAP 타임라인이 맞아야 한다.

최종 체크 기준:
- 로켓이 외계 행성 표면에 조용히 내려앉는다.
- rocket-fire는 착륙 직전까지만 힘을 주고 이후 약해진다.
- landing-dust는 낮고 넓게 바닥을 따라 퍼진다.
- horizon glow와 ridge가 배경 깊이를 만든다.
- crystal cluster는 외계 행성 분위기를 보강하지만 주인공이 되지 않는다.
- Three.js 효과는 보이지만 과시적이지 않다.
- 마지막 프레임은 차분하고 완성감 있다.
