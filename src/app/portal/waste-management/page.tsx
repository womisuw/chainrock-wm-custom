'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Load } from '@/components/Svgs/Loading'

export default function WasteManagementPortalPage() {
  const content = useRef<HTMLDivElement>(null)
  const portal = useRef<HTMLDivElement>(null)

  const fadeIn = () => {
    if (!portal.current) return

    gsap.set(portal.current, {
      opacity: 0,
      y: 18,
      force3D: false,
      willChange: 'opacity, transform',
    })

    gsap.to(portal.current, {
      duration: 1,
      overwrite: true,
      ease: 'power2.out',
      opacity: 1,
      y: 0,
      force3D: false,
      onComplete: () => {
        if (!portal.current) return

        gsap.set(portal.current, {
          clearProps: 'willChange',
        })
      },
    })
  }

  const fadeOut = (link: string) => {
    if (!portal.current || !content.current) return

    gsap.to(portal.current, {
      duration: 0.75,
      overwrite: true,
      ease: 'power2.inOut',
      opacity: 0,
      y: -10,
      force3D: false,
    })

    gsap.to(content.current, {
      duration: 0.45,
      overwrite: true,
      ease: 'power1.out',
      opacity: 1,
      delay: 0.15,
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

      <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center px-5 sm:px-6">
        <div
          ref={portal}
          className="group flex w-full max-w-5xl cursor-pointer flex-col items-center justify-center bg-white px-4 py-8 text-center opacity-0 transition-transform duration-300 hover:-translate-y-1 sm:px-8 sm:py-10"
          onClick={() =>
            fadeOut('https://chainlinkink.com/portal/waste-management/wm/order')
          }
        >
          <img
            src="/wm-logo.png"
            alt="Waste Management Logo"
            className="w-[300px] sm:w-[420px] md:w-[560px] lg:w-[680px]"
          />

          <div className="mt-10 flex w-full max-w-[620px] items-center justify-center rounded-2xl bg-green-900 px-5 py-5 text-white transition-colors duration-300 group-hover:bg-green-950 sm:mt-12 sm:max-w-4xl sm:px-6 sm:py-6">
            <span className="hidden whitespace-nowrap text-xl font-extrabold uppercase tracking-wide sm:inline md:text-3xl">
              Start Waste Management Order
            </span>

            <span className="whitespace-nowrap text-[28px] font-extrabold uppercase leading-none tracking-wide sm:hidden">
              Start Order
            </span>

            <span className="ml-4 shrink-0 text-4xl leading-none sm:ml-6 sm:text-5xl">
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}