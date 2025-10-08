import React from 'react'
import authService from '@/service/AuthService';
import { Form, Link, useNavigate } from 'react-router-dom'
import { Button, Input } from '@/components/forms'
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { type SubmitHandler, useForm } from "react-hook-form"
import { Logo } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { LoginSchema, type loginType } from '@/schema/auth.schema';
import type { LoginResponseType, ToastErrorType, ToastResponseType } from '@/types/api';
import { useAppDispatch } from '@/hooks';
import { setUser } from '@/redux/slices/authSlice';

export function LoginPage() {
    const [passwordShow, setPasswordShow] = React.useState(false);

    const { handleSubmit, register, formState: { errors } } = useForm<loginType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<loginType> = async (data) => {

        toast.promise(authService.login(data), {
            pending: "Please wait...",
            success: {
                render: ({ data }: ToastResponseType<LoginResponseType>) => {

                    dispatch(setUser(data.data))

                    navigate("/home");

                    return data?.message || "Login Successful"
                }
            },
            error: {
                render: ({ data }: ToastErrorType) => {
                    return data?.message || "Something went wrong"
                }
            },
        })
    }

    return (
        <div className="flex items-center justify-center w-full h-screen dark:bg-zinc-950 dark:text-slate-200">
            <div className="m-auto relative w-full px-4 lg:px-0 lg:max-w-lg">
                <div className="text-center mb-12">
                    <Logo />
                    <h2 className="text-3xl font-bold text-black dark:text-zinc-200 mt-6 mb-3">Welcome Back to Melodify</h2>
                    <p className="text-gray-600 dark:text-zinc-300 text-base mt-2">Log in to continue your musical journey</p>
                </div>

                <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4">
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
                            name="email"
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

                        <div className="flex items-center">
                            <label
                                htmlFor="password"
                                className="flex items-center gap-2 text-sm font-medium select-none"
                            >
                                Password
                            </label>

                            <Link
                                to="/resetPassword"
                                className="ml-auto text-sm"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <div className="relative w-full">
                            <Input
                                {...register("password", {
                                    required: true,
                                })}
                                id='password'
                                name="password"
                                type={passwordShow ? 'text' : 'password'}
                                placeholder="Password"
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

                    <div className="w-full flex items-center justify-between">

                        <label htmlFor="remember" className="">
                            <input type="checkbox" name="remember" id="remember" className='mx-2' />
                            Remember me
                        </label>

                    </div>
                    <Button className="w-full rounded flex items-center justify-center">
                        Login
                    </Button>
                </Form>

                <p className='text-center my-4'>
                    Don't have an account?
                    <Link to="/register" className='mx-2'>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}
