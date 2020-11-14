---
date: 2020-09-23T23:56:00.000Z
title: Gatsby.jsとTypeScriptでポートフォリオ兼ブログを作った
tags:
  - Gatsby.js
  - React.js
  - TypeScript
  - tailwindcss
cover: ../assets/gatsbyAndTypeScript.jpg
---

こんにちは、てけおけです。今回は自分用のポートフォリオ兼ブログを作ったので、それに関して書いていこうと思います。特に何故その技術を採用したのかを主に書いてみます。

# 使用技術

タイトルの通りではありますが、主に使用した技術と選定理由を書いていきたいと思います。

## Gatsby.js

[Gatsby.js](https://www.gatsbyjs.com/)は React.js をベースとした静的サイトジェネレータ(Static Site Generator: SSG)です。サーバで動的に HTML を生成せず、ビルドをして HTML/CSS/JavaScript を生成します。ブラウザからのアクセス時に静的ファイルを返すだけで済むため、CMS などに比べてパフォーマンスが高速なのが特徴です。

今回このポートフォリオ兼ブログで Gatsby.js を採用した理由は、仕事の関係上 React.js をよく使っていたので馴染みやすかったことと、超爆速なブログやポートフォリオを作成するためのツールとして最近注目が集まっていたことがあります。
また、Apache や nginx を使用せず静的サイトホスティングで公開できるため、サーバ費用をグッと安く抑えられるのも魅力的です。

Gatsby.js を使い始めてから知りましたが、有志が作成したプラグインやスターターが充実しているため、実装を進めるにあたりかなり助かったところが多いです。

唯一不満があるとすると、TypeScript との組み合わせに関するドキュメントがあまり充実していないことです。有志の方が TypeScript との組み合わせた事例を記事にされていたり、一部スターターで TypeScript で組み合わせた事例もあります。ただ、gatsby-config.js が TypeScript 化されておらず中途半端になっていたり、後述しますが主に検索でヒットする TypeScript 対応の記事が少し古かったりと少しハードル高めに感じました。

Gatsby.js 以外では[Next.js](https://nextjs.org/)と比較されることが多いようです。現在のところ、SSG に関する記事は Gatsby.js の方が充実していますので、ブログやポートフォリオのような更新頻度が多くないものは Gatsby.js を使用する方がお手軽でしょう。Gatsby.js はビルドが必要なこともあり動的に更新ができませんので、データの更新が多い Web アプリでは Next.js を採用すべきだと思います。使い分けですね！

## TypeScript

フロントエンドで開発する際のデファクトスタンダードの位置にいると言っても良いと思っております。やはり型があることは大きく、開発時やメンテナンスでデータ構造を把握するための時間を大きく短縮できるのが魅力的です。

Gatsby.js で TypeScript を使用する際、`gatsby-plugin-typescript`のプラグインを使用することでかなりお手軽に TypeScript 対応ができます。Gatsby にデフォルトで組み込まれているので、追加で npm install をしなくて済むのも Good です。

また、`gatsby-plugin-ts-config`というプラグインを入れると`gatsby-node.ts`などという名前で、Gatsby 特有のファイルを TypeScript で書くことができます。

今回ベースとしたサンプルには入っていませんでしたが、GraphQL の型を自動生成してくれる`gatsby-plugin-typegen`を入れると GraphQL のクエリに自動で型を生成してくれるので積極的に導入したいプラグインです。gatsby-plugin-graphql-codegen を記載している記事をよく見かけますが、gatsby-plugin-graphql-codegen のリポジトリにて gatsby-plugin-typegen を使うようアナウンスされておりますので、gatsby-plugin-typegen を使った方が良いでしょう。

# Web ページ作成全般について

ブログ部分はベースのものをほぼ使わせていただいておりますので、ポートフォリオの部分について書いていこうと思います。

## ベースとなるテンプレート

Gatsby.js と TypeScript で構築したかったため、この２つの技術を使用しているブログを探したところ、[こちら](https://blog.hpprc.dev)のブログが設計やデザインの部分で好みでしたのでブログのベースとして使わせていただきました。元々のリポジトリはブログのみでしたので、ポートフォリオ部分は自作しております。

## 画面内になるとフェードインする仕組み

[react-inview-monitor](https://github.com/snipsco/react-inview-monitor)というライブラリを使用しております。このライブラリは、画面内に要素が入ってきた時にクラス名を変更することができます。
画面外のクラスと画面内のクラスに CSS を割り当てることで、画面に要素が入ってきたときにフェードインのアニメーションを実現することができます。

例えば about.tsx に、以下のように InviewMonitor を記載します。

```tsx:title=about.tsx
import InViewMonitor from 'react-inview-monitor';
import './style.css';

export const About = () => {
  return (
    <section className='mx-auto container z-50'>
      <InViewMonitor classNameNotInView='inview-section-hidden' classNameInView='inview-section-active'>
        <h1 className='uppercase font-bold text-6xl text-black text-center'>about</h1>
        {/* ここにコンテンツを記載する */}
      </InViewMonitor>
    </section>
  );
};
```

InviewMonitor タグ内で使用している２つのクラスについて、CSS でスタイルを定義します。

```css:title=style.css
.inview-section-hidden {
  margin: 0;
  opacity: 0;
}

.inview-section-active {
  transition: all 1500ms ease;
  margin: 0;
  opacity: 1;
}
```

先ほどの about.tsx にこの CSS をインポートすることで、画面に要素が入ってきたらフェードインする仕組みが実現できます。

## レスポンシブ対応

tailwindcss を使用する場合、レスポンシブ対応の表記がとても簡単になります。

通常の CSS だとメディアクエリを使用して記載するところですが、tailwindcss を使用することで以下のように相当すっきりします。

```
<div className="flex flex-wrap">
  <div className="w-full lg:w-1/2">{/*コンテンツ*/}</div>
  <Img className="w-full lg:w-1/2" fluid={projectImg} alt="project" />
</div>
```

キモは`w-full lg:w-1/3`の部分です。
この例だと、表示しているブラウザの横幅が 1024px のとき width=50%で表示し、横幅が 1024px 以下になったら width=100%で表示するように指定しています。

## ホスティングサービス

デプロイ後のホスティングには Netlify を使用しています。AWS をよく利用しておりますので、S3 の静的ウェブサイトホスティングも候補でしたが、無料であることと GitHub のリポジトリを更新したら自動的に更新されるところが魅力的でしたので Netlify を採用しました。Netlify は独自ドメインを使用しないなら無料で利用できるのでかなりおすすめのサービスです。

<!--
## 使用しているプラグイン

- gatsby-plugin-mdx

マークダウンを拡張した MDX ファイルを使用し、マークダウンの中で import 文が使えたり、コンポーネントが使えるようにするためのプラグインです。このプラグイン単体を使うというより、以下のプラグインを使うために入れているといった感じです。

- gatsby-remark-autolink-headers

マークダウンで記載したで記載した見出し要素は通常そのまま HTML に変換されるだけですが、このプラグインを導入すると変換する際に id 属性を入れてくれます。

- gatsby-remark-external-links

-->

# 参考にしたサイト

- [blog.hpprc.dev](https://blog.hpprc.dev)

上述しておりますが、技術構成が似ておりデザイン面も好みだったためベースとして非常に参考にさせていただきました。

- [gatsby-starter-portfolio.nakamu.life](https://gatsby-starter-portfolio.nakamu.life)

ポートフォリオのレイアウトについて参考にさせていただきました。

以上、読んでいただきありがとうございました。今後ともよろしくお願いいたします！
