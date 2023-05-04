import React from 'react'
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
    <div> 
    <h1>404 Error</h1> 
    <h1>Page Not Found</h1> 
    <div>
          Go to? <Link to="/">HomePage</Link>.
        </div>
</div> 
    </div>
  )
}

export default PageNotFound
