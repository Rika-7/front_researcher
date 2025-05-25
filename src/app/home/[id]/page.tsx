"use client";
import React, { useEffect, useState } from "react";
import { Header } from "../../../components/common/Header";
import { ProjectCard } from "../../../components/home/ProjectCard";
import { useParams } from "next/navigation";

interface Project {
  date?: string;
  status?: string;
  title: string;
  tag: string;
  id?: string;
}

// Interface for API response project data
interface ApiProject {
  project_title: string;
  company_name: string;
  matching_id: number;
  application_deadline: string;
}

export default function ProjectDashboard() {
  const params = useParams();
  const researcher_id = params.id as string;
  const [offerProjects, setOfferProjects] = useState<Project[]>([]);
  const [inProgressProjects, setInProgressProjects] = useState<Project[]>([]);

  const formatDeadline = (deadline: string, status: number) => {
    if (!deadline || status !== 1) return ""; // ステータスが1以外なら空文字を返す

    const today = new Date();
    const targetDate = new Date(deadline);

    const diffTime = targetDate.getTime() - today.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "回答期限が過ぎています";
    if (diffDays === 0) return "本日まで";
    if (diffDays === 1) return "明日まで";
    if (diffDays === 2) return "明後日まで";

    return `${targetDate.getMonth() + 1}/${targetDate.getDate()}まで`;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const statuses = [1, 2];
      const researcher_id = params.id as string;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      let offer: Project[] = [];
      let inProgress: Project[] = [];

      for (const status of statuses) {
        const response = await fetch(
          `${apiUrl}/matching-information?researcher_id=${researcher_id}&matching_status=${status}`
        );
        const data = await response.json();

        if (data.status === "success") {
          const formattedProjects = data.projects.map((p: ApiProject) => ({
            date: formatDeadline(p.application_deadline, status),
            title: p.project_title,
            tag: p.company_name,
            id: p.matching_id.toString(),
          }));

          if (status === 1) offer = formattedProjects;
          if (status === 2) inProgress = formattedProjects;
        }
      }

      setOfferProjects(offer);
      setInProgressProjects(inProgress);
    };

    fetchProjects();
  }, [params.id]);

  const handleNavigateToOffer = (matchingId: string) => {
    window.location.href = `/offer/${matchingId}`;
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header currentPage="マイページ" researcherId={researcher_id} />
      <main className="px-20 py-6 bg-gray-50 min-h-[calc(100vh_-_68px)] max-md:px-12 max-md:py-4 max-sm:p-4">
        <h1 className="mb-4 text-3xl font-semibold text-violet-900 max-sm:text-2xl">
          案件一覧
        </h1>
        <div className="grid gap-8 grid-cols-[1fr_1fr] max-md:gap-6 max-md:grid-cols-[1fr]">
          <ProjectCard
            title="オファーあり"
            notificationCount={offerProjects.length}
            projects={offerProjects}
            onTitleClick={handleNavigateToOffer}
          />
          <ProjectCard
            title="進行中"
            notificationCount={inProgressProjects.length}
            projects={inProgressProjects}
            onTitleClick={handleNavigateToOffer}
          />
          {/* 一旦ここは削除
          <ProjectCard
            title="保留中"
            notificationCount={onHoldProjects.length}
            projects={onHoldProjects}
            onTitleClick={handleNavigateToOffer}
          />
          <NewsCard title="ニュース一覧" notificationCount={news.length} news={news} />
          */}
        </div>
      </main>
    </div>
  );
}
