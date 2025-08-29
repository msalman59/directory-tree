const API_BASE_URL = "http://localhost:4000/api";

export const directoryService = {
  async getDirectoryContents(path = "/") {
    try {
      const url =
        path === "/"
          ? `${API_BASE_URL}/directory`
          : `${API_BASE_URL}/directory?path=${encodeURIComponent(path)}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch directory contents");
      }

      return data;
    } catch (error) {
      console.error("Error fetching directory contents:", error);
      throw error;
    }
  },
};
