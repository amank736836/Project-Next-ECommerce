"use client";

import { CarouselButtonType, MyntraCarousel, Slider } from "6pp";
import { useEffect, useRef, useState, use } from "react";
import toast from "react-hot-toast";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ProductLoader from "@/components/Loaders/ProductLoader";
import Ratings from "@/components/Review/Ratings";
import ReviewCard from "@/components/Review/ReviewCard";
import { ReviewCustomizedButtons } from "@/components/Review/ReviewCustomizedButtons";
import { useProductDetailsQuery } from "@/redux/api/productAPI";
import { RootState } from "@/redux/store";
import { CustomError } from "@/types/api-types";
import { CartItem } from "@/types/types";

// Helper components for Carousel
const NextButton: CarouselButtonType = ({ onClick }) => (
    <button onClick={onClick} className="carouselBtn">
        <FaArrowRightLong />
    </button>
);
const PrevButton: CarouselButtonType = ({ onClick }) => (
    <button onClick={onClick} className="carouselBtn">
        <FaArrowLeftLong />
    </button>
);

const ProductDetails = ({ params }: { params: Promise<{ id: string }> }) => {
    // Unwrap params using React.use()
    const { id } = use(params);
    const router = useRouter();

    const {
        data: productData,
        isLoading: isProductLoading,
        isError: isProductError,
        error: productError,
    } = useProductDetailsQuery(id);

    useEffect(() => {
        if (isProductError || productError) {
            const err = productError as CustomError;
            err.data?.message
                ? toast.error(err.data.message)
                : toast.error("Failed to fetch product details");
        }
    }, [isProductError, productError]);

    if (isProductError || productError) {
        // router.push("/"); // Handling redirect in effect is usually safer to avoid clashes
        // return null; 
    }

    const [carouselOpen, setCarouselOpen] = useState<boolean>(false);

    // The 6pp Slider renders images without alt text and unlabeled arrow/dot
    // buttons, and exposes no props for either. Label them once the product loads.
    const galleryRef = useRef<HTMLElement>(null);
    useEffect(() => {
        const gallery = galleryRef.current;
        if (!gallery || !productData) return;
        const productName = productData.product.name;
        gallery.querySelectorAll<HTMLImageElement>("img:not([alt])").forEach((img) => {
            img.alt = productName;
        });
        const unlabeled = Array.from(
            gallery.querySelectorAll<HTMLButtonElement>("button:not([aria-label])"),
        ).filter((button) => !button.textContent?.trim());
        const navigation = unlabeled.filter((button) => button.getBoundingClientRect().width >= 20);
        const dots = unlabeled.filter((button) => button.getBoundingClientRect().width < 20);
        navigation.forEach((button, index) => {
            button.setAttribute("aria-label", index === 0 ? "Previous image" : "Next image");
        });
        dots.forEach((button, index) => {
            button.setAttribute("aria-label", `Show image ${index + 1}`);
        });
    }, [productData]);

    return (
        <div className="productDetails">
            {isProductLoading ? (
                <ProductLoader />
            ) : (
                <>
                    <main>
                        <section ref={galleryRef}>
                            <Slider
                                objectFit="scale-down"
                                onClick={() => setCarouselOpen(true)}
                                images={
                                    productData?.product.photos.map((photo) => photo.url) || []
                                }
                                showThumbnails
                                showDots
                                PrevIcon={
                                    <span className="carouselBtn">
                                        <FaArrowLeftLong />
                                    </span>
                                }
                                NextIcon={
                                    <span className="carouselBtn">
                                        <FaArrowRightLong />
                                    </span>
                                }
                            />
                            {carouselOpen && (
                                <MyntraCarousel
                                    darkMode={true}
                                    objectFit="scale-down"
                                    NextButton={NextButton}
                                    PrevButton={PrevButton}
                                    setIsOpen={setCarouselOpen}
                                    images={
                                        productData?.product.photos.map((photo) => photo.url) || []
                                    }
                                />
                            )}
                        </section>
                        {productData ? (
                            <section>
                                <div>
                                    <code>{productData.product.category}</code>
                                    <em
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "1rem",
                                        }}
                                    >
                                        <Ratings value={productData.product.averageRating} />
                                        {productData.product.numOfReviews} Reviews
                                    </em>
                                    <h3>₹{productData.product.price}</h3>
                                </div>
                                <h1>{productData.product.name}</h1>

                                <ReviewCustomizedButtons product={productData.product} />
                                <p>{productData.product.description}</p>
                            </section>
                        ) : null}
                    </main>
                </>
            )}
            <ReviewCard productId={id} />
        </div>
    );
};

export default ProductDetails;
