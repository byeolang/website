var ae_architecture_overview =
[
    [ "아키텍처 개요", "ae-architecture-overview.html#autotoc_md172", [
      [ "계층 구조", "ae-architecture-overview.html#autotoc_md173", null ]
    ] ],
    [ "indep 모듈 - 플랫폼 추상화 계층", "af-architecture-indep.html", [
      [ "Early-return 패턴과 에러 처리", "af-architecture-indep.html#autotoc_md176", null ],
      [ "WHEN 매크로", "af-architecture-indep.html#autotoc_md178", null ],
      [ "tmay 클래스", "af-architecture-indep.html#autotoc_md180", null ],
      [ "tres 클래스", "af-architecture-indep.html#autotoc_md182", null ],
      [ "platformAPI 클래스", "af-architecture-indep.html#autotoc_md184", [
        [ "buildFeature 클래스", "af-architecture-indep.html#autotoc_md186", null ]
      ] ],
      [ "파일 시스템 - fsystem 클래스", "af-architecture-indep.html#autotoc_md188", null ],
      [ "cpIter 클래스", "af-architecture-indep.html#autotoc_md190", null ],
      [ "동적 라이브러리 로딩 - dlib 클래스", "af-architecture-indep.html#autotoc_md192", null ],
      [ "end 클래스", "af-architecture-indep.html#autotoc_md194", null ],
      [ "Side Func", "af-architecture-indep.html#autotoc_md196", null ]
    ] ],
    [ "clog 모듈 - 로깅 시스템", "ag-architecture-clog.html", [
      [ "로깅 시스템 아키텍처", "ag-architecture-clog.html#autotoc_md199", null ],
      [ "로깅의 기본 사용법", "ag-architecture-clog.html#autotoc_md201", [
        [ "Scope 로깅 매크로", "ag-architecture-clog.html#autotoc_md203", null ]
      ] ],
      [ "richLog - 다형성 로깅", "ag-architecture-clog.html#autotoc_md205", [
        [ "핵심 알고리즘", "ag-architecture-clog.html#autotoc_md206", null ],
        [ "convert()", "ag-architecture-clog.html#autotoc_md207", null ],
        [ "wrap", "ag-architecture-clog.html#autotoc_md208", null ],
        [ "richLog 확장", "ag-architecture-clog.html#autotoc_md209", null ],
        [ "간략화된 주소값", "ag-architecture-clog.html#autotoc_md210", null ]
      ] ],
      [ "스트림 제어", "ag-architecture-clog.html#autotoc_md212", [
        [ "enablesZone 클래스", "ag-architecture-clog.html#autotoc_md213", null ]
      ] ],
      [ "필터링 시스템", "ag-architecture-clog.html#autotoc_md215", [
        [ "filterable 클래스", "ag-architecture-clog.html#autotoc_md216", null ],
        [ "filters 클래스", "ag-architecture-clog.html#autotoc_md217", null ],
        [ "errPassFilter 클래스", "ag-architecture-clog.html#autotoc_md218", null ]
      ] ],
      [ "정리", "ag-architecture-clog.html#autotoc_md220", null ]
    ] ],
    [ "meta 모듈 - 런타임 타입 시스템", "ah-architecture-meta.html", [
      [ "type 클래스", "ah-architecture-meta.html#autotoc_md223", [
        [ "기본 타입 식별", "ah-architecture-meta.html#autotoc_md224", null ],
        [ "클래스 계층 관련 정보", "ah-architecture-meta.html#autotoc_md225", null ],
        [ "인스턴스 생성", "ah-architecture-meta.html#autotoc_md226", null ],
        [ "메타 타입 정보 관리", "ah-architecture-meta.html#autotoc_md227", null ]
      ] ],
      [ "ttype<T> 클래스", "ah-architecture-meta.html#autotoc_md229", null ],
      [ "메타 정보의 생성과 관리", "ah-architecture-meta.html#autotoc_md231", [
        [ "메타 정보가 어떻게 생성되나", "ah-architecture-meta.html#autotoc_md232", null ],
        [ "메타 정보 자동 생성", "ah-architecture-meta.html#autotoc_md233", null ]
      ] ],
      [ "adam - 최상위 타입", "ah-architecture-meta.html#autotoc_md235", null ],
      [ "메타 타입 확장하기", "ah-architecture-meta.html#autotoc_md237", null ],
      [ "정리하기", "ah-architecture-meta.html#autotoc_md239", null ]
    ] ],
    [ "memlite 모듈 - 커스텀 메모리 관리", "ai-architecture-memlite.html", [
      [ "바인딩 인터페이스", "ai-architecture-memlite.html#autotoc_md242", [
        [ "binder 클래스", "ai-architecture-memlite.html#autotoc_md243", null ],
        [ "기본 사용법", "ai-architecture-memlite.html#autotoc_md244", null ]
      ] ],
      [ "std::shared_ptr 대비 장점", "ai-architecture-memlite.html#autotoc_md246", [
        [ "reference counting 블록은 인스턴스 자체에 붙어있다", "ai-architecture-memlite.html#autotoc_md247", null ],
        [ "범용 바인더 제공", "ai-architecture-memlite.html#autotoc_md248", null ],
        [ "동적 타입 체킹", "ai-architecture-memlite.html#autotoc_md249", null ],
        [ "자체 메모리 풀 사용", "ai-architecture-memlite.html#autotoc_md250", null ],
        [ "속도 개선", "ai-architecture-memlite.html#autotoc_md251", null ],
        [ "추가 정보 제공", "ai-architecture-memlite.html#autotoc_md252", null ]
      ] ],
      [ "메모리 풀 패키지 개요", "ai-architecture-memlite.html#autotoc_md254", null ],
      [ "메모리 관리 컴포넌트", "ai-architecture-memlite.html#autotoc_md256", [
        [ "chunk - 최소 할당 단위", "ai-architecture-memlite.html#autotoc_md257", null ],
        [ "chunks - 다중 chunk 관리", "ai-architecture-memlite.html#autotoc_md258", null ],
        [ "pool - 크기별 메모리 관리", "ai-architecture-memlite.html#autotoc_md259", null ]
      ] ],
      [ "라이프 사이클 관리 컴포넌트", "ai-architecture-memlite.html#autotoc_md261", [
        [ "id 클래스", "ai-architecture-memlite.html#autotoc_md262", null ],
        [ "life 클래스", "ai-architecture-memlite.html#autotoc_md263", null ],
        [ "watcher 클래스", "ai-architecture-memlite.html#autotoc_md264", null ]
      ] ],
      [ "instance 클래스", "ai-architecture-memlite.html#autotoc_md266", null ],
      [ "instancer - 메모리 관리 조정자", "ai-architecture-memlite.html#autotoc_md268", null ],
      [ "메모리 관리 인터페이스", "ai-architecture-memlite.html#autotoc_md270", [
        [ "memoryHaver 클래스", "ai-architecture-memlite.html#autotoc_md271", null ],
        [ "allocator 클래스", "ai-architecture-memlite.html#autotoc_md272", null ]
      ] ],
      [ "정리하기", "ai-architecture-memlite.html#autotoc_md274", null ]
    ] ],
    [ "stela 모듈 - 경량 설정 언어", "aj-architecture-stela.html", [
      [ "stela 언어의 기본 기능", "aj-architecture-stela.html#autotoc_md278", [
        [ "stela 클래스", "aj-architecture-stela.html#autotoc_md279", null ],
        [ "nulStela 클래스 - Null Object 패턴", "aj-architecture-stela.html#autotoc_md280", null ],
        [ "valStela 클래스 - Scalar 값 표현", "aj-architecture-stela.html#autotoc_md281", null ],
        [ "verStela 클래스 - 버전 타입", "aj-architecture-stela.html#autotoc_md282", null ]
      ] ],
      [ "stela 파서 구조", "aj-architecture-stela.html#autotoc_md284", [
        [ "stelaParser 클래스 - 파싱 진입점", "aj-architecture-stela.html#autotoc_md285", null ]
      ] ],
      [ "Indentation 처리", "aj-architecture-stela.html#autotoc_md287", [
        [ "indentation rule", "aj-architecture-stela.html#autotoc_md288", null ],
        [ "tokenDispatcher", "aj-architecture-stela.html#autotoc_md289", null ],
        [ "stelaTokenScan 클래스 - 스캔 모드 전략", "aj-architecture-stela.html#autotoc_md290", null ],
        [ "stelaSmartDedent 클래스 - Scope 관리", "aj-architecture-stela.html#autotoc_md291", null ]
      ] ],
      [ "정리하기", "aj-architecture-stela.html#autotoc_md293", null ]
    ] ],
    [ "core 모듈 - 언어 구현의 핵심", "ak-architecture-core.html", [
      [ "주요 흐름", "ak-architecture-core.html#autotoc_md295", null ],
      [ "개요를 마무리하며", "ak-architecture-core.html#autotoc_md297", null ],
      [ "Native와 Scripted", "ak-architecture-core.html#autotoc_md299", null ],
      [ "AST 기본 구조", "ak-architecture-core.html#autotoc_md301", [
        [ "node 클래스 - AST의 기반", "ak-architecture-core.html#autotoc_md302", null ],
        [ "src, srcFile 클래스 - 소스 위치 정보", "ak-architecture-core.html#autotoc_md314", null ],
        [ "args 클래스 - 함수 인자", "ak-architecture-core.html#autotoc_md316", null ],
        [ "param 클래스 - 파라메터 정의", "ak-architecture-core.html#autotoc_md318", null ]
      ] ],
      [ "객체 모델", "ak-architecture-core.html#autotoc_md320", [
        [ "baseObj 클래스 - 객체의 기반", "ak-architecture-core.html#autotoc_md322", null ],
        [ "obj 클래스 - script 객체", "ak-architecture-core.html#autotoc_md327", null ],
        [ "origin 클래스 - 타입의 원본", "ak-architecture-core.html#autotoc_md330", null ],
        [ "tbaseObjOrigin 클래스 - baseObj Origin 템플릿", "ak-architecture-core.html#autotoc_md333", null ],
        [ "modifier 클래스 - 접근 제한자", "ak-architecture-core.html#autotoc_md336", null ],
        [ "defaultCopyCtor 클래스 - 기본 복사 생성자", "ak-architecture-core.html#autotoc_md338", null ],
        [ "immutableTactic 클래스 - Immutable 타입 처리", "ak-architecture-core.html#autotoc_md340", null ],
        [ "manifest 클래스 - pod 메타데이터", "ak-architecture-core.html#autotoc_md342", null ],
        [ "tmock 클래스 - Proxy 객체", "ak-architecture-core.html#autotoc_md344", null ]
      ] ],
      [ "표현식 (Expression) 시스템", "ak-architecture-core.html#autotoc_md346", [
        [ "FBOExpr, FUOExpr 클래스 - 연산자 표현식", "ak-architecture-core.html#autotoc_md348", null ],
        [ "assignExpr 클래스 - 할당 표현식", "ak-architecture-core.html#autotoc_md350", null ],
        [ "blockExpr 클래스 - 블록 표현식", "ak-architecture-core.html#autotoc_md352", null ],
        [ "defArrayExpr 클래스 - 배열 리터럴", "ak-architecture-core.html#autotoc_md354", null ],
        [ "defNestedFuncExpr 클래스 - 중첩 함수 정의", "ak-architecture-core.html#autotoc_md356", null ],
        [ "defSeqExpr 클래스 - 시퀀스 표현식", "ak-architecture-core.html#autotoc_md358", null ],
        [ "endExpr 클래스 - End 키워드", "ak-architecture-core.html#autotoc_md360", null ],
        [ "retStateExpr 클래스 - 블록 종료 키워드", "ak-architecture-core.html#autotoc_md362", null ]
      ] ],
      [ "컨테이너 시스템", "ak-architecture-core.html#autotoc_md364", [
        [ "tucontainable, tbicontainable 클래스 - 컨테이너 인터페이스", "ak-architecture-core.html#autotoc_md365", null ],
        [ "tnchain 클래스 - Chain으로 연결되는 컨테이너", "ak-architecture-core.html#autotoc_md370", null ],
        [ "arr 클래스 - scripted 배열", "ak-architecture-core.html#autotoc_md374", null ],
        [ "nseq 클래스 - 범위형 컨테이너", "ak-architecture-core.html#autotoc_md376", null ],
        [ "smultimap 클래스 - 삽입 순서를 기억하는 Multimap", "ak-architecture-core.html#autotoc_md378", null ]
      ] ],
      [ "Generic 시스템", "ak-architecture-core.html#autotoc_md381", [
        [ "getGenericExpr 클래스 - Generic 타입 참조의 진입점", "ak-architecture-core.html#autotoc_md383", null ],
        [ "genericOrigin 클래스 - Generic 타입의 생성과 관리", "ak-architecture-core.html#autotoc_md385", null ],
        [ "generalizer 클래스 - Generic 타입의 구체화", "ak-architecture-core.html#autotoc_md387", null ]
      ] ],
      [ "Native-Script 브리징", "ak-architecture-core.html#autotoc_md389", [
        [ "tbridger 클래스 - Bridge 컴포넌트의 진입점", "ak-architecture-core.html#autotoc_md391", null ],
        [ "tbridge 클래스 - Native 클래스의 Script 표현", "ak-architecture-core.html#autotoc_md393", null ],
        [ "tmock 클래스 - Proxy와 Dummy 객체", "ak-architecture-core.html#autotoc_md395", null ]
      ] ],
      [ "스코프와 실행 컨텍스트", "ak-architecture-core.html#autotoc_md397", [
        [ "scope 클래스 - Symbol 저장소", "ak-architecture-core.html#autotoc_md399", null ],
        [ "frame 클래스 - Scope들의 동적 연결", "ak-architecture-core.html#autotoc_md405", null ],
        [ "frames 클래스 - Frame 적층 관리", "ak-architecture-core.html#autotoc_md408", null ],
        [ "thread 클래스 - 실행 흐름의 관리자", "ak-architecture-core.html#autotoc_md410", null ]
      ] ],
      [ "패키지 시스템", "ak-architecture-core.html#autotoc_md413", [
        [ "manifest 클래스 - pod 메타데이터", "ak-architecture-core.html#autotoc_md415", null ],
        [ "pod 클래스 - pod의 결과물", "ak-architecture-core.html#autotoc_md417", null ],
        [ "autopod 클래스 - Lazy pod 로딩", "ak-architecture-core.html#autotoc_md419", null ],
        [ "podLoader 클래스 - pod 로더", "ak-architecture-core.html#autotoc_md424", null ],
        [ "podLoading 클래스 - Pod 로딩 추상 클래스", "ak-architecture-core.html#autotoc_md427", null ],
        [ "cppPodLoading 클래스 - C++ Pod 로더", "ak-architecture-core.html#autotoc_md429", null ]
      ] ],
      [ "Visitor 패턴 및 AST 순회", "ak-architecture-core.html#autotoc_md431", [
        [ "visitor 클래스 - AST 순회의 핵심", "ak-architecture-core.html#autotoc_md433", null ],
        [ "graphVisitor 클래스 - AST 로깅", "ak-architecture-core.html#autotoc_md437", null ]
      ] ],
      [ "파싱", "ak-architecture-core.html#autotoc_md439", [
        [ "parser 클래스 - 파싱의 진입점", "ak-architecture-core.html#autotoc_md441", null ],
        [ "smartDedent, tokenScan 클래스 - Indentation 관리", "ak-architecture-core.html#autotoc_md444", null ],
        [ "srcSupply 클래스 - 소스 코드 공급 추상화", "ak-architecture-core.html#autotoc_md446", null ],
        [ "expander 클래스 - 사전 타입 추론", "ak-architecture-core.html#autotoc_md448", null ]
      ] ],
      [ "코드 검증", "ak-architecture-core.html#autotoc_md451", [
        [ "tworker 클래스 - 배치 작업의 기반", "ak-architecture-core.html#autotoc_md452", null ],
        [ "verifier 클래스 - 코드 검증", "ak-architecture-core.html#autotoc_md457", null ]
      ] ],
      [ "starter 클래스 - AST 실행", "ak-architecture-core.html#autotoc_md462", null ],
      [ "sigZone 클래스 - Signal 처리", "ak-architecture-core.html#autotoc_md465", null ],
      [ "에러 처리", "ak-architecture-core.html#autotoc_md467", [
        [ "baseErr 클래스 - 에러의 기반", "ak-architecture-core.html#autotoc_md468", null ],
        [ "errReport 클래스 - 에러 수집", "ak-architecture-core.html#autotoc_md469", null ],
        [ "에러 처리흐름 정리", "ak-architecture-core.html#autotoc_md471", null ]
      ] ],
      [ "core 모듈을 마무리 하며", "ak-architecture-core.html#autotoc_md473", null ]
    ] ],
    [ "frontend 모듈 - CLI 인터페이스", "al-architecture-frontend.html", [
      [ "cli 클래스 - Frontend의 핵심", "al-architecture-frontend.html#autotoc_md476", null ],
      [ "flag 클래스 - 명령줄 플래그 처리", "al-architecture-frontend.html#autotoc_md478", [
        [ "기본 동작", "al-architecture-frontend.html#autotoc_md479", null ],
        [ "정규식에 의한 패턴매칭", "al-architecture-frontend.html#autotoc_md480", null ],
        [ "복수 패턴 매칭", "al-architecture-frontend.html#autotoc_md481", null ],
        [ "복수의 flag 인자를 consume하기", "al-architecture-frontend.html#autotoc_md482", null ],
        [ "중단 가능한 flag", "al-architecture-frontend.html#autotoc_md483", null ]
      ] ],
      [ "긴 여정을 함께하느라 고생하셨습니다.", "al-architecture-frontend.html#autotoc_md485", null ]
    ] ]
];