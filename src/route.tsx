import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { AdminLayout, MasterLayout } from "./layouts";
import Spinner from "./components/Spinner";

// Lazy-loaded pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const TopChartPage = lazy(() => import("./pages/TopChartPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const ProtectedPage = lazy(() => import("./pages/ProtectedPage"));

const ArtistListPage = lazy(() => import("./pages/artists/ArtistListPage"));
const ArtistPage = lazy(() => import("./pages/artists/ArtistPage"));

const AlbumListPage = lazy(() => import("./pages/albums/AlbumListPage"));
const AlbumPage = lazy(() => import("./pages/albums/AlbumPage"));

const SongListPage = lazy(() => import("./pages/songs/SongListPage"));
const SongPage = lazy(() => import("./pages/songs/SongPage"));

const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/auth/SignupPage"));

const DashBoard = lazy(() => import("./pages/admincp/DashBoard"));
const ManageArtists = lazy(() => import("./pages/admincp/artists/ManageArtists"));
const ArtistProfile = lazy(() => import("./pages/admincp/artists/ArtistProfile"));
const ManageSongs = lazy(() => import("./pages/admincp/songs/ManageSongs"));
const AddSongPage = lazy(() => import("./pages/admincp/songs/AddSongPage"));
const EditSongPage = lazy(() => import("./pages/admincp/songs/EditSongPage"));

const withSuspense = (Component: React.ReactElement) => (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">
        <Spinner size="xl" />
    </div>}>{Component}</Suspense>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: withSuspense(<LandingPage />),
        errorElement: withSuspense(<ErrorPage />),
        index: true,
    },
    {
        path: "/",
        element: <MasterLayout />,
        errorElement: withSuspense(<ErrorPage />),
        children: [
            { path: "/home", element: withSuspense(<HomePage />) },
            { path: "/top-charts", element: withSuspense(<TopChartPage />) },
            { path: "/search", element: withSuspense(<SearchPage />) },
            { path: "/artists", element: withSuspense(<ArtistListPage />) },
            { path: "/artist/:artistId", element: withSuspense(<ArtistPage />) },
            { path: "/songs", element: withSuspense(<SongListPage />) },
            { path: "/song/:songId", element: withSuspense(<SongPage />) },
            { path: "/albums", element: withSuspense(<AlbumListPage />) },
            { path: "/album/:albumId", element: withSuspense(<AlbumPage />) },
        ],
    },
    {
        path: "/auth",
        errorElement: withSuspense(<ErrorPage />),
        element: withSuspense(<ProtectedPage role="guest" />),
        children: [
            { path: "/auth/login", element: withSuspense(<LoginPage />) },
            { path: "/auth/register", element: withSuspense(<SignupPage />) },
        ],
    },
    {
        path: "/admincp",
        errorElement: withSuspense(<ErrorPage />),
        element: <AdminLayout />,
        children: [
            { index: true, path: "/admincp", element: withSuspense(<DashBoard />) },
            { path: "/admincp/artists", element: withSuspense(<ManageArtists />) },
            { path: "/admincp/artists/create", element: withSuspense(<ArtistProfile />) },
            { path: "/admincp/artists/:artistId", element: withSuspense(<ArtistProfile />) },
            { path: "/admincp/songs", element: withSuspense(<ManageSongs />) },
            { path: "/admincp/songs/create", element: withSuspense(<AddSongPage />) },
            { path: "/admincp/songs/:songId", element: withSuspense(<EditSongPage />) },
        ],
    },
]);

export default function RouteList() {
    return <RouterProvider router={router} />;
}
