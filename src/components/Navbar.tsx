"use client"

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
        <div className="bg-primary py-2 px-4 md:px-0">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <div className="text-[30px] font-medium">
                        Super Séries
                    </div>
                </Link>
                <form onSubmit={searchMovie}>
                    <div className="space-x-4">
                        <input className="bg-primary px-4 py-2 outline-none placeholder:text-textColor border border-white-500 rounded-md" type="text" value={input} placeholder="Search a movie" onChange={(event) => setInput(event.target.value)} />
                        <button type="submit" className="bg-primary text-textColor py-2 px-4 hover:bg-textColor hover:text-white border border-white-500 rounded-md">Search</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Navbar;