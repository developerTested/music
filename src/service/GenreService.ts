import type { AxiosResponse } from "axios";
import Service from "./service";
import type { GenreType } from "@/types/artist.type";

class GenreService extends Service {

    fetchAll = async () => {
        return await this.get<AxiosResponse<GenreType>>("/genres");
    }


    createGenre = async (genreId: string, data: { name: string }) => {
        return await this.post(`/genres/${genreId}`, data);
    }


    updateGenre = async (genreId: string, data: { name: string }) => {
        return await this.put(`/genres/${genreId}`, data);
    }

    deleteGenre = async (genreId: string) => {
        return await this.delete(`/genres/${genreId}`);
    }

}

const genreService = new GenreService();

export default genreService;