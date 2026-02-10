export default {
  // Navigation tooltips
  "notice": "공지사항",
  "roadmap": "로드맵",
  "download binary": "다운로드",
  "byeol language guide": "언어 가이드",
  "playground": "온라인 인터프리터",
  "c++ reference": "C++ 레퍼런스",
  "toggle dark mode": "다크 모드 전환",
  "toggle language": "언어 전환",

  // Common UI elements
  "home": "홈",
  "menu": "메뉴",

  // play:
  "power": "전원",
  "verbose": "상세한 로깅",
  "my codes": "내 코드",
  "hello world": "헬로 월드",
  "mike's clones": "복제 인간 마이크",

  // home:
  "The Byeol Programming Language": "'별' 프로그래밍 언어",
  "start": "시작하기",

  // download:
  "packaging message": "=ㅅ= 열심히 포장 중...",
  "thank you message": ">_<  다운 받아줘서 고마워!",
  "download": "다운로드",
  "windows": "윈도우",
  "ubuntu": "우분투",
  "mac": "맥",
  "feature-title1": "장난감처럼 즐거운 언어",
  "feature-desc1": "Byeol은 개발자가 코딩하는 과정 자체를 즐겁게 느끼도록 만드는 것을 목표로 합니다. 마치 장난감을 가지고 놀 듯, 자꾸만 손이 가고 계속해서 무언가를 만들고 싶어지는 언어입니다.",
  "feature-title2": "일관성: 암기가 아닌 이해",
  "feature-desc2": "Byeol은 예외를 싫어합니다. 같은 기능이라면 어떤 상황에서도 같은 문법으로 동작해야 합니다. 이를 통해 사용자는 문법을 단순 암기하는 것이 아니라, 언어 설계자의 의도를 파악하고 원리를 이해할 수 있습니다.",
  "feature-title3": "코드와 시각화의 결합",
  "feature-desc3": "Byeol은 소스 코드를 실행 가능한 트리 구조(AST)로 유지하며 실행합니다. 이를 통해 IDE는 실행 중인 프로그램의 구조를 실시간으로 시각화하여 보여줄 수 있습니다. [AST 시각화 이미지]",

  // roadmap:
  'milestone-intro-title': '야생의 로드맵이 나타났다!',
  'milestone-intro-desc': `
    Byeol 언어 개발 과정을 작은 모험으로 담았습니다.<br/>
    길을 따라 놓은 표지판이나 마을 등을 잘 한번 살펴보세요.<br/>
    지나온 발자취와 앞으로 향할 목적지를 찾을 수 있습니다.<br/>
    <br/>
            -- kniz
  `,

  'milestone1-title': 'v0.0.1 Seed Update',
  'milestone1-desc': `
    2018년 11월 17일 릴리즈<br/>
    <br/>
    새로운 첫 시작, 첫 발자국<br/>
    이때는 아직 World 라는 가칭을 사용하였음.<br/>
    로깅을 위한 컴포넌트와 preference를 수집하기 위한 컴포넌트가 있는 정도.<br/>
    doc/protos에 전체적인 설계가 어느정도 잡혀있는 상태.<br/>
    doc/worldlang에 기본적인 언어 문법은 정의했음.<br/>
    문법은 이후로 약 7번에 걸쳐서 수정을 거듭하게 됨.
  `,

  'milestone0-title': 'Node Engine Dust',
  'milestone0-desc': `
    2009년 여름 시작<br/>
    <br/>
    2015년 개발 중지<br/>
    c++를 처음 익히고, 게임개발 하면서 엔진으로 만들기 시작.<br/>
    해당 엔진에는 GUI적으로 객체를 보면서 값이나 로직을 변경하는 기능이 있었고, 이걸 살려서 프로그램을 만들고 싶다는 아이디어로 시작<br/>
    당초 3년 정도 생각했으나, 개발 프로세스가 주먹구구식이어서 설계를 뒤엎는 경우가 많이 생김.<br/>
    이때부터 TDD나 UT나 로깅 등, 개발속도를 줄이기 위한 노력을 기울이게 됨<br/>
    <br/>
    로깅하는 도구가 전혀 없어서 문제가 생기면 매번 디버거를 켰고, MSVC 여서 그런지 증분빌드가 잘 안돼서 간단한 이슈 수정도 매우 오래 걸림.<br/>
    UT도 없어서, 직접 조작을 하면서 QE를 직접했음. 그러다보니 체계적인 테스트가 되지 않아서, 해결했다고 생각한 문제가 해결되지 않은 경우도 많이 맞딱드림<br/>
    <br/>
    한동한 개발하고 동작하는 걸 직접 조작하고 나서야, 기본적인 아이디어의 문제점이나 한계를 파악하게 되었고, 비슷한 아이디어를 채용한 사례들을 찾게 됨<br/>
    그때서야 스터디와 논문등을 보면서 VPL의 한계점을 받아들이게 되었고 이 방식으로는 기존 프로그래밍 방식을 개선할 수 없다는 결론에 도달했음.<br/>
    결과, 공개하지 않고 폐기.<br/>
    <br/>
    노력보다는 방향이 중요하다는 걸 너무 긴 시간을 걸쳐서 깨닫게 된 프로젝트.<br/>
  `,

  'milestone-sign1-title': '낡은 표지판',
  'milestone-sign1-desc': `
    어딘가 숨겨진 프로젝트가 있다는데 찾으셨나요?
  `,

  'milestone2-title': 'v0.0.3 Seed Update Final',
  'milestone2-desc': `
    2019년 2월 13일<br/>
    <br/>
    meta 모듈, memlite 모듈 등 지금까지도 쓰고 있는 하위 모듈의 대다수가 이미 만들어짐.<br/>
    <br/>
    core 모듈 작업 도중 이때까지는 다소 러프하게 진행하고 있었으나, 좀 더 스터디가 필요하다고 느껴서 일단 개발 중지함<br/>
    이후, 논문도 계속 보고 이론도 배우고 문법도 갈아엎고, core 설계도 700KB 단위로 노트 작성하게 됨.<br/>
    doc/ref/worldlang-spec.note 에서 확인 가능함.<br/>
    <br/>
    그때의 설계는 지금의 구조와는 매우 다르지만, spec과 설계를 미리 해보며 경험을 미리 축적해볼 수 있었음.</br>
  `,

  'milestone3-title': "v0.1.7 Essence Update 0.7 Final",
  'milestone3-desc': `
    2022년 4월 21일<br/>
    <br/>
    확정된 언어 스펙과 설계를 마치고 본격적으로 core 모듈 개발을 시작함.<br/>
    그 첫번째가 되는 Essence 의 마지막 업데이트.<br/>
    <br/>
    Seed Update에서 만들어 두었던 meta, memlite, clog 등을 migration 해서 옮겼고<br/>
    core 모듈과 cli 부분 등 대부분의 핵심 부분은 잡아놓음.<br/>
    확장성 있게 추가로 expr나 AST를 추가할 수 있도록 뼈대를 잡아놓는 거의 중점을 뒀다.
  `,

  'milestone5-title': '빛바랜 표지판',
  'milestone5-desc': `
    ←  웹 사이트<br/>
    ↓  다음 마일스톤
  `,

  'milestone4-title': 'website',
  'milestone4-desc': `
    언어 컨셉에 맞도록, 게임 / 레트로 / 픽셀 / 장난감 스러운 디자인으로 꾸밈.<br/>
    jekyll에 Minimal Mistkes를 기반으로 했으나, 디자인적 요소와 배경 애니메이션,
    doxygen 통합 등등 거의 새로 만들다시피 개조하였음.<br/>
    <br/>
    다크 모드를 지원하며, Byeol이라는 명칭에 걸맞게 다크 모드를 하면 배경이 밤이 되도록 변경 함.<br/>
    언어는 한국어와 영어를 지원하며, 문서가 2벌씩 작성되어야 하므로 당장은 다른 언어 지원할 계획이 없음.<br/>
    <br/>
    태블릿 / PC / 모바일폰 등 3개의 반응형 레이아웃을 적용됨<br/>
    웹사이트 자체는 약 3개월 정도 걸린 것 같으나, 컨텐츠를 채우고 문서를 작성하는데 거의 반년 이상 걸리고 있음.<br/>
    글쓰는게 너무 괴롭고 지루하다.
  `,

  'milestone6-title': 'v0.2.x Mana Update',
  'milestone6-desc': `
    2026년 2월 4일 개발중<br/>
    <br/>
    CI 환경, 실행가능한 예제, 기여 가능한 문서, pack import와 export, pack을 등록하고 공유하는 hub, 웹사이트 등 기본적인 언어 개발 커뮤니티를 만드는 걸 목표로 하는 업데이트.<br/>
    기능적으로는 미 구현된 언어 스펙이 아직 많이 있지만, 그걸 다 하다가는 몇년을 더 해야할 것 같아서, 구현된 기본기능의 완성도를 최대한 높이고, 사람들의 참여를 이끌어서 개발 속도를 높이는 게 목표다.<br/>
    AI를 굴릴때도 문서를 작성해두니 상당히 퀄리티가 좋아졌다.<br/>
    <br/>
    TC를 integration, e2e, unittest로 세분화해서 피라미드 형태로 다듬었고, 2배 이상의 TC를 추가하고 커버리지 수집하는 부분을 손봤다.<br/>
    <br/>
    남은 Task는 CI 환경에서 배포가능한 macos package가 나오도록 할 것, 개발 환경 구축을 쉽게 할 것, 문서 작성 마무리, pack hub와 import export 기능, download 페이지 만들기가 남음.
  `,

  'milestone7-title': 'v0.3.x Spirit&Fairy Update',
  'milestone7-desc': `
    이 프로젝트의 핵심 아이디이인 C-REPL 구현이 목표다.<br/>
    이외에도 표준 라이브러리 추가, 언어 기능 추가 구현, 디버거도 필요하다.<br/>
  `,
};