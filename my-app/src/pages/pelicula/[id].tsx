import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { GetServerSideProps, NextPage } from 'next'
import { getClientSSR } from '@/utils/apolloClient'
import { gql } from '@apollo/client'
import { filmNumber, roman_num } from '../peliculas'


export type peli = {
 film: {
  title:string,
  episodeID:number,
  director:string,
  releaseDate:string,
  characterConnection : {
    characters:Array<{
      name:string,
      id:string
    }>
  }
 }

} 
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id
  console.log(id)
const query = gql`
query Query {
  film(filmID:${id}){
    title
    episodeID
    director
    releaseDate
    characterConnection {
      characters {
        name
        id
      }
    }
  }
}
`
const client = getClientSSR();
const {data} = await client.query<peli>({
query
})

return {
props: { data }
}
}

const peliculaDetails:NextPage<{data:peli}> = ({data}) => {  
  return (
    <>    
      <div className='title'> Peliculas</div>
          <div className='lista'>
            <div>Título: {data.film.title} {roman_num(data.film.episodeID)}</div>  
            <div>Director: {data.film.director}</div>  
            <div> Fecha de estreno: {data.film.releaseDate}</div>   
            <div>Lista de personajes:</div>    
            <div className='item'>
            {data.film.characterConnection.characters.map(c => <Link href={`/personaje/${c.id}`}><div>{c.name}</div></Link>)}
            </div>
            <Link href= "/peliculas">Volver</Link>
          </div>
    </>
  )
}
export default peliculaDetails;