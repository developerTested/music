import { ArtistTable } from "@/components/admincp/ArtistTable";
import Alert from "@/components/Alert";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/forms";
import artistService from "@/service/ArtistService";
import type { ArtistType } from "@/types/artist.type";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export function ManageArtists() {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [artistList, setArtistList] = useState<ArtistType[]>([])

    const fetchArtist = async () => {

        setLoading(true)

        try {
            const response = await artistService.fetchAll();

            console.log(response);


            setArtistList(response);
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
                <h2 className="text-2xl font-bold">
                    Manage Artists
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {artistList.map((artist) => (<ArtistCard artist={artist} />))}
            </div>


            {errorMessage && <Alert message={errorMessage} />}

            {/* <ArtistTable loading={loading} artists={artistList} /> */}
        </div>
    )
}

const ArtistCard = ({ artist }: {
    artist: ArtistType;
}) => (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded shadow hover:shadow-lg transition flex items-center gap-4">
        <Avatar src={artist.avatar} alt={artist.name} size="md" imageClassName="object-cover object-top" />
        <div className="flex-1">
            <h3 className="text-lg font-semibold">{artist.name}</h3>
            <h4 className=" mt-1 text-sm font-semibold">{artist.country}</h4>
        </div>
        <div className="flex items-center gap-2">
            <Link to={`/admincp/artists/${artist._id}`}>
                <Button
                    variant="icon"
                    size="icon"
                >
                    <FaEdit className="size-4" />
                </Button>
            </Link>
            <Button
                variant="icon"
                size="icon"
                className="text-red-500"
            >
                <FaTrash className="size-4" />
            </Button>

        </div>
    </div>
);