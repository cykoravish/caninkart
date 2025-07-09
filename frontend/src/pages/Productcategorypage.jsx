import React from 'react'
import bg from "../assets/dog.jpg"
import img from "../assets/ctf.png"
import { useNavigate, useParams } from 'react-router-dom'
function Productcategorypage() {
  const {name} = useParams()
  const navigate = useNavigate()
  const data =[
    {
      productId :1,
      productName: `H-Harness `,
      img:img
    },{
      productId :2,
      productName:`Easy On Harness `,
        img:bg
    },{
      productId :3,
      productName:`Full Body Harness `,
        img:bg
    },{
      productId :4,
      productName:`Chest Harness `,
        img:bg
    },{
      productId :5,
      productName:`Cat Harness `
    },{
      productId :6,
      productName:`Dog Collar `
    },{
      productId :8,
      productName:`Leash `
    },{
      productId :9,
      productName:`Jacket `
    },{
      productId :10,
      productName:`Step-in Harness `
    },{
      productId :11,
      productName:`Tuxedo `
    },{
      productId :12,
      productName:`Bow Tue`
    },{
      productId :13,
      productName:`Bandana `
    },{
      productId :14,
      productName:`Printed Mat `
    },{
      productId :15,
      productName:`Fur Mat`
    },{
      productId :16,
      productName:`Pattern Lounger`
    },{
      productId :17,
      productName:`Embroidery Lounger`
    },{
      productId :18,
      productName:`Fur Lounger`
    },{
      productId :19,
      productName:`Printed Lounger`
    },{
      productId :20,
      productName:`Mattress`
    },{
      productId :21,
      productName:`Round Bed`
    },{
      productId :22,
      productName:`Hut-Snail`
    },
  ]
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
    <p className='text-zinc-200'>{name} Category</p>
    <p className='text-zinc-300 text-base md:text-lg lg:text-xl '>Home ➔ {name}</p>

    </div>
  </div>
</div>
<div className='flex flex-wrap my-10 justify-center'>
    {data.map((item) =>(
                  <ul   
                  onClick={() =>{
                               navigate(`/marketplace/${name}/${item.productName}`, { state: item })
                               window.scrollTo(0, 0)
                            }} 
                  className="flex w-64  h-20 flex-row justify-center items-center 
            bg-zinc-200 0 
            cursor-pointer text-center 
            transition-all duration-300 ease-in-out 
            rounded-sm shadow hover:shadow-lg
            transform hover:scale-105 mx-6 my-1.5">
              
                    
                          <li
                            key={item._id}
                            className="w-full "
                           
                          >
                           
                              <div className="  w-full items-center text-center px-1 py-0.5 space-y-3 ">
                                
                                <p className="px-1 w-full flex justify-center items-center font-medium text-lg">
                                  {item.productName}
                                </p>
                              </div>
                              {/* <p>
                                <TfiArrowTopRight className="text-[#B9E9F9] w-8 h-8" />
                              </p> */}
                           
                          </li>
                      
                    </ul>
      )
        
      )}
</div>
    </>
  )
}

export default Productcategorypage