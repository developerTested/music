import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdminLayout, MasterLayout } from "./layouts";
import DashBoard from "./pages/admincp/DashBoard";
import { ErrorPage, ExplorePage, HomePage, LandingPage, ProtectedPage, SearchPage, TopChartPage } from "./pages";
import { ArtistProfile, ManageArtists } from "./pages/admincp/artists";
import { ManageSongs, AddSongPage, EditSongPage } from "./pages/admincp/songs";
import { ArtistListPage, ArtistPage } from "./pages/artists";
import { AlbumListPage, AlbumPage } from "./pages/albums";
import { LikedSongPage, SongListPage, SongPage } from "./pages/songs";
import { LoginPage, SignupPage } from "./pages/auth";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/",
        element: <MasterLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/home",
                element: <HomePage />,
            },
            {
                path: "/top-charts",
                element: <TopChartPage />,
            },
            {
                path: "/search",
                element: <SearchPage />,
            },
            {
                path: "/artists",
                element: <ArtistListPage />,
            },
            {
                path: "/artist/:artistId",
                element: <ArtistPage />,
            },
            {
                path: "/songs",
                element: <SongListPage />,
            },
            {
                path: "/song/:songId",
                element: <SongPage />,
            },
            {
                path: "/albums",
                element: <AlbumListPage />,
            },
            {
                path: "/album/:albumId",
                element: <AlbumPage />,
            }
        ]
    },
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <ProtectedPage role="guest" />,
        children: [
            {
                path: "/login",
                errorElement: <ErrorPage />,
                element: <LoginPage />,
            },
            {
                path: "/register",
                errorElement: <ErrorPage />,
                element: <SignupPage />,
            },

        ]
    },
    {
        path: "/admincp",
        errorElement: <ErrorPage />,
        element: <AdminLayout />,
        children: [
            {
                index: true,
                path: '/admincp',
                element: <DashBoard />,
            },
            {
                path: "/admincp/artists",
                element: <ManageArtists />,
            },
            {
                path: "/admincp/artists/create",
                element: <ArtistProfile />,
            },
            {
                path: "/admincp/artists/:artistId",
                element: <ArtistProfile />,
            },
            {
                path: "/admincp/songs",
                element: <ManageSongs />,
            },
            {
                path: "/admincp/songs/create",
                element: <AddSongPage />,
            },
            {
                path: "/admincp/songs/:songId",
                element: <EditSongPage />,
            }
        ]
    }
]);

export default function RouteList() {
    return <RouterProvider router={router} />
}