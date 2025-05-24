import React from "react";

interface ActionButtonsProps {
  onHide: () => void;
  onContact: () => void;
  matchingId: string;
}

const updateMatchingStatus = async (matchingId: string, status: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/matching-status/${matchingId}?new_status=${status}`,
      {
        method: "PATCH",
      }
    );
    const data = await res.json();
    if (data.status !== "success") {
      alert("ステータス更新に失敗しました");
    }
  } catch (err) {
    console.error(err);
    alert("通信エラーが発生しました");
  }
};
export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onHide,
  onContact,
  matchingId,
}) => {
  return (
    <div className="flex flex-wrap gap-10 self-center mt-6 max-w-full text-base font-semibold text-black w-[645px] max-md:mt-4">
      <button
        onClick={async () => {
          await updateMatchingStatus(matchingId, 3); // 非表示
          onHide();
        }}
        className="flex flex-1 flex-auto gap-3 justify-center items-center px-3 rounded-lg bg-zinc-400 min-h-12"
      >
        <span className="self-stretch text-[white] my-auto w-48">
          興味がない - 非表示にする
        </span>
      </button>
      <button
        onClick={async () => {
          await updateMatchingStatus(matchingId, 2); // 連絡
          onContact();
        }}
        className="flex flex-1 flex-auto gap-3 justify-center items-center px-3 rounded-lg bg-zinc-600 min-h-12"
      >
        <span className="self-stretch text-[white] my-auto w-48">
          興味がある - 連絡する
        </span>
      </button>
    </div>
  );
};
