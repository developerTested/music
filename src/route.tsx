import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MasterLayout } from "./layouts";
import { ArtistListPage, ArtistPage, ErrorPage, HomePage, LoginPage, SearchPage } from "./pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MasterLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
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
]);

export default function RouteList() {
    return <RouterProvider router={router} />
}