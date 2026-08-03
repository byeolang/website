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
    [ "개발환경", "ab-dev-env.html", [
      [ "빌드", "ab-dev-env.html#autotoc_md17", [
        [ "사전 준비", "ab-dev-env.html#autotoc_md18", null ]
      ] ],
      [ "빌드하기", "ab-dev-env.html#autotoc_md20", [
        [ "Ubuntu / Mac", "ab-dev-env.html#autotoc_md21", null ],
        [ "Windows (Visual Studio)", "ab-dev-env.html#autotoc_md22", null ]
      ] ],
      [ "바이너리 확인", "ab-dev-env.html#autotoc_md24", null ],
      [ "디버깅", "ab-dev-env.html#autotoc_md26", [
        [ "Ubuntu", "ab-dev-env.html#autotoc_md27", null ],
        [ "Windows WSL", "ab-dev-env.html#autotoc_md29", null ],
        [ "Mac OS", "ab-dev-env.html#autotoc_md31", null ]
      ] ],
      [ "테스트", "ab-dev-env.html#autotoc_md33", null ],
      [ "가이드 / 레퍼런스 문서 생성", "ab-dev-env.html#autotoc_md35", [
        [ "문서 생성 알고리즘", "ab-dev-env.html#autotoc_md36", null ],
        [ "문서의 종류", "ab-dev-env.html#autotoc_md38", null ],
        [ "문서의 doxygen 커스터마이징", "ab-dev-env.html#autotoc_md40", null ]
      ] ],
      [ "Core dump", "ab-dev-env.html#autotoc_md42", [
        [ "Prerequisites", "ab-dev-env.html#autotoc_md43", null ],
        [ "Coredump 생성", "ab-dev-env.html#autotoc_md45", [
          [ "Linux / Mac", "ab-dev-env.html#autotoc_md46", null ],
          [ "Windows", "ab-dev-env.html#autotoc_md48", null ]
        ] ]
      ] ]
    ] ],
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
      [ "배포 트리와 실행", "ac-build-structure.html#ac-build-structure-deployment", [
        [ "두 개의 실행파일", "ac-build-structure.html#autotoc_md85", null ],
        [ "빌드 이름과 배포 이름", "ac-build-structure.html#autotoc_md86", null ],
        [ "배포 폴더 구조", "ac-build-structure.html#autotoc_md87", null ],
        [ "실행 흐름", "ac-build-structure.html#autotoc_md88", null ],
        [ "디버깅 연결", "ac-build-structure.html#autotoc_md89", null ]
      ] ],
      [ "저장소간 릴리스", "ac-build-structure.html#ac-build-structure-release", [
        [ "pin이 걸린 위치", "ac-build-structure.html#autotoc_md91", null ],
        [ "태그 형식", "ac-build-structure.html#autotoc_md92", null ]
      ] ],
      [ "빌드 타겟", "ac-build-structure.html#autotoc_md94", [
        [ "Debug 빌드 (dbg)", "ac-build-structure.html#autotoc_md95", null ],
        [ "Release 빌드 (rel)", "ac-build-structure.html#autotoc_md97", null ],
        [ "Release with Debug Info 빌드 (reldbg)", "ac-build-structure.html#autotoc_md99", null ],
        [ "WebAssembly 빌드 (wasm)", "ac-build-structure.html#autotoc_md101", null ],
        [ "Coverage 빌드 (cov)", "ac-build-structure.html#autotoc_md103", null ],
        [ "빌드 타겟 비교표", "ac-build-structure.html#autotoc_md105", null ]
      ] ],
      [ "Git Repository 구조", "ac-build-structure.html#autotoc_md107", [
        [ "추적되는 파일", "ac-build-structure.html#autotoc_md108", null ],
        [ "추적되지 않는 파일", "ac-build-structure.html#autotoc_md110", null ]
      ] ],
      [ "참고 사항", "ac-build-structure.html#autotoc_md112", null ]
    ] ],
    [ "Byeol 코딩 규칙", "ad-convention-rules.html", [
      [ "시작하기 전에", "ad-convention-rules.html#autotoc_md115", [
        [ "왜 일반적인 C++ 컨벤션과 다른가?", "ad-convention-rules.html#autotoc_md116", null ],
        [ "Byeol 언어의 핵심 철학을 요약하면", "ad-convention-rules.html#autotoc_md117", null ],
        [ "C++ 코드에 반영된 철학", "ad-convention-rules.html#autotoc_md118", null ],
        [ "코딩 스타일은 clang-format으로 자동 적용", "ad-convention-rules.html#autotoc_md119", null ]
      ] ],
      [ "네이밍 규칙", "ad-convention-rules.html#autotoc_md121", [
        [ "클래스와 변수: camelCase", "ad-convention-rules.html#autotoc_md122", [
          [ "✅ 올바른 예제", "ad-convention-rules.html#autotoc_md123", null ],
          [ "❌ 잘못된 예제", "ad-convention-rules.html#autotoc_md124", null ]
        ] ],
        [ "매크로: UPPER_SNAKE_CASE", "ad-convention-rules.html#autotoc_md125", [
          [ "✅ 올바른 예제", "ad-convention-rules.html#autotoc_md126", null ],
          [ "❌ 잘못된 예제", "ad-convention-rules.html#autotoc_md127", null ]
        ] ],
        [ "non public accessor를 위한 언더스코어 접두사", "ad-convention-rules.html#autotoc_md128", null ],
        [ "클래스 접두사", "ad-convention-rules.html#autotoc_md129", null ],
        [ "Enum 네이밍", "ad-convention-rules.html#autotoc_md130", null ],
        [ "인터페이스 네이밍", "ad-convention-rules.html#autotoc_md131", null ],
        [ "템플릿 구체화 네이밍", "ad-convention-rules.html#autotoc_md132", null ],
        [ "기본 타입 사용", "ad-convention-rules.html#autotoc_md133", null ],
        [ "파일 명명 규칙", "ad-convention-rules.html#autotoc_md134", null ],
        [ "네이밍 철학", "ad-convention-rules.html#autotoc_md135", [
          [ "✅ 올바른 예제", "ad-convention-rules.html#autotoc_md136", null ],
          [ "❌ 불필요하게 긴 예제", "ad-convention-rules.html#autotoc_md137", null ],
          [ "일반적인 네이밍 가이드", "ad-convention-rules.html#autotoc_md138", null ]
        ] ],
        [ "간단하고 직관적인 단어 선호", "ad-convention-rules.html#autotoc_md139", null ],
        [ "자주 사용하는 동사", "ad-convention-rules.html#autotoc_md140", null ]
      ] ],
      [ "코드 스타일", "ad-convention-rules.html#autotoc_md142", [
        [ "줄 길이와 들여쓰기", "ad-convention-rules.html#autotoc_md143", [
          [ "줄 길이 제한", "ad-convention-rules.html#autotoc_md144", null ],
          [ "들여쓰기: 4 스페이스", "ad-convention-rules.html#autotoc_md145", null ],
          [ "중괄호 스타일: 같은 줄에 배치", "ad-convention-rules.html#autotoc_md146", null ],
          [ "포인터/참조 정렬: 왼쪽 정렬", "ad-convention-rules.html#autotoc_md147", null ],
          [ "괄호 앞 공백: 공백 없음", "ad-convention-rules.html#autotoc_md148", null ],
          [ "네임스페이스 들여쓰기: 들여쓰기 적용", "ad-convention-rules.html#autotoc_md149", null ],
          [ "짧은 함수/블록: 한 줄 허용", "ad-convention-rules.html#autotoc_md150", null ],
          [ "1줄 블록문: 중괄호 생략", "ad-convention-rules.html#autotoc_md151", null ],
          [ "접근 제어자 순서", "ad-convention-rules.html#autotoc_md152", null ],
          [ "Early-Return Pattern 선호", "ad-convention-rules.html#autotoc_md153", null ],
          [ "TO 매크로 사용", "ad-convention-rules.html#autotoc_md154", null ]
        ] ],
        [ "구현 파일 (.cpp) 규칙", "ad-convention-rules.html#autotoc_md155", [
          [ "me와 super 사용", "ad-convention-rules.html#autotoc_md156", null ],
          [ "익명 네임스페이스", "ad-convention-rules.html#autotoc_md157", null ]
        ] ],
        [ "기타 코딩 관습", "ad-convention-rules.html#autotoc_md158", [
          [ "auto 사용", "ad-convention-rules.html#autotoc_md159", null ],
          [ "nullptr 사용", "ad-convention-rules.html#autotoc_md160", null ],
          [ "로컬 상수 네이밍", "ad-convention-rules.html#autotoc_md161", null ]
        ] ]
      ] ],
      [ "문서화 표준", "ad-convention-rules.html#autotoc_md163", [
        [ "Doxygen 주석 기본 규칙", "ad-convention-rules.html#autotoc_md164", [
          [ "/** 스타일만 사용", "ad-convention-rules.html#autotoc_md165", null ],
          [ "@ 접두사 사용", "ad-convention-rules.html#autotoc_md166", null ]
        ] ],
        [ "파일 주석", "ad-convention-rules.html#autotoc_md167", [
          [ "@file 태그", "ad-convention-rules.html#autotoc_md168", null ]
        ] ],
        [ "클래스 주석", "ad-convention-rules.html#autotoc_md169", [
          [ "예제 1: 간단한 클래스", "ad-convention-rules.html#autotoc_md170", null ],
          [ "예제 2: 복잡한 클래스 - 여러 단락", "ad-convention-rules.html#autotoc_md171", null ]
        ] ],
        [ "함수 주석", "ad-convention-rules.html#autotoc_md172", null ],
        [ "code 블록 사용", "ad-convention-rules.html#autotoc_md173", null ],
        [ "ref로 다른 코드 참조", "ad-convention-rules.html#autotoc_md174", null ],
        [ "개발 노트는 Doxygen 밖에", "ad-convention-rules.html#autotoc_md175", null ],
        [ "자명한 코드에는 주석 금지", "ad-convention-rules.html#autotoc_md176", null ]
      ] ],
      [ "헤더 파일 포함", "ad-convention-rules.html#autotoc_md178", null ]
    ] ],
    [ "아키텍쳐와 설계", "ae-architecture-overview.html", "ae-architecture-overview" ],
    [ "테스트 케이스 작성 가이드", "an-testing-guide.html", [
      [ "Unit Test (단위 테스트)", "an-testing-guide.html#autotoc_md502", [
        [ "파일 위치와 네이밍", "an-testing-guide.html#autotoc_md503", null ],
        [ "기본 구조", "an-testing-guide.html#autotoc_md504", null ],
        [ "byeolTest 클래스의 주요 기능", "an-testing-guide.html#autotoc_md505", null ],
        [ "Google Test 검증 매크로", "an-testing-guide.html#autotoc_md506", null ],
        [ "실전 예제", "an-testing-guide.html#autotoc_md507", null ]
      ] ],
      [ "Integration Test (통합 테스트)", "an-testing-guide.html#autotoc_md509", [
        [ "Antipattern Test?", "an-testing-guide.html#autotoc_md510", null ],
        [ "파일 위치와 네이밍", "an-testing-guide.html#autotoc_md511", null ],
        [ "기본 구조", "an-testing-guide.html#autotoc_md512", null ],
        [ "byeolIntegTest의 빌더 패턴", "an-testing-guide.html#autotoc_md513", null ],
        [ "파싱 결과 검증", "an-testing-guide.html#autotoc_md514", null ],
        [ "Negative 테스트", "an-testing-guide.html#autotoc_md515", null ],
        [ "shouldParsed vs shouldVerified", "an-testing-guide.html#autotoc_md516", null ],
        [ "런타임 에러 테스트", "an-testing-guide.html#autotoc_md517", null ],
        [ "실전 예제", "an-testing-guide.html#autotoc_md518", null ]
      ] ],
      [ "E2E Test (종단간 테스트)", "an-testing-guide.html#autotoc_md520", [
        [ "파일 위치와 네이밍", "an-testing-guide.html#autotoc_md521", null ],
        [ "기본 구조", "an-testing-guide.html#autotoc_md522", null ],
        [ "테스트 데이터 파일", "an-testing-guide.html#autotoc_md523", null ],
        [ "parse와 run", "an-testing-guide.html#autotoc_md524", null ],
        [ "Negative 테스트", "an-testing-guide.html#autotoc_md525", null ]
      ] ],
      [ "테스트 작성 시 주의사항", "an-testing-guide.html#autotoc_md527", [
        [ "올바른 베이스 클래스 상속", "an-testing-guide.html#autotoc_md528", null ],
        [ "negative() 호출", "an-testing-guide.html#autotoc_md529", null ],
        [ "OR_ASSERT 사용", "an-testing-guide.html#autotoc_md530", null ],
        [ "shouldParsed vs shouldVerified vs run()", "an-testing-guide.html#autotoc_md531", null ],
        [ "Raw String Literal 구분자", "an-testing-guide.html#autotoc_md532", null ],
        [ "SetUp/TearDown 오버라이드", "an-testing-guide.html#autotoc_md533", null ],
        [ "테스트 독립성", "an-testing-guide.html#autotoc_md534", null ],
        [ "한 가지만 테스트", "an-testing-guide.html#autotoc_md535", null ],
        [ "명확한 테스트 이름", "an-testing-guide.html#autotoc_md536", null ],
        [ "Negative 테스트 포함", "an-testing-guide.html#autotoc_md537", null ],
        [ "리소스 정리", "an-testing-guide.html#autotoc_md538", null ]
      ] ],
      [ "디버깅", "an-testing-guide.html#autotoc_md540", [
        [ "특정 테스트 케이스만 실행하기", "an-testing-guide.html#autotoc_md541", null ],
        [ "verbose 모드", "an-testing-guide.html#autotoc_md542", null ],
        [ "디버거 사용", "an-testing-guide.html#autotoc_md543", null ],
        [ "에러 리포트 확인", "an-testing-guide.html#autotoc_md544", null ],
        [ "테스트 실행", "an-testing-guide.html#autotoc_md546", null ]
      ] ]
    ] ],
    [ "문서 작성 규칙", "ao-document-convention.html", [
      [ "문서의 톤과 어조", "ao-document-convention.html#autotoc_md549", null ],
      [ "Doxygen 호환성", "ao-document-convention.html#autotoc_md551", null ],
      [ "문서 구조", "ao-document-convention.html#autotoc_md553", null ],
      [ "문서 체계 및 분류", "ao-document-convention.html#autotoc_md555", null ],
      [ "문서 Navigation", "ao-document-convention.html#autotoc_md557", null ],
      [ "파일명 규칙", "ao-document-convention.html#autotoc_md559", null ],
      [ "새 문서 추가 절차", "ao-document-convention.html#autotoc_md561", null ],
      [ "문서 분할 (Subpage)", "ao-document-convention.html#autotoc_md563", null ],
      [ "예시의 중요성", "ao-document-convention.html#autotoc_md565", null ],
      [ "Style Annotation 시스템", "ao-document-convention.html#autotoc_md567", [
        [ "언어 지정", "ao-document-convention.html#autotoc_md568", null ],
        [ "실행 가능 코드 표시", "ao-document-convention.html#autotoc_md569", null ],
        [ "검증 완료 코드 표시: verified", "ao-document-convention.html#autotoc_md570", null ],
        [ "보여지는 코드와 실행 코드 분리: shown", "ao-document-convention.html#autotoc_md571", null ]
      ] ],
      [ "문서 작성 스타일", "ao-document-convention.html#autotoc_md573", null ]
    ] ],
    [ "모듈", "topics.html", "topics" ],
    [ "클래스 색인", "classes.html", null ],
    [ "파일 목록", "files.html", "files" ]
  ] ]
];

var NAVTREEINDEX =
[
"__nout_8hpp.html",
"ak-architecture-core.html#autotoc_md370",
"classby_1_1dum_scope.html",
"classnchain_iteration.html#a1efa87fb1a86b30ce0767d135a40f500",
"pkgs_8hpp.html"
];

var SYNCONMSG = '패널 동기화를 비활성화하기 위해 클릭하십시오';
var SYNCOFFMSG = '패널 동기화를 활성화하기 위해 클릭하십시오';