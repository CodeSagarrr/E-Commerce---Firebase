
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../Context/Context"
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "../Firebase/Firebase";
import { toast } from "react-toastify";


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

const SingalProduct = () => {
    const auth = getAuth(app)
    const { addToCart } = useAuth() // Get user info from Context
    const [getOneProduct, setGetOneProduct] = useState<productData[]>([])
    const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false)
    const { id } = useParams<{ id: string }>();

    const getData = async () => {
        try {
            const { data } = await axios.get("https://fakestoreapi.com/products")
            setGetOneProduct(data)
            return data // Set fetched data to state

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }
        })
    }, [getOneProduct])

    useEffect(() => {
        getData()  // Fetch data on component mount
    }, [getOneProduct])

    const oneProduct = id ? getOneProduct.find(product => product.id === parseInt(id)) : undefined

    if (!oneProduct) return;



    return (
        <>
            <div className="flex justify-center navbar-light bg-light pt-8 h-[100vh] ">
                <div className="px-2 py-2 w-[40vw] mt-10">
                    <div className="card cursor-pointer">
                        <img src={oneProduct.image} className="card-img-top w-[200px] h-[200px] mx-auto mt-4" />
                        <div className="card-body mx-2">
                            <h2 className="card-title font-bold ">{oneProduct.title}</h2>
                            <p className="card-text font-semibold">$: {oneProduct.price}</p>
                            <p className="card-text font-semibold"> Rating : {oneProduct.rating.rate}</p>

                            {isAuthenticated ? <button className="btn btn-primary mt-3 font-semibold"
                                onClick={() => addToCart(oneProduct)}
                            >Add To Cart</button> : <button className="btn btn-primary mt-3 font-semibold"
                                onClick={() => toast.warning('you are not login')}
                            >Add To Cart</button>}
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default SingalProduct
