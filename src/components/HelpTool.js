import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useQueryContext } from '../contexts/queryContext'
import { useEntrepotCollectionsContext } from '../contexts/entrepotCollectionsContext'
// import { Principal } from '@dfinity/principal';

let HelpTool = () => {

    const [problemForm, setProblemForm] = React.useState({problem: '', collection: '', mintNum: '', principalID: '', walletAddress: ''})
    
    const queryCtx = useQueryContext()
    const entrepotCtx = useEntrepotCollectionsContext()

    const handleChange = (event) => {
        console.log(problemForm)
        if(event.target.name === 'problem'){
            setProblemForm({...problemForm, problem: event.target.value})
            
            // Clears entered fields
            // document.querySelector(`#outlined-basic[name='mintNum']`).value = ''
            // document.querySelector(`#outlined-basic[name='principalID']`).value = ''
            // document.querySelector(`#outlined-basic[name='walletAddress']`).value = ''
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

            entrepotCtx.setIsOld()

            const queryParams = {
                cID: problemForm.collection,
                probID: problemForm.problem,
                princID: problemForm.principalID,
                mintNum: problemForm.mintNum,
                walletAddress: problemForm.walletAddress,
                qStage: 0,
            }

            queryCtx.setNftMintNum(problemForm.mintNum)
            queryCtx.setPrincipalID(problemForm.principalID)
            queryCtx.setWalletAddress(problemForm.walletAddress)
            queryCtx.setQuery(queryParams)

            console.log(queryCtx.qRes)
            console.log(entrepotCtx.isOld)
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
                            <h2>Transaction History</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Buyer Address</td>
                                        <td>Date</td>
                                        <td>Time</td>
                                        <td>Price</td>
                                        {/* <td>Type</td>
                                        <td>Escrow Address</td>
                                        <td>Escrow Status</td> */}
                                    </tr>
                                    {queryCtx.qRes.map((item, i) =>{
                                        let nanoTime = item.time
                                        let milliTime = Math.round(nanoTime / 1000000)
                                        let itemTime = new Date(milliTime)
                                        // if(i <3){
                                        //     let x1 = Principal.fromUint8Array(item.seller._arr)
                                        //     let x2 = Object.values(x1._arr)
                                        //     console.log(item.seller)
                                        //     console.log(Principal.toString(x1))
                                        //     console.log(x1.toText())
                                        // }
                                        return(
                                        <tr>
                                            <td>{item.buyer}</td>                            
                                            <td>{itemTime.getMonth() + 1}/{itemTime.getDate()}/{itemTime.getFullYear()}</td>
                                            <td>{itemTime.toLocaleTimeString()}</td>
                                            <td>{item.price / 100000000} ICP</td>
                                            {/* <td>'N/A'</td>
                                            <td>'N/A'</td>
                                            <td>'N/A'</td> */}
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            {queryCtx.qRes2 !== [] ?
                                <div className='tableDisplay'>
                                    <h2>Sale Transaction History</h2>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Buyer Address</td>
                                                <td>Date</td>
                                                <td>Time</td>
                                                <td>Price</td>
                                                {/* <td>Type</td>
                                                <td>Escrow Address</td>
                                                <td>Escrow Status</td> */}
                                            </tr>
                                            {queryCtx.qRes2.map((item, i) =>{
                                                let nanoTime = item.time
                                                let milliTime = Math.round(nanoTime / 1000000)
                                                let itemTime = new Date(milliTime)
                                                // if(i <3){
                                                //     let x1 = Principal.fromUint8Array(item.seller._arr)
                                                //     let x2 = Object.values(x1._arr)
                                                //     console.log(item.seller)
                                                //     console.log(Principal.toString(x1))
                                                //     console.log(x1.toText())
                                                // }
                                                return(
                                                <tr>
                                                    <td>{item.buyer}</td>                            
                                                    <td>{itemTime.getMonth() + 1}/{itemTime.getDate()}/{itemTime.getFullYear()}</td>
                                                    <td>{itemTime.toLocaleTimeString()}</td>
                                                    <td>{item.price / 100000000} ICP</td>
                                                    {/* <td>'N/A'</td>
                                                    <td>'N/A'</td>
                                                    <td>'N/A'</td> */}
                                                </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            : null}
                        </div> :
                    problemForm.problem === 1 ?
                        <div>
                            {entrepotCtx.isOld === true ?
                                <div className='resOutput'>
                                    <h3>To push your payment through with this canister you need make sure you are logged into your wallet in Entrepot With the same account that you sold your NFT from. After verifying that you will want to do the following.</h3>
                                    <ul>
                                        <li>Refresh the browser</li>
                                        <li>Click on your wallet icon in the nav bar</li>
                                        <li>click on the drop down carrot next to your wallet and its address.</li>
                                        <li>From there you should see a dropdown menu that contains an item labeled "Check Payments"</li>
                                        <li>Click "Check Payments" and wait for it to finish, then refresh the browser again and the payment should have gone through.</li>
                                    </ul>
                                    <h4>Did this help you with your problem?</h4>
                                </div> :
                            entrepotCtx.isOld === false ?
                                entrepotCtx.cronDisbursements === false ?
                                    <div className='resOutput'>
                                        <h3>Please give us a moment while we try something.</h3>
                                        <div className='cronLoading'><Box sx={{ display: 'flex' }}><CircularProgress /></Box></div>
                                    </div> :
                                    <div className='resOutput'>
                                        <h3>Good News!</h3>
                                        <p>If you go to your wallet and refresh your browser you should now see your ICP from the sale.</p>
                                        <h4>Did this help you with your problem?</h4>
                                    </div> :
                            <div><Box sx={{ display: 'flex' }}><CircularProgress /></Box></div>
                            }
                        </div> :
                    problemForm.problem === 2 ?
                        <div>
                            {queryCtx.qStage === 1 ? 
                                <div className='resOutput'>
                                    <h3>Are you looking for the NFT through Entrepot?</h3>
                                    <div className='findNFTQ'>
                                        <Button name='submitQ' variant="contained" onClick={handleChange}>No</Button>
                                        <Button name='submitQ' variant="contained" onClick={handleChange}>Yes</Button>
                                    </div>
                                </div> :
                                <div className='resOutput'>
                                
                                </div>
                            }
                        </div> :
                    problemForm.problem === 3 ?
                        <div>
                            {queryCtx.qRes === true ?
                                <div className='resOutput'>
                                    <h3>Good News!</h3>
                                    <p>If you go to your wallet and refresh your browser you should now see your NFT.</p>
                                    <h4>Did this help you with your problem?</h4>
                                </div> :
                                <div className='resOutput'>
                                    <h3>Please give us a moment while we try something.</h3>
                                    <div className='cronLoading'><Box sx={{ display: 'flex' }}><CircularProgress /></Box></div>
                                </div>
                            }
                        </div> :
                    problemForm.problem === 4 ?
                        <div>
                            <div className='resOutput'>
                                <h3>For Stoic:</h3>
                                <p>To see your NFT in Stoic you have to manually add the canister to the wallet through the Stoic interface. If that and refreshing the browser doesn't work then the project likely has not implemented the necessary methods needed for canister discovery yet.</p>
                                <h3>For Plug:</h3>
                                <p>If you cant view your NFT in through Plug then the canister needs to be added to the DAB. The collection creator will need to add the associated canister to DAB for auto-discovery. If you happen to know that it has been added to DAB then try logging out and logging back in, it can tak a min for everything to populate.</p>
                                <h3>For Entrepot:</h3>
                                <p>Entrepot also uses DAB to populate information, if the NFT is not showing up there it is possible that the API is simply being a little slow, try refreshing your browser and then give it a moment to populate everything.</p>
                                <h4>Did this help you with your problem?</h4>
                            </div>
                        </div> :
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