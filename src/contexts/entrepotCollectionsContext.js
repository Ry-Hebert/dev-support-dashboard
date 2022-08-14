import React, {
    useState,
    useContext,
    createContext,
    useEffect,
} from 'react'

const apiURI = 'https://us-central1-entrepot-api.cloudfunctions.net/api/collections'

const EntrepotCollectionsContext = createContext({
    entrepotCollections: [],
    collectionMethods: [],
    isOld: '',
})

export const EntrepotCollectionsContextProvider = (props) =>{
    
    const [entrepotCollections, setEntrepotCollections] = useState([])
    const [collectionMethods, setCollectionMethods] = useState([])
    const [isOld, setIsOld] = useState('')

    useEffect(() =>{
        const fetchData = async () =>{
            try {
                const apiRes = await fetch(apiURI)

                const resData = await apiRes.json()
                
                resData.sort( (a, b) =>{
                    const nameA = a.name.toUpperCase()
                    const nameB = b.name.toUpperCase()

                    if(nameA < nameB){
                        return -1
                    }
                    if(nameA > nameB){
                        return 1
                    }

                    return 0
                })

                setEntrepotCollections(resData)

            } catch(error){ console.log(error)}
        }

        fetchData()
    }, [])

    const collectionMethodsHandler = async (canID) =>{
        const uriAddress = `http://tonq-collection-info.herokuapp.com/directoryinfo/${canID}`

        const canisterMethods = await fetch(uriAddress)
        const jsonCM = await canisterMethods.json()

        console.log(jsonCM)
        
        const oldNew = jsonCM.includes('cronDisbursements')

        setCollectionMethods(jsonCM)
        setIsOld(!oldNew)
    }
    
    const isOldHandler = () =>{
        setIsOld('')
    }

    return (
        <EntrepotCollectionsContext.Provider value={{
            setCollectionMethods: collectionMethodsHandler,
            setIsOld: isOldHandler,
            entrepotCollections: entrepotCollections,
            collectionMethods: collectionMethods,
            isOld: isOld,
            }}>
            {props.children}
        </EntrepotCollectionsContext.Provider>
    )
}

export const useEntrepotCollectionsContext = () => useContext(EntrepotCollectionsContext)