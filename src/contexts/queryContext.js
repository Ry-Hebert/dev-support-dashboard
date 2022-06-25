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
        
        let apiURI = `https://cors-prox-any.herokuapp.com/https://limitless-shore-90887.herokuapp.com/call/${q.cID}/`
        let fetchedData = ''

        switch (q.probID){
            //Sold NFT But Havent Recived ICP
            case 1:



                break
            case 2:
                break
            case 3:
                break
            case 4:
                break
            //Self Diagnosis Option
            case 0:

                apiURI += `transactions`
        
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
                
                console.log(q.princID)
                
                if(q.princID !== ''){
                    
                    let filteredData = fetchedData.filter( item => item.token === q.princID)
                    
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
    const qTypeHandler = (qType) =>{setQType(qType)}
    const nftMintNumHandler = (nftMintNum) =>{setNftMintNum(nftMintNum)}
    const principalIDHandler = (principalID) =>{setPrincipalID(principalID)}
    const walletAddressHandler = (walletAddress) =>{setWalletAddress(walletAddress)}

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