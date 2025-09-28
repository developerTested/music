import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdminLayout, MasterLayout } from "./layouts";
import { ArtistListPage, ArtistPage, ErrorPage, HomePage, LoginPage, SearchPage } from "./pages";
import DashBoard from "./pages/admincp/DashBoard";
import ManageArtists from "./pages/admincp/artists/ManageArtists";
import ArtistProfile from "./pages/admincp/artists/ArtistProfile";

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
                path: "/song/:songId",
                element: <ArtistPage />,
            }
        ]
    },
    {
        path: "/login",
        errorElement: <ErrorPage />,
        element: <LoginPage />,
    },
    {
        path: "/register",
        errorElement: <ErrorPage />,
        element: <LoginPage />,
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