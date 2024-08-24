import React from 'react'
import new_collection from './assets/new_collections'
import Item from './Items/Item'

export default function NewCollection() {
  return (
    <div className="flex flex-col items-center gap-[20px] mb-[100px]">
        <h1 className='text-gray-950 text-[50px] font-semibold'>
            NEW COLLECTIONS
        </h1>
        <hr className='w-[200px] h-[6px] rounded-[10px] bg-slate-800'/>
        <div className="grid grid-cols-4 mt-[50px] gap-[30px]">
            {new_collection.map((item, i)=> {return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>})}
        </div>
    </div>
  )
}
