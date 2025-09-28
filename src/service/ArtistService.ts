import type { artistInputType } from "@/schema/artist.schema";
import Service from "./service";
import type { ApiResponse } from "@/types/api";
import type { ArtistType } from "@/types/artist.type";

class ArtistService extends Service {

    /**
     * Get All Artists
     * @returns 
     */
    fetchAll = async () => {
        const { data: response } = await this.get<ApiResponse<ArtistType[]>>("/artists");
        return response;
    }

    /**
     * Get artist details by Id
     * @returns 
     */
    getArtistById = async (artistId: string) => {
        const { data: response } = await this.get<ApiResponse<ArtistType>>("/artists/" + artistId);
        return response;
    }


    /**
     * Create a new Artist
     * @param data 
     * @returns 
     */
    createArtist = async (data: artistInputType) => {
        const { data: response } = await this.post<ApiResponse>("/artists", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    }

    /**
     * Update a new Artist and fetch Updated Records
     * @param artistId 
     * @param data 
     * @returns 
     */
    updateArtist = async (artistId: string, data: artistInputType) => {
        const { data: response } = await this.put<ApiResponse<ArtistType>>(`/artists/${artistId}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    }

    /**
     * Delete artist and its song, albums
     * @param artistId 
     */
    removeArtist = async (artistId: string) => {
        this.delete(`/artists/${artistId}`)
    }
}

const artistService = new ArtistService();

export default artistService;