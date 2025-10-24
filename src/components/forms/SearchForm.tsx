import { useRef } from 'react';
import { Input } from './Input'
import { CiSearch } from 'react-icons/ci';
import { Button } from './Button';
import { Form } from 'react-router-dom';

export function SearchForm() {

    const searchRef = useRef(null);

    return (
        <div className='relative hidden lg:block w-full lg:w-80 xl:w-500 m-auto group border bg-slate-100 dark:bg-zinc-800 focus-within:bg-white focus-within:shadow border-white dark:border-zinc-900 dark:text-white rounded-full'>
            <Form action="/search" className='w-full flex items-center group-focus-within:shadow-lg rounded-full'>
                <Input
                    ref={searchRef}
                    type="search"
                    name="q"
                    placeholder='Search Artist, Album...'
                    className='bg-transparent dark:bg-transparent border-none px-4 py-2.5 w-full outline-none'
                />
                <Button variant='icon' size="icon" type='submit' className='p-2 border-none outline-none bg-transparent text-inherit'>
                    <CiSearch className="w-6 h-6" />
                </Button>
            </Form>

            {Array.isArray([]) && [].length > 0 ?
                <div className="absolute top-full mt-2 w-full h-full max-h-80 overflow-y-auto rounded shadow-lg z-100 bg-white dark:bg-zinc-800">
                    <div className="px-4 py-2">
                        LOL
                    </div>
                </div>
                : ''}
        </div>
    )
}
