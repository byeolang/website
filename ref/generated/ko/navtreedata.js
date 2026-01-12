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
    [ "개발환경", "aa-dev-env.html", [
      [ "빌드", "aa-dev-env.html#autotoc_md1", [
        [ "Ubuntu", "aa-dev-env.html#autotoc_md2", null ],
        [ "Mac OS", "aa-dev-env.html#autotoc_md3", null ],
        [ "Windows", "aa-dev-env.html#autotoc_md4", [
          [ "WSL", "aa-dev-env.html#autotoc_md5", null ],
          [ "MSVC", "aa-dev-env.html#autotoc_md6", null ]
        ] ],
        [ "빌드 실행하기", "aa-dev-env.html#autotoc_md7", null ]
      ] ],
      [ "디버깅", "aa-dev-env.html#autotoc_md9", [
        [ "Ubuntu", "aa-dev-env.html#autotoc_md10", null ],
        [ "Windows WSL", "aa-dev-env.html#autotoc_md11", null ],
        [ "Mac OS", "aa-dev-env.html#autotoc_md12", null ]
      ] ],
      [ "테스트", "aa-dev-env.html#autotoc_md14", null ],
      [ "가이드 / 레퍼런스 문서 생성", "aa-dev-env.html#autotoc_md16", [
        [ "문서 생성 알고리즘", "aa-dev-env.html#autotoc_md17", null ],
        [ "문서의 종류", "aa-dev-env.html#autotoc_md18", null ],
        [ "문서의 doxygen 커스터마이징", "aa-dev-env.html#autotoc_md19", null ]
      ] ],
      [ "Core dump", "aa-dev-env.html#autotoc_md21", [
        [ "Prerequisites", "aa-dev-env.html#autotoc_md22", null ],
        [ "Coredump 생성", "aa-dev-env.html#autotoc_md23", [
          [ "Linux / Mac", "aa-dev-env.html#autotoc_md24", null ],
          [ "Windows", "aa-dev-env.html#autotoc_md25", null ]
        ] ]
      ] ]
    ] ],
    [ "Byeol 코딩 규칙", "ab-convention-rules.html", [
      [ "시작하기 전에", "ab-convention-rules.html#autotoc_md28", [
        [ "왜 일반적인 C++ 컨벤션과 다른가?", "ab-convention-rules.html#autotoc_md29", null ],
        [ "Byeol 언어의 핵심 철학을 요약하면", "ab-convention-rules.html#autotoc_md30", null ],
        [ "C++ 코드에 반영된 철학", "ab-convention-rules.html#autotoc_md31", null ],
        [ "코딩 스타일은 clang-format으로 자동 적용", "ab-convention-rules.html#autotoc_md32", null ]
      ] ],
      [ "네이밍 규칙", "ab-convention-rules.html#autotoc_md34", [
        [ "클래스와 변수: camelCase", "ab-convention-rules.html#autotoc_md35", [
          [ "✅ 올바른 예제", "ab-convention-rules.html#autotoc_md36", null ],
          [ "❌ 잘못된 예제", "ab-convention-rules.html#autotoc_md37", null ]
        ] ],
        [ "매크로: UPPER_SNAKE_CASE", "ab-convention-rules.html#autotoc_md38", [
          [ "✅ 올바른 예제", "ab-convention-rules.html#autotoc_md39", null ],
          [ "❌ 잘못된 예제", "ab-convention-rules.html#autotoc_md40", null ]
        ] ],
        [ "non public accessor를 위한 언더스코어 접두사", "ab-convention-rules.html#autotoc_md41", null ],
        [ "네이밍 철학", "ab-convention-rules.html#autotoc_md42", [
          [ "✅ 올바른 예제", "ab-convention-rules.html#autotoc_md43", null ],
          [ "❌ 불필요하게 긴 예제", "ab-convention-rules.html#autotoc_md44", null ],
          [ "일반적인 네이밍 가이드", "ab-convention-rules.html#autotoc_md45", null ]
        ] ],
        [ "간단하고 직관적인 단어 선호", "ab-convention-rules.html#autotoc_md46", null ],
        [ "자주 사용하는 동사", "ab-convention-rules.html#autotoc_md47", null ]
      ] ],
      [ "코드 스타일", "ab-convention-rules.html#autotoc_md49", [
        [ "줄 길이와 들여쓰기", "ab-convention-rules.html#autotoc_md50", [
          [ "줄 길이 제한", "ab-convention-rules.html#autotoc_md51", null ],
          [ "들여쓰기: 4 스페이스", "ab-convention-rules.html#autotoc_md52", null ],
          [ "중괄호 스타일: 같은 줄에 배치", "ab-convention-rules.html#autotoc_md53", null ],
          [ "포인터/참조 정렬: 왼쪽 정렬", "ab-convention-rules.html#autotoc_md54", null ],
          [ "괄호 앞 공백: 공백 없음", "ab-convention-rules.html#autotoc_md55", null ],
          [ "네임스페이스 들여쓰기: 들여쓰기 적용", "ab-convention-rules.html#autotoc_md56", null ],
          [ "짧은 함수/블록: 한 줄 허용", "ab-convention-rules.html#autotoc_md57", null ],
          [ "1줄 블록문: 중괄호 생략", "ab-convention-rules.html#autotoc_md58", null ],
          [ "접근 제어자 순서", "ab-convention-rules.html#autotoc_md59", null ],
          [ "Early-Return Pattern 선호", "ab-convention-rules.html#autotoc_md60", null ],
          [ "TO 매크로 사용", "ab-convention-rules.html#autotoc_md61", null ]
        ] ]
      ] ],
      [ "문서화 표준", "ab-convention-rules.html#autotoc_md63", [
        [ "Doxygen 주석 기본 규칙", "ab-convention-rules.html#autotoc_md64", [
          [ "/** 스타일만 사용", "ab-convention-rules.html#autotoc_md65", null ],
          [ "@ 접두사 사용", "ab-convention-rules.html#autotoc_md66", null ]
        ] ],
        [ "파일 주석", "ab-convention-rules.html#autotoc_md67", [
          [ "@file 태그", "ab-convention-rules.html#autotoc_md68", null ]
        ] ],
        [ "클래스 주석", "ab-convention-rules.html#autotoc_md69", [
          [ "예제 1: 간단한 클래스", "ab-convention-rules.html#autotoc_md70", null ],
          [ "예제 2: 복잡한 클래스 - 여러 단락", "ab-convention-rules.html#autotoc_md71", null ]
        ] ],
        [ "함수 주석", "ab-convention-rules.html#autotoc_md72", null ],
        [ "code 블록 사용", "ab-convention-rules.html#autotoc_md73", null ],
        [ "ref로 다른 코드 참조", "ab-convention-rules.html#autotoc_md74", null ],
        [ "개발 노트는 Doxygen 밖에", "ab-convention-rules.html#autotoc_md75", null ],
        [ "자명한 코드에는 주석 금지", "ab-convention-rules.html#autotoc_md76", null ]
      ] ],
      [ "헤더 파일 포함", "ab-convention-rules.html#autotoc_md78", null ]
    ] ],
    [ "아키텍쳐와 설계", "ac-architecture-overview.html", "ac-architecture-overview" ],
    [ "테스트 케이스 작성 가이드", "ak-testing-guide.html", [
      [ "Unit Test (단위 테스트)", "ak-testing-guide.html#autotoc_md280", [
        [ "파일 위치와 네이밍", "ak-testing-guide.html#autotoc_md281", null ],
        [ "기본 구조", "ak-testing-guide.html#autotoc_md282", null ],
        [ "byeolTest 클래스의 주요 기능", "ak-testing-guide.html#autotoc_md283", null ],
        [ "Google Test 검증 매크로", "ak-testing-guide.html#autotoc_md284", null ],
        [ "실전 예제", "ak-testing-guide.html#autotoc_md285", null ]
      ] ],
      [ "Integration Test (통합 테스트)", "ak-testing-guide.html#autotoc_md287", [
        [ "Antipattern Test?", "ak-testing-guide.html#autotoc_md288", null ],
        [ "파일 위치와 네이밍", "ak-testing-guide.html#autotoc_md289", null ],
        [ "기본 구조", "ak-testing-guide.html#autotoc_md290", null ],
        [ "byeolIntegTest의 빌더 패턴", "ak-testing-guide.html#autotoc_md291", null ],
        [ "파싱 결과 검증", "ak-testing-guide.html#autotoc_md292", null ],
        [ "Negative 테스트", "ak-testing-guide.html#autotoc_md293", null ],
        [ "shouldParsed vs shouldVerified", "ak-testing-guide.html#autotoc_md294", null ],
        [ "런타임 에러 테스트", "ak-testing-guide.html#autotoc_md295", null ],
        [ "실전 예제", "ak-testing-guide.html#autotoc_md296", null ]
      ] ],
      [ "E2E Test (종단간 테스트)", "ak-testing-guide.html#autotoc_md298", [
        [ "파일 위치와 네이밍", "ak-testing-guide.html#autotoc_md299", null ],
        [ "기본 구조", "ak-testing-guide.html#autotoc_md300", null ],
        [ "테스트 데이터 파일", "ak-testing-guide.html#autotoc_md301", null ],
        [ "parse와 run", "ak-testing-guide.html#autotoc_md302", null ],
        [ "Negative 테스트", "ak-testing-guide.html#autotoc_md303", null ]
      ] ],
      [ "테스트 작성 시 주의사항", "ak-testing-guide.html#autotoc_md305", [
        [ "올바른 베이스 클래스 상속", "ak-testing-guide.html#autotoc_md306", null ],
        [ "negative() 호출", "ak-testing-guide.html#autotoc_md307", null ],
        [ "OR_ASSERT 사용", "ak-testing-guide.html#autotoc_md308", null ],
        [ "shouldParsed vs shouldVerified vs run()", "ak-testing-guide.html#autotoc_md309", null ],
        [ "Raw String Literal 구분자", "ak-testing-guide.html#autotoc_md310", null ],
        [ "SetUp/TearDown 오버라이드", "ak-testing-guide.html#autotoc_md311", null ],
        [ "테스트 독립성", "ak-testing-guide.html#autotoc_md312", null ],
        [ "한 가지만 테스트", "ak-testing-guide.html#autotoc_md313", null ],
        [ "명확한 테스트 이름", "ak-testing-guide.html#autotoc_md314", null ],
        [ "Negative 테스트 포함", "ak-testing-guide.html#autotoc_md315", null ],
        [ "리소스 정리", "ak-testing-guide.html#autotoc_md316", null ]
      ] ],
      [ "디버깅", "ak-testing-guide.html#autotoc_md318", [
        [ "특정 테스트 케이스만 실행하기", "ak-testing-guide.html#autotoc_md319", null ],
        [ "verbose 모드", "ak-testing-guide.html#autotoc_md320", null ],
        [ "디버거 사용", "ak-testing-guide.html#autotoc_md321", null ],
        [ "에러 리포트 확인", "ak-testing-guide.html#autotoc_md322", null ],
        [ "테스트 실행", "ak-testing-guide.html#autotoc_md324", null ]
      ] ]
    ] ],
    [ "프로젝트 구조 및 빌드 산출물", "al-build-structure.html", [
      [ "프로젝트 디렉토리 구조", "al-build-structure.html#autotoc_md327", [
        [ "디렉토리 설명", "al-build-structure.html#autotoc_md328", [
          [ "module/ - 소스 코드", "al-build-structure.html#autotoc_md329", null ],
          [ "bin/ - 빌드 산출물", "al-build-structure.html#autotoc_md330", null ],
          [ "build/ - 빌드 시스템", "al-build-structure.html#autotoc_md331", null ],
          [ "doc/ - 문서", "al-build-structure.html#autotoc_md332", null ],
          [ "external/ - 외부 라이브러리", "al-build-structure.html#autotoc_md333", null ]
        ] ]
      ] ],
      [ "빌드 산출물", "al-build-structure.html#autotoc_md335", [
        [ "실행 파일", "al-build-structure.html#autotoc_md336", [
          [ "byeol", "al-build-structure.html#autotoc_md337", null ],
          [ "test", "al-build-structure.html#autotoc_md338", null ]
        ] ],
        [ "동적 라이브러리", "al-build-structure.html#autotoc_md339", [
          [ "libindep", "al-build-structure.html#autotoc_md340", null ],
          [ "libclog", "al-build-structure.html#autotoc_md341", null ],
          [ "libmeta", "al-build-structure.html#autotoc_md342", null ],
          [ "libmemlite", "al-build-structure.html#autotoc_md343", null ],
          [ "libstela", "al-build-structure.html#autotoc_md344", null ],
          [ "libcore", "al-build-structure.html#autotoc_md345", null ]
        ] ],
        [ "기타 산출물", "al-build-structure.html#autotoc_md346", [
          [ "pack/ - 팩 파일", "al-build-structure.html#autotoc_md347", null ],
          [ "testdata/ - 테스트 데이터", "al-build-structure.html#autotoc_md348", null ]
        ] ]
      ] ],
      [ "빌드 타겟", "al-build-structure.html#autotoc_md350", [
        [ "Debug 빌드 (dbg)", "al-build-structure.html#autotoc_md351", null ],
        [ "Release 빌드 (rel)", "al-build-structure.html#autotoc_md352", null ],
        [ "Release with Debug Info 빌드 (reldbg)", "al-build-structure.html#autotoc_md353", null ],
        [ "WebAssembly 빌드 (wasm)", "al-build-structure.html#autotoc_md354", null ],
        [ "Coverage 빌드 (cov)", "al-build-structure.html#autotoc_md355", null ],
        [ "빌드 타겟 비교표", "al-build-structure.html#autotoc_md356", null ]
      ] ],
      [ "Git Repository 구조", "al-build-structure.html#autotoc_md358", [
        [ "추적되는 파일", "al-build-structure.html#autotoc_md359", null ],
        [ "추적되지 않는 파일", "al-build-structure.html#autotoc_md360", null ]
      ] ],
      [ "참고 사항", "al-build-structure.html#autotoc_md362", [
        [ "플랫폼별 차이", "al-build-structure.html#autotoc_md363", [
          [ "Linux", "al-build-structure.html#autotoc_md364", null ],
          [ "macOS", "al-build-structure.html#autotoc_md365", null ],
          [ "Windows", "al-build-structure.html#autotoc_md366", null ]
        ] ],
        [ "주의사항", "al-build-structure.html#autotoc_md367", null ]
      ] ]
    ] ],
    [ "문서 작성 규칙", "am-document-convention.html", [
      [ "문서의 톤과 어조", "am-document-convention.html#autotoc_md370", null ],
      [ "Doxygen 호환성", "am-document-convention.html#autotoc_md372", null ],
      [ "문서 구조", "am-document-convention.html#autotoc_md374", null ],
      [ "문서 체계 및 분류", "am-document-convention.html#autotoc_md376", null ],
      [ "문서 Navigation", "am-document-convention.html#autotoc_md378", null ],
      [ "새 문서 추가 절차", "am-document-convention.html#autotoc_md380", null ],
      [ "문서 분할 (Subpage)", "am-document-convention.html#autotoc_md382", null ],
      [ "예시의 중요성", "am-document-convention.html#autotoc_md384", null ],
      [ "Style Annotation 시스템", "am-document-convention.html#autotoc_md386", [
        [ "언어 지정", "am-document-convention.html#autotoc_md387", null ],
        [ "실행 가능 코드 표시", "am-document-convention.html#autotoc_md388", null ],
        [ "검증 완료 코드 표시: verified", "am-document-convention.html#autotoc_md389", null ],
        [ "보여지는 코드와 실행 코드 분리: shown", "am-document-convention.html#autotoc_md390", null ]
      ] ],
      [ "문서 작성 스타일", "am-document-convention.html#autotoc_md392", null ]
    ] ],
    [ "모듈", "modules.html", "modules" ],
    [ "클래스 색인", "classes.html", null ],
    [ "파일 목록", "files.html", "files" ]
  ] ]
];

var NAVTREEINDEX =
[
"_f_b_o_expr_8hpp.html",
"ak-testing-guide.html#autotoc_md303",
"classby_1_1def_var_expr.html#a79583b43b6ea945cbe967e7e54719e7a",
"classby_1_1signaler.html",
"def_prop_expr_8hpp.html",
"life_8hpp_source.html",
"structby_1_1type_trait.html"
];

var SYNCONMSG = '패널 동기화를 비활성화하기 위해 클릭하십시오';
var SYNCOFFMSG = '패널 동기화를 활성화하기 위해 클릭하십시오';