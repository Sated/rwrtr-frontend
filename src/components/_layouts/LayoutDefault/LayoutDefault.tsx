import React from 'react'
import s from './LayoutDefault.module.scss'
import { Header } from '@/components/_global/Header/Header'
import { Footer } from '@/components/_global/Footer/Footer'

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className={s.inner}>
        {children}
      </div>
      <Footer />
    </>
  )
}