import React from "react";

interface InfoFieldProps {
  label: string;
  value: string;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value }) => {
  return (
    <div className="relative w-full text-black rounded min-h-[64px]">
      <div className="z-0 flex-1 w-full bg-white rounded">
        <div className="flex flex-1 gap-1 items-start py-1 pl-4 rounded size-full">
          <div className="flex flex-col flex-1 shrink justify-centerbasis-0 min-h-10">
            <label className="flex-1 shrink self-stretch py-1 text-xs tracking-wide leading-none">
              {label}
            </label>
            <div className="flex-1 shrink self-stretch w-full font-bold text-base tracking-wide">
              {value}
            </div>
          </div>
          <div className="flex shrink-0 w-10 h-10" />
        </div>
      </div>
      <div className="z-0 w-full border border-solid border-gray-300 min-h-px" />
    </div>
  );
};

export const ClientInfoCard: React.FC = () => {
  const clientData = (globalThis as any).clientData || [];

  return (
    <div className="w-[21%] max-md:ml-0 max-md:w-full">
      <article className="flex flex-col px-4 py-8 w-full bg-white rounded-2xl shadow-[0px_0px_15px_rgba(0,0,0,0.03),0px_2px_30px_rgba(0,0,0,0.08),0px_0px_1px_rgba(0,0,0,0.30)]  min-h-[300px]">
        <h2 className="self-center text-xl font-semibold text-center text-black">
          依頼者情報
        </h2>
        <div className="flex flex-col gap-6 mt-8">
          {clientData.map(({ label, value }: { label: string; value: string }) => (
            <InfoField key={label} label={label} value={value} />
          ))}
        </div>
      </article>
    </div>
  );
};

export default ClientInfoCard;