import type { artistInputType } from "@/schema/artist.schema";
import Service from "./service";
import type { ApiResponse } from "@/types/api";
import type { ArtistType } from "@/types/artist.type";

class ArtistService extends Service {
    /**
     * Fetches all artists from the server.
     * @returns A promise resolving to an array of ArtistType objects wrapped in an ApiResponse.
     */
    fetchAll = async () => {
        const { data: response } = await this.get<ApiResponse<ArtistType[]>>("/artists");
        return response;
    };

    /**
     * Retrieves detailed information about a specific artist by ID.
     * @param artistId - The unique identifier of the artist.
     * @returns A promise resolving to the artist data wrapped in an ApiResponse.
     */
    getArtistById = async (artistId: string) => {
        const { data: response } = await this.get<ApiResponse<ArtistType>>(`/artists/${artistId}`);
        return response;
    };

    /**
     * Creates a new artist entry on the server.
     * @param data - The artist data to be submitted (e.g., name, image, bio).
     * @returns A promise resolving to the server's ApiResponse.
     */
    createArtist = async (data: artistInputType) => {
        return await this.post<ApiResponse>("/artists", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    /**
     * Updates an existing artist's information.
     * @param artistId - The ID of the artist to update.
     * @param data - The updated artist data.
     * @returns A promise resolving to the updated ApiResponse.
     */
    updateArtist = async (artistId: string, data: artistInputType) => {
        return await this.put<ApiResponse>(`/artists/${artistId}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    /**
     * Deletes an artist and all associated songs and albums.
     * @param artistId - The ID of the artist to delete.
     * @returns A promise resolving to the server's response.
     */
    removeArtist = async (artistId: string) => {
        return await this.delete(`/artists/${artistId}`);
    };

    /**
    * Sends a GET request to check follow status a specific artist.
    * @param artistId - The ID of the artist to follow.
    * @returns A promise resolving to the response of the follow request.
    */
    checkFollowStatus = async (artistId: string) => {
        return await this.get<ApiResponse<{ followed: boolean }>>(`/artists/${artistId}/follow`);
    };

    /**
    * Sends a POST request to follow a specific artist.
    * @param artistId - The ID of the artist to follow.
    * @returns A promise resolving to the response of the follow request.
    */
    follow = async (artistId: string) => {
        return await this.post<ApiResponse>(`/artists/${artistId}/follow`);
    };

    /**
     * Sends a DELETE request to unfollow a specific artist.
     * @param artistId - The ID of the artist to unfollow.
     * @returns A promise resolving to the response of the unfollow request.
     */
    unFollow = async (artistId: string) => {
        return await this.delete<ApiResponse>(`/artists/${artistId}/follow`);
    };

    /**
     * Search all artists from the server.
     * @returns A promise resolving to an array of ArtistType objects wrapped in an ApiResponse.
     */
    search = async (query: string) => {
        return await this.get<ApiResponse<ArtistType[]>>(`/artists?search=${query}`);
    };

}

const artistService = new ArtistService();

export default artistService;