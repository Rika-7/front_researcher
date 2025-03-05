"use client";
import React, { useEffect, useState } from "react";
import { Header } from "../../../components/common/Header";
import { StatusBadge } from "../../../components/offer/StatusBadge";
import { OfferInfoCard } from "../../../components/offer/OfferInfoCard";
import { ClientInfoCard } from "../../../components/offer/ClientInfoCard";
import { ActionButtons } from "../../../components/offer/ActionButtons";
import { BackToHome } from "../../../components/offer/BackToHome";
import Link from "next/link";
import { useParams } from "next/navigation";

// Define project data structure
interface ProjectData {
  id: string;
  title: string;
  date?: string;
  tag?: string;
  description?: string;
  status?: string;
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

// This data should match the data in your main page.tsx
const projectsData: Record<string, ProjectData> = {
  project1: {
    id: "project1",
    title: "製造工程の効率化によるエネルギーコストの削減",
    date: "本日",
    tag: "#アドバイス・業務改善の相談（壁打ち程度）",
    description:
      "AIを用いた医療画像診断について、開発の方向性を決めるため、最新の知見を調査しています。具体的には、X線、MRI、CTスキャンなどの画像解析におけるディープラーニング技術の関心があります。このような技術が、どのようにがんの早期発見やその他の疾患診断に活用されているのか、現場での実際の使用例やその効果、精度向上のための現在の課題について知りたいと考えています。また、今後の技術発展の見通しや、臨床現場への導入に際しての課題についても、ご意見を伺いたいです。",
    status: "募集中",
    category: "研究分野のヒアリング",
    field: "ライフサイエンス",
    requestDate: "2025年2月5日",
    responseDeadline: "2025年2月20日までに",
    requesterName: "大谷 太郎",
    requesterCompany: "株式会社 TechA3",
    requesterDepartment: "ライフサイエンス研究部",
    requestCount: 3,
    matchingCount: 2,
  },
  project2: {
    id: "project2",
    title: "環境負荷を考慮した新製品の開発戦略",
    date: "9日前",
    tag: "#アドバイス・業務改善の相談（壁打ち程度）",
    description:
      "環境に配慮した新製品開発の戦略について、専門家のアドバイスを求めています。持続可能な製品設計のベストプラクティスを知りたいです。",
    status: "オファーあり",
  },
  project3: {
    id: "project3",
    title: "飲料製品製造過程における環境負荷の測定",
    tag: "#コンサルティング・共同研究の相談",
    description:
      "飲料製品の製造過程における環境負荷を正確に測定する方法について相談したいです。特にカーボンフットプリントの計算方法に関心があります。",
    status: "進行中",
  },
  project4: {
    id: "project4",
    title: "製品輸送時のカーボンフットプリントの削減",
    tag: "#アドバイス・業務改善の相談（壁打ち程度）",
    description:
      "製品輸送時のカーボンフットプリントを削減するための効果的な方法について助言を求めています。",
    status: "進行中",
  },
  project5: {
    id: "project5",
    title: "AIを用いた画像診断に関する最新の研究",
    tag: "#研究分野のヒアリング",
    description:
      "AIを活用した画像診断技術の最新研究動向について知りたいです。特に医療分野での応用可能性に興味があります。",
    status: "保留中",
  },
};

// Extend OfferInfoCard to accept project data
interface ExtendedOfferInfoCardProps {
  project: ProjectData;
}

// This is a wrapper for the existing OfferInfoCard that injects project data
const OfferInfoCardWithData: React.FC<ExtendedOfferInfoCardProps> = ({
  project,
}) => {
  // Override offerData global variable that OfferInfoCard uses
  (
    globalThis as unknown as { offerData: { label: string; value: string }[] }
  ).offerData = [
    { label: "カテゴリ", value: project.category || "研究分野のヒアリング" },
    { label: "研究分野", value: project.field || "ライフサイエンス" },
    {
      label: "内容",
      value:
        project.description ||
        "AIを用いた医療画像診断について、開発の方向性を決めるため、最新の知見を調査しています。",
    },
    { label: "依頼日", value: project.requestDate || "2025年2月5日" },
    {
      label: "返信希望日",
      value: project.responseDeadline || "2025年2月20日までに",
    },
  ];

  // Also need to modify the title in the component
  const originalRender = OfferInfoCard.prototype?.render;
  if (originalRender) {
    OfferInfoCard.prototype.render = function () {
      const result = originalRender.apply(this);
      if (
        result &&
        result.props &&
        result.props.children &&
        result.props.children.props &&
        result.props.children.props.children
      ) {
        const title = result.props.children.props.children[0];
        if (title && title.props) {
          title.props.children = project.title;
        }
      }
      return result;
    };
  }

  return <OfferInfoCard />;
};

// Extend ClientInfoCard to accept project data
interface ExtendedClientInfoCardProps {
  project: ProjectData;
}

// This is a wrapper for the existing ClientInfoCard that injects project data
// into the component's scope so it can access the requester information
const ClientInfoCardWithData: React.FC<ExtendedClientInfoCardProps> = ({
  project,
}) => {
  // Override clientData global variable that ClientInfoCard uses
  (
    globalThis as unknown as { clientData: { label: string; value: string }[] }
  ).clientData = [
    { label: "名前", value: project.requesterName || "大谷 太郎" },
    { label: "会社名:", value: project.requesterCompany || "株式会社 TechA3" },
    {
      label: "部署名",
      value: project.requesterDepartment || "ライフサイエンス研究部",
    },
    { label: "依頼回数", value: `${project.requestCount || 3}回` },
    { label: "マッチング回数", value: `${project.matchingCount || 2}回` },
  ];

  return <ClientInfoCard />;
};

// Client-side component for accessing params
export default function OfferPageClient() {
  const params = useParams();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the project ID from the URL params
    const projectId = params.id as string;

    // Find the project in our data
    setProject(projectsData[projectId] || null);
    setLoading(false);
  }, [params]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        <Header currentPage="案件検索" />
        <main className="px-20 py-6 bg-gray-50 min-h-[calc(100vh_-_68px)] max-md:px-12 max-md:py-4 max-sm:p-4">
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        <Header currentPage="案件検索" />
        <main className="px-20 py-6 bg-gray-50 min-h-[calc(100vh_-_68px)] max-md:px-12 max-md:py-4 max-sm:p-4">
          <h1 className="mb-4 text-2xl font-semibold text-violet-900 max-sm:text-xl">
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

  // When project is found, render the full page with components
  return (
    <main className="w-full bg-gray-50 min-h-screen max-md:max-w-full">
      <Header currentPage="案件検索" />
      <div className="flex flex-col justify-center items-center px-20 py-8 w-full bg-gray-50 max-md:px-5 max-md:pb-16 max-md:max-w-full">
        <div className="flex flex-col w-full max-w-[1432px] max-md:mb-2.5 max-md:max-w-full">
          <header className="flex flex-wrap gap-5 max-w-full font-semibold whitespace-nowrap w-[1019px] mb-6">
            <StatusBadge label={project.status || "募集中"} />
            <h1 className="flex-auto text-3xl text-black w-[857px] max-md:text-2xl max-md:max-w-full">
              {project.title}
            </h1>
          </header>

          <div className="mt-4 max-md:mt-4 max-md:max-w-full">
            <section className="flex gap-5 max-md:flex-col">
              <ClientInfoCardWithData project={project} />
              <OfferInfoCardWithData project={project} />
            </section>
          </div>

          <footer className="flex flex-col items-center mt-4">
            <ActionButtons />
            <BackToHome />
          </footer>
        </div>
      </div>
    </main>
  );
}
