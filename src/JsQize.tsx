import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  Smartphone,
} from "lucide-react";

const questions = [
  {
    category: "JavaScript基礎",
    level: "基礎",
    type: "choice",
    question: "JavaScriptの役割として最も近いものはどれ？",
    choices: [
      "HTMLタグを作るためだけの言語",
      "Webページに動きや処理を追加するための言語",
      "CSSの代わりに色を指定するだけの言語",
      "画像ファイルを作成するための言語",
    ],
    answer: 1,
    explanation:
      "JavaScriptは、クリック時の処理、入力チェック、画面表示の切り替えなど、Webページに動きや処理を追加するために使います。",
  },
  {
    category: "変数・定数",
    level: "基礎",
    type: "choice",
    question: "値をあとから変更しない前提で使う宣言はどれ？",
    choices: ["let", "var", "const", "function"],
    answer: 2,
    explanation:
      "constは再代入できない変数宣言です。あとから別の値を入れ直さないものに使います。",
  },
  {
    category: "条件分岐",
    level: "基礎",
    type: "choice",
    question: "if文の説明として正しいものはどれ？",
    choices: [
      "同じ処理を必ず10回繰り返す文",
      "条件に応じて実行する処理を分ける文",
      "配列の要素を追加する文",
      "関数を定義するためだけの文",
    ],
    answer: 1,
    explanation:
      "if文は「条件がtrueならこの処理、falseなら別の処理」のように処理を分けるために使います。",
  },
  {
    category: "繰り返し",
    level: "基礎",
    type: "choice",
    question: "for文を使う場面として最も適切なのはどれ？",
    choices: [
      "処理を1回だけ実行したいとき",
      "条件に関係なく処理を終了したいとき",
      "決まった回数や配列の要素数分だけ処理を繰り返したいとき",
      "HTMLの見た目だけを変えたいとき",
    ],
    answer: 2,
    explanation:
      "for文は、回数が決まっている繰り返しや、配列の中身を順番に処理するときによく使います。",
  },
  {
    category: "繰り返し",
    level: "基礎",
    type: "choice",
    question: "do...while文の特徴として正しいものはどれ？",
    choices: [
      "条件を見てから一度も実行しない場合がある",
      "最低1回は処理を実行してから条件を確認する",
      "配列専用の繰り返し文である",
      "関数の戻り値を受け取るための文である",
    ],
    answer: 1,
    explanation:
      "do...whileは、先にdoブロックの処理を1回実行し、そのあとwhileの条件を確認します。",
  },
  {
    category: "関数",
    level: "基礎",
    type: "choice",
    question: "関数とは何か？",
    choices: [
      "値を1つだけ保存する箱",
      "複数の処理をまとめて、必要なときに呼び出せるもの",
      "配列の中身を削除する専用命令",
      "HTMLファイルを読み込むための機能",
    ],
    answer: 1,
    explanation:
      "関数は、処理のまとまりに名前をつけて、あとから何度でも呼び出せるようにしたものです。",
  },
  {
    category: "関数",
    level: "基礎",
    type: "choice",
    question: "関数の基本的な書き方として正しいものはどれ？",
    choices: [
      "function greet() { console.log('Hello'); }",
      "greet function() { console.log('Hello'); }",
      "function = greet { console.log('Hello'); }",
      "const function greet = console.log('Hello');",
    ],
    answer: 0,
    explanation: "基本形は function 関数名() { 処理 } です。",
  },
  {
    category: "関数",
    level: "基礎",
    type: "choice",
    question: "引数の説明として正しいものはどれ？",
    choices: [
      "関数の外に結果を返すためのもの",
      "関数に渡す入力値のようなもの",
      "配列の最後の要素のこと",
      "条件分岐の結果だけを保存するもの",
    ],
    answer: 1,
    explanation:
      "引数は、関数に渡す値です。たとえば名前や数値を渡して、処理内容を変えられます。",
  },
  {
    category: "関数",
    level: "基礎",
    type: "choice",
    question: "returnの役割として正しいものはどれ？",
    choices: [
      "関数の結果を呼び出し元へ返す",
      "配列の要素を並び替える",
      "条件を必ずtrueにする",
      "画面をリロードする",
    ],
    answer: 0,
    explanation:
      "returnは、関数で計算・加工した結果を呼び出し元へ返すために使います。",
  },
  {
    category: "配列",
    level: "基礎",
    type: "choice",
    question: "配列の説明として正しいものはどれ？",
    choices: [
      "複数の値を順番付きでまとめて管理できるデータ構造",
      "1つの文字だけを保存する仕組み",
      "条件分岐を書くための構文",
      "関数だけを保存する専用の箱",
    ],
    answer: 0,
    explanation:
      "配列は、複数の値を1つのまとまりとして管理できます。各値には0から始まる番号が付きます。",
  },
  {
    category: "配列",
    level: "基礎",
    type: "choice",
    question:
      "const fruits = ['apple', 'banana']; で banana を取り出す書き方はどれ？",
    choices: ["fruits[0]", "fruits[1]", "fruits[2]", "fruits.banana"],
    answer: 1,
    explanation:
      "配列の番号は0から始まるため、appleが0番目、bananaが1番目です。",
  },
  {
    category: "配列メソッド",
    level: "基礎",
    type: "choice",
    question: "配列の末尾に要素を追加するメソッドはどれ？",
    choices: ["push", "pop", "shift", "map"],
    answer: 0,
    explanation:
      "pushは配列の末尾に要素を追加します。popは末尾から削除します。",
  },
  {
    category: "配列メソッド",
    level: "基礎",
    type: "choice",
    question: "配列の末尾から要素を取り除くメソッドはどれ？",
    choices: ["push", "pop", "unshift", "filter"],
    answer: 1,
    explanation:
      "popは配列の最後の要素を削除します。削除した要素を戻り値として受け取ることもできます。",
  },
  {
    category: "配列メソッド",
    level: "基礎",
    type: "choice",
    question: "配列の先頭に要素を追加するメソッドはどれ？",
    choices: ["push", "pop", "unshift", "shift"],
    answer: 2,
    explanation:
      "unshiftは配列の先頭に要素を追加します。shiftは先頭から削除します。",
  },
  {
    category: "配列メソッド",
    level: "基礎",
    type: "choice",
    question: "配列の先頭から要素を取り除くメソッドはどれ？",
    choices: ["shift", "unshift", "push", "map"],
    answer: 0,
    explanation: "shiftは配列の先頭の要素を削除します。",
  },
  {
    category: "配列メソッド",
    level: "応用入口",
    type: "choice",
    question: "mapメソッドの説明として正しいものはどれ？",
    choices: [
      "条件に合う要素だけを取り出す",
      "各要素を加工して新しい配列を作る",
      "配列の末尾に要素を追加する",
      "配列の長さだけを返す",
    ],
    answer: 1,
    explanation:
      "mapは配列の各要素に処理を行い、その結果を新しい配列として返します。",
  },
  {
    category: "配列メソッド",
    level: "応用入口",
    type: "choice",
    question: "filterメソッドの説明として正しいものはどれ？",
    choices: [
      "各要素を加工して必ず同じ数の配列を作る",
      "条件に合う要素だけを取り出して新しい配列を作る",
      "配列の先頭に要素を追加する",
      "配列を文字列に変換する",
    ],
    answer: 1,
    explanation: "filterは条件に一致した要素だけを残した新しい配列を作ります。",
  },
  {
    category: "配列メソッド",
    level: "応用入口",
    type: "choice",
    question: "findメソッドの説明として正しいものはどれ？",
    choices: [
      "条件に合う最初の1件を返す",
      "条件に合うすべての要素を配列で返す",
      "全要素を必ず数値に変える",
      "配列の長さを変更する",
    ],
    answer: 0,
    explanation:
      "findは条件に合う最初の要素を1つ返します。複数件が欲しい場合はfilterを使います。",
  },
  {
    category: "オブジェクト",
    level: "基礎",
    type: "choice",
    question: "オブジェクトの説明として正しいものはどれ？",
    choices: [
      "値を順番だけで管理するもの",
      "キーと値の組み合わせでデータを管理するもの",
      "繰り返し処理を書くためだけの構文",
      "条件式を保存する専用の箱",
    ],
    answer: 1,
    explanation:
      "オブジェクトは、nameやageのようなキーに対して値を持たせるデータ構造です。",
  },
  {
    category: "オブジェクト",
    level: "基礎",
    type: "choice",
    question:
      "const user = { name: 'Taro', age: 20 }; で name を取り出す書き方はどれ？",
    choices: ["user[0]", "user.name", "user('name')", "name.user"],
    answer: 1,
    explanation:
      "オブジェクトの値は、user.name のようにドット記法で取り出せます。user['name'] のようなブラケット記法もあります。",
  },
  {
    category: "データ構造",
    level: "基礎",
    type: "choice",
    question: "複数の商品データを管理する形として自然なのはどれ？",
    choices: [
      "const items = { name: 'A', price: 100 }; だけで全商品を表す",
      "const items = [{ name: 'A', price: 100 }, { name: 'B', price: 200 }];",
      "const items = 'A, B';",
      "const items = true;",
    ],
    answer: 1,
    explanation:
      "複数の商品を扱う場合は、配列の中に商品オブジェクトを入れる形がよく使われます。",
  },
  {
    category: "配列×オブジェクト",
    level: "応用入口",
    type: "choice",
    question:
      "const users = [{ name: 'Taro' }, { name: 'Hanako' }]; で Hanako を取り出す書き方はどれ？",
    choices: [
      "users.name[1]",
      "users[1].name",
      "users[0].Hanako",
      "users.Hanako",
    ],
    answer: 1,
    explanation:
      "users[1]で2番目のオブジェクトを取り出し、その中のnameを .name で取り出します。",
  },
  {
    category: "DOM",
    level: "基礎",
    type: "choice",
    question: "DOM操作とは何か？",
    choices: [
      "JavaScriptからHTML要素を取得・変更すること",
      "CSSファイルだけを圧縮すること",
      "GitHubへコードを保存すること",
      "PCのフォルダを作成すること",
    ],
    answer: 0,
    explanation:
      "DOM操作では、JavaScriptからHTML要素を取得し、文字・スタイル・表示状態などを変更できます。",
  },
  {
    category: "DOM",
    level: "基礎",
    type: "choice",
    question: "id='title' の要素を取得する書き方として正しいものはどれ？",
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
    category: "イベント",
    level: "基礎",
    type: "choice",
    question: "クリック時の処理を登録する考え方として近いものはどれ？",
    choices: [
      "ユーザー操作をきっかけに関数を実行する",
      "配列の要素数を必ず0にする",
      "CSSの色だけを変更する",
      "HTMLファイルを削除する",
    ],
    answer: 0,
    explanation:
      "イベント処理では、クリックや入力などのユーザー操作をきっかけに処理を実行します。",
  },
  {
    category: "コード読解",
    level: "実践",
    type: "choice",
    question:
      "次のコードの結果は？ const nums = [1, 2, 3]; const result = nums.map(n => n * 2);",
    choices: ["[1, 2, 3]", "[2, 4, 6]", "6", "[1, 4, 9]"],
    answer: 1,
    explanation:
      "mapで各要素を2倍にしているため、結果は [2, 4, 6] になります。",
  },
  {
    category: "コード読解",
    level: "実践",
    type: "choice",
    question:
      "次のコードの結果は？ const nums = [1, 2, 3, 4]; const result = nums.filter(n => n >= 3);",
    choices: ["[1, 2]", "[3, 4]", "3", "[1, 2, 3, 4]"],
    answer: 1,
    explanation: "n >= 3 に当てはまる要素だけを残すので [3, 4] になります。",
  },
  {
    category: "コード読解",
    level: "実践",
    type: "choice",
    question:
      "次のコードの結果は？ function add(a, b) { return a + b; } add(2, 3);",
    choices: ["2", "3", "5", "undefined"],
    answer: 2,
    explanation: "aに2、bに3が入り、return a + b によって5が返ります。",
  },
  {
    category: "コード読解",
    level: "実践",
    type: "choice",
    question:
      "次のコードで表示されるものは？ const user = { name: 'Taro', age: 20 }; console.log(user.age);",
    choices: ["Taro", "20", "age", "undefined"],
    answer: 1,
    explanation:
      "user.age でageプロパティの値を取り出すため、20が表示されます。",
  },
  {
    category: "実装理解",
    level: "実践",
    type: "choice",
    question:
      "商品一覧から価格が1000円以上の商品だけを取り出したい。使う候補として最も自然なのはどれ？",
    choices: ["map", "filter", "push", "pop"],
    answer: 1,
    explanation: "条件に合う要素だけを取り出す場合はfilterが自然です。",
  },
  {
    category: "実装理解",
    level: "実践",
    type: "choice",
    question:
      "商品一覧の価格をすべて税込価格に変換した新しい配列を作りたい。使う候補として最も自然なのはどれ？",
    choices: ["map", "filter", "find", "shift"],
    answer: 0,
    explanation: "全要素を加工して新しい配列を作る場合はmapが自然です。",
  },
  {
    category: "実装理解",
    level: "実践",
    type: "choice",
    question:
      "idが3の商品を1件だけ探したい。使う候補として最も自然なのはどれ？",
    choices: ["filter", "find", "map", "unshift"],
    answer: 1,
    explanation: "条件に一致する最初の1件だけ欲しい場合はfindが自然です。",
  },
  {
    category: "用語確認",
    level: "基礎",
    type: "choice",
    question: "プロパティとは何か？",
    choices: [
      "オブジェクトが持つキーと値の組み合わせ",
      "配列の最後の番号だけを表すもの",
      "関数を呼び出す専用の記号",
      "繰り返し処理の終了条件だけを表すもの",
    ],
    answer: 0,
    explanation:
      "オブジェクト内の name: 'Taro' のようなデータをプロパティと呼びます。",
  },
  {
    category: "用語確認",
    level: "基礎",
    type: "choice",
    question: "インデックスとは何か？",
    choices: [
      "配列の各要素に付く番号",
      "オブジェクトのキー名だけを保存する場所",
      "関数の戻り値",
      "HTMLの見出しタグ",
    ],
    answer: 0,
    explanation:
      "配列の各要素には0から始まる番号が付きます。この番号をインデックスと呼びます。",
  },
  {
    category: "総合",
    level: "実践",
    type: "choice",
    question:
      "JavaScriptでデータを扱うとき、配列とオブジェクトを組み合わせる理由として近いものはどれ？",
    choices: [
      "見た目の色を変えるため",
      "複数件のデータを、項目名付きでわかりやすく管理するため",
      "関数を使えなくするため",
      "HTMLを使わずにWebページを作るため",
    ],
    answer: 1,
    explanation:
      "実務では、複数件のデータを配列で持ち、1件ごとの詳細をオブジェクトで表す形がよく使われます。",
  },
];

const categories = [
  "すべて",
  ...Array.from(new Set(questions.map((q) => q.category))),
];
const levels = ["すべて", "基礎", "応用入口", "実践"];

export default function JavaScriptQuizSite() {
  const [category, setCategory] = useState("すべて");
  const [level, setLevel] = useState("すべて");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [mistakes, setMistakes] = useState([]);
  const [mode, setMode] = useState("normal");

  const filtered = useMemo(() => {
    let base = questions.filter((q) => {
      const categoryOk = category === "すべて" || q.category === category;
      const levelOk = level === "すべて" || q.level === level;
      return categoryOk && levelOk;
    });

    if (mode === "mistake") {
      base = base.filter((q) =>
        mistakes.some((m) => m.question === q.question),
      );
    }

    return base;
  }, [category, level, mode, mistakes]);

  const current = filtered[index] || null;
  const progress = filtered.length
    ? Math.round(((index + 1) / filtered.length) * 100)
    : 0;

  const resetState = () => {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setAnsweredCount(0);
  };

  const changeCategory = (value) => {
    setCategory(value);
    setMode("normal");
    resetState();
  };

  const changeLevel = (value) => {
    setLevel(value);
    setMode("normal");
    resetState();
  };

  const checkAnswer = () => {
    if (selected === null || checked || !current) return;
    const isCorrect = selected === current.answer;
    setChecked(true);
    setAnsweredCount((n) => n + 1);
    if (isCorrect) {
      setScore((s) => s + 1);
    } else {
      setMistakes((prev) => {
        if (prev.some((m) => m.question === current.question)) return prev;
        return [...prev, current];
      });
    }
  };

  const nextQuestion = () => {
    if (index + 1 < filtered.length) {
      setIndex((i) => i + 1);
      setSelected(null);
      setChecked(false);
    }
  };

  const restart = () => {
    resetState();
  };

  const startMistakeMode = () => {
    setMode("mistake");
    resetState();
  };

  const clearMistakes = () => {
    setMistakes([]);
    setMode("normal");
    resetState();
  };

  const finished =
    filtered.length > 0 && checked && index === filtered.length - 1;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto space-y-5">
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm text-sm text-slate-600">
            <Smartphone className="w-4 h-4" />
            休み時間にスマホで解く用 JavaScript確認テスト
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
              JavaScript データ構造・関数 練習サイト
            </h1>
            <p className="mt-2 text-slate-600 leading-relaxed">
              資料を読むだけで終わらせず、用語理解・コード読解・実装判断を問題形式で確認します。
            </p>
          </div>
        </header>

        <Card className="rounded-2xl shadow-sm border-slate-200">
          <CardContent className="p-4 sm:p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="space-y-1 text-sm font-medium">
                出題カテゴリ
                <select
                  value={category}
                  onChange={(e) => changeCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-1 text-sm font-medium">
                難易度
                <select
                  value={level}
                  onChange={(e) => changeLevel(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                >
                  {levels.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-slate-100 p-3">
                <div className="text-xs text-slate-500">問題数</div>
                <div className="text-lg font-bold">{filtered.length}</div>
              </div>
              <div className="rounded-xl bg-slate-100 p-3">
                <div className="text-xs text-slate-500">正解</div>
                <div className="text-lg font-bold">{score}</div>
              </div>
              <div className="rounded-xl bg-slate-100 p-3">
                <div className="text-xs text-slate-500">ミス</div>
                <div className="text-lg font-bold">{mistakes.length}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={restart}
                variant="outline"
                className="rounded-xl"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                最初から
              </Button>
              <Button
                onClick={startMistakeMode}
                variant="outline"
                className="rounded-xl"
                disabled={mistakes.length === 0}
              >
                間違えた問題だけ解く
              </Button>
              <Button
                onClick={clearMistakes}
                variant="outline"
                className="rounded-xl"
                disabled={mistakes.length === 0}
              >
                ミス履歴クリア
              </Button>
            </div>
          </CardContent>
        </Card>

        {!current ? (
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 text-center space-y-3">
              <BookOpen className="w-10 h-10 mx-auto text-slate-500" />
              <p className="font-semibold">該当する問題がありません。</p>
              <p className="text-sm text-slate-600">
                カテゴリや難易度を変更してください。
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="rounded-2xl shadow-sm border-slate-200 overflow-hidden">
            <div className="h-2 bg-slate-200">
              <div
                className="h-2 bg-slate-900 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <CardContent className="p-5 sm:p-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-slate-900 text-white px-3 py-1">
                  {current.category}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  {current.level}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  {index + 1} / {filtered.length}
                </span>
                {mode === "mistake" && (
                  <span className="rounded-full bg-slate-100 px-3 py-1">
                    復習モード
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold leading-relaxed">
                {current.question}
              </h2>

              <div className="space-y-3">
                {current.choices.map((choice, i) => {
                  const isSelected = selected === i;
                  const isCorrect = current.answer === i;
                  const showCorrect = checked && isCorrect;
                  const showWrong = checked && isSelected && !isCorrect;

                  return (
                    <button
                      key={choice}
                      onClick={() => !checked && setSelected(i)}
                      className={`w-full text-left rounded-2xl border p-4 transition bg-white ${
                        isSelected
                          ? "border-slate-900 ring-2 ring-slate-900/10"
                          : "border-slate-200"
                      } ${showCorrect ? "bg-emerald-50 border-emerald-400" : ""} ${
                        showWrong ? "bg-rose-50 border-rose-400" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm sm:text-base leading-relaxed">
                          {choice}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {!checked ? (
                <Button
                  onClick={checkAnswer}
                  disabled={selected === null}
                  className="w-full rounded-2xl py-6 text-base"
                >
                  回答する
                </Button>
              ) : (
                <div className="space-y-4">
                  <div
                    className={`rounded-2xl p-4 ${selected === current.answer ? "bg-emerald-50" : "bg-rose-50"}`}
                  >
                    <div className="flex items-center gap-2 font-bold">
                      {selected === current.answer ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <XCircle className="w-5 h-5" />
                      )}
                      {selected === current.answer ? "正解" : "不正解"}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {current.explanation}
                    </p>
                  </div>

                  {finished ? (
                    <div className="rounded-2xl bg-white border border-slate-200 p-5 text-center space-y-3">
                      <p className="text-xl font-bold">完了！</p>
                      <p className="text-slate-700">
                        今回の結果：{score} / {answeredCount} 問正解
                      </p>
                      <Button onClick={restart} className="rounded-2xl">
                        もう一度解く
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={nextQuestion}
                      className="w-full rounded-2xl py-6 text-base"
                    >
                      次の問題へ
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="rounded-2xl shadow-sm border-slate-200">
          <CardContent className="p-5 space-y-2 text-sm text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-900">使い方</p>
            <p>1. まずは「すべて」で一周します。</p>
            <p>2. 間違えた問題は自動で記録されます。</p>
            <p>
              3.
              休み時間など短い時間では、カテゴリを絞って5〜10問だけ解くのがおすすめです。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
