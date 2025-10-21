import axios from "axios";

export const endPoints = {
    chart: "http://api.deezer.com/chart/",
    chartTracks: "http://api.deezer.com/chart/0/tracks",
    chartAlbums: "http://api.deezer.com/chart/0/albums",
}

export const MUSIC_API = axios.create({
    // baseURL: "https://thingproxy.freeboard.io/fetch/https://api.deezer.com",
    baseURL: import.meta.env.VITE_BACKEND_URL || "/api",
    timeout: 60 * 60,
    withCredentials: true,
})
