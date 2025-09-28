type ImageUploaderType = React.ComponentProps<"input"> & {
    images?: FileList,
    containerClass?: string,
    uploadContainerClass?: string,
    uploaderClass?: string,
    previewClass?: string,
    name: string,
    updateImage: (data: File) => void,
}

import React, { useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { toast } from 'react-toastify'

export default function ImageUploader({ updateImage }: ImageUploaderType) {

    const [image, setImage] = useState<string | null>(null)


    const handleFiles = (files: FileList) => {
        if (files && files[0]) {

            const file = files[0];

            const previewUrl = URL.createObjectURL(file);
            setImage(previewUrl);

            updateImage(file);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (!event.target.files) {
            return false;
        }

        const files = event.target.files;

        const fileList = Array.from(files).every((file) => file.type.startsWith("image/"))

        if (fileList) {
            handleFiles(files)
        } else {
            toast.error("Select Image files only!")
        }

    }

    /**
     * Close preview and show upload button
     */
    const handleClose = () => {
        setImage(null);
    }

    return (
        <div className="relative size-full">
            {image ?
                <div className="preview relative size-full">
                    <img
                        src={image}
                        alt="Preview"
                        className="size-full object-cover"
                    />


                    <button
                        onClick={handleClose}
                        type="button"
                        className="bg-transparent border-none outline-none bg-white absolute top-0 right-0">
                        <MdClose className="size-6" />
                    </button>

                </div>

                :
                <div className="flex items-center justify-center size-full">
                    <label htmlFor="file">
                        <FaCamera className="size-6" />
                    </label>
                    <input type="file" id="file" onChange={handleFileChange} />
                </div>
            }
        </div>
    )
}
