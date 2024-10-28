import React, { useEffect, useState } from "react"
import ProductCardData from "../Components/ProductCardData"
import axios from "axios"
import { useQuery } from '@tanstack/react-query';
import Footer from "../Components/Footer.tsx";
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
const Product = () => {

    const [productData, setProductData] = useState<productData[]>([]) // get product data from api
    const [search, setSearch] = useState<String>(''); // search for products


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


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const productFilterData = productData.filter(product => product.title.toLowerCase().includes(search.toLowerCase())); // search functionality logic here

    // handle loading and error states with Tanstack query 
    const { isError, isLoading, error } = useQuery({
        queryKey: ['productData'],
        queryFn: getData
    })
    if (isLoading) return <div className="text-4xl flex justify-center items-center h-[84vh] font-bold">Loading ...</div>
    if (isError) return <div>Error:{error.message} fetching data</div>  // Handle error scenario if any.

    return (
        <>

            <div className="navbar-light bg-light pt-8">
                <div className="text-4xl font-bold text-center mb-4 ">Products</div>
                <div>
                    <form className="d-flex flex justify-center " role="search">
                        <input className="form-control me-2 max-w-[40%] mb-4 " type="search" placeholder="Search Products" aria-label="Search" onChange={handleSearch} />
                    </form>
                </div>
                <div className="p-2 grid grid-cols-4 ">
                    {
                        productFilterData.map((product, index) => (
                         <Link to={`/product/${product.id}`} key={index}>  <ProductCardData  productMap={product} /> </Link>
                        ))
                    }
                </div>
            </div>



            <Footer/>
        </>
      
    )
}

export default Product
