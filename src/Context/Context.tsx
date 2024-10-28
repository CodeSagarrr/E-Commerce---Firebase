// AuthContext.tsx
import React, { createContext, useContext, ReactNode, useState } from "react";
import { toast } from "react-toastify";

// Define the shape of your context data
interface AuthContextType {
    cartProduct: productData[],
    setCartProduct: (cartItems: productData[]) => void, // Set the cart items to local storage
    addToCart: (productItem: productData) => void;

}

interface AuthProviderProps {
    children: ReactNode; // children can be any JSX element(s)
}

// Define default values for the context
const defaultAuthContext: AuthContextType = {
    cartProduct: [],
    setCartProduct: () => {},  // Set the cart items to local storage
    addToCart: () => {},

};

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

// Create the context
const AuthContext = createContext<AuthContextType>(defaultAuthContext);
  
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // const [ProductQuantity , setProductQuantity] = useState<productData[]>([]);
    const [cartProduct, setCartProduct] = useState<productData[]>(()=>{
        const cartItem = JSON.parse(localStorage.getItem('cartItem') || '[]');
        return cartItem;  // Return the cart items from local storage if exists else initialize an empty array
    });

    // for gettin one add item

    const addToCart = (productItem: productData) => {
        const updatedCart = [...cartProduct, {...productItem , quantity:1}];
        setCartProduct(updatedCart);
        localStorage.setItem('cartItem', JSON.stringify(updatedCart));
        toast.success("Product added successfully")
       
    }

  
    // Simulate a toggle function (if needed)




    return (
        <AuthContext.Provider value={{ cartProduct ,setCartProduct,addToCart }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using the context
export const useAuth = () => useContext(AuthContext);
