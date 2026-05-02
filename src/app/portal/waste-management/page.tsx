'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Load } from '@/components/Svgs/Loading'

export default function WasteManagementPortalPage() {
  const content = useRef<HTMLDivElement>(null)
  const portal = useRef<HTMLDivElement>(null)

  const fadeIn = () => {
    gsap.to(portal.current, {
      duration: 1.4,
      overwrite: true,
      ease: 'power2.out',
      opacity: 1,
      y: 0,
      scale: 1,
    })
  }

  const fadeOut = (link: string) => {
    gsap.to(portal.current, {
      duration: 1.2,
      overwrite: true,
      ease: 'power3.inOut',
      opacity: 0,
      scale: 1.04,
    })

    gsap.to(content.current, {
      duration: 0.8,
      overwrite: true,
      ease: 'power1.out',
      opacity: 1,
      onComplete: () => {
        try {
          if (window.top) {
            window.top.location.href = link
          } else {
            window.location.href = link
          }
        } catch {
          window.location.href = link
        }
      },
    })
  }

  useEffect(() => {
    fadeIn()
  }, [])

  return (
    <div className="absolute left-0 top-0 z-10 flex h-screen w-screen select-none flex-col items-center justify-center overflow-hidden bg-white text-black">
      <div
        ref={content}
        className="pointer-events-none absolute left-1/2 top-1/2 z-40 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center opacity-0"
      >
        <Load className="w-16 fill-current text-green-900" />
      </div>

      <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center px-6">
        <div
          ref={portal}
          className="group flex w-full max-w-5xl translate-y-6 cursor-pointer flex-col items-center justify-center rounded-[34px] border border-green-800 bg-white px-8 py-14 text-center opacity-0 shadow-2xl shadow-green-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-green-200"
          onClick={() =>
            fadeOut('https://chainlinkink.com/portal/waste-management/wm/order')
          }
        >
          <img
            src="/wm-logo.png"
            alt="Waste Management Logo"
            className="w-[320px] md:w-[560px] lg:w-[680px]"
          />

          <div className="mt-12 flex w-full max-w-4xl items-center justify-center rounded-2xl bg-green-900 px-6 py-6 text-xl font-extrabold uppercase tracking-wide text-white transition-all duration-300 group-hover:bg-green-950 md:text-3xl">
            Start Waste Management Order
            <span className="ml-6 text-5xl leading-none">→</span>
          </div>
        </div>
      </div>
    </div>
  )
}