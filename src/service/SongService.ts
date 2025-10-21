import Service from "./service";
import type { ApiResponse } from "@/types/api";
import type { FilterType, PaginationType, TrackType } from "@/types/artist.type";
import type { songInputType } from "@/schema/song.schema";


class SongService extends Service {

    /**
     * Get All Artists
     * @returns 
     */
    fetchAll = async (options?: FilterType) => {

        if (options && options.genre === "All") {
            options.genre = undefined;
        }

        const { data: response } = await this.get<ApiResponse<PaginationType<TrackType[]>>>("/songs", {
            params: options
        });
        return response;
    }

    /**
     * Get artist details by Id
     * @returns 
     */
    getSongById = async (songId: string) => {
        const { data: response } = await this.get<ApiResponse<TrackType>>("/songs/" + songId);
        return response;
    }


    /**
     * Create a new Artist
     * @param data 
     * @returns 
     */
    createSong = async (data: songInputType) => {
        const { data: response } = await this.post<ApiResponse>("/songs", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    }

    /**
     * Update a new Artist and fetch Updated Records
     * @param songId 
     * @param data 
     * @returns 
     */
    updateSong = async (songId: string, data: songInputType) => {
        const { data: response } = await this.put<ApiResponse<TrackType>>(`/songs/${songId}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    }

    /**
     * Delete artist and its song, albums
     * @param songId 
     */
    removeSong = async (songId: string) => {
        return this.delete(`/songs/${songId}`)
    }

    /**
     * Stream audio from Youtube
     * @param youtubeVideoId 
     * @returns 
     */
    streamAudio = async (youtubeVideoId: string) => {
        const { data: response } = await this.get<ApiResponse>(`/stream/audio?url=https://www.youtube.com/watch?v=${youtubeVideoId}`);
        return response;
    }


    /**
     * Stream audio from Youtube
     * @param youtubeVideoId 
     * @returns 
     */
    search = async (query: string, limit: number = 25) => {
        const { data: response } = await this.get<ApiResponse<PaginationType<TrackType[]>>>(`/search?q=${query}&limit=${limit}`);
        return response;
    }
}

const songService = new SongService();

export default songService;