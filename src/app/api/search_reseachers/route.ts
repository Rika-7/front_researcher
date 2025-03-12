import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("API route handler called");

    // Get the request body
    const searchData = await request.json();
    console.log("Search request data:", searchData);

    // Backend API URL (from environment variable or hardcoded)
    const backendUrl = process.env.BACKEND_API_URL || "http://localhost:8000";
    console.log("Using backend URL:", backendUrl);

    // Forward the request to your backend
    console.log("Sending request to:", `${backendUrl}/search_researchers`);
    const response = await fetch(`${backendUrl}/search_researchers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchData),
    });

    console.log("Backend response status:", response.status);

    // If the backend response wasn't successful, throw an error
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error response:", errorText);
      throw new Error(`Backend API error: ${response.status} - ${errorText}`);
    }

    // Get the response data
    const data = await response.json();
    console.log(
      "Got response data with length:",
      Array.isArray(data) ? data.length : "Not an array"
    );

    // Return the data as JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in search-researchers API route:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch researcher results",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
