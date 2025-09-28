import { Button, Input } from '@/components/forms'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { type artistInputType, artistSchema } from '@/schema/artist.schema'
import artistService from '@/service/ArtistService'
import RichEditor from '@/components/admincp/RichEditor'
import type { ArtistType } from '@/types/artist.type'
import { useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import Alert from '@/components/Alert'
import { getAllMessages } from '@/utilities/helper'

type ArtistFormProps = {
  artist?: ArtistType | null,
}


export default function ArtistForm({ artist }: ArtistFormProps) {

  const [textContent] = useState(artist?.bio || "")

  const { control, handleSubmit, register, formState: { errors }, watch, setValue } = useForm({
    resolver: zodResolver(artistSchema),
    defaultValues: {
      name: artist?.name || "",
      avatar: artist?.avatar || "",
      banner: artist?.banner || "",
      bio: artist?.bio || "",
      dob: artist?.dob || "",
      location: {
        city: artist?.location?.city || "",
        state: artist?.location?.state || "",
        country: artist?.location?.country || "",
      },
    }
  })

  const avatar = watch("avatar")
  const banner = watch("banner");

  const processForm = async (data: artistInputType) => {

    if (avatar) {
      data.avatar = avatar[0];
    }

    if (banner) {
      data.banner = banner[0];
    }



    toast.promise(artist ?
      artistService.updateArtist(artist._id, data) :
      artistService.createArtist(data), {
      pending: "Please wait...",
      success: {
        render({ data }) {
          return data?.message || "Form Processed"
        },
      },
      error: "Something went wrong while creating an artist",
    })
  }


  return (
    <div className="size-full">

      {Object.keys(errors).length ?
        <Alert title="Error" message={getAllMessages(errors)} /> : ""}


      <form onSubmit={handleSubmit(processForm)} className="space-y-4">
        <div className="relative block w-full h-60 bg-gradient-to-b from-slate-200 to-black rounded-t-lg">

          {/* Banner */}
          <div className="flex items-center justify-center size-full">

            {artist && artist.banner ?
              <div className="preview relative size-full">
                <img
                  src={artist.banner}
                  className="size-full object-cover"
                  alt="Banner"
                />
              </div>
              : banner ?
                <div className="preview relative size-full">

                  <img
                    src={URL.createObjectURL(banner[0])}
                    className="size-full object-cover"
                    alt="Banner"
                  />

                </div>


                :
                <div className="size-full flex items-center justify-center">
                  <label
                    htmlFor="banner"
                    className="block text-sm font-medium text-gray-700 cursor-pointer">

                    <FaCamera className="size-14" />
                  </label>

                  <input
                    {...register('banner')}
                    type="file"
                    id="banner"
                    className="w-full p-2 border rounded-md hidden"
                  />
                </div>
            }

          </div>


          {/* Avatar*/}
          <div className="avatar rounded-lg size-40 absolute left-4 bottom-4 border">

            {artist && artist.avatar ?
              <div className="preview relative size-full">
                <img
                  src={artist.avatar}
                  alt="Avatar Preview"
                  className="size-full object-cover"
                />

              </div> :
              avatar ?
                <div className="preview relative size-full">
                  <img
                    src={URL.createObjectURL(avatar[0])}
                    alt="Avatar Preview"
                    className="size-full object-cover"
                  />

                  <button
                    onClick={() => setValue("avatar", undefined)}
                    type="button"
                    className="bg-transparent border-none outline-none bg-white absolute top-0 right-0">
                    <MdClose className="size-6" />
                  </button>

                </div>
                :
                <div className="size-full flex items-center justify-center">
                  <label
                    htmlFor="avatar"
                    className="block text-sm font-medium text-gray-700 cursor-pointer">

                    <FaCamera className="size-14" />
                  </label>

                  <input
                    {...register('avatar')}
                    type="file"
                    id="avatar"
                    className="w-full p-2 border rounded-md hidden"
                  />
                </div>
            }
          </div>
        </div>












        <div className="grid grid-cols-2 gap-4">
          {/* Artist Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <Input
              {...register('name')}
              id="name"
              className="mt-1 block w-full p-2 border rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <Input
              {...register('dob')}
              type="date"
              id="dob"
              className="mt-1 block w-full p-2 border rounded-md"
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
          </div>

        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>

          <Controller
            control={control}
            name="bio"
            render={({ field }) => {
              return <RichEditor
                content={textContent}
                handleEditorChange={field.onChange}
              />
            }}
          />
          {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
        </div>

        {/* Location */}
        <div className="grid grid-cols-3 gap-4">

          <div className="flex flex-col gap-2">
            <label htmlFor="location.city" className="block text-sm font-medium text-gray-700">City</label>
            <Input
              {...register('location.city')}
              id="location.city"
              className="block w-full h-auto p-2 border rounded-md"
            />
            {errors.location?.city && <p className="text-red-500 text-sm">{errors.location.city.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="location.state" className="block text-sm font-medium text-gray-700">State</label>
            <Input
              {...register('location.state')}
              id="location.state"
              className="block w-full h-auto p-2 border rounded-md"
            />
            {errors.location?.state && <p className="text-red-500 text-sm">{errors.location.state.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="location.country" className="block text-sm font-medium text-gray-700">Country</label>
            <Input
              {...register('location.country')}
              id="location.country"
              className="block w-full h-auto border rounded-md"
            />
            {errors.location?.country && <p className="text-red-500 text-sm">{errors.location.country.message}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <Button>
            {artist ? "Update" : "Create"} Artist
          </Button>
        </div>
      </form >
    </div >
  )
}
