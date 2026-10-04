"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowRight,
  FaBoxOpen,
  FaHeart,
  FaLeaf,
  FaShippingFast,
} from "react-icons/fa";
import ProductCard from "@/components/ProductCard";
import { useLatestProductsQuery } from "@/redux/api/productAPI";
import type { Product } from "@/types/types";

const emptyProducts: Product[] = [];

const promises = [
  {
    icon: <FaHeart aria-hidden="true" />,
    title: "Comfort comes first",
    description: "Easy-to-wear pieces for all the in-between moments.",
  },
  {
    icon: <FaLeaf aria-hidden="true" />,
    title: "Thoughtfully picked",
    description: "A considered edit, with the little details in mind.",
  },
  {
    icon: <FaShippingFast aria-hidden="true" />,
    title: "Made for your everyday",
    description: "Find the pieces you’ll reach for on repeat.",
  },
];

const Home = () => {
  const { data, isLoading, isError, error } = useLatestProductsQuery("");
  const [activeCategory, setActiveCategory] = useState("All");
  const products = data?.products ?? emptyProducts;
  const categories = Array.from(
    new Set(products.map((product) => product.category?.trim()).filter(Boolean)),
  ) as string[];
  const visibleProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  useEffect(() => {
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (revealItems.length === 0) return;

    revealItems.forEach((item) => item.classList.add("reveal-ready"));

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [products, activeCategory]);

  return (
    <main className="home">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="eyebrow-spark" aria-hidden="true">✳</span>
            The everyday edit
          </p>
          <h1 id="home-title">
            <span>Make room</span>
            <span>
              for <em>good</em>
            </span>
            <span>
              things<i>.</i>
            </span>
          </h1>
          <p className="hero-description">
            Thoughtful clothing, shoes, and everyday essentials — picked to
            feel right and made to fit your life.
          </p>
          <div className="hero-actions">
            <Link className="home-button home-button--dark" href="/search">
              Explore the collection <FaArrowRight aria-hidden="true" />
            </Link>
            <Link className="hero-discover" href="#latest">
              <span className="discover-icon">
                <FaArrowDown aria-hidden="true" />
              </span>
              See what’s new
            </Link>
          </div>
          <div className="hero-signoff" aria-hidden="true">
            <span />
            Style that feels like you
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-visual-aura" aria-hidden="true" />
          <div className="hero-art-frame">
            <Image
              src="/images/virtuo-editorial.jpg"
              alt="An oatmeal sweatshirt, burnt-orange bag, and ivory sneakers styled on warm sculptural plinths"
              fill
              priority
              sizes="(max-width: 860px) 100vw, 52vw"
              className="hero-art-image"
            />
            <div className="hero-art-caption">
              <span>THE VIRTUO EDIT</span>
              <strong>Pieces to come<br />back to.</strong>
            </div>
            <span className="hero-art-index" aria-hidden="true">01 <i /> 03</span>
          </div>
          <div className="hero-seal" aria-hidden="true">
            <span className="hero-seal-star">✳</span>
            <span>picked with<br />a little care</span>
          </div>
          <svg className="hero-doodle" viewBox="0 0 126 68" fill="none" aria-hidden="true">
            <path d="M4 58C28 18 51 15 60 37C69 59 45 65 42 46C39 25 77 7 122 11" />
            <path d="M109 3L123 11L113 23" />
          </svg>
        </div>
      </section>

      <div className="home-marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div className="marquee-group" key={copy}>
              <span>Wear what feels like you</span><i>✳</i>
              <span>Everyday, a little better</span><i>✳</i>
              <span>Find your good things</span><i>✳</i>
              <span>Wear what feels like you</span><i>✳</i>
            </div>
          ))}
        </div>
      </div>

      <section className="promise-strip" aria-label="The VirtuoStore approach" data-reveal>
        {promises.map((promise, index) => (
          <article className="promise-item" key={promise.title}>
            <span className="promise-icon">{promise.icon}</span>
            <div>
              <span className="promise-index">0{index + 1} / 03</span>
              <h2>{promise.title}</h2>
              <p>{promise.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="latest-section" id="latest" aria-labelledby="latest-title">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Freshly picked</p>
            <h2 id="latest-title">Latest <em>products</em><i>.</i></h2>
            <p className="section-description">
              New-season favorites and easy staples worth making room for.
            </p>
          </div>
          <Link className="section-link" href="/search">
            View all styles <span><FaArrowRight aria-hidden="true" /></span>
          </Link>
        </div>

        {categories.length > 1 && !isLoading && (
          <div className="collection-filters" role="group" aria-label="Filter latest products by category">
            <button
              className={activeCategory === "All" ? "active" : ""}
              type="button"
              aria-pressed={activeCategory === "All"}
              onClick={() => setActiveCategory("All")}
            >
              All pieces
            </button>
            {categories.map((category) => (
              <button
                className={activeCategory === category ? "active" : ""}
                type="button"
                aria-pressed={activeCategory === category}
                key={category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="latest-grid" aria-label="Loading latest products">
            {Array.from({ length: 4 }, (_, index) => (
              <div className="product-skeleton" key={index} aria-hidden="true">
                <span />
                <i />
                <i />
              </div>
            ))}
            <span className="visually-hidden">Loading latest products…</span>
          </div>
        ) : isError || error ? (
          <div className="picks-empty" role="status">
            <span className="empty-icon"><FaBoxOpen aria-hidden="true" /></span>
            <h3>Our edit is taking a little breather.</h3>
            <p>Explore the full collection while we get things back in place.</p>
            <Link className="home-button home-button--dark" href="/search">
              Browse the collection <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        ) : visibleProducts.length > 0 ? (
          <div className="latest-grid">
            {visibleProducts.map((product, index) => (
              <div className="product-reveal" data-reveal key={product._id} style={{ "--card-index": index } as CSSProperties}>
                <ProductCard
                  productId={product._id}
                  name={product.name}
                  price={product.price}
                  stock={product.stock}
                  photos={product.photos}
                  category={product.category}
                />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="picks-empty picks-empty--small" role="status">
            <h3>No pieces in this edit just yet.</h3>
            <button className="text-button" type="button" onClick={() => setActiveCategory("All")}>
              Show all products <FaArrowRight aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="picks-empty" role="status">
            <span className="empty-icon"><FaBoxOpen aria-hidden="true" /></span>
            <h3>A few good things are on their way.</h3>
            <p>There aren’t any new arrivals to show just yet. Check back soon.</p>
            <Link className="home-button home-button--light" href="/search">
              Browse the collection <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        )}
      </section>

      <section className="brand-note" data-reveal aria-labelledby="brand-note-title">
        <div className="brand-note-copy">
          <p className="eyebrow">A little more Virtuo</p>
          <h2 id="brand-note-title">
            Good style.<br /><em>Good feeling.</em>
          </h2>
          <p>
            From everyday essentials to the finishing touch, find pieces that
            let your own style do the talking.
          </p>
          <Link href="/about" className="brand-note-link">
            Get to know us <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="brand-note-art" aria-hidden="true">
          <div className="brand-note-orbit brand-note-orbit--outer" />
          <div className="brand-note-orbit brand-note-orbit--inner" />
          <span className="brand-note-spark brand-note-spark--one">✳</span>
          <span className="brand-note-spark brand-note-spark--two">✳</span>
          <span className="brand-note-letter">V</span>
          <span className="brand-note-stamp">VIRTUO<br />STORE</span>
        </div>
      </section>

      <footer className="home-footer">
        <Link href="/" className="footer-brand">
          <Image src="/icon.svg" alt="" width={28} height={28} />
          <span>Virtuo<span>Store</span></span>
        </Link>
        <p>Good pieces. Good days.</p>
        <nav aria-label="Footer navigation">
          <Link href="/search">Shop</Link>
          <Link href="/about">Our story</Link>
          <Link href="/policies">Policies</Link>
        </nav>
      </footer>
    </main>
  );
};

export default Home;
