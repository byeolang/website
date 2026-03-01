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
    [ "안녕하세요", "index.html", null ],
    [ "여행 코스 가이드", "aa-onboarding.html", [
      [ "필수 과정", "aa-onboarding.html#autotoc_md1", null ],
      [ "시나리오별 네비게이션", "aa-onboarding.html#autotoc_md3", [
        [ "시나리오: 새로운 내장 함수(Native Function) 및 타입을 추가하고 싶어요", "aa-onboarding.html#autotoc_md5", [
          [ "튜토리얼", "aa-onboarding.html#autotoc_md6", null ]
        ] ],
        [ "새로운 문법(Syntax)을 추가하고 싶어요", "aa-onboarding.html#autotoc_md8", null ],
        [ "버그를 잡기 위해 로그를 추가하거나, 새로운 로그 기능을 넣고 싶어요.", "aa-onboarding.html#autotoc_md10", null ],
        [ "리플렉션 기능을 더 추가하고 싶어요.", "aa-onboarding.html#autotoc_md12", null ]
      ] ],
      [ "본격적으로 시작해보죠.", "aa-onboarding.html#autotoc_md14", null ]
    ] ],
    [ "ab-dev-env", "md__2home_2runner_2work_2byeol_2byeol_2doc_2ref_2ko_2ab-dev-env.html", null ],
    [ "프로젝트 구조 및 빌드 산출물", "ac-build-structure.html", [
      [ "프로젝트 디렉토리 구조", "ac-build-structure.html#autotoc_md51", null ],
      [ "디렉토리 설명", "ac-build-structure.html#autotoc_md53", [
        [ "module/ - 소스 코드", "ac-build-structure.html#autotoc_md54", null ],
        [ "bin/ - 빌드 산출물", "ac-build-structure.html#autotoc_md56", null ],
        [ "build/ - 빌드 시스템", "ac-build-structure.html#autotoc_md58", null ],
        [ "doc/ - 문서", "ac-build-structure.html#autotoc_md60", null ],
        [ "external/ - 외부 라이브러리", "ac-build-structure.html#autotoc_md62", null ]
      ] ],
      [ "빌드 산출물", "ac-build-structure.html#autotoc_md64", [
        [ "실행 파일", "ac-build-structure.html#autotoc_md65", null ]
      ] ],
      [ "동적 라이브러리", "ac-build-structure.html#autotoc_md68", [
        [ "libindep", "ac-build-structure.html#autotoc_md69", null ],
        [ "libclog", "ac-build-structure.html#autotoc_md71", null ],
        [ "libmeta", "ac-build-structure.html#autotoc_md73", null ],
        [ "libmemlite", "ac-build-structure.html#autotoc_md75", null ],
        [ "libstela", "ac-build-structure.html#autotoc_md77", null ],
        [ "libcore", "ac-build-structure.html#autotoc_md79", null ]
      ] ],
      [ "기타 산출물", "ac-build-structure.html#autotoc_md80", [
        [ "pod/ - 팩 파일", "ac-build-structure.html#autotoc_md81", null ],
        [ "testdata/ - 테스트 데이터", "ac-build-structure.html#autotoc_md83", null ]
      ] ],
      [ "빌드 타겟", "ac-build-structure.html#autotoc_md85", [
        [ "Debug 빌드 (dbg)", "ac-build-structure.html#autotoc_md86", null ],
        [ "Release 빌드 (rel)", "ac-build-structure.html#autotoc_md88", null ],
        [ "Release with Debug Info 빌드 (reldbg)", "ac-build-structure.html#autotoc_md90", null ],
        [ "WebAssembly 빌드 (wasm)", "ac-build-structure.html#autotoc_md92", null ],
        [ "Coverage 빌드 (cov)", "ac-build-structure.html#autotoc_md94", null ],
        [ "빌드 타겟 비교표", "ac-build-structure.html#autotoc_md96", null ]
      ] ],
      [ "Git Repository 구조", "ac-build-structure.html#autotoc_md98", [
        [ "추적되는 파일", "ac-build-structure.html#autotoc_md99", null ],
        [ "추적되지 않는 파일", "ac-build-structure.html#autotoc_md101", null ]
      ] ],
      [ "참고 사항", "ac-build-structure.html#autotoc_md103", null ]
    ] ],
    [ "Byeol 코딩 규칙", "ad-convention-rules.html", [
      [ "시작하기 전에", "ad-convention-rules.html#autotoc_md106", [
        [ "왜 일반적인 C++ 컨벤션과 다른가?", "ad-convention-rules.html#autotoc_md107", null ],
        [ "Byeol 언어의 핵심 철학을 요약하면", "ad-convention-rules.html#autotoc_md108", null ],
        [ "C++ 코드에 반영된 철학", "ad-convention-rules.html#autotoc_md109", null ],
        [ "코딩 스타일은 clang-format으로 자동 적용", "ad-convention-rules.html#autotoc_md110", null ]
      ] ],
      [ "네이밍 규칙", "ad-convention-rules.html#autotoc_md112", [
        [ "클래스와 변수: camelCase", "ad-convention-rules.html#autotoc_md113", [
          [ "✅ 올바른 예제", "ad-convention-rules.html#autotoc_md114", null ],
          [ "❌ 잘못된 예제", "ad-convention-rules.html#autotoc_md115", null ]
        ] ],
        [ "매크로: UPPER_SNAKE_CASE", "ad-convention-rules.html#autotoc_md116", [
          [ "✅ 올바른 예제", "ad-convention-rules.html#autotoc_md117", null ],
          [ "❌ 잘못된 예제", "ad-convention-rules.html#autotoc_md118", null ]
        ] ],
        [ "non public accessor를 위한 언더스코어 접두사", "ad-convention-rules.html#autotoc_md119", null ],
        [ "클래스 접두사", "ad-convention-rules.html#autotoc_md120", null ],
        [ "Enum 네이밍", "ad-convention-rules.html#autotoc_md121", null ],
        [ "인터페이스 네이밍", "ad-convention-rules.html#autotoc_md122", null ],
        [ "템플릿 구체화 네이밍", "ad-convention-rules.html#autotoc_md123", null ],
        [ "기본 타입 사용", "ad-convention-rules.html#autotoc_md124", null ],
        [ "파일 명명 규칙", "ad-convention-rules.html#autotoc_md125", null ],
        [ "네이밍 철학", "ad-convention-rules.html#autotoc_md126", [
          [ "✅ 올바른 예제", "ad-convention-rules.html#autotoc_md127", null ],
          [ "❌ 불필요하게 긴 예제", "ad-convention-rules.html#autotoc_md128", null ],
          [ "일반적인 네이밍 가이드", "ad-convention-rules.html#autotoc_md129", null ]
        ] ],
        [ "간단하고 직관적인 단어 선호", "ad-convention-rules.html#autotoc_md130", null ],
        [ "자주 사용하는 동사", "ad-convention-rules.html#autotoc_md131", null ]
      ] ],
      [ "코드 스타일", "ad-convention-rules.html#autotoc_md133", [
        [ "줄 길이와 들여쓰기", "ad-convention-rules.html#autotoc_md134", [
          [ "줄 길이 제한", "ad-convention-rules.html#autotoc_md135", null ],
          [ "들여쓰기: 4 스페이스", "ad-convention-rules.html#autotoc_md136", null ],
          [ "중괄호 스타일: 같은 줄에 배치", "ad-convention-rules.html#autotoc_md137", null ],
          [ "포인터/참조 정렬: 왼쪽 정렬", "ad-convention-rules.html#autotoc_md138", null ],
          [ "괄호 앞 공백: 공백 없음", "ad-convention-rules.html#autotoc_md139", null ],
          [ "네임스페이스 들여쓰기: 들여쓰기 적용", "ad-convention-rules.html#autotoc_md140", null ],
          [ "짧은 함수/블록: 한 줄 허용", "ad-convention-rules.html#autotoc_md141", null ],
          [ "1줄 블록문: 중괄호 생략", "ad-convention-rules.html#autotoc_md142", null ],
          [ "접근 제어자 순서", "ad-convention-rules.html#autotoc_md143", null ],
          [ "Early-Return Pattern 선호", "ad-convention-rules.html#autotoc_md144", null ],
          [ "TO 매크로 사용", "ad-convention-rules.html#autotoc_md145", null ]
        ] ],
        [ "구현 파일 (.cpp) 규칙", "ad-convention-rules.html#autotoc_md146", [
          [ "me와 super 사용", "ad-convention-rules.html#autotoc_md147", null ],
          [ "익명 네임스페이스", "ad-convention-rules.html#autotoc_md148", null ]
        ] ],
        [ "기타 코딩 관습", "ad-convention-rules.html#autotoc_md149", [
          [ "auto 사용", "ad-convention-rules.html#autotoc_md150", null ],
          [ "nullptr 사용", "ad-convention-rules.html#autotoc_md151", null ],
          [ "로컬 상수 네이밍", "ad-convention-rules.html#autotoc_md152", null ]
        ] ]
      ] ],
      [ "문서화 표준", "ad-convention-rules.html#autotoc_md154", [
        [ "Doxygen 주석 기본 규칙", "ad-convention-rules.html#autotoc_md155", [
          [ "/** 스타일만 사용", "ad-convention-rules.html#autotoc_md156", null ],
          [ "@ 접두사 사용", "ad-convention-rules.html#autotoc_md157", null ]
        ] ],
        [ "파일 주석", "ad-convention-rules.html#autotoc_md158", [
          [ "@file 태그", "ad-convention-rules.html#autotoc_md159", null ]
        ] ],
        [ "클래스 주석", "ad-convention-rules.html#autotoc_md160", [
          [ "예제 1: 간단한 클래스", "ad-convention-rules.html#autotoc_md161", null ],
          [ "예제 2: 복잡한 클래스 - 여러 단락", "ad-convention-rules.html#autotoc_md162", null ]
        ] ],
        [ "함수 주석", "ad-convention-rules.html#autotoc_md163", null ],
        [ "code 블록 사용", "ad-convention-rules.html#autotoc_md164", null ],
        [ "ref로 다른 코드 참조", "ad-convention-rules.html#autotoc_md165", null ],
        [ "개발 노트는 Doxygen 밖에", "ad-convention-rules.html#autotoc_md166", null ],
        [ "자명한 코드에는 주석 금지", "ad-convention-rules.html#autotoc_md167", null ]
      ] ],
      [ "헤더 파일 포함", "ad-convention-rules.html#autotoc_md169", null ]
    ] ],
    [ "아키텍쳐와 설계", "ae-architecture-overview.html", "ae-architecture-overview" ],
    [ "테스트 케이스 작성 가이드", "am-testing-guide.html", [
      [ "Unit Test (단위 테스트)", "am-testing-guide.html#autotoc_md488", [
        [ "파일 위치와 네이밍", "am-testing-guide.html#autotoc_md489", null ],
        [ "기본 구조", "am-testing-guide.html#autotoc_md490", null ],
        [ "byeolTest 클래스의 주요 기능", "am-testing-guide.html#autotoc_md491", null ],
        [ "Google Test 검증 매크로", "am-testing-guide.html#autotoc_md492", null ],
        [ "실전 예제", "am-testing-guide.html#autotoc_md493", null ]
      ] ],
      [ "Integration Test (통합 테스트)", "am-testing-guide.html#autotoc_md495", [
        [ "Antipattern Test?", "am-testing-guide.html#autotoc_md496", null ],
        [ "파일 위치와 네이밍", "am-testing-guide.html#autotoc_md497", null ],
        [ "기본 구조", "am-testing-guide.html#autotoc_md498", null ],
        [ "byeolIntegTest의 빌더 패턴", "am-testing-guide.html#autotoc_md499", null ],
        [ "파싱 결과 검증", "am-testing-guide.html#autotoc_md500", null ],
        [ "Negative 테스트", "am-testing-guide.html#autotoc_md501", null ],
        [ "shouldParsed vs shouldVerified", "am-testing-guide.html#autotoc_md502", null ],
        [ "런타임 에러 테스트", "am-testing-guide.html#autotoc_md503", null ],
        [ "실전 예제", "am-testing-guide.html#autotoc_md504", null ]
      ] ],
      [ "E2E Test (종단간 테스트)", "am-testing-guide.html#autotoc_md506", [
        [ "파일 위치와 네이밍", "am-testing-guide.html#autotoc_md507", null ],
        [ "기본 구조", "am-testing-guide.html#autotoc_md508", null ],
        [ "테스트 데이터 파일", "am-testing-guide.html#autotoc_md509", null ],
        [ "parse와 run", "am-testing-guide.html#autotoc_md510", null ],
        [ "Negative 테스트", "am-testing-guide.html#autotoc_md511", null ]
      ] ],
      [ "테스트 작성 시 주의사항", "am-testing-guide.html#autotoc_md513", [
        [ "올바른 베이스 클래스 상속", "am-testing-guide.html#autotoc_md514", null ],
        [ "negative() 호출", "am-testing-guide.html#autotoc_md515", null ],
        [ "OR_ASSERT 사용", "am-testing-guide.html#autotoc_md516", null ],
        [ "shouldParsed vs shouldVerified vs run()", "am-testing-guide.html#autotoc_md517", null ],
        [ "Raw String Literal 구분자", "am-testing-guide.html#autotoc_md518", null ],
        [ "SetUp/TearDown 오버라이드", "am-testing-guide.html#autotoc_md519", null ],
        [ "테스트 독립성", "am-testing-guide.html#autotoc_md520", null ],
        [ "한 가지만 테스트", "am-testing-guide.html#autotoc_md521", null ],
        [ "명확한 테스트 이름", "am-testing-guide.html#autotoc_md522", null ],
        [ "Negative 테스트 포함", "am-testing-guide.html#autotoc_md523", null ],
        [ "리소스 정리", "am-testing-guide.html#autotoc_md524", null ]
      ] ],
      [ "디버깅", "am-testing-guide.html#autotoc_md526", [
        [ "특정 테스트 케이스만 실행하기", "am-testing-guide.html#autotoc_md527", null ],
        [ "verbose 모드", "am-testing-guide.html#autotoc_md528", null ],
        [ "디버거 사용", "am-testing-guide.html#autotoc_md529", null ],
        [ "에러 리포트 확인", "am-testing-guide.html#autotoc_md530", null ],
        [ "테스트 실행", "am-testing-guide.html#autotoc_md532", null ]
      ] ]
    ] ],
    [ "문서 작성 규칙", "an-document-convention.html", [
      [ "문서의 톤과 어조", "an-document-convention.html#autotoc_md535", null ],
      [ "Doxygen 호환성", "an-document-convention.html#autotoc_md537", null ],
      [ "문서 구조", "an-document-convention.html#autotoc_md539", null ],
      [ "문서 체계 및 분류", "an-document-convention.html#autotoc_md541", null ],
      [ "문서 Navigation", "an-document-convention.html#autotoc_md543", null ],
      [ "새 문서 추가 절차", "an-document-convention.html#autotoc_md545", null ],
      [ "문서 분할 (Subpage)", "an-document-convention.html#autotoc_md547", null ],
      [ "예시의 중요성", "an-document-convention.html#autotoc_md549", null ],
      [ "Style Annotation 시스템", "an-document-convention.html#autotoc_md551", [
        [ "언어 지정", "an-document-convention.html#autotoc_md552", null ],
        [ "실행 가능 코드 표시", "an-document-convention.html#autotoc_md553", null ],
        [ "검증 완료 코드 표시: verified", "an-document-convention.html#autotoc_md554", null ],
        [ "보여지는 코드와 실행 코드 분리: shown", "an-document-convention.html#autotoc_md555", null ]
      ] ],
      [ "문서 작성 스타일", "an-document-convention.html#autotoc_md557", null ]
    ] ],
    [ "모듈", "topics.html", "topics" ],
    [ "클래스 색인", "classes.html", null ],
    [ "파일 목록", "files.html", "files" ]
  ] ]
];

var NAVTREEINDEX =
[
"_f_b_o_expr_8hpp.html",
"ak-architecture-core.html#autotoc_md441",
"classby_1_1def_array_expr.html#a8e1df4000b12eccfcb8795db1517fbe5",
"classby_1_1pod_loading.html",
"ctor_8hpp.html",
"initiator_8hpp_source.html",
"structby_1_1tif_sub.html"
];

var SYNCONMSG = '패널 동기화를 비활성화하기 위해 클릭하십시오';
var SYNCOFFMSG = '패널 동기화를 활성화하기 위해 클릭하십시오';