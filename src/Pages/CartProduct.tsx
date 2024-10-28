import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { useAuth } from "../Context/Context"
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";



const CartProduct = () => {
  
    const { cartProduct, setCartProduct } = useAuth()
   

    //  increase quantity
    const increaseQuantity = (index: Number) => {
        const newCart = cartProduct.map((curr, i) => {
            return index === i ? { ...curr, quantity: curr.quantity + 1 } : curr
        });
        setCartProduct(newCart);
    }

    // decrement quantity
    const decreaseQuantity = (index: Number) => {
        const newCart = cartProduct.map((curr, i) => {
            return index === i && curr.quantity > 1 ? { ...curr, quantity: curr.quantity - 1 } : curr
        });
        setCartProduct(newCart);
       
    }

    const deleteCart = (index: Number) => {
        const newCart = cartProduct.filter((item , i ) => index !== i)
        setCartProduct(newCart)
        toast.success('product is deleted successfully')
        localStorage.removeItem('cartItem')
       
    }
    return (
        <>
         
            <div className="grid grid-cols-2 h-[90vh]">
            
                {cartProduct.length > 0 ? (
                    cartProduct.map((item, index) => (
                        <div className="navbar-light bg-light pt-8 w-screen " key={index}>
                            <div className="px-2 py-2 w-[40vw] ml-10 mt-6">
                                <div className="card">
                                    <img src={item.image} className="card-img-top w-[200px] h-[200px] mx-auto mt-4" />
                                    <div className="card-body mx-2">
                                        <h2 className="card-title font-bold ">{item.title}</h2>
                                        <p className="card-text font-semibold">$: {Number(item.price) * item.quantity}</p>
                                        <div className="flex justify-between w-full ">
                                            <div className="flex gap-x-2 my-2 ">
                                                <p className="mt-1 cursor-pointer"><FaCircleMinus onClick={() => decreaseQuantity(index)} /></p>
                                                <p className="font-semibold text-[16px]">{item.quantity}</p>
                                                <p className="mt-1 cursor-pointer"><FaCirclePlus onClick={() => increaseQuantity(index)} /></p>


                                            </div>
                                           
                                            <div>
                                              <button className='text-3xl  text-[#c93030]' ><MdDelete onClick={()=> deleteCart(index)}/></button> 
                                                
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    ))
                ) : (
                    <p className="w-screen h-[90vh] text-4xl font-semibold flex justify-center items-center">No items in the cart ...</p>
                )}
            </div>
            
        </>
    )
}

export default CartProduct
