import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Principal } from '@dfinity/principal'
import { sha224 } from '@dfinity/principal/lib/esm/utils/sha224';
import { getCrc32 } from '@dfinity/principal/lib/esm/utils/getCrc';
import { useQueryContext } from '../contexts/queryContext'
import { useEntrepotCollectionsContext } from '../contexts/entrepotCollectionsContext'


let HelpTool = () => {

    const [problemForm, setProblemForm] = React.useState({problem: '', collection: '', mintNum: '', principalID: '', walletAddress: ''})
    
    const queryCtx = useQueryContext()
    const entrepotCtx = useEntrepotCollectionsContext()


    const toHexString = (byteArray)  =>{
        return Array.from(byteArray, function(byte) {
          return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
      }

    const to32bits = num => {
        let b = new ArrayBuffer(4);
        new DataView(b).setUint32(0, num);
        return Array.from(new Uint8Array(b));
    }

    const getSubAccountArray = (s) => {
        if (Array.isArray(s)){
          return s.concat(Array(32-s.length).fill(0));
        } else {
          //32 bit number only
          return Array(28).fill(0).concat(to32bits(s ? s : 0))
        }
    };

    const principalToAccountIdentifier = (p, s) => {
        const padding = Buffer("\x0Aaccount-id");
        const array = new Uint8Array([
            ...padding,
            ...Principal.fromText(p).toUint8Array(),
            ...getSubAccountArray(s)
        ]);
        const hash = sha224(array);
        const checksum = to32bits(getCrc32(hash));
        const array2 = new Uint8Array([
            ...checksum,
            ...hash
        ]);
        return toHexString(array2);
    };

    
    const handleChange = (event) => {
        console.log(problemForm)
        if(event.target.name === 'problem'){
            setProblemForm({...problemForm, problem: event.target.value})
        }
        if(event.target.name === 'collection'){
            setProblemForm({...problemForm, collection: event.target.value})
        }
        if(event.target.name === 'mintNum'){
            setProblemForm({...problemForm, mintNum: event.target.value})
        }
        if(event.target.name === 'principalID'){
            setProblemForm({...problemForm, principalID: event.target.value})
        }
        if(event.target.name === 'walletAddress'){
            setProblemForm({...problemForm, walletAddress: event.target.value})
        }

        if(event.target.name === 'submitQ'){
            console.log(queryCtx)
            console.log(problemForm.collection)

            const queryParams = {
                cID: problemForm.collection,
                probID: problemForm.problem,
                princID: problemForm.principalID,
                mintNum: problemForm.mintNum,
                walletAddress: problemForm.walletAddress
            }

            
            queryCtx.setNftMintNum(problemForm.mintNum)
            queryCtx.setPrincipalID(problemForm.principalID)
            queryCtx.setWalletAddress(problemForm.walletAddress)
            queryCtx.setQuery(queryParams)

            console.log(queryCtx.qRes)
        }

        // console.log(queryCtx)
        // console.log(problemForm)
        // console.log(entrepotCtx)
    }

    return(
        <div className='helpToolDiv'>
            <div>
                <FormControl className='devHelpForm'>
                    <div className='formItem'>
                        <FormControl>
                            <InputLabel>Problem</InputLabel>
                            <Select
                                labelId='problem-selection-label'
                                id='problem-selection'
                                value={problemForm.problem}
                                label='Problem'
                                name='problem'
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>I sold an NFT but haven't received ICP</MenuItem>
                                <MenuItem value={2}>I bought an NFT but haven't received the NFT</MenuItem>
                                <MenuItem value={3}>I wrapped / unwrapped my NFT and it disappeared</MenuItem>
                                <MenuItem value={4}>I can't see my NFT in Stoic, Plug, or Entrepot</MenuItem>
                                <MenuItem value={0}>I want NFT information to self-diagnose</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='formItem'>
                        <FormControl>
                            <InputLabel>NFT collection</InputLabel>
                            <Select
                                labelId='collection-selection-label'
                                id='collection-selection'
                                value={problemForm.collection}
                                label='NFT Collection'
                                name='collection'
                                onChange={handleChange}
                            >
                                {entrepotCtx.entrepotCollections.map((item, index) =>{
                                    return <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='formItem'>
                        <TextField name='mintNum' id="outlined-basic" label="NFT Mint Number" variant="outlined" onKeyUp={handleChange}/>
                    </div>
                    <div className='formItem'>
                        <TextField name='principalID' id="outlined-basic" label="Principal ID" variant="outlined" onChange={handleChange}/>
                    </div>
                    <div className='formItem'>
                        <TextField name='walletAddress' id="outlined-basic" label="Wallet Address" variant="outlined" onKeyUp={handleChange}/>
                    </div>
                    <div className='formItem submitButton'>
                        <Button name='submitQ' variant="contained" onClick={handleChange}>Make the Magic</Button>
                    </div>
                </FormControl>
            </div>
            {queryCtx.query === 1 ?
            <div>
                <section className='resSection'>
                    {problemForm.problem === 0 ? 
                        <div className='tableDisplay'>
                            <h2>NFT History</h2>
                            <table>
                                <tr>
                                    <td>Buyer Address</td>
                                    <td>Date</td>
                                    <td>Time</td>
                                    <td>Type</td>
                                    <td>Escrow Address</td>
                                    <td>Escrow Status</td>
                                    <td>Principal</td>
                                </tr>
                                {queryCtx.qRes.map((item, i) =>{
                                    let nanoTime = item.time
                                    let milliTime = Math.round(nanoTime / 1000000)
                                    let itemTime = new Date(milliTime)
                                    if(i <5 ){
                                        console.log(item.seller._arr)
                                        console.log(Principal.fromUint8Array(item.seller._arr))
                                        console.log(Principal.fromUint8Array(item.seller).toText())
                                        console.log(principalToAccountIdentifier(item.seller._arr, 0))
                                    }
                                    return(
                                    <tr>
                                        <td>{item.buyer}</td>                            
                                        <td>{itemTime.getMonth() + 1}/{itemTime.getDate()}/{itemTime.getFullYear()}</td>
                                        <td>{itemTime.toLocaleTimeString()}</td>
                                        <td>'N/A'</td>
                                        <td>'N/A'</td>
                                        <td>'N/A'</td>
                                        <td>{Principal.fromUint8Array(item.seller._arr).toText()}</td>
                                    </tr>
                                    )
                                })}
                            </table>
                        </div> :
                    problemForm.problem === 1 ?
                        <div>
                            
                        </div> :
                    problemForm.problem === 2 ?
                        <div></div> :
                    problemForm.problem === 3 ?
                        <div></div> :
                    problemForm.problem === 4 ?
                        <div></div> :
                    problemForm.problem === undefined ?
                        <div></div> :
                    <div><h2>Request Error</h2></div>
                    }
                </section>
            </div>
            : null}
        </div>
    )
}

export default HelpTool