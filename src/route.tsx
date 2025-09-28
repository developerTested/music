import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdminLayout, MasterLayout } from "./layouts";
import DashBoard from "./pages/admincp/DashBoard";
import { ErrorPage, ExplorePage, HomePage, ProtectedPage, SearchPage, TopChartPage } from "./pages";
import { ArtistProfile, ManageArtists } from "./pages/admincp/artists";
import { ArtistListPage, ArtistPage } from "./pages/artists";
import { SongListPage, SongPage } from "./pages/songs";
import { AlbumListPage, AlbumPage } from "./pages/albums";
import { LoginPage, SignupPage } from "./pages/auth";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MasterLayout />,
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
                path: "/explore",
                element: <ExplorePage />,
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
                path: "/admincp/song/:songId",
                element: <ArtistPage />,
            }
        ]
    }
]);

export default function RouteList() {
    return <RouterProvider router={router} />
}