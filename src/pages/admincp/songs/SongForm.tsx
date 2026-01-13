import { Button, Input, Label, Select, SelectItem } from '@/components/forms'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { songSchema, type songInputType } from '@/schema/song.schema';
import type { TrackType } from '@/types/artist.type';
import { toast } from 'react-toastify';
import songService from '@/service/SongService';
import { FaCamera } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { formatDate } from '@/utilities/helper';
import { useNavigate } from 'react-router-dom';
import Avatar from '@/components/Avatar';

type SongFormProps = {
  song?: TrackType,
}

export default function SongForm({ song }: SongFormProps) {

  const { control, register, formState: { errors }, handleSubmit, watch, setValue, } = useForm({
    resolver: zodResolver(songSchema),
    defaultValues: {
      title: song?.title || "",
      duration: song?.duration?.toString() || "",
      genre: song?.genre?.pop()?.name || "",
      album: song?.album?._id || "",
      artist: song?.artist?._id || "",
      releaseDate: formatDate(song?.releaseDate || "", "YYYY-MM-DD") || "",
      youtubeVideoId: song?.youtubeVideoId || "",
      cover: song?.cover || "",
      media: song?.fileUrl || "",
    },
  });

  const navigate = useNavigate();

  const cover = watch("cover");
  const media = watch("media");

  const submitForm: SubmitHandler<songInputType> = async (data) => {

    if (cover) {
      data.cover = cover[0];
    }

    if (media) {
      data.media = media[0];
    }

    toast.promise(
      song ? songService.updateSong(song._id, data) :
        songService.createSong(data),
      {
        pending: "Please wait...",
        success: {
          render() {
            navigate("/admincp/songs")
            return "Song Created!"
          }
        },
        error: {
          render({ data }) {
            console.log(data);
            return "Something went wrong!"
          }
        }
      }
    )
  }

  /**
   * Delete Cover
   */
  const deleteCover = async () => {
    if (!song?._id) {
      toast.error("Song ID is missing");
      return;
    }

    try {
      // const response = await songService.deleteCover(song._id);
      toast.success("Cover deleted successfully");
      // return response;
    } catch (error) {
      console.error("Delete cover error:", error);
      toast.error("Something went wrong while deleting the cover");
    }
  };


  return (
    <div className="">
      <form
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="grid gap-4">
          <div className="relative">
            <Label>
              Title
            </Label>
            <Input
              {...register("title")}
              placeholder="Song title"
            />

            {errors.title && <p className='text-red-600 text-xs my-1'>
              {errors.title.message}
            </p>}
          </div>

          <div className="grid md:grid-cols-3 gap-4 items-baseline">
            <div className="relative grid gap-2">
              <Label>Genre</Label>

              <Controller
                name="genre"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onSelect={(item) => field.onChange(item)}
                    url="/genres"
                    placeholderText="Choose genre"
                  />
                )}
              />

              {errors.genre && <p className='text-red-600 text-xs my-1'>
                {errors.genre.message}
              </p>}
            </div>

            <div className="relative grid gap-2">
              <Label>Artist</Label>

              <Controller
                name="artist"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onSelect={(item) => field.onChange(item)}
                    url='/artists'
                    placeholderText='Select Artist'
                    renderItem={(option) => <SelectItem
                      item={option}
                      onSelect={() => field.onChange(option)}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar />
                        <div className="flex flex-col flex-1">
                          <div className="text-lg">
                            {option.name}
                          </div>
                          <span className="text-xs">
                            {option.country}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                    }
                  />

                )}
              />



              {errors.artist && <p className='text-red-600 text-xs my-1'>
                {errors.artist.message}
              </p>}
            </div>

            <div className="relative grid gap-2">
              <Label>Album</Label>

              <Controller
                name="album"
                control={control}
                render={({ field }) => (
                  <Select
                    value={song?.album?._id || ""}
                    onSelect={(album) => field.onChange(album)}
                    url='/albums'
                    placeholderText='Select Album'
                  />
                )}
              />

              {errors.album && <p className='text-red-600 text-xs my-1'>
                {errors.album.message}
              </p>}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 items-baseline">
            <div className="relative grid gap-2">
              <Label>Duration</Label>
              <Input
                {...register("duration")}
                placeholder="10"
                type="number"
              />

              {errors.duration && <p className='text-red-600 text-xs my-1'>
                {errors.duration.message}
              </p>}
            </div>
            <div className="relative grid gap-2">
              <Label>Release date</Label>
              <Input
                {...register("releaseDate")}
                placeholder="10"
                type="date"
              />

              {errors.releaseDate && <p className='text-red-600 text-xs my-1'>
                {errors.releaseDate.message}
              </p>}
            </div>
            <div className="relative grid gap-2">
              <Label>Youtube Video ID</Label>
              <Input
                {...register("youtubeVideoId")}
                placeholder="Enter Youtube video id"
              />

              {errors.youtubeVideoId && <p className='text-red-600 text-xs my-1'>
                {errors.youtubeVideoId.message}
              </p>}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 items-baseline">
            {
              song?.fileUrl ?
                <div className="preview relative w-full h-60">
                  <audio
                    src={song.fileUrl}
                    className="size-full object-cover"
                    controls
                  />
                </div>
                : media ?
                  <div className="preview relative w-full h-60">
                    <audio
                      src={URL.createObjectURL(media[0])}
                      className="size-full object-cover"
                      controls
                    />

                    <button
                      onClick={() => setValue("media", undefined)}
                      type="button"
                      className="bg-transparent border-none outline-none bg-white dark:bg-zinc-900 absolute top-0 right-0">
                      <MdClose className="size-6" />
                    </button>
                  </div>
                  :
                  <div className="relative grid gap-2">
                    <Label>Song file</Label>
                    <Input
                      {...register("media")}
                      placeholder="Select song media file"
                      type="file"
                      accept="audio/*"
                    />

                    {errors.media?.message && <p className='text-red-600 text-xs my-1'>
                      {String(errors.media.message)}
                    </p>}
                  </div>
            }

            <div className="relative grid gap-2">
              {song?.cover ?
                <div className="preview relative w-full h60">
                  <img
                    src={song.cover}
                    alt="Song Cover Preview"
                    className="size-full object-cover"
                  />

                  <button
                    onClick={deleteCover}
                    type="button"
                    className="bg-transparent border-none outline-none bg-white dark:bg-zinc-900 absolute top-0 right-0">
                    <MdClose className="size-6" />
                  </button>

                </div> :
                cover ?
                  <div className="preview relative w-full h60">
                    <img
                      src={URL.createObjectURL(cover[0])}
                      alt="Song Cover Preview"
                      className="size-full object-cover"
                    />

                    <button
                      onClick={() => setValue("cover", undefined)}
                      type="button"
                      className="bg-transparent border-none outline-none bg-white dark:bg-zinc-900 absolute top-0 right-0">
                      <MdClose className="size-6" />
                    </button>

                  </div>
                  :

                  <div className="size-full flex items-center justify-center">
                    <label
                      htmlFor="cover"
                      className="block text-sm font-medium  cursor-pointer">

                      <FaCamera className="size-14" />
                    </label>

                    <input
                      {...register('cover')}
                      type="file"
                      id="cover"
                      className="w-full p-2 border rounded-md hidden"
                      accept='image/*'
                    />
                  </div>}

              {/* <Label>Song Cover</Label>
              <Input
                {...register("cover")}
                placeholder="Select Song Cover"
                type="file"
                accept="image/*"
              /> */}

              {errors.cover && <p className='text-red-600 text-xs my-1'>
                {String(errors.cover.message)}
              </p>}
            </div>
          </div>
          <Button>
            {song ? "Update" : "Create"} Song
          </Button>
        </div>
      </form >
    </div >
  )
}