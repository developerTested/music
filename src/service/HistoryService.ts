import Service from "./service";

class HistoryService extends Service {

    /**
     * Fetch all songs or playlist
     * @returns 
     */
    fetchAllHistory = async () => {
        return this.get("/history")
    }

    /**
     * Fetch all user played song or playlist
     * @returns 
     */
    fetchHistory = async () => {
        return this.get("/history/me")
    }


    /**
     * Add song or playlist to History
     * @returns 
     */
    createHistory = async (data: { songId?: string, playListId?: string}) => {
        return this.post("/history/me", data)
    }

    /**
     * Remove song or playlist from history
     * @param historyId 
     * @returns 
     */
    deleteHistoryById = async (historyId: string) => {
        return this.delete(`/history/${historyId}`)
    }

    /**
     * Clear all users played songs or playlist from history
     * @returns 
     */
    deleteHistory = async () => {
        return this.delete("/history/me")
    }

    /**
     * Reset Histories
     * @returns 
     */
    deleteAllHistory = async () => {
        return this.delete("/history")
    }
}

const historyService = new HistoryService();

export default historyService;