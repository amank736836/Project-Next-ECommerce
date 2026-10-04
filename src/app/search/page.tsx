"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaArrowRight, FaBoxOpen, FaFilter, FaSearch } from "react-icons/fa";
import ProductCard from "@/components/ProductCard";
import { useCategoriesQuery, useSearchProductsQuery } from "@/redux/api/productAPI";

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [currentPrice, setCurrentPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const {
    data: searchProductsResponse,
    isLoading: loadingSearchProducts,
    isError: isErrorSearchProducts,
    error: errorSearchProducts,
    refetch,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: currentPrice,
  });
  const { data: categoriesResponse } = useCategoriesQuery("");

  const products = searchProductsResponse?.products ?? [];
  const categories =
    searchProductsResponse?.categories ?? categoriesResponse?.categories ?? [];
  const minPrice = searchProductsResponse?.minAmount ?? 0;
  const maxPrice = searchProductsResponse?.maxAmount ?? 100000;
  const totalPage = searchProductsResponse?.totalPage ?? 1;
  const isPrevPage = page > 1;
  const isNextPage = page < totalPage;

  useEffect(() => {
    if (isErrorSearchProducts || errorSearchProducts) {
      toast.error("We couldn’t load the collection. Please try again.");
    }
  }, [isErrorSearchProducts, errorSearchProducts]);

  const clearHandler = () => {
    setSearch("");
    setSort("");
    setCurrentPrice(maxPrice);
    setCategory("");
    setPage(1);
  };

  return (
    <div className="productSearchPage">
      <button
        className="mobile-filter-btn"
        type="button"
        onClick={() => setShowFilters((open) => !open)}
        aria-expanded={showFilters}
        aria-controls="product-filters"
      >
        {showFilters ? "Hide filters" : "Filters"}
        <FaFilter aria-hidden="true" />
      </button>

      <aside className={showFilters ? "show" : ""} id="product-filters">
        <div className="filter-header">
          <div>
            <p className="filter-kicker">Refine the edit</p>
            <h2>Filters</h2>
          </div>
          <button
            className="close-filters"
            type="button"
            onClick={() => setShowFilters(false)}
            aria-label="Close filters"
          >
            ×
          </button>
        </div>

        <div className="filter-group">
          <label htmlFor="product-sort">Sort by</label>
          <select
            id="product-sort"
            value={sort}
            onChange={(event) => {
              setSort(event.target.value);
              setPage(1);
            }}
          >
            <option value="">Recommended</option>
            <option value="asc">Price: low to high</option>
            <option value="dsc">Price: high to low</option>
          </select>
        </div>

        <div className="filter-group price-filter">
          <div className="range-heading">
            <label htmlFor="max-price">Maximum price</label>
            <span>₹{currentPrice.toLocaleString("en-IN")}</span>
          </div>
          <input
            id="max-price"
            type="range"
            min={minPrice}
            max={maxPrice}
            value={Math.min(currentPrice, maxPrice)}
            onChange={(event) => {
              setCurrentPrice(Number(event.target.value));
              setPage(1);
            }}
          />
          <div className="range-limits" aria-hidden="true">
            <span>₹{minPrice.toLocaleString("en-IN")}</span>
            <span>₹{maxPrice.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="product-category">Category</label>
          <select
            id="product-category"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(1);
            }}
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <button className="clear-filters" type="button" onClick={clearHandler}>
          Clear all filters
        </button>
      </aside>

      <main>
        <div className="search-page-heading">
          <div>
            <p className="search-eyebrow">The Virtuo collection</p>
            <h1>Find your next <em>favorite</em><i>.</i></h1>
          </div>
          {!loadingSearchProducts && !isErrorSearchProducts && (
            <span className="search-result-count">
              {products.length} {products.length === 1 ? "piece" : "pieces"}
            </span>
          )}
        </div>

        <div className="search-toolbar">
          <label className="search-input-wrap" htmlFor="product-search">
            <FaSearch aria-hidden="true" />
            <input
              id="product-search"
              type="search"
              placeholder="Search by name..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
          </label>
          <span className="toolbar-note">Good things, thoughtfully found.</span>
        </div>

        {isErrorSearchProducts || errorSearchProducts ? (
          <div className="search-empty" role="status">
            <span className="search-empty-icon"><FaBoxOpen aria-hidden="true" /></span>
            <h2>We couldn’t load the collection.</h2>
            <p>Please try again in a moment.</p>
            <button type="button" onClick={() => refetch()}>
              Try again <FaArrowRight aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="searchProductList" aria-busy={loadingSearchProducts}>
            {loadingSearchProducts ? (
              Array.from({ length: 5 }, (_, index) => (
                <div className="product-skeleton" key={index} aria-hidden="true">
                  <span />
                  <i />
                  <i />
                </div>
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  productId={product._id}
                  photos={product.photos}
                  name={product.name}
                  price={product.price}
                  stock={product.stock}
                  category={product.category}
                />
              ))
            ) : (
              <div className="search-empty search-empty--inline" role="status">
                <span className="search-empty-icon"><FaBoxOpen aria-hidden="true" /></span>
                <h2>No pieces found just yet.</h2>
                <p>Try another search or clear a filter to see more of the edit.</p>
                <button type="button" onClick={clearHandler}>
                  Clear filters <FaArrowRight aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        )}

        {!isErrorSearchProducts && totalPage > 1 && (
          <nav className="search-pagination" aria-label="Product pages">
            <button
              type="button"
              disabled={!isPrevPage}
              onClick={() => setPage((previous) => previous - 1)}
            >
              Previous
            </button>
            <span>Page <b>{page}</b> of {totalPage}</span>
            <button
              type="button"
              disabled={!isNextPage}
              onClick={() => setPage((previous) => previous + 1)}
            >
              Next <FaArrowRight aria-hidden="true" />
            </button>
          </nav>
        )}

        <Link href="/" className="back-home-link">Back to home</Link>
      </main>
    </div>
  );
};

export default Search;
