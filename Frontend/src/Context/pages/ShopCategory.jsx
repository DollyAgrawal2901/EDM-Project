import React, { useContext } from 'react'
import { ShopContext } from '../ShopContext'
import dropdown_icon from '../../Components/assets/dropdown_icon.png'
import Item from '../../Components/Items/Item'

export default function ShopCategory(props) {
  const {all_product} = useContext(ShopContext)

  return (
    <div>
        <img className='block my-[30px] mx-auto w-[82%]' src={props.banner} alt="" />
        <div className='flex my-0 mx-[170px] justify-between items-center'> 
          <p className='font-semibold'>
            <span className='font-semibold'>Showing 1-12</span> out of 36 products
          </p>
          <div className='py-[10px] px-[20px] rounded-[40px] border border-[#888]'>
           Sort by <img src={dropdown_icon} alt="" />
          </div>
        </div>
        <div className='my-[20px] mx-[170px] grid grid-cols-4 gap-y-[80px]'>
          {all_product.map((item, i) => {
            if (props.category===item.category) {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            }
            else{
              return null;
            }
          })}
        </div>
        <div className='flex justify-center items-center my-[150px] mx-auto w-[233px] h-[69px] rounded-[75px] bg-gray-500 text-gray-900 text-[18px] font-medium'>
          Explore More
        </div>
    </div>
  )
}
