import React, {
    useState,
    useContext,
    createContext,
    useEffect,
} from 'react'

const apiURI = 'https://us-central1-entrepot-api.cloudfunctions.net/api/collections'

const EntrepotCollectionsContext = createContext({
    entrepotCollection: [],
})

export const EntrepotCollectionsContextProvider = (props) =>{
    
    const [entrepotCollections, setEntrepotCollections] = useState([])

    useEffect(() =>{
        const fetchData = async () =>{
            try {
                const apiRes = await fetch(apiURI)

                const resData = await apiRes.data

                setEntrepotCollections(resData)

            } catch(error){ console.log(error)}
        }

        fetchData()
    }, [])
    
    return (
        <EntrepotCollectionsContext.Provider value={{ entrepotCollections }}>
            {props.children}
        </EntrepotCollectionsContext.Provider>
    )
}

export const useQueryContext = () => useContext(EntrepotCollectionsContext)