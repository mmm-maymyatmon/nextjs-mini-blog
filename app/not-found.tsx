import React from 'react'
import Link from 'next/link'

function NotFound() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center gap-4'>
      <div>404 Not Found</div>
      <Link className='text-center text-red-500' href={"/"}>Go to Home</Link>
    
      </div>
  );
}

export default NotFound