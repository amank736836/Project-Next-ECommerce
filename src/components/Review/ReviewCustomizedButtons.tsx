"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addToCart } from "@/redux/reducer/cartReducer";
import { RootState } from "@/redux/store";
import { Product } from "@/types/types";

export const ReviewCustomizedButtons = ({ product }: { product: Product }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [productQuantity, setProductQuantity] = useState<number>(1);

    const [incrementDisabled, setIncrementDisabled] = useState<boolean>(false);
    const [decrementDisabled, setDecrementDisabled] = useState<boolean>(false);

    const incrementHandler = () => {
        setDecrementDisabled(false);
        if (product.stock < 1) {
            setIncrementDisabled(true);
            setDecrementDisabled(true);
            toast.error("Out of Stock");
        } else if (productQuantity === product.stock) {
            setIncrementDisabled(true);
            toast.error("Maximum quantity reached");
        } else {
            setProductQuantity((prev) => prev + 1);
        }
    };

    const decrementHandler = () => {
        setIncrementDisabled(false);
        if (productQuantity === 1) {
            setDecrementDisabled(true);
            toast.error("Minimum quantity reached");
        } else {
            setProductQuantity((prev) => prev - 1);
        }
    };

    // addToCart replaces the stored quantity, so merge with what is already in
    // the cart and never exceed the available stock.
    const existingQuantity = useSelector(
        (state: RootState) =>
            state.cartReducer.cartItems.find((item) => item.productId === product._id)?.quantity ?? 0
    );

    const AddToCart = () => {
        if (product.stock < 1) {
            toast.error("Out of Stock");
            return;
        }
        const quantity = Math.min(existingQuantity + productQuantity, product.stock);
        if (quantity === existingQuantity) {
            toast.error("Maximum quantity reached");
            return;
        }
        toast.success("Added to Cart");
        dispatch(
            addToCart({
                productId: product._id,
                name: product.name,
                photos: product.photos,
                price: product.price,
                quantity,
                stock: product.stock,
            })
        );
    };

    return (
        <article>
            <div>
                <button type="button" aria-label="Decrease quantity" onClick={decrementHandler} disabled={decrementDisabled}>
                    -
                </button>
                <span>{productQuantity}</span>
                <button type="button" aria-label="Increase quantity" disabled={incrementDisabled} onClick={incrementHandler}>
                    +
                </button>
            </div>
            <div>
                <button onClick={AddToCart}>Add to Cart</button>
                <button
                    onClick={() => {
                        AddToCart();
                        router.push("/cart");
                    }}
                >
                    Buy Now
                </button>
            </div>
        </article>
    );
};
