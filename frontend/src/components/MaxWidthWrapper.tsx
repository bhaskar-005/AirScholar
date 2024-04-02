import React from 'react';

const MaxWidthWrapper = ({className , children}:{
     className?:string ;
     children:React.ReactNode}) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className='max-w-[1100px] w-[98%]'>
      {children}
      </div>
    </div>
  );
}

export default MaxWidthWrapper;
