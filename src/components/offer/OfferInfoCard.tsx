import React from "react";

export const OfferInfoCard: React.FC = () => {
  // 仮のバックエンドデータ
  const offerData = [
    { label: "カテゴリ", value: "研究分野のヒアリング" },
    { label: "研究分野", value: "ライフサイエンス" },
    {
      label: "内容",
      value:
        "AIを用いた医療画像診断について、開発の方向性を決めるため、最新の知見を調査しています。具体的には、X線、MRI、CTスキャンなどの画像解析におけるディープラーニング技術の関心があります。このような技術が、どのようにがんの早期発見やその他の疾患診断に活用されているのか、現場での実際の使用例やその効果、精度向上のための現在の課題について知りたいと考えています。また、今後の技術発展の見通しや、臨床現場への導入に際しての課題についても、ご意見を伺いたいです。",
    },
    { label: "依頼日", value: "2025年2月5日" },
    { label: "返信希望日", value: "2025年2月20日までに" },
  ];

  return (
    <main className="flex flex-col mx-auto text-black rounded-2xl max-w-[1096px]">
      <article className="flex flex-col py-12 pr-20 pl-4 w-full bg-white rounded-2xl shadow-[0px_0px_15px_rgba(0,0,0,0.03),0px_2px_30px_rgba(0,0,0,0.08),0px_0px_1px_rgba(0,0,0,0.30)] max-md:px-5 max-md:py-8 max-sm:px-4 max-sm:py-5">
        <h1 className="mb-7 text-2xl font-semibold text-center max-md:text-xl max-sm:text-lg">
          製造工程の効率化によるエネルギーコストの削減
        </h1>

        {/* 情報フィールドを統一したセクション */}
        {offerData.map(({ label, value }) => (
          <section
            key={label}
            className="flex flex-col mb-3.5 rounded-2xl max-md:mb-2.5"
          >
            <div className="flex flex-col px-4 py-1 w-full bg-white rounded-2xl">
              <label className="mb-1 text-base tracking-wide leading-6 text-black max-sm:text-sm">
                {label}
              </label>
              <p className="text-2xl tracking-normal leading-7 text-black max-md:text-lg max-md:leading-6 max-sm:text-base">
                {value}
              </p>
            </div>
            <div className="z-0 w-full border border-solid border-gray-300 min-h-px" />
          </section>
        ))}
      </article>
    </main>
  );
};

export default OfferInfoCard;
