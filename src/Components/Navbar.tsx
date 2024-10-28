import { Link, useNavigate } from "react-router-dom"
import { FaShoppingCart, FaUserCheck } from "react-icons/fa";
import { onAuthStateChanged , getAuth, signOut } from "firebase/auth";
import { app  } from "../Firebase/Firebase";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../Context/Context";



const auth = getAuth(app)
const Navbar = () => {
    const { cartProduct} = useAuth();
    const [isAuthenticated , setIsAuthenticated] = useState<Boolean>(false)
    const [userProfile , setUserProfile] = useState<string>("")

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if(user){
                setIsAuthenticated(true)
                setUserProfile(user.displayName || "")
            }else{
                setIsAuthenticated(false)
                setUserProfile("")
            }
        })
    },[])

    const signout = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.warn("Logout Sucesssfully");
        signout("/signup");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
    
        <nav className="navbar navbar-expand-lg navbar-light bg-light border">
                <div className="container-fluid">
                    <div className="ml-2">
                        <h1 className="text-2xl font-bold ">E-Commerce</h1>
                    </div>
                    <div>
                        <ul className="flex font-semibold">
                            <li className="px-2"><Link to="/">Home</Link></li>
                            <li className="px-2"><Link to="/about">About</Link></li>
                            <li className="px-2"><Link to="/product">Product</Link></li>
                            <li className="px-2"><Link to="/mencloths">Mens</Link></li>
                            <li className="px-2"><Link to="/womencloths">Womens</Link></li>
                            <li className="px-2"><Link to="/signup">Sign up</Link></li>
                            {isAuthenticated ? <li className="px-2 cursor-pointer" onClick={logout}>Logout</li> : 
                           <Link to="/login"> <li className="px-2 cursor-pointer">Login</li></Link> }
                            
                        </ul>
                    </div>
                    <div>
                        <form className="d-flex" role="search">
                        {isAuthenticated? <FaUserCheck className="text-3xl" /> : null}
                        <span className="text-xl font-semibold ml-2 mr-4">{userProfile}</span>
                         <Link to="/cart"><FaShoppingCart className="text-2xl me-2 cursor-pointer mx-2"/></Link>
                            <span className="text-xl font-semibold ">{cartProduct.length}</span>
                        </form>
                    </div>
                </div>
            </nav>
    </>
  )
}

export default Navbar
