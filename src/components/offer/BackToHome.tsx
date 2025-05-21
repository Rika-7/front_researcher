import React from "react";

interface BackToHomeProps {
  researcherId?: string;
}

export const BackToHome: React.FC<BackToHomeProps> = ({ researcherId }) => {
  return (
    <a
      href={`/home/${researcherId}`}
      className="self-center mt-8 text-sm font-semibold text-black underline"
    >
      マイページにもどる
    </a>
  );
};