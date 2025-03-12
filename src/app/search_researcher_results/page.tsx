"use client";

import { useState } from "react";
import { Header } from "../../components/common/Header";
import SearchForm from "../../components/search/SearchForm";
import ResearcherResults from "../../components/search/ResearcherResults";
import {
  ResearcherResult,
  SearchRequestData,
} from "../../app/types/researchers";
import { searchResearchers } from "../../app/services/researchersService";

export default function SearchResearcherResultsPage() {
  const [results, setResults] = useState<ResearcherResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchData: SearchRequestData) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await searchResearchers(searchData);
      setResults(data);
    } catch {
      setError(
        "検索中にエラーが発生しました。しばらくしてから再度お試しください。"
      );
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="案件検索" />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl text-gray-700 font-bold mb-6">
          研究者マッチング検索
        </h1>

        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}

        {hasSearched && (
          <div className="mt-8">
            <h2 className="text-xl  text-gray-700 font-bold mb-4">検索結果</h2>
            <ResearcherResults results={results} isLoading={isLoading} />
          </div>
        )}
      </main>
    </div>
  );
}
