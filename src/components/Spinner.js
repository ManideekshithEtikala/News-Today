import React from 'react'
import loading from './loading.gif'
const Spinner = () => {
  return (
    <div className='text-center'>
      <img src={loading} alt='loading' style={{
        width: "50px",
        height: "50px"
      }} />
    </div>
  )
}
export default Spinner
