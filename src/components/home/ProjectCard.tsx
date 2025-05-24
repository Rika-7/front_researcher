import * as React from "react";
import Link from "next/link";
interface Project {
  date?: string;
  status?: string;
  title: string;
  tag: string;
  id?: string;
}

interface ProjectSectionProps {
  title: string;
  notificationCount?: number;
  projects: Project[];
  onTitleClick?: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectSectionProps> = ({
  title,
  notificationCount,
  projects,
  onTitleClick,
}) => {
  const handleTitleClick = (id: string) => {
    if (onTitleClick) {
      onTitleClick(id);
    }
    // Navigation will be handled by Link component, not needed here
  };

  return (
    <section className="flex flex-col gap-1">
      {/* セクションタイトル */}
      <header className="flex gap-2.5 items-center">
        <h2 className="text-2xl font-semibold text-slate-500 max-sm:text-xl">
          {title}
        </h2>
        {notificationCount && (
          <div className="w-6 h-6 text-lg font-bold bg-red-500 rounded-full text-[white] flex items-center justify-center">
            {notificationCount}
          </div>
        )}
      </header>

      {/* プロジェクトカード一覧 */}
      {projects.map(({ date, status, title, tag, id = "" }, index) => (
        <article
          key={index}
          className="p-5 mt-2 rounded-2xl shadow-[0px_0px_15px_rgba(0,0,0,0.03),0px_2px_30px_rgba(0,0,0,0.08),0px_0px_1px_rgba(0,0,0,0.30)] bg-white"
        >
          {date && (
            <header className="mb-2">
              <div className="px-4 py-1.5 text-sm font-semibold rounded-lg bg-zinc-600 text-[white] inline-block">
                {date}
              </div>
            </header>
          )}

          <Link
            href={`/offer/${id}`}
            className="block"
            onClick={() => handleTitleClick(id)}
          >
            <h3 className="mb-3 text-lg font-semibold text-zinc-800 max-sm:text-base hover:text-violet-700 hover:underline transition-colors">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-zinc-800">{tag}</p>
        </article>
      ))}
    </section>
  );
};

export default ProjectCard;
