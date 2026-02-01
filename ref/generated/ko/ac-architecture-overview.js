var ac_architecture_overview =
[
    [ "아키텍처 개요", "ac-architecture-overview.html#autotoc_md81", [
      [ "계층 구조", "ac-architecture-overview.html#autotoc_md82", null ]
    ] ],
    [ "indep 모듈 - 플랫폼 추상화 계층", "ad-architecture-indep.html", [
      [ "Early-return 패턴과 에러 처리", "ad-architecture-indep.html#autotoc_md85", null ],
      [ "WHEN 매크로", "ad-architecture-indep.html#autotoc_md87", null ],
      [ "tmay 클래스", "ad-architecture-indep.html#autotoc_md89", null ],
      [ "tres 클래스", "ad-architecture-indep.html#autotoc_md91", null ],
      [ "platformAPI 클래스", "ad-architecture-indep.html#autotoc_md93", [
        [ "buildFeature 클래스", "ad-architecture-indep.html#autotoc_md95", null ]
      ] ],
      [ "파일 시스템 - fsystem 클래스", "ad-architecture-indep.html#autotoc_md97", null ],
      [ "cpIter 클래스", "ad-architecture-indep.html#autotoc_md99", null ],
      [ "동적 라이브러리 로딩 - dlib 클래스", "ad-architecture-indep.html#autotoc_md101", null ],
      [ "end 클래스", "ad-architecture-indep.html#autotoc_md103", null ],
      [ "Side Func", "ad-architecture-indep.html#autotoc_md105", null ]
    ] ],
    [ "clog 모듈 - 로깅 시스템", "ae-architecture-clog.html", [
      [ "로깅 시스템 아키텍처", "ae-architecture-clog.html#autotoc_md108", null ],
      [ "로깅의 기본 사용법", "ae-architecture-clog.html#autotoc_md110", [
        [ "Scope 로깅 매크로", "ae-architecture-clog.html#autotoc_md112", null ]
      ] ],
      [ "richLog - 다형성 로깅", "ae-architecture-clog.html#autotoc_md114", [
        [ "핵심 알고리즘", "ae-architecture-clog.html#autotoc_md115", null ],
        [ "convert()", "ae-architecture-clog.html#autotoc_md116", null ],
        [ "wrap", "ae-architecture-clog.html#autotoc_md117", null ],
        [ "richLog 확장", "ae-architecture-clog.html#autotoc_md118", null ],
        [ "간략화된 주소값", "ae-architecture-clog.html#autotoc_md119", null ]
      ] ],
      [ "스트림 제어", "ae-architecture-clog.html#autotoc_md121", [
        [ "enablesZone 클래스", "ae-architecture-clog.html#autotoc_md122", null ]
      ] ],
      [ "필터링 시스템", "ae-architecture-clog.html#autotoc_md124", [
        [ "filterable 클래스", "ae-architecture-clog.html#autotoc_md125", null ],
        [ "filters 클래스", "ae-architecture-clog.html#autotoc_md126", null ],
        [ "errPassFilter 클래스", "ae-architecture-clog.html#autotoc_md127", null ]
      ] ],
      [ "정리", "ae-architecture-clog.html#autotoc_md129", null ]
    ] ],
    [ "meta 모듈 - 런타임 타입 시스템", "af-architecture-meta.html", [
      [ "type 클래스", "af-architecture-meta.html#autotoc_md132", [
        [ "기본 타입 식별", "af-architecture-meta.html#autotoc_md133", null ],
        [ "클래스 계층 관련 정보", "af-architecture-meta.html#autotoc_md134", null ],
        [ "인스턴스 생성", "af-architecture-meta.html#autotoc_md135", null ],
        [ "메타 타입 정보 관리", "af-architecture-meta.html#autotoc_md136", null ]
      ] ],
      [ "ttype<T> 클래스", "af-architecture-meta.html#autotoc_md138", null ],
      [ "메타 정보의 생성과 관리", "af-architecture-meta.html#autotoc_md140", [
        [ "메타 정보가 어떻게 생성되나", "af-architecture-meta.html#autotoc_md141", null ],
        [ "메타 정보 자동 생성", "af-architecture-meta.html#autotoc_md142", null ]
      ] ],
      [ "adam - 최상위 타입", "af-architecture-meta.html#autotoc_md144", null ],
      [ "메타 타입 확장하기", "af-architecture-meta.html#autotoc_md146", null ],
      [ "정리하기", "af-architecture-meta.html#autotoc_md148", null ]
    ] ],
    [ "memlite 모듈 - 커스텀 메모리 관리", "ag-architecture-memlite.html", [
      [ "바인딩 인터페이스", "ag-architecture-memlite.html#autotoc_md151", [
        [ "binder 클래스", "ag-architecture-memlite.html#autotoc_md152", null ],
        [ "기본 사용법", "ag-architecture-memlite.html#autotoc_md153", null ]
      ] ],
      [ "std::shared_ptr 대비 장점", "ag-architecture-memlite.html#autotoc_md155", [
        [ "reference counting 블록은 인스턴스 자체에 붙어있다", "ag-architecture-memlite.html#autotoc_md156", null ],
        [ "범용 바인더 제공", "ag-architecture-memlite.html#autotoc_md157", null ],
        [ "동적 타입 체킹", "ag-architecture-memlite.html#autotoc_md158", null ],
        [ "자체 메모리 풀 사용", "ag-architecture-memlite.html#autotoc_md159", null ],
        [ "속도 개선", "ag-architecture-memlite.html#autotoc_md160", null ],
        [ "추가 정보 제공", "ag-architecture-memlite.html#autotoc_md161", null ]
      ] ],
      [ "메모리 풀 패키지 개요", "ag-architecture-memlite.html#autotoc_md163", null ],
      [ "메모리 관리 컴포넌트", "ag-architecture-memlite.html#autotoc_md165", [
        [ "chunk - 최소 할당 단위", "ag-architecture-memlite.html#autotoc_md166", null ],
        [ "chunks - 다중 chunk 관리", "ag-architecture-memlite.html#autotoc_md167", null ],
        [ "pool - 크기별 메모리 관리", "ag-architecture-memlite.html#autotoc_md168", null ]
      ] ],
      [ "라이프 사이클 관리 컴포넌트", "ag-architecture-memlite.html#autotoc_md170", [
        [ "id 클래스", "ag-architecture-memlite.html#autotoc_md171", null ],
        [ "life 클래스", "ag-architecture-memlite.html#autotoc_md172", null ],
        [ "watcher 클래스", "ag-architecture-memlite.html#autotoc_md173", null ]
      ] ],
      [ "instance 클래스", "ag-architecture-memlite.html#autotoc_md175", null ],
      [ "instancer - 메모리 관리 조정자", "ag-architecture-memlite.html#autotoc_md177", null ],
      [ "메모리 관리 인터페이스", "ag-architecture-memlite.html#autotoc_md179", [
        [ "memoryHaver 클래스", "ag-architecture-memlite.html#autotoc_md180", null ],
        [ "allocator 클래스", "ag-architecture-memlite.html#autotoc_md181", null ]
      ] ],
      [ "정리하기", "ag-architecture-memlite.html#autotoc_md183", null ]
    ] ],
    [ "stela 모듈 - 경량 설정 언어", "ah-architecture-stela.html", [
      [ "stela 언어의 기본 기능", "ah-architecture-stela.html#autotoc_md187", [
        [ "stela 클래스", "ah-architecture-stela.html#autotoc_md188", null ],
        [ "nulStela 클래스 - Null Object 패턴", "ah-architecture-stela.html#autotoc_md189", null ],
        [ "valStela 클래스 - Scalar 값 표현", "ah-architecture-stela.html#autotoc_md190", null ],
        [ "verStela 클래스 - 버전 타입", "ah-architecture-stela.html#autotoc_md191", null ]
      ] ],
      [ "stela 파서 구조", "ah-architecture-stela.html#autotoc_md193", [
        [ "stelaParser 클래스 - 파싱 진입점", "ah-architecture-stela.html#autotoc_md194", null ]
      ] ],
      [ "Indentation 처리", "ah-architecture-stela.html#autotoc_md196", [
        [ "indentation rule", "ah-architecture-stela.html#autotoc_md197", null ],
        [ "tokenDispatcher", "ah-architecture-stela.html#autotoc_md198", null ],
        [ "stelaTokenScan 클래스 - 스캔 모드 전략", "ah-architecture-stela.html#autotoc_md199", null ],
        [ "stelaSmartDedent 클래스 - Scope 관리", "ah-architecture-stela.html#autotoc_md200", null ]
      ] ],
      [ "정리하기", "ah-architecture-stela.html#autotoc_md202", null ]
    ] ],
    [ "core 모듈 - 언어 구현의 핵심", "ai-architecture-core.html", [
      [ "주요 흐름", "ai-architecture-core.html#autotoc_md204", null ],
      [ "개요를 마무리하며", "ai-architecture-core.html#autotoc_md206", null ],
      [ "Native와 Scripted", "ai-architecture-core.html#autotoc_md208", null ],
      [ "AST 기본 구조", "ai-architecture-core.html#autotoc_md210", [
        [ "node 클래스 - AST의 기반", "ai-architecture-core.html#autotoc_md211", null ],
        [ "src, srcFile 클래스 - 소스 위치 정보", "ai-architecture-core.html#autotoc_md223", null ],
        [ "args 클래스 - 함수 인자", "ai-architecture-core.html#autotoc_md225", null ],
        [ "param 클래스 - 파라메터 정의", "ai-architecture-core.html#autotoc_md227", null ]
      ] ],
      [ "객체 모델", "ai-architecture-core.html#autotoc_md229", [
        [ "baseObj 클래스 - 객체의 기반", "ai-architecture-core.html#autotoc_md231", null ],
        [ "obj 클래스 - script 객체", "ai-architecture-core.html#autotoc_md236", null ],
        [ "origin 클래스 - 타입의 원본", "ai-architecture-core.html#autotoc_md239", null ],
        [ "tbaseObjOrigin 클래스 - baseObj Origin 템플릿", "ai-architecture-core.html#autotoc_md242", null ],
        [ "modifier 클래스 - 접근 제한자", "ai-architecture-core.html#autotoc_md245", null ],
        [ "defaultCopyCtor 클래스 - 기본 복사 생성자", "ai-architecture-core.html#autotoc_md247", null ],
        [ "immutableTactic 클래스 - Immutable 타입 처리", "ai-architecture-core.html#autotoc_md249", null ],
        [ "manifest 클래스 - Pack 메타데이터", "ai-architecture-core.html#autotoc_md251", null ],
        [ "tmock 클래스 - Proxy 객체", "ai-architecture-core.html#autotoc_md253", null ]
      ] ],
      [ "표현식 (Expression) 시스템", "ai-architecture-core.html#autotoc_md255", [
        [ "FBOExpr, FUOExpr 클래스 - 연산자 표현식", "ai-architecture-core.html#autotoc_md257", null ],
        [ "assignExpr 클래스 - 할당 표현식", "ai-architecture-core.html#autotoc_md259", null ],
        [ "blockExpr 클래스 - 블록 표현식", "ai-architecture-core.html#autotoc_md261", null ],
        [ "defArrayExpr 클래스 - 배열 리터럴", "ai-architecture-core.html#autotoc_md263", null ],
        [ "defNestedFuncExpr 클래스 - 중첩 함수 정의", "ai-architecture-core.html#autotoc_md265", null ],
        [ "defSeqExpr 클래스 - 시퀀스 표현식", "ai-architecture-core.html#autotoc_md267", null ],
        [ "endExpr 클래스 - End 키워드", "ai-architecture-core.html#autotoc_md269", null ],
        [ "retStateExpr 클래스 - 블록 종료 키워드", "ai-architecture-core.html#autotoc_md271", null ]
      ] ],
      [ "컨테이너 시스템", "ai-architecture-core.html#autotoc_md273", [
        [ "tucontainable, tbicontainable 클래스 - 컨테이너 인터페이스", "ai-architecture-core.html#autotoc_md274", null ],
        [ "tnchain 클래스 - Chain으로 연결되는 컨테이너", "ai-architecture-core.html#autotoc_md279", null ],
        [ "arr 클래스 - scripted 배열", "ai-architecture-core.html#autotoc_md283", null ],
        [ "nseq 클래스 - 범위형 컨테이너", "ai-architecture-core.html#autotoc_md285", null ],
        [ "smultimap 클래스 - 삽입 순서를 기억하는 Multimap", "ai-architecture-core.html#autotoc_md287", null ]
      ] ],
      [ "Generic 시스템", "ai-architecture-core.html#autotoc_md290", [
        [ "getGenericExpr 클래스 - Generic 타입 참조의 진입점", "ai-architecture-core.html#autotoc_md292", null ],
        [ "genericOrigin 클래스 - Generic 타입의 생성과 관리", "ai-architecture-core.html#autotoc_md294", null ],
        [ "generalizer 클래스 - Generic 타입의 구체화", "ai-architecture-core.html#autotoc_md296", null ]
      ] ],
      [ "Native-Script 브리징", "ai-architecture-core.html#autotoc_md298", [
        [ "tbridger 클래스 - Bridge 컴포넌트의 진입점", "ai-architecture-core.html#autotoc_md300", null ],
        [ "tbridge 클래스 - Native 클래스의 Script 표현", "ai-architecture-core.html#autotoc_md302", null ],
        [ "tmock 클래스 - Proxy와 Dummy 객체", "ai-architecture-core.html#autotoc_md304", null ]
      ] ],
      [ "스코프와 실행 컨텍스트", "ai-architecture-core.html#autotoc_md306", [
        [ "scope 클래스 - Symbol 저장소", "ai-architecture-core.html#autotoc_md308", null ],
        [ "frame 클래스 - Scope들의 동적 연결", "ai-architecture-core.html#autotoc_md314", null ],
        [ "frames 클래스 - Frame 적층 관리", "ai-architecture-core.html#autotoc_md317", null ],
        [ "thread 클래스 - 실행 흐름의 관리자", "ai-architecture-core.html#autotoc_md319", null ]
      ] ],
      [ "패키지 시스템", "ai-architecture-core.html#autotoc_md322", [
        [ "manifest 클래스 - Pack 메타데이터", "ai-architecture-core.html#autotoc_md324", null ],
        [ "slot 클래스 - Pack의 결과물", "ai-architecture-core.html#autotoc_md326", null ],
        [ "autoslot 클래스 - Lazy Pack 로딩", "ai-architecture-core.html#autotoc_md328", null ],
        [ "slotLoader 클래스 - Pack 로더", "ai-architecture-core.html#autotoc_md333", null ],
        [ "packLoading 클래스 - Pack 로딩 추상 클래스", "ai-architecture-core.html#autotoc_md336", null ],
        [ "cppPackLoading 클래스 - C++ Pack 로더", "ai-architecture-core.html#autotoc_md338", null ]
      ] ],
      [ "Visitor 패턴 및 AST 순회", "ai-architecture-core.html#autotoc_md340", [
        [ "visitor 클래스 - AST 순회의 핵심", "ai-architecture-core.html#autotoc_md342", null ],
        [ "graphVisitor 클래스 - AST 로깅", "ai-architecture-core.html#autotoc_md346", null ]
      ] ],
      [ "파싱", "ai-architecture-core.html#autotoc_md348", [
        [ "parser 클래스 - 파싱의 진입점", "ai-architecture-core.html#autotoc_md350", null ],
        [ "smartDedent, tokenScan 클래스 - Indentation 관리", "ai-architecture-core.html#autotoc_md353", null ],
        [ "srcSupply 클래스 - 소스 코드 공급 추상화", "ai-architecture-core.html#autotoc_md355", null ],
        [ "expander 클래스 - 사전 타입 추론", "ai-architecture-core.html#autotoc_md357", null ]
      ] ],
      [ "코드 검증", "ai-architecture-core.html#autotoc_md360", [
        [ "tworker 클래스 - 배치 작업의 기반", "ai-architecture-core.html#autotoc_md361", null ],
        [ "verifier 클래스 - 코드 검증", "ai-architecture-core.html#autotoc_md366", null ]
      ] ],
      [ "starter 클래스 - AST 실행", "ai-architecture-core.html#autotoc_md371", null ],
      [ "sigZone 클래스 - Signal 처리", "ai-architecture-core.html#autotoc_md374", null ],
      [ "에러 처리", "ai-architecture-core.html#autotoc_md376", [
        [ "baseErr 클래스 - 에러의 기반", "ai-architecture-core.html#autotoc_md377", null ],
        [ "errReport 클래스 - 에러 수집", "ai-architecture-core.html#autotoc_md378", null ],
        [ "에러 처리흐름 정리", "ai-architecture-core.html#autotoc_md380", null ]
      ] ],
      [ "core 모듈을 마무리 하며", "ai-architecture-core.html#autotoc_md382", null ]
    ] ],
    [ "frontend 모듈 - CLI 인터페이스", "aj-architecture-frontend.html", [
      [ "cli 클래스 - Frontend의 핵심", "aj-architecture-frontend.html#autotoc_md385", null ],
      [ "flag 클래스 - 명령줄 플래그 처리", "aj-architecture-frontend.html#autotoc_md387", [
        [ "기본 동작", "aj-architecture-frontend.html#autotoc_md388", null ],
        [ "정규식에 의한 패턴매칭", "aj-architecture-frontend.html#autotoc_md389", null ],
        [ "복수 패턴 매칭", "aj-architecture-frontend.html#autotoc_md390", null ],
        [ "복수의 flag 인자를 consume하기", "aj-architecture-frontend.html#autotoc_md391", null ],
        [ "중단 가능한 flag", "aj-architecture-frontend.html#autotoc_md392", null ]
      ] ],
      [ "긴 여정을 함께하느라 고생하셨습니다.", "aj-architecture-frontend.html#autotoc_md394", null ]
    ] ]
];