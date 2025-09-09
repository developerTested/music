import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MasterLayout } from "./layouts";
import { ArtistListPage, ArtistPage, ErrorPage, HomePage, LoginPage, SearchPage } from "./pages";
import { LandingPage } from "./pages/LandingPage";

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