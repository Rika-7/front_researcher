"use client";
import React from "react";
import { Header } from "../../components/common/Header";
import { ProjectCard } from "../../components/home/ProjectCard";
import { NewsCard } from "../../components/home/NewsCard";

interface Project {
  date?: string;
  status?: string;
  title: string;
  tag: string;
}

interface News {
  date?: string;
  status?: string;
  title: string;
}

const offerProjects: Project[] = [
  {
    date: "本日",
    title: "製造工程の効率化によるエネルギーコストの削減",
    tag: "#アドバイス・業務改善の相談（壁打ち程度）",
  },
  {
    date: "9日前",
    title: "環境負荷を考慮した新製品の開発戦略",
    tag: "#アドバイス・業務改善の相談（壁打ち程度）",
  },
];

const inProgressProjects: Project[] = [
  {
    status: "新着あり",
    title: "飲料製品製造過程における環境負荷の測定",
    tag: "#コンサルティング・共同研究の相談",
  },
  {
    status: "新着なし",
    title: "製品輸送時のカーボンフットプリントの削減",
    tag: "#アドバイス・業務改善の相談（壁打ち程度）",
  },
];

const news: News[] = [
  {
    date: "本日",
    title:
      "【3月15~16日開催】ELSI大学サミット ～AIを中心とした倫理的、法律的、社会的課題の取り組みを・・・",
  },
  {
    date: "本日",
    title: "鏡リュウジが紹介する京都文教大学の魅力 第５回大橋良枝編",
  },
  {
    date: "1日前",
    title: "統合失調症の適応療法に加えたオンライン認知行動療法が有効〜患者さんのアクセシビリティを科学する",
  },
];

export default function ProjectDashboard() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header />
      <main className="px-56 py-10 bg-gray-50 min-h-[calc(100vh_-_68px)] max-md:p-10 max-sm:p-5">
        <h1 className="mb-10 text-5xl font-semibold text-violet-900 max-sm:text-4xl">
          案件一覧
        </h1>
        {/* 3列レイアウト（枠で囲むデザイン） */}
        <div className="grid gap-12 grid-cols-[1fr_1fr_1fr] max-md:grid-cols-[1fr_1fr] max-sm:grid-cols-[1fr]">
          {/* 新着オファー */}
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 text-center border-b pb-2 flex items-center justify-center gap-2">
              新着オファー
              <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                2
              </span>
            </h2>
            <div className="mt-3 space-y-3">
              {offerProjects.map((project, index) => (
                <div key={index} className="border-t pt-3">
                  <span className="bg-gray-800 text-white px-2 py-1 text-xs rounded">
                    {project.date}
                  </span>
                  <h3 className="font-medium mt-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.tag}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 進捗管理 */}
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 text-center border-b pb-2 flex items-center justify-center gap-2">
              進捗管理
              <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                1
              </span>
            </h2>
            <div className="mt-3 space-y-3">
              {inProgressProjects.map((project, index) => (
                <div key={index} className="border-t pt-3">
                  <span className="bg-gray-800 text-white px-2 py-1 text-xs rounded">
                    {project.status}
                  </span>
                  <h3 className="font-medium mt-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.tag}</p>
                </div>
              ))}
            </div>
          </div>

          {/* お知らせ */}
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 text-center border-b pb-2 flex items-center justify-center gap-2">
              お知らせ
              <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                2
              </span>
            </h2>
            <div className="mt-3 space-y-3">
              {news.map((item, index) => (
                <div key={index} className="border-t pt-3">
                  <span className="bg-gray-800 text-white px-2 py-1 text-xs rounded">
                    {item.date}
                  </span>
                  <h3 className="font-medium mt-2">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
