import React from 'react'
import HelpTool from './HelpTool'
import { EntrepotCollectionsContextProvider} from '../contexts/entrepotCollectionsContext'

let Home = () => {
    return(
        <main className='mainBodyContent'>
            <section>
                <h1>How can we help you?</h1>
            </section>
            <section>
                <EntrepotCollectionsContextProvider>
                    <HelpTool/>
                </EntrepotCollectionsContextProvider>                    
            </section>
        </main>
    )
}

export default Home