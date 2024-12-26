import { fetchProducts } from "../../api/productApi";
import { useEffect, useState } from "react";
import { IProduct } from "../../models/index";
import css from "./Products.module.css" 

export function Products(){

    const [products, setProducts] = useState<IProduct[]>([]); 

    useEffect(()=>{
            async function getAllProdducts(){
                let data = await fetchProducts() 
                console.log(data)
                setProducts(data)
            }
            getAllProdducts()

    }, [])

    return(
        <div className={css.products}>
            {
                products.map((product)=>{
                    return(
                        <div className={css.product} key={product.id}>
                            <p>{product?.id} </p>
                            <p>{product?.name} </p>
                            <p>{product?.price} </p>
                            <p>{product?.image_url} </p>
                            <button>edit</button>
                            <button>delete</button>

                        </div>
                    )

                })
            }


        </div>
    )
}