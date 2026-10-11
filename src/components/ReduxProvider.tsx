"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Toaster } from "react-hot-toast";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { getUser } from "../redux/api/userAPI";
import { hydrateCartItems } from "../redux/reducer/cartReducer";
import { userExist, userNotExist } from "../redux/reducer/userReducer";
import { CartItem } from "../types/types";
import Header from "./Header";

const CART_STORAGE_KEY = "virtuostore-cart-items";

export default function ReduxProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            <CartPersistence />
            <AuthWrapper>
                <Header />
                {children}
                <Toaster position="bottom-center" />
            </AuthWrapper>
        </Provider>
    );
}

// Cart lives in Redux only, so a reload or a typed URL emptied it. Mirror the
// line items into localStorage and restore them once on the client.
const CartPersistence = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        let restored = false;
        try {
            const raw = window.localStorage.getItem(CART_STORAGE_KEY);
            if (raw) {
                const parsed: unknown = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    const items = parsed.filter(
                        (item): item is CartItem =>
                            typeof item?.productId === "string" &&
                            typeof item?.name === "string" &&
                            typeof item?.price === "number" &&
                            typeof item?.quantity === "number" &&
                            item.quantity >= 1 &&
                            Array.isArray(item?.photos),
                    );
                    if (items.length > 0) dispatch(hydrateCartItems(items));
                }
            }
            restored = true;
        } catch {
            // Corrupt or unavailable storage: start with an empty cart.
        }

        let previous = "";
        const unsubscribe = store.subscribe(() => {
            if (!restored) return;
            const { cartItems } = store.getState().cartReducer;
            const serialized = JSON.stringify(cartItems);
            if (serialized === previous) return;
            previous = serialized;
            try {
                window.localStorage.setItem(CART_STORAGE_KEY, serialized);
            } catch {
                // Quota or privacy mode: keep the in-memory cart working.
            }
        });
        return unsubscribe;
    }, [dispatch]);

    return null;
};

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!auth) {
            dispatch(userNotExist());
            return;
        }

        return onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const data = await getUser(user.uid);
                    dispatch(userExist(data.user));
                } catch {
                    dispatch(userNotExist());
                }
            } else {
                dispatch(userNotExist());
            }
        });
    }, [dispatch]);

    return <>{children}</>;
};
