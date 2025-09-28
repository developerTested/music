import SongGridCard from "@/components/cards/SongGridCard";

export function HomePage() {

  // const fetchTopSongs = async () => {
  //   try {
  //     const {data: response} = await MUSIC_API.get("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/playlist/13450172243/tracks?limit=100")


  //   } catch (error) {
  //     console.log(error);

  //   }
  // }

  const song = {
    "_id": "68cd7344d501277127ebfddf",
    "title": "hello world",
    "cover": "https://res.cloudinary.com/chai-backend-tested/image/upload/v1758294849/ypuyc9ffemgnsbkujhh0.jpg",
    "artist": null,
    "releaseDate": "2025-01-01T00:00:00.000Z",
    "duration": 98.586094,
    "fileUrl": "https://res.cloudinary.com/chai-backend-tested/video/upload/v1758294848/gsoha4zyrm4imxjvujms.mp3",
    "youtubeVideoId": "sVRwZEkXepg",
    "createdAt": "2025-09-19T15:14:12.091Z",
    "updatedAt": "2025-09-19T15:14:12.091Z",
    "__v": 0
  }

  return (
    <div>
      <SongGridCard song={song} />
    </div>
  )
}
