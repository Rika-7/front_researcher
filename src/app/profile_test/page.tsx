"use client";

import React, { useEffect, useState } from "react";
import { Header } from "../../components/common/Header";

// Define the researcher interface based on the data structure
interface Researcher {
  researcher_number?: number;
  name?: string;
  name_katakana?: string;
  name_alphabet?: string;
  affiliation_current?: string | null;
  affiliation_current_english?: string | null;
  affiliation_past?: string | null;
  affiliation_past_english?: string | null;
  research_field?: string;
  keywords?: string;
  number_of_research_projects?: number;
  number_of_research_products?: number;
  [key: string]: unknown;
}

const ProfileTestPage: React.FC = () => {
  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResearchers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://app-advanced3-2-gkdmaxa9esfwgwds.canadacentral-01.azurewebsites.net/researchers"
        );
        const data = await response.json();
        setResearchers(data.researchers);
        setLoading(false);
      } catch (err) {
        setError("Failed to connect to the backend");
        setLoading(false);
        console.error(err);
      }
    };

    fetchResearchers();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-black">
          Backend Connection Test
        </h1>

        {loading && <p className="text-black font-medium">Loading...</p>}

        {error && (
          <p className="text-red-600 font-bold bg-red-100 p-2 rounded">
            Error: {error}
          </p>
        )}

        {!loading && !error && (
          <div>
            <p className="text-green-700 font-bold bg-green-100 p-2 rounded inline-block">
              ✅ Connection successful!
            </p>
            <p className="text-black font-medium my-2">
              Found {researchers.length} researchers in the database
            </p>

            {/* Display the first researcher in a user-friendly format */}
            {researchers.length > 0 && (
              <div className="mt-4 p-3 border border-gray-300 rounded shadow-sm">
                <h2 className="font-bold text-black mb-2">
                  Researcher Profile
                </h2>
                <div className="bg-white border border-gray-300 p-4 mt-2 rounded">
                  <div className="grid grid-cols-1 gap-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {researchers[0].name}
                      <span className="text-sm text-gray-600 ml-2">
                        (ID: {researchers[0].researcher_number})
                      </span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Name in Katakana
                        </p>
                        <p className="text-black">
                          {researchers[0].name_katakana || "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Name in Alphabet
                        </p>
                        <p className="text-black">
                          {researchers[0].name_alphabet || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-3">
                      <p className="text-sm text-gray-500 font-medium">
                        Current Affiliation
                      </p>
                      <p className="text-black">
                        {researchers[0].affiliation_current || "Not specified"}
                      </p>
                      {researchers[0].affiliation_current_english && (
                        <p className="text-gray-700 text-sm">
                          {researchers[0].affiliation_current_english}
                        </p>
                      )}
                    </div>

                    <div className="border-t border-gray-200 pt-3">
                      <p className="text-sm text-gray-500 font-medium">
                        Past Affiliation
                      </p>
                      <p className="text-black whitespace-pre-line">
                        {researchers[0].affiliation_past?.replace(
                          /\\n/g,
                          "\n"
                        ) || "Not specified"}
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-3">
                      <p className="text-sm text-gray-500 font-medium">
                        Research Field
                      </p>
                      <p className="text-black">
                        {researchers[0].research_field || "Not specified"}
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-3">
                      <p className="text-sm text-gray-500 font-medium">
                        Keywords
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {researchers[0].keywords
                          ?.split("/")
                          .map((keyword, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                            >
                              {keyword.trim()}
                            </span>
                          )) || "None"}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-3 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Research Projects
                        </p>
                        <p className="text-black font-medium">
                          {researchers[0].number_of_research_projects || 0}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Research Products
                        </p>
                        <p className="text-black font-medium">
                          {researchers[0].number_of_research_products || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTestPage;
