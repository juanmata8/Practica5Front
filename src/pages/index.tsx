
import { getClientSSR } from "@/utils/apolloClient";
import {gql} from "@apollo/client"
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link'

const Home:NextPage = () => { 
  return (
    <>
    <div className="mainMenu">
        <div className="title">Star Wars Wiki</div>
        <div className="mainMenuItem"><Link href="/peliculas">Peliculas</Link></div>
        <div className="mainMenuItem"><Link href="/planetas">Planetas</Link></div>
        <div className="mainMenuItem"><Link  href="/vehiculos">Vehiculos</Link></div>
      </div>
    </>
  )
}

export default Home;