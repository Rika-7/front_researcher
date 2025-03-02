"use client";

import React, { useEffect, useState } from "react";
import { Header } from "../../components/common/Header";

const ProfileTestPage: React.FC = () => {
  const [researchers, setResearchers] = useState<unknown[]>([]);
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
            <p className="text-black font-bold bg-green-100 p-2 rounded-t inline-block">
              ✅ Connection successful!
            </p>
            <p className="text-black font-medium my-2">
              Found {researchers.length} researchers in the database
            </p>

            {/* Just show the first researcher as a simple test */}
            {researchers.length > 0 && (
              <div className="mt-4 p-3 border border-gray-300 rounded shadow-sm">
                <h2 className="font-bold text-black">
                  First researcher sample:
                </h2>
                <pre className="bg-gray-800 text-black p-3 mt-2 overflow-auto rounded">
                  {JSON.stringify(researchers[0], null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTestPage;
