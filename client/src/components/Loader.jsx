import React from 'react'
import {ColorRing} from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className='flex col' style={{height:'100vh'}}>
      {/* <h1>Welcome</h1> */}
      <ColorRing colors={["black" , "black"]} height={200} width={200}/>
    </div>
  )
}

export default Loader
