"use client";

import React, { useEffect, useState } from "react";
import { Header } from "../../../components/common/Header";
import { StatusBadge } from "../../../components/offer/StatusBadge";
import { OfferInfoCard } from "../../../components/offer/OfferInfoCard";
import { ClientInfoCard } from "../../../components/offer/ClientInfoCard";
import { ActionButtons } from "../../../components/offer/ActionButtons";
import { BackToHome } from "../../../components/offer/BackToHome";
import { ChatInterface } from "../../../components/offer/ChatInterface";
import Link from "next/link";
import { useParams } from "next/navigation";

// Define interfaces for data structures
interface DataItem {
  label: string;
  value: string;
}

interface ProjectData {
  id: string;
  researcher_id: string;
  title: string;
  date?: string;
  tag?: string;
  description?: string;
  status?: number;
  category?: string;
  field?: string;
  requestDate?: string;
  responseDeadline?: string;
  requesterName?: string;
  requesterCompany?: string;
  requesterDepartment?: string;
  requestCount?: number;
  matchingCount?: number;
}

// Type for globalThis with our custom properties
interface GlobalThisWithData {
  offerData?: DataItem[];
  clientData?: DataItem[];
}

const formatJapaneseDate = (dateString?: string) => {
  if (!dateString) return "未指定";
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const OfferInfoCardWithData: React.FC<{ project: ProjectData }> = ({
  project,
}) => {
  (globalThis as GlobalThisWithData).offerData = [
    { label: "カテゴリ", value: project.category || "研究分野のヒアリング" },
    { label: "研究分野", value: project.field || "ライフサイエンス" },
    { label: "内容", value: project.description || "" },
    { label: "依頼日", value: formatJapaneseDate(project.requestDate) },
    {
      label: "返信希望日",
      value: formatJapaneseDate(project.responseDeadline),
    },
  ];
  return <OfferInfoCard />;
};

const ClientInfoCardWithData: React.FC<{ project: ProjectData }> = ({
  project,
}) => {
  (globalThis as GlobalThisWithData).clientData = [
    { label: "名前", value: project.requesterName || "" },
    { label: "会社名:", value: project.requesterCompany || "" },
    { label: "部署名", value: project.requesterDepartment || "" },
    { label: "依頼回数", value: `${project.requestCount ?? "-"}回` },
    { label: "マッチング回数", value: `${project.matchingCount ?? "-"}回` },
  ];
  return <ClientInfoCard />;
};

const getStatusLabel = (status?: number) => {
  switch (status) {
    case 1:
      return "募集中";
    case 2:
      return "進行中";
    case 3:
      return "非表示";
    case 0:
      return "未対応";
    default:
      return "不明";
  }
};

export default function OfferPageClient() {
  const params = useParams();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const matchingId = params.id as string;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/matching-id/${matchingId}`
        );
        const data = await res.json();

        if (data.status === "success") {
          const p = data.project;
          setProject({
            id: p.project_id.toString(),
            researcher_id: p.researcher_id,
            title: p.project_title,
            date: p.application_deadline,
            status: Number(p.matching_status),
            tag: `#${p.consultation_category}`,
            description: p.project_content,
            requestDate: p.matched_date,
            responseDeadline: p.application_deadline,
            category: p.consultation_category,
            field: p.research_field,
            requesterName: p.company_user_name,
            requesterCompany: p.company_name,
            requesterDepartment: p.department,
            requestCount: 3, // APIがなければ仮値
            matchingCount: 2, // APIがなければ仮値
          });
        } else {
          setProject(null);
        }
      } catch (error) {
        console.error("プロジェクト取得エラー:", error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params]);

  const handleHideProject = () => {
    alert("案件を非表示にしました");
  };

  const handleContactProject = async () => {
    const matchingId = params.id as string;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/matching-status/${matchingId}?new_status=2`,
        { method: "PATCH" }
      );
      const data = await res.json();

      if (data.status === "success") {
        setProject((prev) => (prev ? { ...prev, status: 2 } : prev));
        setTimeout(() => {
          document
            .getElementById("chat-section")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        alert("ステータス更新に失敗しました");
      }
    } catch (error) {
      console.error("通信エラー:", error);
      alert("エラーが発生しました");
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        <Header currentPage="マイページ" />
        <main className="px-20 py-6 bg-gray-50 min-h-[calc(100vh_-_68px)]">
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        <Header currentPage="マイページ" />
        <main className="px-20 py-6 bg-gray-50 min-h-[calc(100vh_-_68px)]">
          <h1 className="mb-4 text-2xl font-semibold text-violet-900">
            案件が見つかりません
          </h1>
          <p>指定されたIDの案件は存在しません。</p>
          <Link
            href="/"
            className="text-violet-700 hover:underline mt-4 inline-block"
          >
            ← ホームに戻る
          </Link>
        </main>
      </div>
    );
  }

  return (
    <main className="w-full bg-gray-50 min-h-screen">
      <Header currentPage="マイページ" researcherId={project.researcher_id} />
      <div className="flex flex-col justify-center items-center px-20 py-8 w-full bg-gray-50 max-md:px-5">
        <div className="flex flex-col w-full max-w-[1432px]">
          <header className="flex flex-wrap gap-5 font-semibold w-full mb-6">
            <StatusBadge label={getStatusLabel(project.status)} />
            <h1 className="text-3xl text-black">{project.title}</h1>
          </header>

          <div className="mt-4">
            <section className="flex gap-1 max-md:flex-col">
              <ClientInfoCardWithData project={project} />
              <OfferInfoCardWithData project={project} />
            </section>
          </div>

          <footer className="flex flex-col items-center mt-6">
            {project.status === 2 && (
              <section id="chat-section" className="mt-8 w-full">
                <h2 className="text-xl font-semibold mb-4 text-black">
                  チャット
                </h2>
                <ChatInterface
                  projectId={project.id}
                  clientName={project.requesterName || "クライアント"}
                />
              </section>
            )}

            {project.status === 1 && (
              <ActionButtons
                matchingId={params.id as string}
                onHide={handleHideProject}
                onContact={handleContactProject}
              />
            )}

            {(project.status === 0 || project.status === 3) && (
              <div className="text-center text-gray-500 mt-6 text-lg">
                非表示にした案件情報です
              </div>
            )}

            <BackToHome researcherId={project.researcher_id} />
          </footer>
        </div>
      </div>
    </main>
  );
}
