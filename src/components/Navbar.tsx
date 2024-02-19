"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
    const [input, setInput] = useState('')
    const router = useRouter()

    const searchMovie = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        router.push(`?movie=${input}`)
        setInput("")
    }

    return (
        <nav className="bg-gray-900">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-shrink-0 items-center">
                        <Image className="h-8 w-auto" src="/favicon.ico" alt="" width={700} height={700} />
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <link href="/" className="text-gray-300 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-base font-semibold">Super Cinema</link>
                                <link href="/movies" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Movies</link>
                                <link href="/series" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Shows</link>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={searchMovie}>
                        <div className="space-x-4">
                            <input className="bg-primary px-4 py-2 outline-none placeholder:text-textColor border border-textColor rounded-md text-sm font-semibold" type="text" value={input} placeholder="Search a movie" onChange={(event) => setInput(event.target.value)} />
                            <button type="submit" className="bg-primary text-secondary py-2 px-4 hover:bg-textColor hover:text-white border border-textColor rounded-md text-sm font-semibold">Search</button>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;