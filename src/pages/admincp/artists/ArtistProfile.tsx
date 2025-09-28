import React, { useEffect, useState } from 'react'
import ArtistForm from './ArtistForm';
import type { ArtistType } from '@/types/artist.type';
import artistService from '@/service/ArtistService';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import Alert from '@/components/Alert';

export default function ArtistProfile() {

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [artist, setArtist] = useState<ArtistType | null>(null)


  // Artist Id
  const { artistId } = useParams();

  useEffect(() => {

    const fetchArtistDetails = async () => {

      if (!artistId) {
        return false;
      }

      setLoading(true)

      try {
        const response = await artistService.getArtistById(artistId);

        setArtist(response.data);

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


    fetchArtistDetails()

    return () => {
      setArtist(null);
      setErrorMessage(null);
    }

  }, [artistId]);

  if (loading) {
    return <h1>
      Loading...
    </h1>
  }

  return (
    <div className="w-full">


      <p className="font-bold text-lg mb-4">
        {artist ? `Editing details of ${artist.name}` : "Create a new Artist"}
      </p>

      {errorMessage && <Alert message={errorMessage} />}

      <ArtistForm artist={artist} />
    </div>
  )
}
