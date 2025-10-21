
import type { ArtistType } from '@/types/artist.type'
import Avatar from '@/components/Avatar'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import { CiSearch } from 'react-icons/ci'
import { Button, Input } from '../forms';
import { Link } from 'react-router-dom';

type Props = {
    artists: ArtistType[];
    loading: boolean;
};

export const ArtistTable = ({ artists, loading = true }: Props) => {
    if (loading) return <h1>Loading...</h1>;

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">

                <Link
                    to="/admincp/artists/create"
                    className="flex items-center justify-center"
                >
                    <Button

                        startIcon={<FaPlus className='size-6' />}
                    >
                        Add a new Artist
                    </Button>
                </Link>

                <div className="ml-auto">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative border dark:border-zinc-800 rounded-md w-80">
                        <Input
                            type="search"
                            placeholder="Search"
                            startIcon={<CiSearch className="size-6" />}
                            className="bg-transparent outline-none border-none"
                        />
                    </div>

                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-800 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {artists.map((artist, i) => <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="flex items-center gap-2">
                                <Avatar alt={artist.name} />

                                <div className="block flex-1">
                                    <span>
                                        {artist.name}
                                    </span>
                                </div>
                            </div>

                        </th>
                        <td className="px-6 py-4 flex items-center gap-2">
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
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
};
