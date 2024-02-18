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
                        <Image className="h-8 w-auto" src="" alt="" width={700} height={700} />
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <a href="/" className="text-gray-300 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-base font-semibold">Super Series</a>
                                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Movies</a>
                                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Shows</a>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={searchMovie}>
                        <div className="space-x-4">
                            <input className="bg-primary px-4 py-2 outline-none placeholder:text-textColor border border-textColor rounded-md text-sm font-medium" type="text" value={input} placeholder="Search a movie" onChange={(event) => setInput(event.target.value)} />
                            <button type="submit" className="bg-primary text-secondary py-2 px-4 hover:bg-textColor hover:text-white border border-textColor rounded-md text-sm font-medium">Search</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;