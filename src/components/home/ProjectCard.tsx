import * as React from "react";

interface Project {
  date?: string;
  status?: string;
  title: string;
  tag: string;
}

interface ProjectSectionProps {
  title: string;
  notificationCount?: number;
  projects: Project[];
}

export const ProjectCard: React.FC<ProjectSectionProps> = ({
  title,
  notificationCount,
  projects,
}) => {
  return (
    <section className="flex flex-col gap-4">
      {/* セクションタイトル */}
      <header className="flex gap-2.5 items-center">
        <h2 className="text-4xl font-semibold text-slate-500 max-sm:text-3xl">
          {title}
        </h2>
        {notificationCount && (
          <div className="w-8 h-8 text-2xl font-bold bg-red-500 rounded-full text-[white] flex items-center justify-center">
            {notificationCount}
          </div>
        )}
      </header>

      {/* プロジェクトカード一覧 */}
      {projects.map(({ date, status, title, tag }, index) => (
        <article
          key={index}
          className="p-6 mt-4 rounded-2xl shadow-[0px_0px_15px_rgba(0,0,0,0.03),0px_2px_30px_rgba(0,0,0,0.08),0px_0px_1px_rgba(0,0,0,0.30)]"
        >
          <header className="mb-3">
            <div className="px-4 py-1.5 text-base font-semibold rounded-lg bg-zinc-600 text-[white] inline-block">
              {date || status}
            </div>
          </header>
          <h3 className="mb-5 text-2xl font-semibold text-zinc-800 max-sm:text-xl">
            {title}
          </h3>
          <p className="text-base text-zinc-800">{tag}</p>
        </article>
      ))}
    </section>
  );
};

export default ProjectCard;
