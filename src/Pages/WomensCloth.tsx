import axios from "axios"
import { useEffect, useState } from "react"
import { useQuery } from '@tanstack/react-query';
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

interface productData {
    id: number,
    title: string,
    price: string,
    image: string,
    category: string,
    description: string,
    quantity: number,
    rating: {
        rate: number,
        count: number,
    },

}

const WomensCloth = () => {
    const [productData, setProductData] = useState<productData[]>([])
    const getData = async () => {
        try {
            const { data } = await axios.get("https://fakestoreapi.com/products")
            setProductData(data)
            return data // Set fetched data to state

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getData()  // Fetch data on component mount
    }, [])

    const woMensData = productData.filter(data => data.category.startsWith('w'))

    const { isError, isLoading, error } = useQuery({
        queryKey: ['productData'],
        queryFn: getData
    })
    if (isLoading) return <div className="text-4xl flex justify-center items-center h-[84vh] font-bold">Loading ...</div>
    if (isError) return <div>Error:{error.message} fetching data</div>


  return (
    <>
    <div>
      <div className="navbar-light bg-light pt-8">
            <div className="w-full flex justify-center">
                <h1 className="text-3xl font-bold my-10"> Womens Available Products : {woMensData.length}</h1>
            </div>
            <div className="p-2 grid grid-cols-4">
                {
                    woMensData.map((currData, index) => (
                        <Link to={`/product/${currData.id}`}  key={index}>  <div className="px-2 py-2 ">
                            <div className="card cursor-pointer">
                                <img src={currData.image} className="card-img-top w-[200px] h-[200px] mx-auto mt-4" />
                                <div className="card-body mx-2">
                                    <h2 className="card-title font-bold ">{currData.title}</h2>
                                    <p className="card-text font-semibold">$: {currData.price}</p>
                                    <p className="card-text font-semibold"> Rating : {currData.rating.rate}</p>
                                    <button className="btn btn-primary mt-3 font-semibold">Add To Cart</button>
                                </div>
                            </div>
                        </div></Link>
                    ))
                }
            </div>
        </div>
    </div>
    <Footer/>
   </>
  )
}

export default WomensCloth
