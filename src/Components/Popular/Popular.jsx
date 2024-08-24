import React from 'react'
import data_product from '../assets/data'
import Item from '../Items/Item'

export default function Popular() {
  return (
    <div className="flex flex-col items-center gap-[10px] h-[90vh] ">
        <h1 className='text-gray-950 text-[50px] font-semibold'>POPULAR IN WOMEN</h1>
        <hr className='w-[200px] h-[6px] rounded-[10px] bg-slate-800'/>
        <div className="mt-[50px] flex gap-[30px]">
            {data_product.map((item, i)=> {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}
