import { useState } from 'react'
import { useAppDispatch } from '@/hooks';
import { setUser } from '@/redux/slices/authSlice';
import { LoginSchema, type loginType } from '@/schema/auth.schema';
import type { LoginResponseType, ToastErrorType, ToastResponseType } from '@/types/api';
import { useForm, type SubmitHandler } from 'react-hook-form';
import authService from '@/service/AuthService';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { Button } from './Button';
import { Form } from 'react-router-dom';
import { Label } from './Label';
import { Input } from './Input';
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';

export function LoginForm() {

    const [passwordShow, setPasswordShow] = useState(false);

    const { handleSubmit, register, formState: { errors } } = useForm<loginType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<loginType> = async (data) => {

        toast.promise(authService.login(data), {
            pending: "Please wait...",
            success: {
                render: ({ data }: ToastResponseType<LoginResponseType>) => {

                    dispatch(setUser(data.data))

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
        <div className="relative">
            <div className="text-center mb-4">
                <h2 className="text-3xl font-bold text-black dark:text-zinc-200 mt-6 mb-3">Welcome Back to Melodify</h2>
                <p className="text-gray-600 dark:text-zinc-300 text-base mt-2">Log in to continue your musical journey</p>
            </div>

            <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 p-4">
                <div className="relative w-full grid gap-2">
                    <Label
                        htmlFor="email"
                        className="flex items-center gap-2 text-sm font-medium select-none"
                    >
                        Email
                    </Label>

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
                        hasError={Boolean(errors.email)}
                    />

                    {errors.email && <p className='text-red-600 text-xs my-1'>
                        {errors.email.message}
                    </p>}
                </div>

                <div className="relative w-full grid gap-2">

                    <div className="flex items-center">
                        <Label
                            htmlFor="password"
                            className="flex items-center gap-2 text-sm font-medium select-none"
                        >
                            Password
                        </Label>
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
                            endIcon={<></>}
                            hasError={Boolean(errors.password)}
                        />

                        <div onClick={() => setPasswordShow(!passwordShow)} className="cursor-pointer absolute top-0 bottom-0 right-2 flex items-center justify-center">
                            {passwordShow ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>
                    {errors.password && <p className='text-red-600 text-xs my-1'>
                        {errors.password.message}
                    </p>}
                </div>

                <Button
                    className="rounded-full w-full"
                >
                    Login
                </Button>
            </Form>
        </div>
    )
}
