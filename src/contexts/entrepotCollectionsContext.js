import React, {
    useState,
    useContext,
    createContext,
    useEffect,
} from 'react'

const EntrepotCollectionsContext = createContext({
    entrepotCollections: [],
    collectionMethods: [],
    isOld: '',
    lastCanisterID: '',
    cronDisbursements: false,
})

export const EntrepotCollectionsContextProvider = (props) =>{
    const apiURI = 'https://us-central1-entrepot-api.cloudfunctions.net/api/collections'
    
    const [entrepotCollections, setEntrepotCollections] = useState([])
    const [collectionMethods, setCollectionMethods] = useState([])
    const [isOld, setIsOld] = useState('')
    const [lastCanisterID, setLastCanisterID] = useState('')
    const [cronDisbursements, setCronDisbursements] = useState(false)

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

    useEffect(() =>{
        if(isOld === false){
            let apiURI = `https://cors-prox-any.herokuapp.com/https://limitless-shore-90887.herokuapp.com/call/${lastCanisterID}/cronDisbursements`

            fetch(apiURI, {
                'method': 'GET',
                'headers': {'Target-URL': "https://limitless-shore-90887.herokuapp.com/"},
            }).then(()=>{setCronDisbursements(true)})
        }
    }, [isOld,lastCanisterID])

    const collectionMethodsHandler = async (canID) =>{
        setLastCanisterID(canID)
        const uriAddress = `https://tonq-collection-info.herokuapp.com/directoryinfo/${canID}`
        const canisterMethods = await fetch(uriAddress)
        const jsonCM = await canisterMethods.json()

        console.log(jsonCM)
        
        const oldNew = jsonCM.includes('cronDisbursements')
        setCollectionMethods(jsonCM)
        setIsOld(!oldNew)
    }
    
    const isOldHandler = () =>{
        setIsOld('')
        setCronDisbursements(false)
    }

    return (
        <EntrepotCollectionsContext.Provider value={{
            setCollectionMethods: collectionMethodsHandler,
            setIsOld: isOldHandler,
            entrepotCollections: entrepotCollections,
            collectionMethods: collectionMethods,
            isOld: isOld,
            lastCanisterID: lastCanisterID,
            cronDisbursements: cronDisbursements,
            }}>
            {props.children}
        </EntrepotCollectionsContext.Provider>
    )
}

export const useEntrepotCollectionsContext = () => useContext(EntrepotCollectionsContext)