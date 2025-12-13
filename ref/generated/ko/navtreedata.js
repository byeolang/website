/*
 @licstart  The following is the entire license notice for the JavaScript code in this file.

 The MIT License (MIT)

 Copyright (C) 1997-2020 by Dimitri van Heesch

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 and associated documentation files (the "Software"), to deal in the Software without restriction,
 including without limitation the rights to use, copy, modify, merge, publish, distribute,
 sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or
 substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 @licend  The above is the entire license notice for the JavaScript code in this file
*/
var NAVTREE =
[
  [ "byeol", "index.html", [
    [ "안녕하세요.", "index.html#autotoc_md180", null ],
    [ "아키텍쳐와 설계", "architecture-and-class-design.html", [
      [ "소개", "architecture-and-class-design.html#autotoc_md0", null ],
      [ "아키텍처 개요", "architecture-and-class-design.html#autotoc_md1", [
        [ "계층 구조", "architecture-and-class-design.html#autotoc_md2", null ]
      ] ],
      [ "indep 모듈 - 플랫폼 추상화 계층", "architecture-and-class-design.html#autotoc_md3", [
        [ "Early-return 패턴과 에러 처리", "architecture-and-class-design.html#autotoc_md4", [
          [ "WHEN 매크로", "architecture-and-class-design.html#autotoc_md5", null ],
          [ "tmay 클래스", "architecture-and-class-design.html#autotoc_md6", null ],
          [ "tres 클래스", "architecture-and-class-design.html#autotoc_md7", null ]
        ] ],
        [ "플랫폼 추상화", "architecture-and-class-design.html#autotoc_md8", [
          [ "platformAPI 클래스", "architecture-and-class-design.html#autotoc_md9", null ],
          [ "buildFeature 클래스", "architecture-and-class-design.html#autotoc_md10", null ]
        ] ],
        [ "파일 시스템", "architecture-and-class-design.html#autotoc_md11", [
          [ "fsystem 클래스", "architecture-and-class-design.html#autotoc_md12", null ]
        ] ],
        [ "문자열 처리", "architecture-and-class-design.html#autotoc_md13", [
          [ "cpIter 클래스", "architecture-and-class-design.html#autotoc_md14", null ]
        ] ],
        [ "동적 라이브러리 로딩", "architecture-and-class-design.html#autotoc_md15", [
          [ "dlib 클래스", "architecture-and-class-design.html#autotoc_md16", null ]
        ] ],
        [ "기타 유틸리티", "architecture-and-class-design.html#autotoc_md17", [
          [ "end 클래스", "architecture-and-class-design.html#autotoc_md18", null ]
        ] ]
      ] ],
      [ "clog 모듈 - 로깅 시스템", "architecture-and-class-design.html#autotoc_md19", [
        [ "로깅의 기본 사용법", "architecture-and-class-design.html#autotoc_md20", [
          [ "logger 클래스", "architecture-and-class-design.html#autotoc_md21", null ]
        ] ],
        [ "로깅 시스템 아키텍처", "architecture-and-class-design.html#autotoc_md22", [
          [ "stream 클래스", "architecture-and-class-design.html#autotoc_md23", null ]
        ] ],
        [ "로깅 매크로 시스템", "architecture-and-class-design.html#autotoc_md24", [
          [ "간략화된 주소값", "architecture-and-class-design.html#autotoc_md25", null ]
        ] ],
        [ "richLog - 다형성 로깅", "architecture-and-class-design.html#autotoc_md26", [
          [ "convert()", "architecture-and-class-design.html#autotoc_md27", null ],
          [ "wrap", "architecture-and-class-design.html#autotoc_md28", null ],
          [ "richLog 확장 예제", "architecture-and-class-design.html#autotoc_md29", null ]
        ] ],
        [ "스트림 제어", "architecture-and-class-design.html#autotoc_md30", [
          [ "enablesZone 클래스", "architecture-and-class-design.html#autotoc_md31", null ]
        ] ],
        [ "필터링 시스템", "architecture-and-class-design.html#autotoc_md32", [
          [ "filterable 클래스", "architecture-and-class-design.html#autotoc_md33", null ],
          [ "filters 클래스", "architecture-and-class-design.html#autotoc_md34", null ],
          [ "errPassFilter 클래스", "architecture-and-class-design.html#autotoc_md35", null ]
        ] ]
      ] ],
      [ "meta 모듈 - 런타임 타입 시스템", "architecture-and-class-design.html#autotoc_md36", [
        [ "메타 시스템 개요", "architecture-and-class-design.html#autotoc_md37", null ],
        [ "타입 정보 사용하기", "architecture-and-class-design.html#autotoc_md38", [
          [ "ttype<T> 클래스", "architecture-and-class-design.html#autotoc_md39", null ]
        ] ],
        [ "type 클래스의 기능", "architecture-and-class-design.html#autotoc_md40", [
          [ "기본 타입 식별", "architecture-and-class-design.html#autotoc_md41", null ],
          [ "클래스 계층 관련 정보", "architecture-and-class-design.html#autotoc_md42", null ],
          [ "인스턴스 생성", "architecture-and-class-design.html#autotoc_md43", null ],
          [ "메타 타입 정보 관리", "architecture-and-class-design.html#autotoc_md44", null ]
        ] ],
        [ "메타 정보의 생성과 관리", "architecture-and-class-design.html#autotoc_md45", [
          [ "메타 정보가 어떻게 생성되나", "architecture-and-class-design.html#autotoc_md46", null ],
          [ "메타 정보 자동 생성", "architecture-and-class-design.html#autotoc_md47", null ]
        ] ],
        [ "adam - 최상위 타입", "architecture-and-class-design.html#autotoc_md48", null ],
        [ "메타 타입 확장하기", "architecture-and-class-design.html#autotoc_md49", null ]
      ] ],
      [ "memlite 모듈 - 커스텀 메모리 관리", "architecture-and-class-design.html#autotoc_md50", [
        [ "바인딩 시스템 사용하기", "architecture-and-class-design.html#autotoc_md51", [
          [ "binder 클래스", "architecture-and-class-design.html#autotoc_md52", null ],
          [ "기본 사용법", "architecture-and-class-design.html#autotoc_md53", null ]
        ] ],
        [ "std::shared_ptr 대비 장점", "architecture-and-class-design.html#autotoc_md54", [
          [ "reference counting 블록은 인스턴스 자체에 붙어있다", "architecture-and-class-design.html#autotoc_md55", null ],
          [ "ADT 제공", "architecture-and-class-design.html#autotoc_md56", null ],
          [ "동적 타입 체킹", "architecture-and-class-design.html#autotoc_md57", null ],
          [ "자체 메모리 풀 사용", "architecture-and-class-design.html#autotoc_md58", null ],
          [ "속도 개선", "architecture-and-class-design.html#autotoc_md59", null ],
          [ "추가 정보 제공", "architecture-and-class-design.html#autotoc_md60", null ]
        ] ],
        [ "메모리 풀 아키텍처", "architecture-and-class-design.html#autotoc_md61", [
          [ "chunk - 최소 할당 단위", "architecture-and-class-design.html#autotoc_md62", null ],
          [ "chunks - 다중 chunk 관리", "architecture-and-class-design.html#autotoc_md63", null ],
          [ "pool - 크기별 메모리 관리", "architecture-and-class-design.html#autotoc_md64", null ],
          [ "instancer - 메모리 관리 조정자", "architecture-and-class-design.html#autotoc_md65", null ]
        ] ],
        [ "인스턴스 생명주기 관리", "architecture-and-class-design.html#autotoc_md66", [
          [ "instance 클래스", "architecture-and-class-design.html#autotoc_md67", null ],
          [ "id 클래스", "architecture-and-class-design.html#autotoc_md68", null ],
          [ "life 클래스", "architecture-and-class-design.html#autotoc_md69", null ],
          [ "watcher 클래스", "architecture-and-class-design.html#autotoc_md70", null ]
        ] ],
        [ "메모리 관리 인터페이스", "architecture-and-class-design.html#autotoc_md71", [
          [ "memoryHaver 클래스", "architecture-and-class-design.html#autotoc_md72", null ],
          [ "allocator 클래스", "architecture-and-class-design.html#autotoc_md73", null ]
        ] ]
      ] ],
      [ "stela 모듈 - 경량 설정 언어", "architecture-and-class-design.html#autotoc_md74", [
        [ "stela 언어의 기본 기능", "architecture-and-class-design.html#autotoc_md75", [
          [ "stela 클래스", "architecture-and-class-design.html#autotoc_md76", null ],
          [ "nulStela 클래스 - Null Object 패턴", "architecture-and-class-design.html#autotoc_md77", null ],
          [ "valStela 클래스 - Scalar 값 표현", "architecture-and-class-design.html#autotoc_md78", null ],
          [ "verStela 클래스 - 버전 타입", "architecture-and-class-design.html#autotoc_md79", null ]
        ] ],
        [ "stela 파서 구조", "architecture-and-class-design.html#autotoc_md80", [
          [ "stelaParser 클래스 - 파싱 진입점", "architecture-and-class-design.html#autotoc_md81", null ]
        ] ],
        [ "Indentation 처리", "architecture-and-class-design.html#autotoc_md82", [
          [ "indentation rule", "architecture-and-class-design.html#autotoc_md83", null ],
          [ "tokenDispatcher", "architecture-and-class-design.html#autotoc_md84", null ],
          [ "stelaTokenScan 클래스 - 스캔 모드 전략", "architecture-and-class-design.html#autotoc_md85", null ],
          [ "stelaSmartDedent 클래스 - Scope 관리", "architecture-and-class-design.html#autotoc_md86", null ]
        ] ]
      ] ],
      [ "core 모듈 - 언어 구현의 핵심", "architecture-and-class-design.html#autotoc_md87", [
        [ "AST 기본 구조", "architecture-and-class-design.html#autotoc_md88", [
          [ "node 클래스 - AST의 기반", "architecture-and-class-design.html#autotoc_md89", null ],
          [ "src, srcFile 클래스 - 소스 위치 정보", "architecture-and-class-design.html#autotoc_md90", null ],
          [ "args 클래스 - 함수 인자", "architecture-and-class-design.html#autotoc_md91", null ],
          [ "param 클래스 - 파라메터 정의", "architecture-and-class-design.html#autotoc_md92", null ]
        ] ],
        [ "객체 모델", "architecture-and-class-design.html#autotoc_md93", [
          [ "baseObj 클래스 - 객체의 기반", "architecture-and-class-design.html#autotoc_md94", null ],
          [ "obj 클래스 - Managed 객체", "architecture-and-class-design.html#autotoc_md95", null ],
          [ "origin 클래스 - 타입의 원본", "architecture-and-class-design.html#autotoc_md96", null ],
          [ "tbaseObjOrigin 클래스 - baseObj Origin 템플릿", "architecture-and-class-design.html#autotoc_md97", null ],
          [ "modifier 클래스 - 접근 제한자", "architecture-and-class-design.html#autotoc_md98", null ],
          [ "defaultCopyCtor 클래스 - 기본 복사 생성자", "architecture-and-class-design.html#autotoc_md99", null ],
          [ "immutableTactic 클래스 - Immutable 타입 처리", "architecture-and-class-design.html#autotoc_md100", null ],
          [ "manifest 클래스 - Pack 메타데이터", "architecture-and-class-design.html#autotoc_md101", null ],
          [ "tmock 클래스 - Proxy 객체", "architecture-and-class-design.html#autotoc_md102", null ]
        ] ],
        [ "표현식 (Expression) 시스템", "architecture-and-class-design.html#autotoc_md103", [
          [ "FBOExpr, FUOExpr 클래스 - 연산자 표현식", "architecture-and-class-design.html#autotoc_md104", null ],
          [ "assignExpr 클래스 - 할당 표현식", "architecture-and-class-design.html#autotoc_md105", null ],
          [ "blockExpr 클래스 - 블록 표현식", "architecture-and-class-design.html#autotoc_md106", null ],
          [ "defArrayExpr 클래스 - 배열 리터럴", "architecture-and-class-design.html#autotoc_md107", null ],
          [ "defNestedFuncExpr 클래스 - 중첩 함수 정의", "architecture-and-class-design.html#autotoc_md108", null ],
          [ "defSeqExpr 클래스 - 시퀀스 표현식", "architecture-and-class-design.html#autotoc_md109", null ],
          [ "endExpr 클래스 - End 키워드", "architecture-and-class-design.html#autotoc_md110", null ],
          [ "retStateExpr 클래스 - 블록 종료 키워드", "architecture-and-class-design.html#autotoc_md111", null ]
        ] ],
        [ "컨테이너 시스템", "architecture-and-class-design.html#autotoc_md112", [
          [ "tucontainable, tbicontainable 클래스 - 컨테이너 인터페이스", "architecture-and-class-design.html#autotoc_md113", null ],
          [ "tnchain 클래스 - Chain으로 연결되는 컨테이너", "architecture-and-class-design.html#autotoc_md114", null ],
          [ "arr 클래스 - Managed 배열", "architecture-and-class-design.html#autotoc_md115", null ],
          [ "nseq 클래스 - 범위형 컨테이너", "architecture-and-class-design.html#autotoc_md116", null ],
          [ "smultimap 클래스 - 삽입 순서를 기억하는 Multimap", "architecture-and-class-design.html#autotoc_md117", null ]
        ] ],
        [ "Generic 시스템", "architecture-and-class-design.html#autotoc_md118", [
          [ "getGenericExpr 클래스 - Generic 타입 참조의 진입점", "architecture-and-class-design.html#autotoc_md119", null ],
          [ "genericOrigin 클래스 - Generic 타입의 생성과 관리", "architecture-and-class-design.html#autotoc_md120", null ],
          [ "generalizer 클래스 - Generic 타입의 구체화", "architecture-and-class-design.html#autotoc_md121", null ]
        ] ],
        [ "Native-Managed 브리징 시스템", "architecture-and-class-design.html#autotoc_md122", [
          [ "tbridger 클래스 - Bridge 컴포넌트의 진입점", "architecture-and-class-design.html#autotoc_md123", null ],
          [ "tbridge 클래스 - Native 클래스의 Managed 표현", "architecture-and-class-design.html#autotoc_md124", null ],
          [ "tmock 클래스 - Proxy와 Dummy 객체", "architecture-and-class-design.html#autotoc_md125", null ]
        ] ],
        [ "스코프와 실행 컨텍스트", "architecture-and-class-design.html#autotoc_md126", [
          [ "scope 클래스 - Symbol 저장소", "architecture-and-class-design.html#autotoc_md127", null ],
          [ "frame 클래스 - Scope들의 동적 연결", "architecture-and-class-design.html#autotoc_md128", null ],
          [ "frames 클래스 - Frame 적층 관리", "architecture-and-class-design.html#autotoc_md129", null ],
          [ "thread 클래스 - 실행 흐름의 관리자", "architecture-and-class-design.html#autotoc_md130", null ]
        ] ],
        [ "패키지 시스템", "architecture-and-class-design.html#autotoc_md131", [
          [ "manifest 클래스 - Pack 메타데이터", "architecture-and-class-design.html#autotoc_md132", null ],
          [ "slot 클래스 - Pack의 결과물", "architecture-and-class-design.html#autotoc_md133", null ],
          [ "autoslot 클래스 - Lazy Pack 로딩", "architecture-and-class-design.html#autotoc_md134", null ],
          [ "slotLoader 클래스 - Pack 로더", "architecture-and-class-design.html#autotoc_md135", null ],
          [ "packLoading 클래스 - Pack 로딩 추상 클래스", "architecture-and-class-design.html#autotoc_md136", null ],
          [ "cppPackLoading 클래스 - C++ Pack 로더", "architecture-and-class-design.html#autotoc_md137", null ]
        ] ],
        [ "Visitor 패턴 및 AST 순회", "architecture-and-class-design.html#autotoc_md138", [
          [ "visitor 클래스 - AST 순회의 핵심", "architecture-and-class-design.html#autotoc_md139", null ],
          [ "graphVisitor 클래스 - AST 로깅", "architecture-and-class-design.html#autotoc_md140", null ]
        ] ],
        [ "파싱 시스템", "architecture-and-class-design.html#autotoc_md141", [
          [ "parser 클래스 - 파싱의 진입점", "architecture-and-class-design.html#autotoc_md142", null ],
          [ "smartDedent, tokenScan 클래스 - Indentation 관리", "architecture-and-class-design.html#autotoc_md143", null ],
          [ "srcSupply 클래스 - 소스 코드 공급 추상화", "architecture-and-class-design.html#autotoc_md144", null ],
          [ "expander 클래스 - 사전 타입 추론", "architecture-and-class-design.html#autotoc_md145", null ]
        ] ],
        [ "코드 검증 및 실행", "architecture-and-class-design.html#autotoc_md146", [
          [ "tworker 클래스 - 배치 작업의 기반", "architecture-and-class-design.html#autotoc_md147", null ],
          [ "verifier 클래스 - 코드 검증", "architecture-and-class-design.html#autotoc_md148", null ],
          [ "starter 클래스 - AST 실행", "architecture-and-class-design.html#autotoc_md149", null ],
          [ "sigZone 클래스 - Signal 처리", "architecture-and-class-design.html#autotoc_md150", null ]
        ] ],
        [ "에러 처리", "architecture-and-class-design.html#autotoc_md151", [
          [ "baseErr 클래스 - 에러의 기반", "architecture-and-class-design.html#autotoc_md152", null ],
          [ "errReport 클래스 - 에러 수집", "architecture-and-class-design.html#autotoc_md153", null ]
        ] ]
      ] ],
      [ "frontend 모듈 - CLI 인터페이스", "architecture-and-class-design.html#autotoc_md154", [
        [ "cli 클래스 - Frontend의 핵심", "architecture-and-class-design.html#autotoc_md155", null ],
        [ "flag 클래스 - 명령줄 플래그 처리", "architecture-and-class-design.html#autotoc_md156", null ]
      ] ],
      [ "다음 단계", "architecture-and-class-design.html#autotoc_md157", null ]
    ] ],
    [ "개발환경", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html", [
      [ "빌드", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md159", [
        [ "Ubuntu", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md160", null ],
        [ "Mac OS", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md161", null ],
        [ "Windows", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md162", [
          [ "WSL", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md163", null ],
          [ "MSVC", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md164", null ]
        ] ],
        [ "빌드 실행하기", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md165", null ]
      ] ],
      [ "디버깅", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md166", [
        [ "Ubuntu", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md167", null ],
        [ "Windows WSL", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md168", null ],
        [ "Mac OS", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md169", null ]
      ] ],
      [ "테스트", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md170", null ],
      [ "가이드 / 레퍼런스 문서 생성", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md171", [
        [ "문서 생성 알고리즘", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md172", null ],
        [ "문서의 종류", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md173", null ],
        [ "문서의 doxygen 커스터마이징", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md174", null ]
      ] ],
      [ "Core dump", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md175", [
        [ "Prerequisites", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md176", null ],
        [ "Coredump 생성", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md177", [
          [ "Linux / Mac", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md178", null ],
          [ "Windows", "md__home_runner_work_byeol_byeol_doc_ref_ko_dev_env.html#autotoc_md179", null ]
        ] ]
      ] ]
    ] ],
    [ "모듈", "modules.html", "modules" ],
    [ "클래스 색인", "classes.html", null ],
    [ "파일 목록", "files.html", "files" ]
  ] ]
];

var NAVTREEINDEX =
[
"_f_b_o_expr_8hpp.html",
"classby_1_1arr.html#a00cbe2dba2983ec0a31f0006f555b4ec",
"classby_1_1next_expr.html",
"classby_1_1verifier.html",
"frames_8hpp_source.html",
"ret_expr_8hpp.html"
];

var SYNCONMSG = '패널 동기화를 비활성화하기 위해 클릭하십시오';
var SYNCOFFMSG = '패널 동기화를 활성화하기 위해 클릭하십시오';