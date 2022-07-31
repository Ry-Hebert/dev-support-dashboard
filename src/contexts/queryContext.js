import React, {
    useState,
    useContext,
    createContext,
} from 'react'

const QueryContext = createContext({
    query: 0,
    qRes: [],
    qRes2: [],
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
    const [qRes, setQRes] = useState([])
    const [qRes2, setQRes2] = useState([])
    const [qType, setQType] = useState(0)
    const [nftMintNum, setNftMintNum] = useState('')
    const [principalID, setPrincipalID] = useState('')
    const [walletAddress, setWalletAddress] = useState('')

    //Handler Functions
    const queryHandler = async (q) =>{
        
        let apiURI = `https://cors-prox-any.herokuapp.com/https://limitless-shore-90887.herokuapp.com/call/${q.cID}/`
        qResHandler([])
        qRes2Handler([])
        
        let queryGrab = async (route, resIndex) =>{
            await fetch(route, {
                'method': 'GET',
                'headers': {'Target-URL': "https://limitless-shore-90887.herokuapp.com/"},
            }).then( async (response) => {
                const waitRes = await response.json()
                console.log(waitRes)
                // fetchedData = waitRes
                switch (resIndex){
                    case 1:
                        qResHandler(waitRes.filter( item => item.buyer === q.walletAddress))
                        break
                    case 2:
                        qRes2Handler(waitRes.filter( item => item.buyer === q.walletAddress))
                        break
                    default:
                        qResHandler(waitRes)
                        break
                }
            })
            .catch(err => {
                console.error(err);
            });
        }

        switch (q.probID){
            //Sold NFT But Haven't Received ICP
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
                const apiURIex1 = `transactions`
                const apiURIex2 = `saleTransactions`
                
                if(q.walletAddress !== ''){
                    await queryGrab(apiURI + apiURIex1, 1)
                    await queryGrab(apiURI + apiURIex2, 2)

                }
                else{
                    let fetchedData1 = await queryGrab(apiURI + apiURIex1)
                    console.log(fetchedData1)
                }

                break
            default:

        }
          
        setQuery(1)
    }

    const qResHandler = (qRes) =>{setQRes(qRes)}
    const qRes2Handler = (qRes2) =>{setQRes2(qRes2)}
    const qTypeHandler = (qType) =>{setQType(qType)}
    const nftMintNumHandler = (nftMintNum) =>{setNftMintNum(nftMintNum)}
    const principalIDHandler = (principalID) =>{setPrincipalID(principalID)}
    const walletAddressHandler = (walletAddress) =>{setWalletAddress(walletAddress)}

    return (
        <QueryContext.Provider value={{
            setQuery: queryHandler,
            setQRes: qResHandler,
            setQRes2: qRes2Handler,
            setQType: qTypeHandler,
            setNftMintNum: nftMintNumHandler,
            setPrincipalID: principalIDHandler,
            setWalletAddress: walletAddressHandler,
            query: query,
            qRes: qRes,
            qRes2: qRes2,
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