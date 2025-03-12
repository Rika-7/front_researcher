// Types for researcher search
export interface ResearcherResult {
  researcher_id: string;
  research_field_jp: string;
  keywords_jp: string;
  research_project_title: string;
  explanation: string;
  score: number;
}

export interface SearchRequestData {
  category: string;
  field: string;
  description: string;
  top_k: number;
}
