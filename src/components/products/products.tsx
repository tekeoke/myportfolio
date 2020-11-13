import React from 'react'
import { Link } from "gatsby"
import InViewMonitor from 'react-inview-monitor';
import { ExternalLink } from '../../components';

const json = {
  "myProducts": {
      "products": [
          {
              "title": "ポートフォリオ兼ブログ",
              "description": "自分自身のポートフォリオ兼技術ブログです。静的サイトジェネレータであるGatsby.jsを使用することで、読み込みの高速化を図っています。開発時に型による安全性と効率の高さを担保したかったため、TypeScriptをベースとして作成しています。",
              "url": "https://github.com/tekeoke",
              "image": "/myportfolio.png"
          }
      ]
  }
}

type productProps = {
  title: string;
  description: string;
  url: string;
  image: string;
};

type productListProps = {
  products: productProps[];
};

const ProductItem: React.FC<productProps> = ({ title, description, url, image }) => {
  return (
    <div className="flex">
      <div className="w-1/3 py-8">
        <h2 className="uppercase text-black font-bold text-2xl text-center">{title}</h2>
        <p className="text-black text-lg w-4/5 mx-auto py-4">
          {description}
        </p>
        <div className="mx-auto text-center">
          <ExternalLink
            className='underline text-indigo-600 font-bold hover:opacity-50'
            href={url}
          >
            <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded mt-6">
              リポジトリへ
            </button>
          </ExternalLink>
        </div>
      </div>
      <div className="mx-auto w-1/2 inline shadow-lg">
        <img className="object-fill inline" src={image} alt="project" />
      </div>
    </div>
  )
}

const ProductList: React.FC<productListProps> = ({products}) => {
  return (
    <>
      {products.map((product) => {
        return <ProductItem title={product.title} description={product.description} url={product.url} image={product.image} />
      })}
    </>
  )
}

export const Products = () => {
  return (
    <div className="flex items-top bg-pattern shadow-inner min-h-4/5">
      <div className="w-full py-6">
        <section className="mx-auto container">
          <InViewMonitor
            classNameNotInView='inview-section-hidden'
            classNameInView='inview-section-active'
          >
            <h1 className="uppercase font-bold text-6xl text-black text-center">
              products
            </h1>
            <p className="text-black text-xl mx-auto py-8">
              作成したアプリをここに記載します。
            </p>
            <ProductList products={json.myProducts.products} />
          </InViewMonitor>
        </section>
      </div>
    </div>
  )
}