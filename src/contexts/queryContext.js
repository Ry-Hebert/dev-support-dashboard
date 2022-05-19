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

    const queryHandler = async (q) =>{

        const canReq = await fetch(`https://limitless-shore-90887.herokuapp.com/call/bkvll-jiaaa-aaaah-qcqnq-cai/transaction`)
        
        qResHandler(canReq)

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