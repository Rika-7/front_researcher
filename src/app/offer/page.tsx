"use client";
import React from "react";
import { Header } from "../../components/common/Header";
import { StatusBadge } from "../../components/offer/StatusBadge";
import { OfferInfoCard } from "../../components/offer/OfferInfoCard";
import { ClientInfoCard } from "../../components/offer/ClientInfoCard";
import { ActionButtons } from "../../components/offer/ActionButtons";
import { BackToHome } from "../../components/offer/BackToHome";

export default function ProjectDetailsPage() {
  return (
    <main className="w-full bg-gray-50 min-h-screen max-md:max-w-full">
      <Header />
      <div className="flex flex-col justify-center items-center px-20 py-12 w-full bg-gray-50 max-md:px-5 max-md:pb-24 max-md:max-w-full">
        <div className="flex flex-col w-full max-w-[1432px] max-md:mb-2.5 max-md:max-w-full">
          <header className="flex flex-wrap gap-7 max-w-full font-semibold whitespace-nowrap w-[1019px]">
            <StatusBadge label="募集中" />
            <h1 className="flex-auto text-4xl text-black w-[857px] max-md:max-w-full">
              製造工程の効率化によるエネルギーコストの削減
            </h1>
          </header>

          <div className="mt-12 max-md:mt-10 max-md:max-w-full">
            <section className="flex gap-5 max-md:flex-col">
              <ClientInfoCard />
              <OfferInfoCard />
            </section>
          </div>

          <footer className="flex flex-col items-center">
            <ActionButtons />
            <BackToHome />
          </footer>
        </div>
      </div>
    </main>
  );
}
