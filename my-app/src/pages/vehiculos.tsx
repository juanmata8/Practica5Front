
import { getClientSSR } from "@/utils/apolloClient"
import { gql } from "@apollo/client"
import { GetServerSideProps, NextPage } from "next"
import Link from "next/link"


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
        <>
            <div className="title">Vehículos</div>
            <div className="lista">
                Número total de vehiculos: {data.allVehicles.vehicles.length}
                {data.allVehicles.vehicles.map((vehicle) => (
                    <div className="item">
                        <div className="grande">
                            Costo en créditos: {vehicle.costInCredits? vehicle.costInCredits : "No disponible"}
                        </div>                  
                        <div>
                            Nombre: {vehicle.name}
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
                <Link href="/">volver</Link>
            </div>
        </>
    )
}

export default Vehiculos;