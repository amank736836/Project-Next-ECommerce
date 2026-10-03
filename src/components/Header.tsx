"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import {
  FaBars,
  FaBoxOpen,
  FaFileAlt,
  FaHome,
  FaInfoCircle,
  FaSearch,
  FaSignInAlt,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { RiDatabaseFill, RiShoppingCart2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { auth } from "../firebase";
import { RootState } from "../redux/store";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { cartItems } = useSelector((state: RootState) => state.cartReducer);
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const logoutHandler = async () => {
    if (!auth) {
      toast.error("Sign-in is not configured in this environment");
      return;
    }

    try {
      await signOut(auth);
      toast.success("Signed out successfully");
      setIsOpen(false);
      router.push("/login");
    } catch {
      toast.error("Sign out failed");
    }
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header">
      <Link href="/" className="logo" onClick={closeMenu} aria-label="VirtuoStore home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon.svg" alt="" />
        <span className="logo-wordmark">Virtuo<span>Store</span></span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link href="/" title="Home" aria-current={pathname === "/" ? "page" : undefined}>
          <FaHome aria-hidden="true" /><span className="nav-label">Home</span>
        </Link>
        <Link href="/search" title="Search" aria-current={pathname === "/search" ? "page" : undefined}>
          <FaSearch aria-hidden="true" /><span className="nav-label">Search</span>
        </Link>
        <Link href="/about" title="About" aria-current={pathname === "/about" ? "page" : undefined}>
          <FaInfoCircle aria-hidden="true" /><span className="nav-label">About</span>
        </Link>
        <Link href="/cart" title="Cart" className="nav-cart" aria-current={pathname === "/cart" ? "page" : undefined}>
          <RiShoppingCart2Fill aria-hidden="true" />
          <span className="nav-label">Cart</span>
          {cartCount > 0 && <b className="cart-count">{cartCount}</b>}
        </Link>
        <Link href="/orders" title="Orders" aria-current={pathname === "/orders" ? "page" : undefined}>
          <FaBoxOpen aria-hidden="true" /><span className="nav-label">Orders</span>
        </Link>
        <Link href="/policies" title="Policies" aria-current={pathname === "/policies" ? "page" : undefined}>
          <FaFileAlt aria-hidden="true" /><span className="nav-label">Policies</span>
        </Link>
        {user?.role === "admin" && (
          <Link href="/admin/dashboard" title="Admin" className="admin-link" aria-current={pathname.startsWith("/admin") ? "page" : undefined}>
            <RiDatabaseFill aria-hidden="true" /><span className="nav-label">Admin</span>
          </Link>
        )}
        {user ? (
          <button className="nav-auth" type="button" onClick={logoutHandler} title="Sign out">
            <FaSignOutAlt aria-hidden="true" /><span className="nav-label">Sign out</span>
          </button>
        ) : (
          <Link className="nav-auth" href="/login" title="Login" aria-current={pathname === "/login" ? "page" : undefined}>
            <FaSignInAlt aria-hidden="true" /><span className="nav-label">Login</span>
          </Link>
        )}
      </nav>

      <button
        className="mobile-toggle"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
      </button>

      <nav
        className={`mobile-nav${isOpen ? " open" : ""}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        <Link href="/" onClick={closeMenu} aria-current={pathname === "/" ? "page" : undefined}><FaHome aria-hidden="true" />Home</Link>
        <Link href="/search" onClick={closeMenu} aria-current={pathname === "/search" ? "page" : undefined}><FaSearch aria-hidden="true" />Search</Link>
        <Link href="/about" onClick={closeMenu} aria-current={pathname === "/about" ? "page" : undefined}><FaInfoCircle aria-hidden="true" />About</Link>
        <Link href="/cart" onClick={closeMenu} aria-current={pathname === "/cart" ? "page" : undefined}>
          <RiShoppingCart2Fill aria-hidden="true" />Cart {cartCount > 0 && <b className="mobile-cart-count">{cartCount}</b>}
        </Link>
        <Link href="/orders" onClick={closeMenu} aria-current={pathname === "/orders" ? "page" : undefined}><FaBoxOpen aria-hidden="true" />Orders</Link>
        <Link href="/policies" onClick={closeMenu} aria-current={pathname === "/policies" ? "page" : undefined}><FaFileAlt aria-hidden="true" />Policies</Link>
        {user?.role === "admin" && (
          <Link href="/admin/dashboard" onClick={closeMenu} aria-current={pathname.startsWith("/admin") ? "page" : undefined}><RiDatabaseFill aria-hidden="true" />Admin dashboard</Link>
        )}
        {user ? (
          <button type="button" onClick={logoutHandler}><FaSignOutAlt aria-hidden="true" />Sign out</button>
        ) : (
          <Link href="/login" onClick={closeMenu} aria-current={pathname === "/login" ? "page" : undefined}><FaSignInAlt aria-hidden="true" />Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
