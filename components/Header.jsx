import React, { useState, useEffect } from 'react'
import { getCategories } from '../services'
import Link from 'next/link'
import Wave from 'react-wavify'
import Image from 'next/image'

const Header = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getCategories().then(data => setCategories(data))
  });
  return (
    <div>
      <Wave
        fill='#0b70f9'
        paused={false}
        options={{
          height: 20,
          amplitude: 60,
          speed: 0.15,
          points: 5,
          className: 'wave'
        }}
      />
      <div className='absolute container mx-auto px-10 mb-4 top-0 left-0'>
        <div className='w-full flex items-center py-8'>
          <div className='flex items-center md:float-left hover:text-blue-400'>
            {/* <p className='text-[22px] text-center'>BlogSpot</p> */}
            <Image
              src='/logo.png'
              alt='description'
              height={50}
              width={80}
              className='cursor-pointer'
            />
            <Link href="/">
              <span className='cursor-pointer font-bold text-7xl lg:text-4xl lg:ml-2 lg:tracking-[2px]'>
                བཀྲིས་བརྡ་དོན་བརྒྱད་འབྲེལ་ཚད་འཛིན།།
              </span>
            </Link>
          </div>
          <div className='hidden md:float-left md:contents lg:float-left'>
            {/* {categories.map(function (category) {
              return <Link key={category.slug} href={`/category/$[category.slug]`}>
                <span className='md:float-right mt-2 align-middle ml-4 font-semibold cursor-pointer'>
                  {category.name}
                </span>
              </Link>
            })} */}
            {/* <span className='md:float-left mt-2 align-middle ml-4 font-semibold cursor-pointer lg:float-right'>
              hi
            </span> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header