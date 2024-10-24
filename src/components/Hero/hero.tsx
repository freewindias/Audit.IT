import React from 'react'
import RetroGrid from '../ui/retro-grid'


export default function Hero() {
    return (
        <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl">
            <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-9xl font-bold leading-none tracking-tighter text-transparent">
                Audit.IT
            </span>
            <RetroGrid />
        </div>
    )
}
