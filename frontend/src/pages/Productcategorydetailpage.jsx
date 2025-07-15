import React from 'react'
import bg from "../assets/dog.jpg"
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
function Productcategorydetailpage() {
         

  // Access item from location.state
  
      const { name, productId } = useParams();
      const location = useLocation();
      const item = location.state;
      // console.log(item?.productId, item?.productName, item?.img);
      
  return (
    <>
      <div className="flex w-full h-[50vh] lg:h-[80vh]  items-center bg-cover bg-center relative">
      <img
      src={bg}
      alt=""
      className="absolute w-full h-full object-center rotate-y-180 "
    />
      
        {/* Black Gradient Overlay */}
      <div className="absolute w-full h-full bg-gradient-to-r from-zinc-700 via-black/20 to-black/20 z-10"></div>
    
    
      <div className=" z-10 ml-2 h-full pt-20 items-center w-full flex   text-white lg:text-2xl md:text-xl text-lg font-bold drop-shadow-lg">
        
        <div className='pl-6 md:pl-8 lg:pl-12 items-center md:items-start flex flex-col    w-full gap-4'>
        <p className='text-zinc-200'>{item?.productName} {name} Category</p>
        <p className='text-zinc-300 text-base md:text-lg lg:text-xl '>Home ➔ {name}</p>
    
        </div>
      </div>
    </div>
     <div className='flex w-full gap-4 mt-10 px-11'>
        {/* <img className='h-72  w-72' src={item?.img} alt={item?.productName} /> */}
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-semibold '>{item?.productName} {name}</h1>
        <p className='pr-14 text-lg'>When it comes to high-quality pet products, <span className='font-bold '>Caninkart</span> stands out as a trusted <span className='font-bold'>{item?.productName}  {name} in Dehradun, Uttarakhand</span>. With a strong commitment to excellence, 
       </p>
       <p className='text-lg'>The brand has earned a reputation for manufacturing durable, stylish, and comfortable accessories that cater to all dog breeds and sizes. Whether you own a playful puppy or a large, energetic dog, they offer a diverse collection designed to meet every need.
        The brand emphasizes superior craftsmanship and premium materials. Each product undergoes stringent quality checks to ensure it meets the highest standards of safety and durability. From classic solid styles to vibrant printed options, their products blend functionality with modern design, giving pet owners a chance to express their dog’s personality while ensuring maximum comfort.</p>
       <p className='text-lg'> Being a responsible <span className='font-bold'> {item?.productName}  {name} in India</span>, Caninkart also focuses on sustainability by using eco-friendly materials and ethical manufacturing practices. The brand’s attention to detail and customer satisfaction has made it a preferred choice among pet stores, distributors, dog lovers across nation and abroad.
      </p>
      <p className='text-lg'>  Choose <span className='font-bold'>Caninkart</span> to discover an exceptional range of pet products that promise unmatched quality and style. When you want the best for your furry companion, trust a brand that understands what pets deserve.</p>
      </div>
      
      
      
    </div>
    </>
  )
}

export default Productcategorydetailpage