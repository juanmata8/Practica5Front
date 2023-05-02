import Link from 'next/link'

import styles from '@/styles/Home.module.css'

import { GetServerSideProps, NextPage } from 'next'
import { getClientSSR } from '@/utils/apolloClient'
import { gql } from '@apollo/client'

export type personaje = {
    person: {
        name:string,
    birthYear:string,
    eyeColor:string,

    gender:string,
    height:string,
    homeworld: {
      name:string
    },
    species: {
      name:string
    }
      }

} 
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id
  console.log(id)
  if(id?.at(id.length-1)  === "="){
    id.slice(0, -1)
  }

const query = gql`
query Query {
    person(id:"${id?.toString()}") {
        name    
      birthYear
        eyeColor
        gender
        height
        homeworld {
          name
        }
        species {
          name
        }
    }
}
`
const client = getClientSSR();
const {data} = await client.query<personaje>({
query
})


return {
props: { data }
}
}


const peliculaDetails:NextPage<{data:personaje}> = ({data}) => {
    let especie:string ="";
    // if(data.person.species.name !== "null"){
    //     especie = data.person.species.name
    // }
    console.log(data.person.species)
    
  return (
    <>
      <div className='title'>Personajes</div>
      <div className='lista'>
        <div>Nombre: {data.person.name}</div>
        <div>Cumpleaños: {data.person.birthYear}</div>     
        <div>Color de ojos: {data.person.eyeColor}</div>     
        <div>Género: {data.person.gender}</div>     
        <div>Altura: {data.person.height}</div>     
        <div>Planeta: {data.person.homeworld.name !== null ? data.person.homeworld.name : "null"}</div>     
        <div>Especie: {data.person.species !== null ? data.person.species.name : "null"}</div> 
      </div>
    </>
  )
}
export default peliculaDetails;