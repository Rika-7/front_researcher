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

interface HeaderProps {
  currentPage?: string;
}

export const Header: React.FC<HeaderProps> = ({ currentPage = "案件検索" }) => {
  return (
    <header className="flex justify-between items-center px-0 py-3 w-full bg-white border-b border-solid border-b-zinc-400 h-[68px]">
      {/* 研Qアイコン */}
      <div className="flex items-center pl-5">
        <Image
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9596aba3e41dcacecfce7f89d2d6f34c5ab9cda6"
          width={65}
          height={110}
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
      <nav className="flex gap-12 items-center ml-10">
        {navigationItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center relative pb-1">
            <div className="flex gap-2.5 items-center text-base font-semibold cursor-pointer text-zinc-800">
              <div className="flex relative gap-2.5 items-center">
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                />
                <span>{item.label}</span>
                {item.notificationCount && item.notificationCount > 0 && (
                  <div className="absolute -top-2 w-6 h-6 text-sm font-bold bg-red-500 rounded-full right-[-24px] text-white flex items-center justify-center">
                    {item.notificationCount}
                  </div>
                )}
              </div>
            </div>
            {item.label === currentPage && (
              <div className="h-1 bg-violet-900 w-full absolute bottom-0 rounded-t"></div>
            )}
          </div>
        ))}
      </nav>

      {/* ユーザーアイコン */}
      <div className="flex gap-6 items-center mr-5">
        <i className="ti ti-bell max-sm:text-2xl" />
        <div className="flex gap-2 items-center">
          <Image
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/45b09393f1818710594c44e581a2223aea6cbe25"
            className="rounded-full"
            width={36}
            height={36}
            alt="Profile"
            loading="lazy"
          />
          <span className="text-sm font-bold text-zinc-800">
            Satoru Moriaki
          </span>
        </div>
      </div>
    </header>
  );
};
