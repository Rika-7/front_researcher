import React, { useState } from "react";
import { SearchRequestData } from "../../app/types/researchers";

interface SearchFormProps {
  onSearch: (data: SearchRequestData) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [formData, setFormData] = useState<SearchRequestData>({
    category: "",
    field: "",
    description: "",
    top_k: 10,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "top_k" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl  text-gray-700 font-bold mb-4">研究者検索</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="category"
              className="block mb-2 font-medium text-gray-800"
            >
              カテゴリー
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-gray-800"
              placeholder="例: AI, 医療, 環境"
              required
            />
          </div>
          <div>
            <label
              htmlFor="field"
              className="block mb-2 font-medium text-gray-800"
            >
              研究分野
            </label>
            <input
              type="text"
              id="field"
              name="field"
              value={formData.field}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-gray-800"
              placeholder="例: 自然言語処理, バイオテクノロジー"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="description"
            className="block mb-2 font-medium text-gray-800"
          >
            研究内容の説明
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border rounded-md text-gray-800"
            placeholder="研究内容の詳細を入力してください"
            required
          ></textarea>
        </div>

        <div className="mt-4 md:w-1/4">
          <label
            htmlFor="top_k"
            className="block mb-2 font-medium text-gray-800"
          >
            表示件数
          </label>
          <select
            id="top_k"
            name="top_k"
            value={formData.top_k}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-gray-800"
          >
            <option value={5}>5件</option>
            <option value={10}>10件</option>
            <option value={20}>20件</option>
          </select>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-violet-700 text-white rounded-md hover:bg-violet-800 disabled:bg-gray-400"
          >
            {isLoading ? "検索中..." : "検索"}
          </button>
        </div>
      </form>
    </div>
  );
}
