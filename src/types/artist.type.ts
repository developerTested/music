import type { UserType } from "./auth.type"

export type ArtistType = {
    _id: string,
    name: string,
    avatar: string,
    banner?: string,
    dob?: string,
    bio?: string,
    location: {
        city: string
        state: string,
        country: string,
    },
    country: string,
    verified: boolean,
    songs?: TrackType[],
    followers?: number,
    createdAt: string,
    updatedAt: string,
}

export type AlbumType = {
    _id: string,
    title: string,
    cover?: string,
    label: string,
    artist: string,
    releaseDate: Date,
    genre?: "Pop" | "Rock" | "Hip-Hop" | "Jazz" | "Classical" | "Electronic" | "Country" | "Reggae" | "Other",
    totalTracks: number,
    duration: number,
    isExplicit?: boolean,
    description?: string,
    createdAt: string,
    updatedAt: string,
}

export type TrackType = {
    _id: string,
    title: string,
    cover: string,
    artist: ArtistType,
    album?: AlbumType,
    genre?: GenreType[],
    releaseDate: string,
    duration: number,
    fileUrl?: string,
    youtubeVideoId?: string,
    createdAt: string,
    updatedAt: string,
}


export type PlayListType = {
    _id: string,
    title: string,
    cover: string,
    description: string,
    songs: TrackType[],
    createdAt: Date,
    updatedAt: Date,
}

export type FavoriteType = {
    _id: string,
    user: UserType,
    song: TrackType,
    createdAt: Date,
    updatedAt: Date,
}

export type HistoryType = {
    _id: string,
    user: UserType,
    song: TrackType,
    createdAt: Date,
    updatedAt: Date,
}

export type PaginationType<T = unknown> = {
    total: number,
    perPage: string,
    currentPage: number,
    totalPages: number,
    data: T,
    hasNextPage?: boolean,
    hasPrevPage?: boolean,
    nextPage?: null | null,
    prevPage?: number | null,
}

export type FilterType = {
    page?: number,
    genre?: string,
    limit?: number,
}

export type GenreType = {
    _id: string,
    name: string,
}

export type PlayerStateType = {
    isEnded: boolean;
    isMuted: boolean;
    repeat: boolean;
    progress: number;
    volume: number;
    hasPrev: boolean;
    hasNext: boolean;
}