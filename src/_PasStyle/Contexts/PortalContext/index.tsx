import * as React from 'react'
import PasStyle from '../..'
import { PropsCTXdefault } from '../types'

export type PopupCTX = {
   
}



export const PortalContext = React.createContext<PopupCTX>(null)

const PortalProvider = ({
    children
} : PropsCTXdefault) => {


   return(
        <PortalContext.Provider value={{}}>
            <PasStyle 
                id='PasStyle-Portal' 
            />
            {children}
        </PortalContext.Provider>
    )
}
   
export default PortalProvider