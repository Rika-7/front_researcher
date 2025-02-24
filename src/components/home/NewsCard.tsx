import * as React from "react";

interface News {
  date?: string;
  status?: string;
  title: string;
}

interface NewsProps {
  title: string;
  notificationCount?: number;
  news: News[];
}

export const NewsCard: React.FC<NewsProps> = ({
  title,
  notificationCount,
  news,
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
      {news.map(({ date, status, title }, index) => (
        <article
          key={index}
          className="p-6 mt-4 rounded-2xl shadow-[0px_0px_15px_rgba(0,0,0,0.03),0px_2px_30px_rgba(0,0,0,0.08),0px_0px_1px_rgba(0,0,0,0.30)]"
        >
          <header className="mb-3">
            <div className="px-4 py-1.5 text-base font-semibold rounded-lg bg-zinc-600 text-[white] inline-block">
              {date || status}
            </div>
          </header>
          <h3 className="text-2xl font-semibold text-zinc-800 max-sm:text-xl">
            {title}
          </h3>
        </article>
      ))}
    </section>
  );
};

export default NewsCard;
