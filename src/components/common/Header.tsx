import * as React from "react";
import Image from "next/image";

interface NavigationItem {
  icon: string;
  label: string;
  notificationCount?: number;
}

const navigationItems: NavigationItem[] = [
  { icon: "/icons/clipboard.svg", label: "マイページ" },
  {
    icon: "/icons/mail.svg",
    label: "メッセージ",
    notificationCount: 5,
  },
  { icon: "/icons/user.svg", label: "プロフィール" },
  { icon: "/icons/search.svg", label: "案件検索" },
];

export const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-0 py-4 w-full bg-white border-b border-solid border-b-zinc-400 h-[68px]">
      {/* 研Qアイコン（分割になっちゃった） */}
      <div className="flex items-center pl-5">
        <Image
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9596aba3e41dcacecfce7f89d2d6f34c5ab9cda6"
          width={63}
          height={109}
          alt="Logo"
          loading="lazy"
        />
        <Image
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/dd8de1f5773c4e53f322e8c2feedc5727b7def4f"
          width={13}
          height={13}
          alt="Logo Detail"
          loading="lazy"
        />
      </div>

      {/* メニューアイコン */}
      <nav className="flex gap-10 items-center ml-10">
        {navigationItems.map((item, index) => (
          <div
            key={index}
            className="flex gap-2.5 items-center text-base font-semibold cursor-pointer text-zinc-800"
          >
            <div className="flex relative gap-2.5 items-center">
              <Image src={item.icon} alt={item.label} width={24} height={24} />
              <span>{item.label}</span>
              {item.notificationCount && item.notificationCount > 0 && (
                <div className="absolute -top-2.5 w-8 h-8 text-2xl font-bold bg-red-500 rounded-full right-[-15px] text-white">
                  {item.notificationCount}
                </div>
              )}
            </div>
          </div>
        ))}
      </nav>

      {/* ユーザーアイコン */}
      <div className="flex gap-8 items-center mr-5">
        <i className="ti ti-bell max-sm:text-3xl" />
        <div className="flex gap-2 items-center">
          <Image
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/45b09393f1818710594c44e581a2223aea6cbe25"
            className="rounded-full"
            width={40}
            height={40}
            alt="Profile"
            loading="lazy"
          />
          <span className="text-base font-bold text-zinc-800">
            Junior Garcia
          </span>
        </div>
      </div>
    </header>
  );
};
