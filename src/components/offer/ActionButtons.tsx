import React from "react";

interface ActionButtonsProps {
  onHide: () => void;
  onContact: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onHide,
  onContact,
}) => {
  return (
    <div className="flex flex-wrap gap-10 self-center mt-6 max-w-full text-base font-semibold text-black w-[645px] max-md:mt-4">
      <button
        onClick={onHide}
        className="flex flex-1 flex-auto gap-3 justify-center items-center px-3 rounded-lg bg-zinc-400 min-h-12"
      >
        <span className="self-stretch text-[white] my-auto w-48">
          興味がない - 非表示にする
        </span>
      </button>
      <button
        onClick={onContact}
        className="flex flex-1 flex-auto gap-3 justify-center items-center px-3 rounded-lg bg-zinc-600 min-h-12"
      >
        <span className="self-stretch text-[white] my-auto w-48">
          興味がある - 連絡する
        </span>
      </button>
    </div>
  );
};
