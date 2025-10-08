import React from 'react'
import authService from '@/service/AuthService';
import { Form, Link, useNavigate } from 'react-router-dom'
import { Button, Input } from '@/components/forms'
import { type SubmitHandler, useForm } from "react-hook-form"
import { Logo } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { RegisterSchema, type registerType } from '@/schema/auth.schema';
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaSignature, FaUser } from 'react-icons/fa';
import type { ToastErrorType, ToastResponseType } from '@/types/api';

export function SignupPage() {
    const [passwordShow, setPasswordShow] = React.useState(false);


    const { handleSubmit, register, formState: { errors }, reset } = useForm<registerType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: "",
            fullName: "",
            email: "",
            password: "",
        }
    })

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<registerType> = async (data) => {

        toast.promise(authService.register(data), {
            pending: "Please wait...",
            success: {
                render: ({ data }: ToastResponseType) => {

                    reset()

                    navigate("/login")

                    return data.message || "Account created Successful"
                }
            },
            error: {
                render: ({ data }: ToastErrorType) => {
                    return data.message || "Something went wrong while creating your account!"
                }
            }
        })
    }

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="m-auto relative w-full px-4 lg:px-0 lg:max-w-lg">

                <div className="text-center mb-12">
                    <Logo />
                    <h2 className="text-3xl font-bold text-black mt-6 mb-3">Welcome to Melodify</h2>
                    <p className="text-gray-600 text-base mt-2">Create your account and start your sonic journey</p>
                </div>

                <Form onSubmit={handleSubmit(onSubmit)} autoComplete="on" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative w-full grid gap-2">
                            <label
                                htmlFor="username"
                                className="flex items-center gap-2 text-sm font-medium select-none"
                            >
                                User Name
                            </label>
                            <Input
                                {...register("username", {
                                    required: true,
                                })}
                                id="username"
                                placeholder='Username'
                                startIcon={<FaUser />}
                                className={`${errors.username ? 'border-red-600' : ''}`}
                            />

                            {errors.username && <p className='text-red-600 text-xs my-1'>
                                {errors.username.message}
                            </p>}
                        </div>
                        <div className="relative w-full grid gap-2">
                            <label
                                htmlFor="fullName"
                                className="flex items-center gap-2 text-sm font-medium select-none"
                            >
                                Full Name
                            </label>
                            <Input
                                {...register("fullName")}
                                placeholder="Full Name"
                                id="fullName"
                                startIcon={<FaSignature />}
                                className={`${errors.fullName ? 'border-red-600' : ''}`}
                            />

                            {errors.fullName && <p className='text-red-600 text-xs my-1'>
                                {errors.fullName.message}
                            </p>}
                        </div>
                    </div>

                    <div className="relative w-full grid gap-2">
                        <label
                            htmlFor="email"
                            className="flex items-center gap-2 text-sm font-medium select-none"
                        >
                            Email
                        </label>
                        <Input
                            {...register("email", {
                                required: true,
                            })}
                            id="email"
                            type="email"
                            placeholder="admin@admin.com"
                            className={`${errors.email ? 'border-red-600' : ''}`}
                            startIcon={<FaEnvelope />}
                        />

                        {errors.email && <p className='text-red-600 text-xs my-1'>
                            {errors.email.message}
                        </p>}
                    </div>

                    <div className="relative w-full grid gap-2">
                        <label
                            htmlFor="password"
                            className="flex items-center gap-2 text-sm font-medium select-none"
                        >
                            Password
                        </label>
                        <div className="relative w-full">
                            <Input
                                {...register("password")}
                                id='password'
                                placeholder="Password"
                                name="password"
                                type={passwordShow ? 'text' : 'password'}
                                className={`${errors.password ? 'border-red-600' : ''}`}
                                startIcon={<FaLock />}
                            />

                            <div onClick={() => setPasswordShow(!passwordShow)} className="cursor-pointer absolute top-0 bottom-0 right-2 flex items-center justify-center">
                                {passwordShow ? <FaEye /> : <FaEyeSlash />}
                            </div>
                        </div>
                        {errors.password && <p className='text-red-600 text-xs my-1'>
                            {errors.password.message}
                        </p>}
                    </div>

                    <Button className="w-full rounded flex items-center justify-center">
                        Sign Up
                    </Button>
                </Form>


                {/* Footer */}
                <p className="text-center text-base text-gray-600 mt-8">
                    Already have an account?{' '}
                    <Link to="/login" className="text-black cursor-pointer hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    )
}
