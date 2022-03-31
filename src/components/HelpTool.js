import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';


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
                </FormControl>
            </div>
        </div>
    )
}

export default HelpTool