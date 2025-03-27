import React, { useState } from 'react'
import { data } from './stations';

function SearchUsingTrie() {
    const [search,setSearch] = useState("");
    const setVal = (e)=>{
        console.log(e);
        setSearch(e);
    }

    // console.log(data);
  return (
    <div>
        <div className='flex flex-col justify-center w-4/5 mx-auto text-center'>
            <h1>Train Station Details</h1>
            <form action="" className='my-3'>
                <input type="text" placeholder='Search station' value={search} onChange={(e)=>setSearch(e.target.value)} className='bg-gray-200 rounded-md outline-none border-1 border-blue-900 px-3 py-2 w-full'/>
            </form>
            <table className='border-1 border-blue-950 rounded-lg'>
                <thead>
                    <tr>
                        <th>Station</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data
                        .filter((item)=>{
                            return search.toLowerCase() === "" ? "" : item.station.toLowerCase().includes(search)
                        })
                        .map((item)=>{
                            return(
                                <div>
                                    <button  onClick={()=>setVal(item.station)} className='border-1 border-gray-600 flex'>
                                     {item.station}
                                    </button>
                                </div>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default SearchUsingTrie