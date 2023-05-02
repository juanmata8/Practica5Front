import { getClientSSR } from "@/utils/apolloClient";
import { GetServerSideProps, NextPage } from 'next';
import { gql } from "@apollo/client";
import Link from "next/link";



type planets = {
  allPlanets: {
    planets:Array<{name:string, population:number, gravity:string}>
  }
} 

export const getServerSideProps: GetServerSideProps = async () => {
  const query = gql`
  query Query {
    allPlanets {
      planets {
        name
        population
        gravity
      }
    }
  }
  `
  const client = getClientSSR();
  const {data} = await client.query<planets>({
    query
  })
  return {
    props: { data }
  }
}


const planetas:NextPage<{data:planets}> = ({data}) => {  
    return (
      <>
        <div className="title">Planetas</div>
        <div className="lista">
          Total de planetas: {data.allPlanets.planets.length}
          {data!.allPlanets.planets.map(planet =>       
            <div className="item">
              <div className={planet.population < 6000000 ? "rojo" : planet.population < 4500000000 ? "verde" : "morado"}></div>
              <div className="nombrePlaneta">{planet.name}</div>
              <div className="poblacionPlaneta">Población: {planet.population}</div>
              <div className="gravedadPlaneta">Gravedad: {planet.gravity}</div>
            </div>
          )} 
          <Link href= "/">Volver</Link>
        </div>
      </>
    )
  }
  export default planetas;