import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';


let HelpTool = () => {

    const [problemForm, setProblemForm] = React.useState('')

    const handleChange = (event) => {
        setProblemForm(event.target.value)
    }
    
    

    return(
        <div className='helpToolDiv'>
            <div>
                <FormControl className='devHelpForm'>
                    <div className='formItem'>
                        <InputLabel>Problem</InputLabel>
                        <Select
                            labelId='problem-selection-label'
                            id='problem-selection'
                            value={problemForm.problem}
                            label='Problem'
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>I sold an NFT but haven't received ICP</MenuItem>
                            <MenuItem value={2}>I bought an NFT but haven't received the NFT</MenuItem>
                            <MenuItem value={3}>I wrapped / unwrapped my NFT and it disappeared</MenuItem>
                            <MenuItem value={4}>I can't see me NFT in Stoic, Plug, or Entrepot</MenuItem>
                            <MenuItem value={0}>I want NFT information to self-diagnose</MenuItem>
                        </Select>
                    </div>
                    <div className='formItem'>
                        <TextField id="outlined-basic" label="NFT Mint Number" variant="outlined" />
                    </div>
                    <div className='formItem'>
                        <TextField id="outlined-basic" label="Principal ID" variant="outlined" />
                    </div>
                    <div className='formItem'>
                        <TextField id="outlined-basic" label="Wallet Address" variant="outlined" />
                    </div>
                    <div className='formItem submitButton'>
                        <Button variant="contained">Make the Magic</Button>
                    </div>
                </FormControl>
            </div>
            {problemForm.submited === true ?
            <div>
                <section className='resSection'>
                    {problemForm.queryValue === 0 ? 
                        <div>
                            <h2>NFT History</h2>
                            <table>
                                <tr>
                                    <td>Address</td>
                                    <td>Date</td>
                                    <td>Time</td>
                                    <td>Type</td>
                                    <td>Escrow Address</td>
                                    <td>Escrow Status</td>
                                </tr>
                            </table>
                        </div> :
                    problemForm.queryValue === 1 ?
                        <div></div> :
                    problemForm.queryValue === 2 ?
                        <div></div> :
                    problemForm.queryValue === 3 ?
                        <div></div> :
                    problemForm.queryValue === 4 ?
                        <div></div> :
                    problemForm.queryValue === undefined ?
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