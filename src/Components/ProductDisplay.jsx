import React ,{useContext} from 'react'
import star_icon from './assets/star_icon.png'
import star_dull_icon from './assets/star_dull_icon.png'
import { ShopContext } from '../Context/ShopContext'

export default function ProductDisplay(props) {
    const {product} = props
    const {addToCart} = useContext(ShopContext)
  return (
    <div className='flex my-[0px] mx-[170px'>
        <div className='flex gap-[17px]'>
            <div className='flex flex-col gap-[16px]'><img className='h-[163px]' src={product.image} alt="" />
                <img className='h-[163px]' src={product.image} alt="" />
                <img className='h-[163px]' src={product.image} alt="" /><img className='h-[163px]' src={product.image} alt="" />
            </div>
            <div>
                <img className='w-[586px] h-[700px]' src={product.image} alt="" />
            </div>
        </div>
        <div className='my-[0px] mx-[70px] flex flex-col'>
            <h1 className='text-zinc-800 text-[40px] font-bold'>{product.name}</h1>
            <div className='flex items-center mt-[13px] gap-[5px] text-zinc-700 text-[16px]'>
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className='flex my-[10px] mx-[0px] gap-[30px] text-[24px] font-bold'>
                <div className='text-slate-600 line-through'>
                    ${product.old_price}
                </div>
                <div className='text-red-700'>
                    ${product.new_price}
                </div>
            </div>
            <div>
                A lightweight, usually knitted, pullover shirt, close-fitting
            </div>
            <div>
                <h1 className='mt-[55px] text-slate-600 text-[20px] font-semibold'>Select Size</h1>
                <div className='flex my-[30px] mx-[0px] gap-[20px]'>
                    <div className='py-[18px] px-[24px] bg-slate-50 border border-[#ebebeb] rounded-[3px] cursor-pointer'>S</div>
                    <div className='py-[18px] px-[24px] bg-slate-50 border border-[#ebebeb] rounded-[3px] cursor-pointer'>M</div>
                    <div className='py-[18px] px-[24px] bg-slate-50 border border-[#ebebeb] rounded-[3px] cursor-pointer'>L</div>
                    <div className='py-[18px] px-[24px] bg-slate-50 border border-[#ebebeb] rounded-[3px] cursor-pointer'>XL</div>
                    <div className='py-[18px] px-[24px] bg-slate-50 border border-[#ebebeb] rounded-[3px] cursor-pointer'>XXL</div>
                </div>
            </div>
            <button onClick={()=>{addToCart(product.id)}} className='py-[20px] px-[40px] w-[200px] text-[16px] font-semibold text-white bg-red-500 mb-[40px] border-none outline-none cursor-pointer'>ADD TO CART</button>
            <p className='mt-[10px]'> 
                <span className='font-semibold'>Category: </span> Women, T-Shirt, Crop Top
            </p>
            <p className='mt-[10px]'>
                <span className='font-semibold'>Tags: </span> Modern, Latest
            </p>
        </div>
    </div>
  )
}
