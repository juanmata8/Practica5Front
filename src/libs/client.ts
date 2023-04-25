import {ApolloClient, InMemoryCache, NormalizedCacheObject} from "@apollo/client";

let client: ApolloClient<NormalizedCacheObject> | undefined = undefined;

const CSRClient = new ApolloClient ({
    uri: "https://swapi-graphql.netlify.app/",
    cache: new InMemoryCache()
});

const getClient = () => { // LADO DEL SERVIDOR
    if (typeof window === undefined){
        return new ApolloClient({
            uri: "https://swapi-graphql.netlify.app/",
            cache: new InMemoryCache(),
        });
    }
    else {
        return CSRClient;
    }
    
}
export default getClient;