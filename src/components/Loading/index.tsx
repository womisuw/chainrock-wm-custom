'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Load } from '@/components/Svgs/Loading'
import { useRouter } from 'next/navigation'

export default function Loading() {
  const content = useRef<HTMLDivElement>(null)
  const right = useRef<HTMLDivElement>(null)
  const left = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // const [finishIn, setFinishIn] = useState(false)

  const fadeIn = () => {
    gsap.to(left.current, {
      duration: 3,
      overwrite: true,
      ease: 'power1.out',
      opacity: 1
    })

    gsap.to(right.current, {
      duration: 3,
      overwrite: true,
      ease: 'power1.out',
      opacity: 1
    })
  }

  const fadeOut = (link: string) => {
    gsap.to(left.current, {
      duration: 2,
      ease: 'power3.out',
      overwrite: true,
      x: -1500
    })

    gsap.to(right.current, {
      duration: 2,
      overwrite: true,
      ease: 'power3.out',
      x: 1500,
      onComplete: () => {
        router.replace(link)
      }
    })

    gsap.to(content.current, {
      duration: 3,
      overwrite: true,
      ease: 'power1.out',
      opacity: 1
    })
  }

  useEffect(() => {
    fadeIn()
  }, [])

  return (
    <div className="absolute left-0 top-0 z-10 flex h-screen w-screen cursor-pointer select-none flex-col items-center justify-center overflow-hidden bg-primary text-black">
      <div
        ref={content}
        className="flex -translate-x-2 -translate-y-9 flex-col items-center justify-center opacity-0"
      >
        <Load className="w-16 fill-current" />
      </div>

      <div className="absolute left-0 top-0 z-50 flex h-screen w-screen flex-1 flex-col justify-center md:flex-row">
        <div
          ref={left}
          className="relative flex h-full w-full items-center justify-center space-x-3 bg-white text-blue-500 opacity-0 transition-all hover:text-cyan-500 md:w-1/2"
          onClick={() => fadeOut('https://chainlinkink.com/cli-printing-home/ ')}
        >
          {/* <CLI className="w-20 -translate-y-2 fill-current" /> */}
          <p className="border-b-8 text-5xl font-bold md:text-7xl">CLI &nbsp;&nbsp;Printing</p>
        </div>

        <div
          ref={right}
          className="flex h-full w-full items-center justify-center space-x-3 bg-black text-white opacity-0 transition-all hover:text-slate-400 md:w-1/2"
          onClick={() => fadeOut('https://chainlinkink.com/chain-link-ink/')}
        >
          <img
            src="/wm-logo.png"
            alt="WM logo"
            className="w-[320px] md:w-[520px] lg:w-[640px]"
          />
          {/* <p className="absolute bottom-5 right-5 font-bold">Copyright 2024 - Chain Link Ink </p> */}
        </div>
      </div>
    </div>
  )
}
