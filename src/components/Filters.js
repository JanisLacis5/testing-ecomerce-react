import React from "react"
import styled from "styled-components"
import {useFilterContext} from "../context/filter_context"
import {formatPrice, getUniqueValues} from "../utils/helpers"
import {FaCheck} from "react-icons/fa"
import {useProductsContext} from "../context/products_context"

const Filters = () => {
    const {products} = useProductsContext()
    const {
        filters: {
            price,
            maxPrice,
            minPrice,
            color,
            category,
            company,
            shipping,
            text,
        },
        updateFilters,
        clearFilters,
    } = useFilterContext()

    const categories = getUniqueValues(products, "category")
    const companies = getUniqueValues(products, "company")
    const colors = getUniqueValues(products, "colors")

    return (
        <Wrapper>
            <div className="content">
                <form>
                    <div className="form-control">
                        <input
                            type="text"
                            name="text"
                            placeholder="Search"
                            className="search-input"
                            value={text}
                            onChange={updateFilters}
                        />
                    </div>
                    <div className="form-control">
                        <h5>Category</h5>
                        {categories.map((c, index) => {
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    name="category"
                                    className={category === c ? "active" : null}
                                    onClick={updateFilters}>
                                    {c}
                                </button>
                            )
                        })}
                    </div>
                    <div className="form-control">
                        <h5>Company</h5>

                        <select
                            name="company"
                            className="company"
                            onChange={updateFilters}
                            value={company}>
                            {companies.map((c, index) => {
                                return (
                                    <option key={index} value={c}>
                                        {c}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-control">
                        <h5>Colors</h5>
                        <div className="colors">
                            {colors.map((c, index) => {
                                if (c === "all") {
                                    return (
                                        <button
                                            key={index}
                                            name="color"
                                            type="button"
                                            data-color="all"
                                            onClick={updateFilters}
                                            className={
                                                color === "all"
                                                    ? "all-btn active"
                                                    : "all-btn"
                                            }>
                                            All
                                        </button>
                                    )
                                }

                                return (
                                    <button
                                        key={index}
                                        style={{background: c}}
                                        name="color"
                                        type="button"
                                        className={
                                            color === c
                                                ? "color-btn active"
                                                : "color-btn"
                                        }
                                        data-color={c}
                                        onClick={updateFilters}>
                                        {color === c ? <FaCheck /> : null}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    <div className="form-control">
                        <h5>Price</h5>
                        <p className="price">${formatPrice(price)}</p>
                        <input
                            type="range"
                            name="price"
                            min={minPrice}
                            max={maxPrice}
                            onChange={updateFilters}
                            value={price}
                        />
                    </div>
                    <div className="form-control shipping">
                        <label htmlFor="shipping">Free shipping</label>
                        <input
                            type="checkbox"
                            name="shipping"
                            checked={shipping}
                            onChange={updateFilters}
                        />
                    </div>
                </form>
                <button
                    className="clear-btn"
                    type="button"
                    onClick={clearFilters}>
                    Clear Filters
                </button>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    .form-control {
        margin-bottom: 1.25rem;
        h5 {
            margin-bottom: 0.5rem;
        }
    }
    .search-input {
        padding: 0.5rem;
        background: var(--clr-grey-10);
        border-radius: var(--radius);
        border-color: transparent;
        letter-spacing: var(--spacing);
    }
    .search-input::placeholder {
        text-transform: capitalize;
    }

    button {
        display: block;
        margin: 0.25em 0;
        padding: 0.25rem 0;
        text-transform: capitalize;
        background: transparent;
        border: none;
        border-bottom: 1px solid transparent;
        letter-spacing: var(--spacing);
        color: var(--clr-grey-5);
        cursor: pointer;
    }
    .active {
        border-color: var(--clr-grey-5);
    }
    .company {
        background: var(--clr-grey-10);
        border-radius: var(--radius);
        border-color: transparent;
        padding: 0.25rem;
    }
    .colors {
        display: flex;
        align-items: center;
    }
    .color-btn {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: #222;
        margin-right: 0.5rem;
        border: none;
        cursor: pointer;
        opacity: 0.5;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
            font-size: 0.5rem;
            color: var(--clr-white);
        }
    }
    .all-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 0.5rem;
        opacity: 0.5;
    }
    .active {
        opacity: 1;
    }
    .all-btn .active {
        text-decoration: underline;
    }
    .price {
        margin-bottom: 0.25rem;
    }
    .shipping {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        text-transform: capitalize;
        column-gap: 0.5rem;
        font-size: 1rem;
        max-width: 200px;
    }
    .clear-btn {
        background: var(--clr-red-dark);
        color: var(--clr-white);
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius);
    }
    @media (min-width: 768px) {
        .content {
            position: sticky;
            top: 1rem;
        }
    }
`

export default Filters
