import React from "react";

interface ProjectFieldProps {
  label: string;
  value: string | React.ReactNode;
  className?: string;
}

const ProjectField: React.FC<ProjectFieldProps> = ({
  label,
  value,
  className,
}) => {
  return (
    <div className={`rounded min-h-[90px] ${className || ""}`}>
      <div className="flex-1 w-full bg-white rounded">
        <div className="flex flex-wrap flex-1 gap-1 items-start py-1 pl-4 rounded size-full">
          <div className="flex flex-col flex-1 shrink justify-center h-10 basis-0 min-w-60">
            <label className="flex-1 shrink self-stretch w-full text-sm tracking-wide">
              {label}
            </label>
            <div className="flex-1 shrink self-stretch w-full text-base tracking-normal leading-6">
              {value}
            </div>
          </div>
          <div className="flex shrink-0 w-10 h-10" />
        </div>
      </div>
      <div className="w-full border border-solid bg-zinc-700 border-zinc-700 min-h-px" />
    </div>
  );
};

export const ProjectDetail: React.FC = () => {
  return (
    <article className="flex flex-col grow py-10 pr-16 pl-4 w-full text-black whitespace-nowrap bg-white rounded-2xl shadow-[0px_0px_15px_rgba(0,0,0,0.03)]">
      <div className="flex flex-col mt-6">
        <ProjectField label="カテゴリ" value="研究分野のヒアリング" />
        <ProjectField
          label="研究分野"
          value="ライフサイエンス"
          className="mt-3"
        />
        <ProjectField
          label="内容"
          value={
            <span className="whitespace-normal text-sm">
              AIを用いた医療画像診断について、開発の方向性を決めるため、最新の知見を調査しています。具体的には、X線、MRI、CTスキャンなどの画像解析におけるディープラーニング技術のの技術の関心があります。このような技術が、どのようにがんの早期発見やその他の疾患診断に活用されているのか、現場での実際の使用例やその効果、精度向上のための現在の課題について知りたいと考えています。また、今後の技術発展の見通しや、臨床現場への導入に際しての課題についても、ご意見を伺いたいです。
            </span>
          }
          className="mt-20"
        />
        <ProjectField label="依頼日" value="2025年2月5日" className="mt-3" />
        <ProjectField
          label="返信希望日"
          value="2025年2月20日までに"
          className="mt-3"
        />
      </div>
    </article>
  );
};
