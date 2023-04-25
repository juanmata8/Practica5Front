import { gql, useQuery } from "@apollo/client"
import React, { FC, useState, useEffect } from "react"

const Peliculas: FC<{id: string}> = ({id}) => {

    const query = gql`
    query Query {
        allFilms {
          films {
            title
          }
        }
      }
    `
    const [charID, setCharId] = useState<string>(id);

    const {loading, error, data, refetch} = useQuery<{
        films: {
            title: string
        }
    }>(query, {
        variables: {
            id
        }
    })
    useEffect(() => {
        refetch({
            variables:
            {id:charID}
        })
    }, [charID]);

    if (loading) return <div>Loading...</div>
    if (error) return <div>Upps. La vida es dura</div>
    
    return (
        <div>
            aaaa
            {data!.films.title}
        </div>
    )
}

export default Peliculas;