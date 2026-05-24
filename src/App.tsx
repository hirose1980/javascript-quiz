import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

type QuizQuestion = {
  id: number;
  category: string;
  level: "基礎" | "標準" | "実践";
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
};

const questions: QuizQuestion[] = [
  {
    id: 1,
    category: "JavaScript基礎",
    level: "基礎",
    question: "JavaScriptの役割として正しいものはどれ？",
    choices: [
      "Webページに動きや処理を追加する",
      "HTMLタグの名前を決める",
      "CSSファイルだけを作る",
      "画像ファイルを圧縮する",
    ],
    answer: 0,
    explanation:
      "JavaScriptは、クリック時の処理、入力チェック、表示切替など、Webページに動きや処理を追加するために使います。",
  },
  {
    id: 2,
    category: "JavaScript基礎",
    level: "基礎",
    question: "HTML・CSS・JavaScriptの役割の組み合わせとして正しいものはどれ？",
    choices: [
      "HTML=構造、CSS=見た目、JavaScript=処理",
      "HTML=処理、CSS=データ保存、JavaScript=見た目",
      "HTML=通信、CSS=条件分岐、JavaScript=画像作成",
      "HTML=データベース、CSS=API、JavaScript=設計書",
    ],
    answer: 0,
    explanation:
      "HTMLは構造、CSSは見た目、JavaScriptは処理や動きを担当します。",
  },
  {
    id: 3,
    category: "変数・定数",
    level: "基礎",
    question: "あとから値を変更しない前提で使う宣言はどれ？",
    choices: ["let", "const", "var", "return"],
    answer: 1,
    explanation:
      "constは再代入できない変数宣言です。基本的にはconstを優先し、再代入が必要な場合にletを使います。",
  },
  {
    id: 4,
    category: "変数・定数",
    level: "基礎",
    question: "あとから値を入れ替える可能性がある場合に使う宣言はどれ？",
    choices: ["const", "let", "function", "if"],
    answer: 1,
    explanation:
      "letは再代入できる変数宣言です。カウント用の値など、処理中に変化する値に使います。",
  },
  {
    id: 5,
    category: "データ型",
    level: "基礎",
    question: "文字列を表す書き方として正しいものはどれ？",
    choices: ["100", "true", "'JavaScript'", "null"],
    answer: 2,
    explanation:
      "'JavaScript' のようにクォーテーションで囲んだ値は文字列です。",
  },
  {
    id: 6,
    category: "データ型",
    level: "基礎",
    question: "真偽値を表すものはどれ？",
    choices: ["'true'", "100", "true", "undefined"],
    answer: 2,
    explanation: "true / false は真偽値です。'true' は文字列なので別物です。",
  },
  {
    id: 7,
    category: "演算子",
    level: "基礎",
    question: "10 % 3 の結果はどれ？",
    choices: ["3", "1", "10", "0"],
    answer: 1,
    explanation: "% は余りを求める演算子です。10 ÷ 3 の余りは1です。",
  },
  {
    id: 8,
    category: "演算子",
    level: "標準",
    question: "=== の説明として正しいものはどれ？",
    choices: [
      "値と型が等しいか比較する",
      "値を代入する",
      "文字列を結合する",
      "配列を作成する",
    ],
    answer: 0,
    explanation:
      "=== は値と型の両方を比較します。JavaScriptでは基本的に == より === を使うのが安全です。",
  },
  {
    id: 9,
    category: "条件分岐",
    level: "基礎",
    question: "if文の役割はどれ？",
    choices: [
      "条件によって処理を分ける",
      "配列に値を追加する",
      "関数を必ず1回実行する",
      "CSSを読み込む",
    ],
    answer: 0,
    explanation: "if文は、条件がtrueかfalseかによって実行する処理を分けます。",
  },
  {
    id: 10,
    category: "条件分岐",
    level: "標準",
    question: "else if を使う場面として正しいものはどれ？",
    choices: [
      "複数の条件を順番に判定したいとき",
      "配列の末尾に追加したいとき",
      "関数を終了したいとき",
      "HTML要素を取得したいとき",
    ],
    answer: 0,
    explanation:
      "else if は、条件Aでなければ条件B、条件Bでなければ条件C、というように複数条件を判定するときに使います。",
  },
  {
    id: 11,
    category: "繰り返し",
    level: "基礎",
    question: "for文を使う場面として正しいものはどれ？",
    choices: [
      "同じ処理を繰り返したいとき",
      "値を1つだけ保存したいとき",
      "CSSだけを変更したいとき",
      "関数に名前をつけたいとき",
    ],
    answer: 0,
    explanation:
      "for文は、同じ処理を決まった回数繰り返したいときや、配列を順番に処理したいときに使います。",
  },
  {
    id: 12,
    category: "繰り返し",
    level: "基礎",
    question: "while文の特徴として正しいものはどれ？",
    choices: [
      "条件がtrueの間、処理を繰り返す",
      "必ず10回だけ繰り返す",
      "配列専用である",
      "関数の戻り値を返す",
    ],
    answer: 0,
    explanation:
      "while文は、条件がtrueの間だけ処理を繰り返します。条件がずっとtrueだと無限ループになるので注意が必要です。",
  },
  {
    id: 13,
    category: "繰り返し",
    level: "標準",
    question: "do...while文の特徴はどれ？",
    choices: [
      "最低1回は処理を実行してから条件を確認する",
      "条件がfalseなら絶対に1回も実行しない",
      "配列の要素を削除する",
      "関数を定義する",
    ],
    answer: 0,
    explanation:
      "do...while は、先に処理を1回実行してから条件を判定します。そのため最低1回は実行されます。",
  },
  {
    id: 14,
    category: "繰り返し",
    level: "標準",
    question: "break の役割として正しいものはどれ？",
    choices: [
      "繰り返し処理を途中で終了する",
      "次の周回だけに進む",
      "配列に追加する",
      "関数を作る",
    ],
    answer: 0,
    explanation: "break はループやswitch文を途中で終了するときに使います。",
  },
  {
    id: 15,
    category: "繰り返し",
    level: "標準",
    question: "continue の役割として正しいものはどれ？",
    choices: [
      "現在の周回をスキップして次の周回へ進む",
      "繰り返し処理を完全に終了する",
      "配列を空にする",
      "値を返す",
    ],
    answer: 0,
    explanation:
      "continue は、その周回の残り処理を飛ばして次の繰り返しへ進みます。",
  },
  {
    id: 16,
    category: "関数",
    level: "基礎",
    question: "関数とは何か？",
    choices: [
      "処理をまとめて必要なときに呼び出せるもの",
      "CSSを書く場所",
      "HTMLタグの名前",
      "配列の番号",
    ],
    answer: 0,
    explanation:
      "関数は、処理のまとまりに名前をつけて、必要なタイミングで呼び出せるようにしたものです。",
  },
  {
    id: 17,
    category: "関数",
    level: "基礎",
    question: "関数宣言の基本形として正しいものはどれ？",
    choices: [
      "function greet() { }",
      "greet function() { }",
      "function = greet { }",
      "const function greet { }",
    ],
    answer: 0,
    explanation: "関数宣言の基本形は function 関数名() { 処理 } です。",
  },
  {
    id: 18,
    category: "関数",
    level: "基礎",
    question: "引数の説明として正しいものはどれ？",
    choices: [
      "関数に渡す入力値",
      "関数の名前",
      "配列の最後の値",
      "if文の条件だけを保存するもの",
    ],
    answer: 0,
    explanation:
      "引数は、関数に渡す値です。引数を使うと、同じ関数でも渡す値によって結果を変えられます。",
  },
  {
    id: 19,
    category: "関数",
    level: "基礎",
    question: "return の役割はどれ？",
    choices: [
      "関数の結果を呼び出し元へ返す",
      "配列の末尾を削除する",
      "HTML要素を取得する",
      "条件を必ずtrueにする",
    ],
    answer: 0,
    explanation:
      "return は、関数内で作った結果を呼び出し元へ返すために使います。",
  },
  {
    id: 20,
    category: "関数",
    level: "標準",
    question: "returnを書かない関数の戻り値は基本的にどうなる？",
    choices: ["undefined", "null", "false", "0"],
    answer: 0,
    explanation: "return がない関数は、基本的に undefined を返します。",
  },
  {
    id: 21,
    category: "関数",
    level: "標準",
    question: "アロー関数の書き方として正しいものはどれ？",
    choices: [
      "const add = (a, b) => a + b;",
      "const add => (a, b) a + b;",
      "function => add(a, b);",
      "add const = a + b;",
    ],
    answer: 0,
    explanation:
      "アロー関数は const 関数名 = (引数) => 処理 のように書けます。",
  },
  {
    id: 22,
    category: "配列",
    level: "基礎",
    question: "配列とは何か？",
    choices: [
      "複数の値を順番付きでまとめて管理できるもの",
      "1つの値しか保存できないもの",
      "関数の別名",
      "CSSのプロパティ",
    ],
    answer: 0,
    explanation:
      "配列は、複数の値を1つのまとまりとして管理でき、各値には0から始まる番号が付きます。",
  },
  {
    id: 23,
    category: "配列",
    level: "基礎",
    question: "配列の番号は通常いくつから始まる？",
    choices: ["0", "1", "-1", "10"],
    answer: 0,
    explanation: "JavaScriptの配列インデックスは0から始まります。",
  },
  {
    id: 24,
    category: "配列",
    level: "基礎",
    question:
      "const fruits = ['apple', 'banana']; で banana を取り出す書き方は？",
    choices: ["fruits[0]", "fruits[1]", "fruits[2]", "fruits.banana"],
    answer: 1,
    explanation: "appleが0番目、bananaが1番目です。",
  },
  {
    id: 25,
    category: "配列",
    level: "基礎",
    question: "配列の要素数を取得するプロパティはどれ？",
    choices: ["length", "size", "count", "number"],
    answer: 0,
    explanation: "配列.length で要素数を取得できます。",
  },
  {
    id: 26,
    category: "配列メソッド",
    level: "基礎",
    question: "配列の末尾に要素を追加するメソッドはどれ？",
    choices: ["push", "pop", "shift", "filter"],
    answer: 0,
    explanation: "push は配列の末尾に要素を追加します。",
  },
  {
    id: 27,
    category: "配列メソッド",
    level: "基礎",
    question: "配列の末尾から要素を削除するメソッドはどれ？",
    choices: ["push", "pop", "unshift", "map"],
    answer: 1,
    explanation: "pop は配列の最後の要素を削除します。",
  },
  {
    id: 28,
    category: "配列メソッド",
    level: "基礎",
    question: "配列の先頭に要素を追加するメソッドはどれ？",
    choices: ["unshift", "shift", "push", "find"],
    answer: 0,
    explanation: "unshift は配列の先頭に要素を追加します。",
  },
  {
    id: 29,
    category: "配列メソッド",
    level: "基礎",
    question: "配列の先頭から要素を削除するメソッドはどれ？",
    choices: ["shift", "unshift", "pop", "map"],
    answer: 0,
    explanation: "shift は配列の先頭の要素を削除します。",
  },
  {
    id: 30,
    category: "配列メソッド",
    level: "標準",
    question: "map の役割として正しいものはどれ？",
    choices: [
      "各要素を加工して新しい配列を作る",
      "条件に合う要素だけ取り出す",
      "最初の1件だけ探す",
      "配列の最後を削除する",
    ],
    answer: 0,
    explanation:
      "map は配列の各要素を加工し、その結果を新しい配列として返します。",
  },
  {
    id: 31,
    category: "配列メソッド",
    level: "標準",
    question: "filter の役割として正しいものはどれ？",
    choices: [
      "条件に合う要素だけを取り出す",
      "全要素を必ず加工する",
      "配列の末尾に追加する",
      "1件だけ取得する",
    ],
    answer: 0,
    explanation:
      "filter は条件に一致した要素だけを残した新しい配列を作ります。",
  },
  {
    id: 32,
    category: "配列メソッド",
    level: "標準",
    question: "find の役割として正しいものはどれ？",
    choices: [
      "条件に合う最初の1件を返す",
      "条件に合う全件を配列で返す",
      "各要素を加工する",
      "配列を並び替える",
    ],
    answer: 0,
    explanation:
      "find は条件に合う最初の要素を1つ返します。全件欲しい場合はfilterです。",
  },
  {
    id: 33,
    category: "配列メソッド",
    level: "標準",
    question: "forEach の特徴として正しいものはどれ？",
    choices: [
      "各要素に対して処理を実行する",
      "新しい配列を必ず返す",
      "条件に合う1件だけ返す",
      "配列の先頭を削除する",
    ],
    answer: 0,
    explanation:
      "forEach は各要素に対して処理を実行します。mapのように新しい配列を作る目的では使いません。",
  },
  {
    id: 34,
    category: "オブジェクト",
    level: "基礎",
    question: "オブジェクトとは何か？",
    choices: [
      "キーと値の組み合わせでデータを管理するもの",
      "値を番号だけで管理するもの",
      "繰り返し処理のこと",
      "HTMLタグのこと",
    ],
    answer: 0,
    explanation:
      "オブジェクトは name: 'Taro' のように、キーと値の組み合わせでデータを管理します。",
  },
  {
    id: 35,
    category: "オブジェクト",
    level: "基礎",
    question: "const user = { name: 'Taro' }; で name を取得する書き方は？",
    choices: ["user.name", "user[0]", "name.user", "user()"],
    answer: 0,
    explanation:
      "オブジェクトの値は user.name のようなドット記法で取得できます。",
  },
  {
    id: 36,
    category: "オブジェクト",
    level: "標準",
    question: "user['name'] のような書き方を何という？",
    choices: ["ブラケット記法", "ドット記法", "関数宣言", "条件分岐"],
    answer: 0,
    explanation:
      "オブジェクトの値は user.name のほかに user['name'] のようなブラケット記法でも取得できます。",
  },
  {
    id: 37,
    category: "配列×オブジェクト",
    level: "標準",
    question: "複数の商品データを扱う形として自然なのはどれ？",
    choices: [
      "const items = [{ name: 'A', price: 100 }, { name: 'B', price: 200 }];",
      "const items = 'A,B';",
      "const items = true;",
      "const items = 100;",
    ],
    answer: 0,
    explanation:
      "複数件のデータは配列で管理し、1件ごとの詳細はオブジェクトで表す形がよく使われます。",
  },
  {
    id: 38,
    category: "配列×オブジェクト",
    level: "標準",
    question:
      "const users = [{ name: 'Taro' }, { name: 'Hanako' }]; で Hanako を取得する書き方は？",
    choices: [
      "users[1].name",
      "users.name[1]",
      "users[0].Hanako",
      "users.Hanako",
    ],
    answer: 0,
    explanation:
      "users[1]で2番目のオブジェクトを取得し、.nameで値を取り出します。",
  },
  {
    id: 39,
    category: "データ構造",
    level: "基礎",
    question: "配列とオブジェクトの違いとして正しいものはどれ？",
    choices: [
      "配列は順番、オブジェクトはキー名で管理する",
      "配列もオブジェクトもまったく同じ使い方をする",
      "オブジェクトは複数データを持てない",
      "配列は文字列しか入れられない",
    ],
    answer: 0,
    explanation:
      "配列は順番で管理し、オブジェクトはキー名で意味を持たせて管理します。",
  },
  {
    id: 40,
    category: "データ構造",
    level: "実践",
    question: "商品一覧画面のデータとして扱いやすい形式はどれ？",
    choices: [
      "商品オブジェクトの配列",
      "商品名だけの文字列1つ",
      "true / falseだけ",
      "CSSクラス名だけ",
    ],
    answer: 0,
    explanation:
      "商品一覧は複数件のデータなので、商品オブジェクトの配列として持つと扱いやすいです。",
  },
  {
    id: 41,
    category: "コード読解",
    level: "実践",
    question:
      "const nums = [1, 2, 3]; const result = nums.map(n => n * 2); の result は？",
    choices: ["[2, 4, 6]", "[1, 2, 3]", "6", "undefined"],
    answer: 0,
    explanation: "mapで各要素を2倍にしているので [2, 4, 6] になります。",
  },
  {
    id: 42,
    category: "コード読解",
    level: "実践",
    question:
      "const nums = [1, 2, 3, 4]; const result = nums.filter(n => n >= 3); の result は？",
    choices: ["[3, 4]", "[1, 2]", "3", "[1, 2, 3, 4]"],
    answer: 0,
    explanation: "n >= 3 に一致する要素だけを残すので [3, 4] です。",
  },
  {
    id: 43,
    category: "コード読解",
    level: "実践",
    question: "function add(a, b) { return a + b; } add(2, 3); の結果は？",
    choices: ["5", "2", "3", "undefined"],
    answer: 0,
    explanation: "aに2、bに3が入り、return a + b で5が返ります。",
  },
  {
    id: 44,
    category: "コード読解",
    level: "実践",
    question: "const user = { name: 'Taro', age: 20 }; user.age の結果は？",
    choices: ["20", "Taro", "age", "undefined"],
    answer: 0,
    explanation: "user.age で age プロパティの値である20を取得できます。",
  },
  {
    id: 45,
    category: "コード読解",
    level: "実践",
    question:
      "const items = [{ id: 1 }, { id: 2 }]; items.find(item => item.id === 2); の結果は？",
    choices: ["{ id: 2 }", "[{ id: 2 }]", "2", "undefined"],
    answer: 0,
    explanation:
      "findは条件に合う最初の1件を返すため、オブジェクト { id: 2 } が返ります。",
  },
  {
    id: 46,
    category: "コード読解",
    level: "実践",
    question: "let count = 0; count = count + 1; の後、count は？",
    choices: ["1", "0", "undefined", "count + 1"],
    answer: 0,
    explanation: "最初に0が入り、その後 count + 1 で1になります。",
  },
  {
    id: 47,
    category: "実装判断",
    level: "実践",
    question:
      "価格が1000円以上の商品だけ取り出したい。使うメソッドとして自然なのは？",
    choices: ["filter", "map", "push", "pop"],
    answer: 0,
    explanation: "条件に合う要素だけを取り出したい場合は filter が自然です。",
  },
  {
    id: 48,
    category: "実装判断",
    level: "実践",
    question:
      "商品一覧の価格をすべて税込価格に変換した配列を作りたい。使うメソッドとして自然なのは？",
    choices: ["map", "filter", "find", "shift"],
    answer: 0,
    explanation: "各要素を加工して新しい配列を作りたい場合は map が自然です。",
  },
  {
    id: 49,
    category: "実装判断",
    level: "実践",
    question:
      "idが一致する商品を1件だけ取得したい。使うメソッドとして自然なのは？",
    choices: ["find", "filter", "map", "forEach"],
    answer: 0,
    explanation:
      "1件だけ欲しい場合は find が自然です。複数件欲しい場合は filter を使います。",
  },
  {
    id: 50,
    category: "実装判断",
    level: "実践",
    question:
      "配列の各要素を画面に表示するために順番に処理したい。考え方として近いものは？",
    choices: [
      "配列をmapで回して要素ごとの表示を作る",
      "constを使わない",
      "if文だけで全件表示する",
      "returnを書かない",
    ],
    answer: 0,
    explanation:
      "Reactでは配列のmapを使って、要素ごとの表示を作ることがよくあります。",
  },
  {
    id: 51,
    category: "DOM",
    level: "基礎",
    question: "DOM操作とは何か？",
    choices: [
      "JavaScriptからHTML要素を取得・変更すること",
      "GitHubにpushすること",
      "CSSファイルを削除すること",
      "Node.jsをインストールすること",
    ],
    answer: 0,
    explanation:
      "DOM操作では、HTML要素を取得して、文字・表示・スタイルなどをJavaScriptから変更できます。",
  },
  {
    id: 52,
    category: "DOM",
    level: "基礎",
    question: "id='title' の要素を取得する書き方はどれ？",
    choices: [
      "document.getElementById('title')",
      "document.getClass('title')",
      "html.getElement('title')",
      "title.document()",
    ],
    answer: 0,
    explanation:
      "idで要素を取得する場合は document.getElementById('id名') を使います。",
  },
  {
    id: 53,
    category: "DOM",
    level: "標準",
    question: "querySelector('.item') の説明として正しいものは？",
    choices: [
      "CSSセレクタに一致する最初の要素を取得する",
      "配列の最後を取得する",
      "関数を定義する",
      "条件分岐を作る",
    ],
    answer: 0,
    explanation:
      "querySelector はCSSセレクタを使って、一致する最初のHTML要素を取得します。",
  },
  {
    id: 54,
    category: "イベント",
    level: "基礎",
    question: "イベント処理とは何か？",
    choices: [
      "クリックや入力などの操作をきっかけに処理を実行すること",
      "配列の値を必ず削除すること",
      "CSSを読み込むこと",
      "Gitの履歴を見ること",
    ],
    answer: 0,
    explanation:
      "イベント処理は、クリック・入力・送信などのユーザー操作をきっかけに処理を実行します。",
  },
  {
    id: 55,
    category: "イベント",
    level: "標準",
    question: "クリック時に処理を実行したい場合に関係するものはどれ？",
    choices: ["clickイベント", "length", "push", "returnだけ"],
    answer: 0,
    explanation:
      "クリックされたタイミングで処理を実行したい場合は、clickイベントを使います。",
  },
  {
    id: 56,
    category: "入力・フォーム",
    level: "基礎",
    question: "入力チェックの目的として正しいものはどれ？",
    choices: [
      "不正な値や空入力を防ぐため",
      "配列の順番を逆にするため",
      "CSSを自動生成するため",
      "GitHubに公開するため",
    ],
    answer: 0,
    explanation:
      "入力チェックは、必須項目の未入力や形式違いなどを防ぐために行います。",
  },
  {
    id: 57,
    category: "入力・フォーム",
    level: "標準",
    question:
      "フォーム送信時に画面が勝手にリロードされるのを防ぐ処理として関係するものは？",
    choices: [
      "event.preventDefault()",
      "array.push()",
      "return 0",
      "document.length",
    ],
    answer: 0,
    explanation:
      "submitイベントでは event.preventDefault() を使うことで、ブラウザ標準の送信・リロードを止められます。",
  },
  {
    id: 58,
    category: "エラー・デバッグ",
    level: "基礎",
    question: "console.log を使う主な目的はどれ？",
    choices: [
      "値や処理の流れを確認するため",
      "CSSを削除するため",
      "配列を必ず空にするため",
      "GitHubにpushするため",
    ],
    answer: 0,
    explanation:
      "console.log は、変数の中身や処理が通っているかを確認するためによく使います。",
  },
  {
    id: 59,
    category: "エラー・デバッグ",
    level: "標準",
    question: "undefined が出る原因としてあり得るものはどれ？",
    choices: [
      "存在しないプロパティを参照している",
      "必ずCSSが間違っている",
      "Gitの設定がない",
      "配列に値が多すぎる",
    ],
    answer: 0,
    explanation:
      "存在しないプロパティや、値が代入されていない変数を参照すると undefined になることがあります。",
  },
  {
    id: 60,
    category: "エラー・デバッグ",
    level: "標準",
    question: "エラーが出たとき、最初に見るべき情報として重要なのは？",
    choices: [
      "エラーメッセージと行番号",
      "PCの壁紙",
      "CSSの色だけ",
      "GitHubのプロフィール画像",
    ],
    answer: 0,
    explanation:
      "エラー調査では、まずエラーメッセージ、ファイル名、行番号を確認します。",
  },
  {
    id: 61,
    category: "ブラウザ基礎",
    level: "基礎",
    question: "ブラウザの開発者ツールでJavaScriptのログを確認する場所は？",
    choices: ["Console", "Elementsだけ", "Networkだけ", "Sourcesだけ"],
    answer: 0,
    explanation:
      "console.log の出力やエラーは、主に開発者ツールの Console タブで確認します。",
  },
  {
    id: 62,
    category: "ブラウザ基礎",
    level: "標準",
    question: "Networkタブで主に確認できるものはどれ？",
    choices: [
      "通信リクエストやレスポンス",
      "配列のpushだけ",
      "関数名の一覧だけ",
      "CSSの色見本だけ",
    ],
    answer: 0,
    explanation:
      "Networkタブでは、API通信のURL、ステータス、レスポンス内容などを確認できます。",
  },
  {
    id: 63,
    category: "用語確認",
    level: "基礎",
    question: "インデックスとは何か？",
    choices: [
      "配列の各要素に付く番号",
      "関数の名前",
      "オブジェクトの値だけ",
      "CSSの単位",
    ],
    answer: 0,
    explanation:
      "配列の要素には0から始まる番号が付き、この番号をインデックスと呼びます。",
  },
  {
    id: 64,
    category: "用語確認",
    level: "基礎",
    question: "プロパティとは何か？",
    choices: [
      "オブジェクトが持つキーと値の組み合わせ",
      "配列の最後の番号",
      "関数を呼び出す記号",
      "HTMLファイル名",
    ],
    answer: 0,
    explanation:
      "オブジェクト内の name: 'Taro' のようなデータをプロパティと呼びます。",
  },
  {
    id: 65,
    category: "用語確認",
    level: "基礎",
    question: "メソッドとは何か？",
    choices: [
      "オブジェクトや配列などが持つ処理",
      "文字列だけを保存する箱",
      "HTMLタグの別名",
      "条件式のこと",
    ],
    answer: 0,
    explanation:
      "pushやmapのように、配列などに対して実行できる処理をメソッドと呼びます。",
  },
  {
    id: 66,
    category: "総合",
    level: "実践",
    question: "配列の中にオブジェクトを入れる形が実務でよく使われる理由は？",
    choices: [
      "複数件のデータを項目名付きで管理しやすいから",
      "CSSが不要になるから",
      "関数を書けなくなるから",
      "HTMLが自動で完成するから",
    ],
    answer: 0,
    explanation:
      "一覧データでは、配列で複数件を持ち、各データをオブジェクトで管理すると扱いやすくなります。",
  },
  {
    id: 67,
    category: "総合",
    level: "実践",
    question: "JavaScriptで処理を作るときに大事な考え方はどれ？",
    choices: [
      "どのデータを、どの順番で、どう処理するか考える",
      "とにかくCSSだけ書く",
      "エラー文を読まない",
      "配列を使わない",
    ],
    answer: 0,
    explanation:
      "JavaScriptでは、データをどう持ち、どの順番で処理し、どんな結果を出すかを考えることが重要です。",
  },
  {
    id: 68,
    category: "総合",
    level: "実践",
    question: "問題を解いて理解確認するメリットはどれ？",
    choices: [
      "読んだだけでなく、自分で判断できるか確認できる",
      "コードを書かなくても実務が全部できる",
      "JavaScriptを使わなくてよくなる",
      "エラーが絶対に出なくなる",
    ],
    answer: 0,
    explanation:
      "問題形式にすると、用語を知っているだけでなく、使いどころや結果を判断できるか確認できます。",
  },
];

const allCategories = [
  "すべて",
  ...Array.from(new Set(questions.map((q) => q.category))),
];
const allLevels = ["すべて", "基礎", "標準", "実践"];

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function App() {
  const [category, setCategory] = useState("すべて");
  const [level, setLevel] = useState("すべて");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState<QuizQuestion[]>([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [randomMode, setRandomMode] = useState(false);
  const [randomQuestions, setRandomQuestions] =
    useState<QuizQuestion[]>(questions);

  const baseQuestions = useMemo(() => {
    const source = reviewMode
      ? mistakes
      : randomMode
        ? randomQuestions
        : questions;

    return source.filter((q) => {
      const categoryOk = category === "すべて" || q.category === category;
      const levelOk = level === "すべて" || q.level === level;
      return categoryOk && levelOk;
    });
  }, [category, level, reviewMode, randomMode, randomQuestions, mistakes]);

  const currentQuestion = baseQuestions[currentIndex];
  const isFinished = currentIndex >= baseQuestions.length;

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
  };

  const handleAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    setShowAnswer(true);

    if (selectedAnswer === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    } else {
      setMistakes((prev) => {
        const exists = prev.some((item) => item.id === currentQuestion.id);
        return exists ? prev : [...prev, currentQuestion];
      });
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowAnswer(false);
    setCurrentIndex((prev) => prev + 1);
  };

  const restart = () => {
    resetQuiz();
  };

  const startReview = () => {
    setReviewMode(true);
    setCategory("すべて");
    setLevel("すべて");
    resetQuiz();
  };

  const endReview = () => {
    setReviewMode(false);
    resetQuiz();
  };

  const toggleRandom = () => {
    const next = !randomMode;
    setRandomMode(next);
    if (next) {
      setRandomQuestions(shuffleArray(questions));
    }
    setReviewMode(false);
    resetQuiz();
  };

  const clearMistakes = () => {
    setMistakes([]);
    setReviewMode(false);
    resetQuiz();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>JavaScript 学習クイズ</h1>
        <p style={styles.description}>
          直近で学習したJavaScript基礎・関数・配列・オブジェクト・DOM・イベント・デバッグを問題形式で確認できます。
        </p>

        <div style={styles.controlArea}>
          <label style={styles.label}>
            カテゴリ
            <select
              style={styles.select}
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setReviewMode(false);
                resetQuiz();
              }}
            >
              {allCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label style={styles.label}>
            難易度
            <select
              style={styles.select}
              value={level}
              onChange={(e) => {
                setLevel(e.target.value);
                setReviewMode(false);
                resetQuiz();
              }}
            >
              {allLevels.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={styles.statusArea}>
          <span style={styles.status}>出題数: {baseQuestions.length}</span>
          <span style={styles.status}>正解: {score}</span>
          <span style={styles.status}>ミス: {mistakes.length}</span>
          {reviewMode && <span style={styles.status}>復習モード中</span>}
          {randomMode && !reviewMode && (
            <span style={styles.status}>ランダム出題中</span>
          )}
        </div>

        <div style={styles.menuArea}>
          <button style={styles.subButton} onClick={restart}>
            最初から
          </button>
          <button style={styles.subButton} onClick={toggleRandom}>
            {randomMode ? "通常順に戻す" : "ランダム出題"}
          </button>
          <button
            style={styles.subButton}
            onClick={startReview}
            disabled={mistakes.length === 0}
          >
            間違えた問題だけ
          </button>
          <button
            style={styles.subButton}
            onClick={clearMistakes}
            disabled={mistakes.length === 0}
          >
            ミス履歴クリア
          </button>
          {reviewMode && (
            <button style={styles.subButton} onClick={endReview}>
              通常問題へ戻る
            </button>
          )}
        </div>

        {baseQuestions.length === 0 ? (
          <div style={styles.resultBox}>
            <h2>該当する問題がありません</h2>
            <p>カテゴリ・難易度を変更してください。</p>
          </div>
        ) : isFinished ? (
          <div style={styles.resultBox}>
            <h2>結果</h2>
            <p style={styles.resultText}>
              {score} / {baseQuestions.length} 問正解
            </p>
            <button style={styles.button} onClick={restart}>
              もう一度解く
            </button>
            {mistakes.length > 0 && !reviewMode && (
              <button style={styles.button} onClick={startReview}>
                間違えた問題だけ復習
              </button>
            )}
          </div>
        ) : (
          <>
            <div style={styles.progressText}>
              {currentIndex + 1} / {baseQuestions.length}
            </div>

            <div style={styles.badgeArea}>
              <span style={styles.badge}>{currentQuestion.category}</span>
              <span style={styles.badge}>{currentQuestion.level}</span>
            </div>

            <h2 style={styles.question}>{currentQuestion.question}</h2>

            <div style={styles.choiceArea}>
              {currentQuestion.choices.map((choice, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect =
                  showAnswer && currentQuestion.answer === index;
                const isWrong =
                  showAnswer && isSelected && currentQuestion.answer !== index;

                return (
                  <button
                    key={index}
                    style={{
                      ...styles.choiceButton,
                      backgroundColor: isCorrect
                        ? "#dcfce7"
                        : isWrong
                          ? "#fee2e2"
                          : isSelected
                            ? "#dbeafe"
                            : "white",
                      borderColor: isCorrect
                        ? "#22c55e"
                        : isWrong
                          ? "#ef4444"
                          : isSelected
                            ? "#2563eb"
                            : "#cbd5e1",
                    }}
                    onClick={() => setSelectedAnswer(index)}
                    disabled={showAnswer}
                  >
                    {String.fromCharCode(65 + index)}. {choice}
                  </button>
                );
              })}
            </div>

            {!showAnswer ? (
              <button
                style={styles.button}
                onClick={handleAnswer}
                disabled={selectedAnswer === null}
              >
                回答する
              </button>
            ) : (
              <div style={styles.answerBox}>
                <h3>
                  {selectedAnswer === currentQuestion.answer
                    ? "正解"
                    : "不正解"}
                </h3>
                <p>{currentQuestion.explanation}</p>
                <button style={styles.button} onClick={nextQuestion}>
                  次の問題へ
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f1f5f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "24px 12px",
    fontFamily: "system-ui, sans-serif",
    color: "#0f172a",
  },
  card: {
    width: "100%",
    maxWidth: "820px",
    backgroundColor: "white",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
  },
  title: {
    textAlign: "center",
    fontSize: "36px",
    margin: "8px 0 8px",
  },
  description: {
    textAlign: "center",
    color: "#475569",
    lineHeight: 1.7,
    marginBottom: "20px",
  },
  controlArea: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
    marginBottom: "14px",
  },
  label: {
    display: "grid",
    gap: "6px",
    fontSize: "14px",
    fontWeight: 700,
  },
  select: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    backgroundColor: "white",
  },
  statusArea: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "12px",
  },
  status: {
    backgroundColor: "#e2e8f0",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "13px",
  },
  menuArea: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "8px",
    marginBottom: "20px",
  },
  subButton: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    backgroundColor: "#f8fafc",
    cursor: "pointer",
    fontWeight: 700,
  },
  progressText: {
    textAlign: "center",
    color: "#475569",
    marginBottom: "12px",
  },
  badgeArea: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    justifyContent: "center",
    marginBottom: "18px",
  },
  badge: {
    backgroundColor: "#e2e8f0",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "13px",
  },
  question: {
    textAlign: "center",
    fontSize: "22px",
    lineHeight: 1.6,
    margin: "18px 0",
  },
  choiceArea: {
    display: "grid",
    gap: "10px",
  },
  choiceButton: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "15px",
    lineHeight: 1.6,
  },
  button: {
    width: "100%",
    marginTop: "18px",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
  },
  answerBox: {
    marginTop: "20px",
    padding: "16px",
    borderRadius: "12px",
    backgroundColor: "#f8fafc",
    lineHeight: 1.7,
  },
  resultBox: {
    textAlign: "center",
    padding: "28px 12px",
    lineHeight: 1.8,
  },
  resultText: {
    fontSize: "22px",
    fontWeight: 700,
  },
};

export default App;
