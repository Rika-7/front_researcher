import React from "react";
import { ResearcherResult } from "../../app/types/researchers";
import Image from "next/image";
import Link from "next/link";

interface ResearcherResultsProps {
  results: ResearcherResult[];
  isLoading: boolean;
}

export default function ResearcherResults({
  results,
  isLoading,
}: ResearcherResultsProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-700"></div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-lg text-gray-700">
          検索結果がありません。別の検索条件をお試しください。
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {results.map((researcher) => (
        <div
          key={researcher.researcher_id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded-full overflow-hidden">
              <Image
                src={`/images/avatars/researcher-${researcher.researcher_id.slice(
                  -1
                )}.jpg`}
                alt="研究者アイコン"
                width={64}
                height={64}
                className="object-cover w-full h-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/avatars/default.jpg";
                }}
              />
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    研究者ID: {researcher.researcher_id}
                  </h3>
                  <p className="text-gray-700 text-sm mt-1">
                    研究分野: {researcher.research_field_jp}
                  </p>
                </div>
                <div className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm">
                  スコア: {(researcher.score * 100).toFixed(1)}%
                </div>
              </div>

              <h4 className="font-semibold mt-4 text-violet-900">
                研究プロジェクト
              </h4>
              <p className="mt-1 text-gray-800">
                {researcher.research_project_title}
              </p>

              <h4 className="font-semibold mt-4 text-violet-900">キーワード</h4>
              <div className="mt-1 flex flex-wrap gap-2">
                {researcher.keywords_jp.split(",").map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-2 py-1 rounded-md text-sm text-gray-800"
                  >
                    {keyword.trim()}
                  </span>
                ))}
              </div>

              <h4 className="font-semibold mt-4 text-violet-900">
                マッチング理由
              </h4>
              <p className="mt-1 text-gray-800">{researcher.explanation}</p>

              <div className="mt-6 flex justify-end">
                <Link
                  href={`/message?researcher_id=${researcher.researcher_id}`}
                  className="inline-flex items-center px-4 py-2 bg-violet-700 text-white rounded-md hover:bg-violet-800"
                >
                  <Image
                    src="/icons/mail.svg"
                    alt="メッセージアイコン"
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  メッセージを送る
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
