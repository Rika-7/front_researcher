"use client";
import React from "react";
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

const onHoldProjects: Project[] = [
  {
    status: "回答する",
    title: "AIを用いた画像診断に関する最新の研究",
    tag: "#研究分野のヒアリング",
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
];

export default function ProjectDashboard() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Removed the Header component from here */}
      <main className="px-56 py-10 bg-gray-50 min-h-[calc(100vh_-_68px)] max-md:p-10 max-sm:p-5">
        <h1 className="mb-10 text-5xl font-semibold text-violet-900 max-sm:text-4xl">
          案件一覧
        </h1>
        <div className="grid gap-12 grid-cols-[1fr_1fr] max-md:gap-10 max-md:grid-cols-[1fr]">
          <ProjectCard
            title="オファーあり"
            notificationCount={2}
            projects={offerProjects}
          />
          <ProjectCard
            title="進行中"
            notificationCount={1}
            projects={inProgressProjects}
          />
          <ProjectCard
            title="保留中"
            notificationCount={1}
            projects={onHoldProjects}
          />
          <NewsCard title="ニュース一覧" notificationCount={2} news={news} />
        </div>
      </main>
    </div>
  );
}
