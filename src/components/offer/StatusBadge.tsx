import React from "react";

interface StatusBadgeProps {
  label: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ label }) => {
  return (
    <span className="text-[white] px-3 py-2 font-semibold rounded-lg bg-zinc-400">
      {label}
    </span>
  );
};
