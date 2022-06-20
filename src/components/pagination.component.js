import React, {useState, useEffect} from 'react'

const Pagination = (showPerPage,onPaginationChange) => {
  const[counter, setCounter]=useState(1);
  useEffect(()=>{ 
    //const value=showPerPage*counter;
    //onPaginationChange(value-showPerPage,value);
  },[counter]);
  
  return (
    <div className="d-flex justify-content-between">
        <button className=" btn btn-primary" onclick={()=>setCounter(counter-1)}>Previous</button>
        <button className=" btn btn-primary" onclick={()=>setCounter(counter+1)}>Next</button>
    </div>
  )
}

export default Pagination