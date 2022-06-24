import React, {
    useState,
    useContext,
    createContext,
} from 'react'

const QueryContext = createContext({
    query: 0,
    qRes: '',
    qType: 0,
    nftMintNum: '',
    principalID: '',
    walletAddress: '',
    setQuery: () =>{},
    setQRes: () =>{},
    setQType: () =>{},
    setNftMintNum: () =>{},
    setPrincipalID: () =>{},
    setWalletAddress: () =>{},
})

export const QueryContextProvider = (props) =>{
    
    const [query, setQuery] = useState(0)
    const [qRes, setQRes] = useState('')
    const [qType, setQType] = useState(0)
    const [nftMintNum, setNftMintNum] = useState('')
    const [principalID, setPrincipalID] = useState('')
    const [walletAddress, setWalletAddress] = useState('')

    //Handler Functions
    const queryHandler = async (q) =>{
        
        switch (q.probID){
            case 1:
                break
            case 2:
                break
            case 3:
                break
            case 4:
                break
            case 0:

                const apiURI = `https://cors-prox-any.herokuapp.com/https://limitless-shore-90887.herokuapp.com/call/${q.cID}/transactions`
                let fetchedData = ''
        
                await fetch(apiURI, {
                    'method': 'GET',
                    'headers': {'Target-URL': "https://limitless-shore-90887.herokuapp.com/"},
                }).then( async (response) => {
                    const waitRes = await response.json()
                    console.log(waitRes)
                    fetchedData = waitRes
                })
                .catch(err => {
                    console.error(err);
                });
        
                if(principalID !== ''){
                    
                    let filteredData = fetchedData.filter( item => item.token === principalID)
                    
                    qResHandler(filteredData)
                }
                else{
                    qResHandler(fetchedData)
                }

                break
            default:

        }
          
        setQuery(1)
    }

    const qResHandler = (qRes) =>{setQRes(qRes)}
    const qTypeHandler = () =>{setQType(qType)}
    const nftMintNumHandler = () =>{setNftMintNum(nftMintNum)}
    const principalIDHandler = () =>{setPrincipalID(principalID)}
    const walletAddressHandler = () =>{setWalletAddress(walletAddress)}

    return (
        <QueryContext.Provider value={{
            setQuery: queryHandler,
            setQRes: qResHandler,
            setQType: qTypeHandler,
            setNftMintNum: nftMintNumHandler,
            setPrincipalID: principalIDHandler,
            setWalletAddress: walletAddressHandler,
            query: query,
            qRes: qRes,
            qType: qType,
            nftMintNum: nftMintNum,
            principalID: principalID,
            walletAddress: walletAddress
        }}>
            {props.children}
        </QueryContext.Provider>
    )
}

export const useQueryContext = () => useContext(QueryContext)