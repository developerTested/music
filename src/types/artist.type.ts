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
    title: string,
    cover: string,
    artist: string,
    album?: string,
    genre?: string,
    releaseDate: string,
    duration: number,
    fileUrl?: string,
    youtubeVideoId?: string,
    createdAt: string,
    updatedAt: string,
}
