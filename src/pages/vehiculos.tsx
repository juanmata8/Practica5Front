
import { getClientSSR } from "@/utils/apolloClient"
import { gql } from "@apollo/client"
import { GetServerSideProps, NextPage } from "next"


type Vehicles = {
    allVehicles:{
        vehicles:Array<{name:string, 
            model:string, 
            length:string,
             crew:number,
              passengers:number,
              costInCredits:number}>
    }
}

export const getServerSideProps:GetServerSideProps = async({params}) => {
    const QUERY = gql`
    query Query {
        allVehicles {
          vehicles {
            name
            model
            length
            crew
            passengers
            costInCredits
          }
        }
      }
    `
    const client = getClientSSR();
    const { data } = await client.query<Vehicles>({
        query: QUERY,
        variables: {}
    })

    return {
        props: {data}
    }
}

const Vehiculos:NextPage<{data:Vehicles}> = ({data}) => {
    return (        
        <div>
             <div className="title">Vehículos</div>
            <h1 className="pelicula">Número total de vehiculos: {data.allVehicles.vehicles.length}</h1>
            <div className="lista">
                {data.allVehicles.vehicles.map((vehicle) => (
                    <div className="pelicula">
                        <div>
                            Nombre: {vehicle.name}
                        </div>
                        <div>
                            Costo en créditos: {vehicle.costInCredits}
                        </div>
                        <div>
                            Modelo: {vehicle.model}
                        </div>
                        <div>
                            Longitud: {vehicle.length}
                        </div>
                        <div>
                            Capacidad: {vehicle.passengers}
                        </div>
                        <div>
                            Pasajeros: {vehicle.crew}
                        </div>
                        </div>                   
                ))}
            </div>
        </div>
    )
}

export default Vehiculos;