import Link from "next/link";
import toast from "react-hot-toast";
import { FaArrowUpRightFromSquare, FaBoxOpen, FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import { RootState } from "../redux/store";
import { CartItem } from "../types/types";
import { transformImage } from "../utils/features";

type ProductCardProps = {
  productId: string;
  photos: {
    url: string;
    public_id: string;
  }[];
  name: string;
  price: number;
  stock: number;
  category?: string;
};

const ProductCard = ({
  productId,
  photos,
  name,
  price,
  stock,
  category,
}: ProductCardProps) => {
  const dispatch = useDispatch();
  const existingItem = useSelector((state: RootState) =>
    state.cartReducer.cartItems.find((item) => item.productId === productId),
  );
  const imageUrl = photos?.[0]?.url;

  const addToCartHandler = () => {
    if (stock < 1) {
      toast.error("Out of stock");
      return;
    }

    if (existingItem && existingItem.quantity >= stock) {
      toast.error("You’ve reached the available stock");
      return;
    }

    const cartItem: CartItem = {
      productId,
      photos,
      name,
      price,
      quantity: (existingItem?.quantity ?? 0) + 1,
      stock,
    };

    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  return (
    <article className={`productCard${stock < 1 ? " is-sold-out" : ""}`}>
      <div className="productCard-media">
        <Link
          href={`/product/${productId}`}
          className="productCard-imageLink"
          aria-label={`View ${name} details`}
        >
          {imageUrl ? (
            // Product photos are hosted outside the app, so use a native image element.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={transformImage(imageUrl, 600)}
              alt={name}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="productCard-placeholder" aria-hidden="true">
              <FaBoxOpen />
              <span>Image coming soon</span>
            </span>
          )}
        </Link>

        {stock < 1 && <span className="productCard-badge">Sold out</span>}

        <div className="productCard-actions">
          <Link
            href={`/product/${productId}`}
            className="productCard-action"
            aria-label={`View ${name}`}
            title="View product"
          >
            <FaArrowUpRightFromSquare aria-hidden="true" />
          </Link>
          <button
            className="productCard-action productCard-add"
            type="button"
            onClick={addToCartHandler}
            disabled={stock < 1}
            aria-label={stock < 1 ? `${name} is sold out` : `Add ${name} to cart`}
            title={stock < 1 ? "Sold out" : "Add to cart"}
          >
            <FaPlus aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="productCard-body">
        <div className="productCard-meta">
          <span className="productCard-category">{category || "Virtuo edit"}</span>
          <span className={stock < 1 ? "productCard-stock is-empty" : "productCard-stock"}>
            <i aria-hidden="true" />
            {stock < 1 ? "Unavailable" : "In stock"}
          </span>
        </div>
        <div className="productCard-details">
          <Link href={`/product/${productId}`} className="productCard-name">
            {name}
          </Link>
          <span className="productCard-price">₹{price.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
