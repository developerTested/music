import artistService from '@/service/ArtistService';
import type { ArtistType } from '@/types/artist.type';
import React, { useState, useEffect } from 'react';


type ArtistSelectProps = {
  onSelect: (artist: ArtistType) => void;
  isOpen: boolean;
  onClose: () => void;
};

const ArtistSelect: React.FC<ArtistSelectProps> = ({ onSelect, isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [artists, setArtists] = useState<ArtistType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.length < 2) {
      setArtists([]);
      return;
    }

    const fetchArtists = async () => {
      setLoading(true);
      try {
        const response = await artistService.search(encodeURIComponent(searchTerm));
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchArtists, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Select Artist</h2>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring"
          placeholder="Search artist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading ? (
          <p className="text-gray-500">Searching...</p>
        ) : (
          <ul className="max-h-60 overflow-y-auto">
            {artists.map((artist) => (
              <li
                key={artist._id}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 rounded"
                onClick={() => {
                  onSelect(artist);
                  onClose();
                }}
              >
                {artist.name}
              </li>
            ))}
            {artists.length === 0 && searchTerm.length >= 2 && (
              <li className="text-gray-500 px-4 py-2">No artists found</li>
            )}
          </ul>
        )}
        <button
          className="mt-4 text-sm text-blue-600 hover:underline"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ArtistSelect;
