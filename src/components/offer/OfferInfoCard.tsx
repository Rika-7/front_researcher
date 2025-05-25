import React from "react";

// Interface for offer data structure
interface OfferDataItem {
  label: string;
  value: string;
}

// Type for globalThis with offerData property
interface GlobalThisWithOfferData {
  offerData?: OfferDataItem[];
}

export const OfferInfoCard: React.FC = () => {
  const offerData = (globalThis as GlobalThisWithOfferData).offerData || [];

  return (
    <main className="flex flex-col mx-auto text-black rounded-2xl max-w-[1096px]">
      <article className="flex flex-col py-10 pr-16 pl-4 w-full bg-white rounded-2xl shadow-[0px_0px_15px_rgba(0,0,0,0.03),0px_2px_30px_rgba(0,0,0,0.08),0px_0px_1px_rgba(0,0,0,0.30)] max-md:px-5 max-md:py-6 max-sm:px-4 max-sm:py-4">
        <h1 className="mb-6 text-2xl font-semibold text-center max-md:text-xl max-sm:text-lg">
          依頼内容
        </h1>

        {offerData.map(({ label, value }: OfferDataItem) => (
          <section
            key={label}
            className="flex flex-col mb-3 rounded-2xl max-md:mb-2"
          >
            <div className="flex flex-col px-4 py-1 w-full bg-white rounded-2xl">
              <label className="mb-1 text-sm tracking-wide leading-5 text-black max-sm:text-xs">
                {label}
              </label>
              <p className="font-bold text-base tracking-normal leading-6 text-black max-md:text-xs max-md:leading-5 max-sm:text-xs">
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
