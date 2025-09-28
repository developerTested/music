import { ArtistTable } from "@/components/admincp/ArtistTable";
import Alert from "@/components/Alert";
import artistService from "@/service/ArtistService";
import type { ArtistType } from "@/types/artist.type";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export default function ManageArtists() {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [artistList, setArtistList] = useState<ArtistType[]>([])

    const fetchArtist = async () => {

        setLoading(true)

        try {
            const response = await artistService.fetchAll();

            console.log(response);


            setArtistList(response.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorMessage(error?.message);
            } else if (error instanceof Error) {
                setErrorMessage(error?.message);
            } else {
                setErrorMessage("Something went wrong")
            }

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchArtist()

        return () => {
            setErrorMessage(null);
            setArtistList([])
        }
    }, [])


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Manage Artists
                </h2>
            </div>

            {errorMessage && <Alert message={errorMessage} />}

            <ArtistTable loading={loading} artists={artistList} />

        </div>
    )
}