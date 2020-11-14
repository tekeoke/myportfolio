import React from 'react'
import { Link } from "gatsby"
import InViewMonitor from 'react-inview-monitor';
import { KeyPairKeyObjectResult } from 'crypto';
import { useAnyImage } from '../../hooks';
import Img from "gatsby-image/withIEPolyfill"

const json = {
  "myProfile": {
      "description": "東京のSI企業に勤めている、WEBエンジニアのてけおけです。エンジニア歴４年になります。AWSやAzureを用いたIoTデータ収集基盤の構築、流通・物流業界のクラウド環境基盤の構築を推進・構築を担当しております。他に、チャットボットサービスの立ち上げに携わり、フロントエンド・バックエンド両面で開発リーダーとしてアプリの開発を行っております。",
      "profile": {
          "Name": "てけおけ",
          "Address": "横浜",
          "Email": "r.takaoka1991@gmail.com"
      }
  },
  "mySkill": {
      "description": "AzureやAWSを基盤としたシステム基盤開発と、React.jsを利用したWeb開発が得意なエンジニアです。最近はReact.jsを利用したフロントエンド開発をベースに、Gatsby.jsに注目しています。参考書やUdemyを中心に学習しており、これからも色々な技術にチャレンジしていきたいと思っています。",
      "skills": [
          {
              "name": "React",
              "percentage": "90%"
          },
          {
              "name": "Azure",
              "percentage": "70%"
          },
          {
              "name": "CSS",
              "percentage": "60%"
          }
      ]
  }
}

type profileProps = {
  name: string;
  value: string;
};

type profileListProps = {
  [key: string]: {
    [key: string]: string
  }
}

type skillProps = {
  name: string;
  percentage: string;
};

type skillListProps = {
  skills: skillProps[];
};

const ProfileItem: React.FC<profileProps> = ({ name, value }) => {
  return <><dt className="float-left clear-left mr-2 w-12 font-semibold text-lg">{name}</dt><dd className="float-left ml-8 text-lg">{value}</dd></>
}

const Profile: React.FC<profileListProps> = ({profiles}) => {
  return (
    <dl className="w-4/5 mx-auto">
      {Object.keys(profiles).map((key) => {
        return <ProfileItem key={key} name={key} value={profiles[key]} />
      })}
    </dl>
  )
}

const SkillItem: React.FC<skillProps> = ({ name, percentage }) => {
  return (
    <li>
      <div className="relative pt-1 px-8">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200">
            {name}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-red-600">
              {percentage}
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
          <div style={{width: percentage}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
        </div>
      </div>
    </li>
  )
}

const Skill: React.FC<skillListProps> = ({skills}) => {
  return (
    <ul>
      {skills.map((value, index) => {
        return <SkillItem key={index} name={value.name} percentage={value.percentage} />
      })}
    </ul>
  )
}

export const About = () => {
  const iconImg = useAnyImage("myicon.jpg");

  return (
    <div className="flex items-center bg-pattern shadow-inner min-h-4/5">
      <div className="w-full py-6">
        <section className="mx-auto container z-50">
          <InViewMonitor
            classNameNotInView='inview-section-hidden'
            classNameInView='inview-section-active'
          >
          <h1 className="uppercase font-bold text-6xl text-black text-center">
            about
          </h1>
          <div className="flex">
            <div className="w-1/2">
              <h2 className="uppercase text-black font-bold text-3xl text-center">my profile</h2>
              {iconImg ? <Img className="rounded-full mx-auto my-8 w-32 h-32" objectFit="cover" fluid={iconImg} alt="myicon" loading="eager" durationFadeIn={100} /> : <img className="rounded-full mx-auto my-8" src="/myicon.jpg" width="128" height="128" alt="myicon"></img>}
              <p className="text-black text-lg w-4/5 mx-auto py-8">
                {json.myProfile.description}
              </p>
              <Profile profiles={json.myProfile.profile} />
            </div>
            <div className="w-1/2">
              <h2 className="uppercase text-black font-bold text-3xl text-center">my skills</h2>
              <p className="text-black text-lg w-4/5 mx-auto py-8">
                {json.mySkill.description}
              </p>
              <Skill skills={json.mySkill.skills} />
            </div>
          </div>
          </InViewMonitor>
        </section>
      </div>
    </div>
  )
}