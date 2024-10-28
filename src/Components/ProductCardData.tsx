
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

const ProductCardData = ({productMap}:{productMap:productData}) => {
   
    return (
        <div className="px-2 py-2 ">
                <div className="card cursor-pointer">
                    <img src={productMap.image} className="card-img-top w-[200px] h-[200px] mx-auto mt-4"  />
                    <div className="card-body mx-2">
                        <h2 className="card-title font-bold ">{productMap.title}</h2>
                        <p className="card-text font-semibold">$: {productMap.price}</p>
                        <p className="card-text font-semibold"> Rating : {productMap.rating.rate}</p>
                        <button className="btn btn-primary mt-3 font-semibold">Add To Cart</button>
                    </div>      
            </div>
        </div>
    )
}

export default ProductCardData

