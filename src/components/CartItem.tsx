import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { addToCart, removeCartItem } from "../redux/reducer/cartReducer";
import { CartItem as CartItemProps } from "../types/types";
import { useState } from "react";
import { transformImage } from "../utils/features";

const CartItem = ({ cartItem }: { cartItem: CartItemProps }) => {
    const { productId, photos, name, price, quantity, stock } = cartItem;

    const [incrementDisabled, setIncrementDisabled] = useState(false);
    const [decrementDisabled, setDecrementDisabled] = useState(false);

    const dispatch = useDispatch();

    const incrementHandler = () => {
        setDecrementDisabled(false);
        if (stock < 1) {
            setIncrementDisabled(true);
            setDecrementDisabled(true);
            toast.error("Out of Stock");
        } else if (quantity === stock) {
            setIncrementDisabled(true);
            toast.error("Maximum quantity reached");
        } else {
            toast.success("Added to Cart");
            dispatch(
                addToCart({
                    ...cartItem,
                    quantity: quantity + 1,
                })
            );
        }
    };

    const decrementHandler = () => {
        setIncrementDisabled(false);
        if (quantity === 1) {
            setDecrementDisabled(true);
            toast.error("Minimum quantity reached");
        } else {
            dispatch(addToCart({ ...cartItem, quantity: quantity - 1 }));
        }
    };

    const removeHandler = () => {
        dispatch(removeCartItem(productId));
        toast.success("Item Removed");
    };

    return (
        <div className="cartItem">
            <Link href={`/product/${productId}`}>
                <img
                    src={transformImage(photos[0].url, 160)}
                    alt={name}
                />
            </Link>
            <article>
                <Link href={`/product/${productId}`}>{name}</Link>
                <span>₹{price}</span>
            </article>
            <div>
                <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={decrementDisabled}
                    onClick={() => decrementHandler()}
                >
                    -
                </button>
                <p>{quantity}</p>
                <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={incrementDisabled}
                    onClick={() => incrementHandler()}
                >
                    +
                </button>
            </div>
            <button
                type="button"
                aria-label={`Remove ${name} from cart`}
                title="Remove from cart"
                onClick={() => removeHandler()}
            >
                <FaTrash aria-hidden="true" />
            </button>
        </div>
    );
};

export default CartItem;
