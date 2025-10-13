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
    [ "시작하면서", "index.html", [
      [ "안녕하세요!", "index.html#autotoc_md1", null ]
    ] ],
    [ "개발자 속성 가이드", "quick-guide.html", [
      [ "언어 디자인 철학", "quick-guide.html#autotoc_md2", [
        [ "주석", "quick-guide.html#autotoc_md3", null ],
        [ "기본 타입 제공", "quick-guide.html#autotoc_md4", null ],
        [ "프로퍼티 정의", "quick-guide.html#autotoc_md5", null ],
        [ "StringTemplate", "quick-guide.html#autotoc_md6", null ],
        [ "Map", "quick-guide.html#autotoc_md7", null ],
        [ "배열", "quick-guide.html#autotoc_md8", null ],
        [ "시퀸스", "quick-guide.html#autotoc_md9", null ],
        [ "if", "quick-guide.html#autotoc_md10", null ],
        [ "Block문", "quick-guide.html#autotoc_md11", null ],
        [ "while", "quick-guide.html#autotoc_md12", null ],
        [ "for", "quick-guide.html#autotoc_md13", null ],
        [ "Explicit 캐스팅", "quick-guide.html#autotoc_md14", null ],
        [ "Implicit 캐스팅", "quick-guide.html#autotoc_md15", null ],
        [ "연산자들", "quick-guide.html#autotoc_md16", null ],
        [ "함수", "quick-guide.html#autotoc_md17", null ],
        [ "ret", "quick-guide.html#autotoc_md18", null ],
        [ "객체 정의", "quick-guide.html#autotoc_md19", [
          [ "새로운 객체 만들기", "quick-guide.html#autotoc_md20", null ],
          [ "객체 복제하기", "quick-guide.html#autotoc_md21", null ]
        ] ],
        [ "생성자", "quick-guide.html#autotoc_md22", null ],
        [ "Pack", "quick-guide.html#autotoc_md23", null ],
        [ "scope", "quick-guide.html#autotoc_md24", null ],
        [ "오버로딩", "quick-guide.html#autotoc_md25", null ],
        [ "평가전략", "quick-guide.html#autotoc_md26", null ],
        [ "중첩 객체", "quick-guide.html#autotoc_md27", null ],
        [ "중첩 함수", "quick-guide.html#autotoc_md28", null ],
        [ "클로저", "quick-guide.html#autotoc_md29", null ],
        [ "is", "quick-guide.html#autotoc_md30", null ],
        [ "in", "quick-guide.html#autotoc_md31", null ],
        [ "Pattern Matching", "quick-guide.html#autotoc_md32", null ],
        [ "단축된 할당 문법", "quick-guide.html#autotoc_md33", null ],
        [ "변수명을 타입명과 동일하게 하려면 ‘’`으로 편하게 합니다.", "quick-guide.html#autotoc_md34", null ],
        [ "클래스라는 건 없습니다", "quick-guide.html#autotoc_md35", null ],
        [ "스타일로 Attribute 정의", "quick-guide.html#autotoc_md36", null ],
        [ "타입 추론", "quick-guide.html#autotoc_md37", null ],
        [ "프로퍼티", "quick-guide.html#autotoc_md38", null ],
        [ "우리는 typedef가 필요 없습니다.", "quick-guide.html#autotoc_md39", null ],
        [ "it", "quick-guide.html#autotoc_md40", null ],
        [ "기본 타입도 객체", "quick-guide.html#autotoc_md41", null ],
        [ "표현식 기반 언어", "quick-guide.html#autotoc_md42", null ],
        [ "with", "quick-guide.html#autotoc_md43", null ],
        [ "타입 확장으로 활용", "quick-guide.html#autotoc_md44", null ],
        [ "오버라이딩", "quick-guide.html#autotoc_md45", null ],
        [ "<tt>A::B</tt> 함수 호출", "quick-guide.html#autotoc_md46", null ],
        [ "다중 확장", "quick-guide.html#autotoc_md47", null ],
        [ "static으로 활용", "quick-guide.html#autotoc_md48", null ],
        [ "delegation으로 활용", "quick-guide.html#autotoc_md49", null ],
        [ "import", "quick-guide.html#autotoc_md50", null ],
        [ "err", "quick-guide.html#autotoc_md51", null ],
        [ "errorable type", "quick-guide.html#autotoc_md52", null ],
        [ "safe-navigation", "quick-guide.html#autotoc_md53", null ],
        [ "exception이란?", "quick-guide.html#autotoc_md54", null ],
        [ "abstract", "quick-guide.html#autotoc_md55", null ],
        [ "함수타입 대신 메소드을 사용", "quick-guide.html#autotoc_md56", null ],
        [ "제네릭", "quick-guide.html#autotoc_md57", null ],
        [ "enumeration", "quick-guide.html#autotoc_md58", null ]
      ] ],
      [ "끝맺으면서", "quick-guide.html#autotoc_md59", null ]
    ] ],
    [ "디자인 철학", "design-philosophy.html", [
      [ "작은 장난감 같은 언어를 만든다.", "design-philosophy.html#autotoc_md60", null ],
      [ "기본 언어 기능", "design-philosophy.html#autotoc_md61", null ],
      [ "한곳에서 되었다면, 다른 곳에도 되어야 한다.", "design-philosophy.html#autotoc_md62", null ],
      [ "간결함을 추구한다.", "design-philosophy.html#autotoc_md63", null ],
      [ "무조건적으로 하나의 기능을 위한 기능은 만들지 않는다.", "design-philosophy.html#autotoc_md64", null ],
      [ "모든 기능을 제공하는 언어를 만들지 않는다.", "design-philosophy.html#autotoc_md65", null ],
      [ "속도보다 유지보수를 우선한다.", "design-philosophy.html#autotoc_md66", null ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"design-philosophy.html"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';