import React from 'react'
import authService from '../service/AuthService';
import { Form, Link } from 'react-router-dom'
import { Button, Input } from '@/components/forms'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { type SubmitHandler, useForm } from "react-hook-form"
import { Logo } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { LoginSchema, type loginType } from '../schema/auth.schema';

export function LoginPage() {
    const [passwordShow, setPasswordShow] = React.useState(false);

    const { handleSubmit, register, formState: { errors } } = useForm<loginType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit: SubmitHandler<loginType> = async (data) => {

        toast.promise(authService.login(data), {
            pending: "Please wait...",
            success: "Login Successful",
            error: "Something went wrong",
        })
    }

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="m-auto relative w-full px-4 lg:px-0 lg:max-w-lg">
                <div className="m-auto mb-4">
                    <Logo />
                </div>

                <h1 className='text-center text-4xl mb-4'>
                    Login
                </h1>
                <p className='text-center my-4'>
                    Don't have an account?
                    <Link to="/register" className='mx-2'>
                        Sign up
                    </Link>
                </p>

                <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4">
                    <div className="relative w-full">
                        <Input
                            {...register("email", {
                                required: true,
                            })}
                            name="email" type="email" placeholder="admin@admin.com" className={`${errors.email ? 'border-red-600' : ''}`} fullWidth />

                        {errors.email && <p className='text-red-600 text-xs my-1'>
                            {errors.email.message}
                        </p>}
                    </div>

                    <div className="relative w-full">
                        <div className="relative w-full">
                            <Input
                                {...register("password", {
                                    required: true,
                                })}

                                name="password" type={passwordShow ? 'text' : 'password'} placeholder="Password" id='password' className={`${errors.password ? 'border-red-600' : ''}`} fullWidth />

                            <div onClick={() => setPasswordShow(!passwordShow)} className="cursor-pointer absolute top-0 bottom-0 right-2 flex items-center justify-center">
                                {passwordShow ? <FaEye className='w-6 h-6' /> : <FaEyeSlash className='w-6 h-6' />}
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

                        <div className="block">
                            <Link to="/resetPassword">
                                Forgot password?
                            </Link>
                        </div>

                    </div>
                    <Button className="w-full rounded flex items-center justify-center">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    )
}
