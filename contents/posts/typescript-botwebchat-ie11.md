---
date: 2020-12-08T09:00:00.000Z
title: TypeScript + React + BotFramework-WebChatでIE11表示に対応したボットを表示させる
tags:
  - BotFramework
  - React.js
  - TypeScript
  - Webpack
  - Babel
cover: ../assets/BotIE11.jpg
---

こんにちは、てけおけです。
今回は Azure Botframework WebChat を TypeScript ベースの React に組み込んだので、それに関して書いていきます。
特に IE11 対応について非常に苦労したため、つまづいた箇所と解決策について書いてみます。

# 用意するもの

## Azure アカウント

Azure Bot Service を用いた Bot をバックエンドに使用するので、Azure アカウントを作成する必要があります。
Bot 自体は無料で作成できるので、本記事に関する内容で特に請求は発生しないはずです。

## Azure 上に構築した EchoBot

Azure Portal 上で EchoBot を作成しておきます。
手順は[こちらの記事](https://news.mynavi.jp/article/zeroazure-31/)あたりが詳しいので、参考にしやすいかと思います。

## ローカルのフロントエンド開発環境（Node.js など）

既にローカルの開発環境は構築されているものとします。
最低限 Node.js はインストールが必要です。
また、今回は IE11 の動作確認がメインなので Windows を対象とします。

# TypeScript + React + Webpack 5 + Babel 7 のプロジェクトを作成する

ベースのプロジェクトは[こちらの記事](https://qiita.com/y4u0t2a1r0/items/a16d4953d624e25fe184)を使用させていただきました。
webpack.config.js の中に Babel の設定を記載しています。

ちなみに、create-react-app（CRA）で作らなかったのは、eject しないと webpack や Babel の設定を弄れないためです。
また、CRA は dependencies に production で不要なモジュールが多数記載されているのが、個人的にあまり気にくわないのもあります。

# IE11 への対応

今回の本題です。

IE11 に対応するには、「トランスパイル（Transpile）」と「ポリフィル（Polyfill）」の 2 つの手続きを実施する必要があります。

ちなみに「トランスパイル（Transpile）」は、ES6+の最新の JavaScript 仕様で記載されたコードを ES5 など古い仕様に変換することです。
「ポリフィル（Polyfill）」は、最新の仕様で追加された機能を古い仕様でも使えるようにコードを追加することです。

IE11 は ES5 仕様で止まっているので、ES6 以上で記載されたコードを ES5 にトランスパイルし、Promise など ES6 以降で追加された機能をポリフィルしていきます。

TypeScript から ES5 にトランスパイルするには、TypeScript（ts-loader）か Babel（babel-loader）のどちらかを使用することになります。

Babel は`@babel/preset-typescript`というプラグインで TypeScript 対応のトランスパイルが可能であること、`useBuiltins: 'usage'`でソースコードに Babel の Polyfill を記載せずに済む点から、Babel によるトランスパイルを選択しています。

以下に IE11 対応するにあたって苦労したポイントについて記載していきます。

## node_modules 以下の特定プロジェクトを Babel に含める

BotFramework-WebChat を IE11 で使うために Babel でトランスパイルします。

通常、Babel を設定する際 node_modules 以下のフォルダは exclude に記載することが一般的です。
これは、大体のモジュールは IE11 で処理できるよう既にトランスパイルされて提供されており、二重にトランスパイルするとかえってエラーになってしまうためです。
ただし、たまにモジュールがトランスパイルされておらずソースコード中に ES5 で使用できないアロー関数や class 構文が記載されていて、構文エラーが起きることがあります。

BotFramework-WebChat の依存関係では、「microsoft-cognitiveservices-speech-sdk」がトランスパイルされておらず IE11 では使えない class 構文やアロー関数が含まれたままになっていました。

そこで、以下のコードのように exclude の中で該当のモジュールだけ Babel のトランスパイル対象に含めるように設定します。

ちなみに構文エラーが起きた場合、「yarn start」で開発者モードでコードを追いやすくしつつ、IE の「F12 開発者ツール」のコンソールとデバッガーから頑張って対象のモジュールを探していきました。

トランスパイル対象のモジュールを見つけるのに 1 週間かかってしまったので、ここに記載して同じ犠牲者が出ないことを祈ります…

```js:title=webpack.config.js
{
  test: /\.(js|jsx|tsx|ts)$/,
  //exclude: /node_modules/,
  exclude: {
    // node_modulesの中のモジュールを除外対象とする。
    include: /node_modules/,
    // microsoft-cognitiveservices-speech-sdkを除外対象から除外する。
    exclude: /node_modules\/microsoft-cognitiveservices-speech-sdk/,
  },
  use: {
    loader: 'babel-loader',
    options: {
      ...
    },
  },
},
```

## @babel/preset-env の設定

target に IE11 を指定することで、IE11 に対応したコードにトランスパイルしてくれます。
また、`useBuiltIns: 'usage'`が Babel 側で自動で Polyfill してくれる機能です。
core-js は理由がない限り 3 で問題ないと思います。

これだけ指定して実行すると、トランスパイル後のコードで「exports is not defined」と出ることがありました。
この場合、modules: "commonjs"と指定することでエラーが出なくなりました。
CommonJS はサーバサイドにおける Node.js の仕様を策定することを目的としたプロジェクトであり、exports/require が仕様として含まれています。

```js:title=webpack.config.js
presets: [
  [
    '@babel/preset-env',
    {
      targets: {
        ie: "11",
      },
      useBuiltIns: 'usage',
      corejs: { version: 3 },
      modules: "commonjs", //これがないとexports is not definedエラーが出る
    },
  ],
  ...
]
```

## 追加の Polyfill

@babel/preset-env で useBuiltIns: 'usage'を指定すると、ソースコード中に Polyfill の import を書く必要がなくなります。

ただ、react-app-polyfill は入れないと「catch ステートメントでは適用されますが、throw ステートメントでは適用されません。」 というエラーが出たので追加しています。

`npm i -S react-app-polyfill`を実行後、index.tsx の先頭に以下のコードを追加しました。

```tsx:title=index.tsx
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
```

## IE11 で SecurityError が出る場合

ローカルで実行するアプリで WebSocket を利用しようとすると、IE は SecurityError を返します。

SecurityError を出さないようにするには、IE の設定を変更する必要があります。

> [ツール]> [インターネットオプション]> [セキュリティ]> [ローカルイントラネット]> [サイト]> [詳細]から、全てのチェックボックスのチェックを外す

# 実行

最後に実行して IE11 で動くことを確認します。

```
$ yarn start
```

# あとがき

フロントエンドに携わる限り、未だに IE11 は無視できないパターンが多いかと思われます。
Babel で一通り任せたいものの、Babel 自体かなり癖が強いので内容をよく理解しないと IE11 対応でドはまりしてしまいます。

今回の知見をもとに、IE11 対応してと言われてもサクサク対応できるようになれたらいいなと思います。

今回のソースコードは[こちら](https://github.com/tekeoke/azurebot-sample-webchat)です。
