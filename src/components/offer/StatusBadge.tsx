import React from "react";

interface StatusBadgeProps {
  label: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ label }) => {
  return (
    <span className="text-sm text-white px-3 py-1.5 font-semibold rounded-lg bg-zinc-400">
      {label}
    </span>
  );
};
