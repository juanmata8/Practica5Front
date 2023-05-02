import { getClientSSR } from "@/utils/apolloClient";
import { GetServerSideProps, NextPage } from 'next';
import { gql } from "@apollo/client";
import Link from "next/link";


type pelis = {
  allFilms: {
    films:Array<{
      title:string, 
      episodeID:number, 
      
      }>
  }
} 

export const getServerSideProps: GetServerSideProps = async () => {
  const query = gql`
  query Query {
    allFilms {
      films {
        title
        episodeID
        
      }
    }
  }
  `

  const client = getClientSSR();
  const {data} = await client.query<pelis>({
    query
  })
  return {
    props: { data }
  }
}

export const roman_num = (n:number) => {
  switch (n) {
    case 1:
      return "I";
    case 2:
      return "II";
    case 3:
      return "III";
    case 4:
      return "IV";
    case 5:
      return "V";
    case 6:
      return "VI";
  }
}

export const filmNumber = (n:number) => {
  switch(n){
    case 1:
        return 4;
    case 2:
        return 5
    case 3:
        return 6;
    case 4:
        return 1;
    case 5:
        return 2;
    case 6:
        return 3;
    default:
        return 1;
}
}

const peliculas:NextPage<{data:pelis}> = ({data}) => { 
   
    return (
      <div>
        <div className="title">Peliculas</div>
        <div className="lista">
          {data!.allFilms.films.map(c => 
          <div className="item">
            <div className="numeroPelicula">
              {roman_num(c.episodeID)}
            </div>
            <Link href={`/pelicula/${filmNumber(c.episodeID)}`}>
              {c.title}
            </Link>
          </div>
          )}
          <Link href="/">Volver</Link>
        </div>
      </div>
    )
  }
  
  export default peliculas;