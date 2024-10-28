
import { useEffect, useState } from 'react'
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { ImagesData } from '../Images/Images.tsx'
function Banner() {
    const [banner, setBanner] = useState(0);

    const handleNext = () => {
        setBanner(banner === ImagesData.length - 1 ? 0 : banner + 1)
    }
    const handleBack = () => {
        setBanner(banner === 0 ? ImagesData.length - 1 : banner - 1)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 2000)
        return () => clearInterval(interval)
    }, [banner])
    return (
        <>
            <div className='w-[99vw] h-[93vh] bg-cover'>
                {
                    ImagesData.map((image, index) => (
                        <div key={index} className={`${banner === index ? 'block' : 'hidden'}`} >
                            <div className='w-[100%]  h-[94vh] bg-cover bg-center ' style={{ backgroundImage: `url(${image.url})` }} ></div>
                        </div>
                    ))
                }

            </div>
           
            <div className='w-[99vw] h-[94vh] absolute top-12 bg-[#1717179e]'>
                <div className='flex h-full flex-col justify-center items-center flex-wrap'>
                    <h1 className='text-6xl font-bold text-white'>Perfect For Summer Naps</h1>
                    <p className='text-xl text-white mt-6 font-semibold'>Get Your Favorite Brand With <span className='text-yellow-500 text-2xl'> 30% Discount</span></p>

                </div>
                <div className='flex justify-between w-[90%] absolute top-[50%] left-[4%] flex-wrap'>
                <FaChevronCircleLeft onClick={handleBack} className='text-white text-5xl cursor-pointer' />
                <FaChevronCircleRight onClick={handleNext} className=' text-white text-5xl cursor-pointer' />
            </div>
            </div>
        </>
    )
}

export default Banner

