export type ArtistType = {
    id: number,
    name: string,
    link: string,
    picture: string,
    picture_small: string,
    picture_medium: string,
    picture_big: string,
    picture_xl: string,
    tracklist: string,
    type: string,
}

export type AlbumType = {
    id: number,
    title: string,
    cover: string,
    cover_small: string,
    cover_medium: string,
    cover_big: string,
    cover_xl: string,
    md5_image: string,
    tracklist: string,
    type: string,
}

export type TrackType = {
    id: number,
    title: string,
    title_short: string,
    title_version: string,
    link: string,
    duration: number,
    rank: number,
    preview: string,
    artist: ArtistType,
    album: AlbumType,
    type: string,
}

