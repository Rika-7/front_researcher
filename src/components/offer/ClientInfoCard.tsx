import React from "react";

interface InfoFieldProps {
  label: string;
  value: string;
}

const clientData = [
  { label: "名前", value: "大谷 太郎" },
  { label: "会社名:", value: "株式会社 TechA3" },
  {
    label: "部署名",
    value: "ライフサイエンス研究部",
  },
  { label: "依頼回数", value: "3回" },
  { label: "マッチング回数", value: "2回" },
];

const InfoField: React.FC<InfoFieldProps> = ({ label, value }) => {
  return (
    <div className="relative w-full text-black rounded min-h-[72px]">
      <div className="z-0 flex-1 w-full bg-white rounded">
        <div className="flex flex-1 gap-1 items-start py-1 pl-4 rounded size-full">
          <div className="flex flex-col flex-1 shrink justify-center py-1 basis-0 min-h-12">
            <label className="flex-1 shrink self-stretch text-xs tracking-wide leading-none">
              {label}
            </label>
            <div className="flex-1 shrink self-stretch w-full text-base tracking-wide">
              {value}
            </div>
          </div>
          <div className="flex shrink-0 w-12 h-12" />
        </div>
      </div>
      <div className="z-0 w-full border border-solid border-gray-300 min-h-px" />
    </div>
  );
};

export const ClientInfoCard: React.FC = () => {
  return (
    <div className="w-[21%] max-md:ml-0 max-md:w-full">
      <article className="flex flex-col px-4 py-10 w-full bg-white rounded-2xl shadow-[0px_0px_15px_rgba(0,0,0,0.03),0px_2px_30px_rgba(0,0,0,0.08),0px_0px_1px_rgba(0,0,0,0.30)] h-[627px]">
        <h2 className="self-center text-2xl font-semibold text-center text-black">
          依頼者情報
        </h2>
        <div className="flex flex-col gap-8 mt-10">
          {clientData.map(({ label, value }) => (
            <InfoField key={label} label={label} value={value} />
          ))}
        </div>
      </article>
    </div>
  );
};

export default ClientInfoCard;
