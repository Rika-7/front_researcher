import { ResearcherResult, SearchRequestData } from "../types/researchers";

/**
 * Search for researchers based on criteria by calling the backend API directly
 */
export async function searchResearchers(
  searchData: SearchRequestData
): Promise<ResearcherResult[]> {
  try {
    console.log("Calling backend API with data:", searchData);

    // Direct call to the Azure-hosted backend API
    const backendUrl =
      "https://app-advanced3-2-gkdmaxa9esfwgwds.canadacentral-01.azurewebsites.net";

    const response = await fetch(`${backendUrl}/search_researchers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchData),
    });

    console.log("API response status:", response.status);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: ResearcherResult[] = await response.json();
    console.log("API response data:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch researcher results:", error);
    throw error;
  }
}
