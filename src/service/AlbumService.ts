import Service from "./service";
import type { AlbumType, FilterType, PaginationType } from "@/types/artist.type";
import type { ApiResponse } from "@/types/api";

class AlbumService extends Service {

    fetchAll = async (options: FilterType) => {
        if (options.genre === "All") {
            options.genre = undefined;
        }

        const { data: response } = await this.get<ApiResponse<PaginationType<AlbumType[]>>>("/albums", {
            params: options
        });

        return response;
    }


    createAlbum = async (AlbumId: string, data: { name: string }) => {
        return await this.post<ApiResponse<AlbumType>>(`/albums/${AlbumId}`, data);
    }


    updateAlbum = async (AlbumId: string, data: { name: string }) => {
        return await this.put<ApiResponse<AlbumType>>(`/albums/${AlbumId}`, data);
    }

    deleteAlbum = async (AlbumId: string) => {
        return await this.delete(`/albums/${AlbumId}`);
    }

}

const albumService = new AlbumService();

export default albumService;