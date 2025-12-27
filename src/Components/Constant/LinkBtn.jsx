import React from 'react'
import { Link } from 'react-router-dom'

function LinkBtn({ title, redirect ,clsname}) {
    return (
        
            <Link to={`/${redirect}`} className={clsname}>
                {title}
            </Link>
       
    )
}

export default LinkBtn