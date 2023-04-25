import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Peliculas from '@/components/Peliculas'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Peliculas></Peliculas>
    </>
  )
}
