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
  id?: string; // Adding an ID to uniquely identify each project
}

interface News {
  date?: string;
  status?: string;
  title: string;
  id?: string; // Adding an ID for news items as well
}

const offerProjects: Project[] = [
  {
    date: "本日",
    title: "製造工程の効率化によるエネルギーコストの削減",
    tag: "#アドバイス・業務改善の相談（壁打ち程度）",
    id: "project1",
  },
  {
    date: "9日前",
    title: "環境負荷を考慮した新製品の開発戦略",
    tag: "#アドバイス・業務改善の相談（壁打ち程度）",
    id: "project2",
  },
];

const inProgressProjects: Project[] = [
  {
    status: "新着あり",
    title: "飲料製品製造過程における環境負荷の測定",
    tag: "#コンサルティング・共同研究の相談",
    id: "project3",
  },
  {
    status: "新着なし",
    title: "製品輸送時のカーボンフットプリントの削減",
    tag: "#アドバイス・業務改善の相談（壁打ち程度）",
    id: "project4",
  },
];

const onHoldProjects: Project[] = [
  {
    status: "回答する",
    title: "AIを用いた画像診断に関する最新の研究",
    tag: "#研究分野のヒアリング",
    id: "project5",
  },
];

const news: News[] = [
  {
    date: "本日",
    title:
      "【3月15~16日開催】ELSI大学サミット ～AIを中心とした倫理的、法律的、社会的課題の取り組みを・・・",
    id: "news1",
  },
  {
    date: "本日",
    title: "鏡リュウジが紹介する京都文教大学の魅力 第５回大橋良枝編",
    id: "news2",
  },
];

export default function ProjectDashboard() {
  // Function to handle navigation to offer page
  const handleNavigateToOffer = (projectId: string) => {
    // The actual navigation will be handled in the card component
    console.log(`Navigating to project: ${projectId}`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header currentPage="マイページ" />
      <main className="px-20 py-6 bg-gray-50 min-h-[calc(100vh_-_68px)] max-md:px-12 max-md:py-4 max-sm:p-4">
        <h1 className="mb-4 text-3xl font-semibold text-violet-900 max-sm:text-2xl">
          案件一覧
        </h1>
        <div className="grid gap-8 grid-cols-[1fr_1fr] max-md:gap-6 max-md:grid-cols-[1fr]">
          <ProjectCard
            title="オファーあり"
            notificationCount={2}
            projects={offerProjects}
            onTitleClick={handleNavigateToOffer}
          />
          <ProjectCard
            title="進行中"
            notificationCount={1}
            projects={inProgressProjects}
            onTitleClick={handleNavigateToOffer}
          />
          <ProjectCard
            title="保留中"
            notificationCount={1}
            projects={onHoldProjects}
            onTitleClick={handleNavigateToOffer}
          />
          <NewsCard title="ニュース一覧" notificationCount={2} news={news} />
        </div>
      </main>
    </div>
  );
}
