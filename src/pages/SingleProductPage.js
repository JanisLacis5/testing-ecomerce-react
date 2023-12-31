import React, {useEffect} from "react"
import {useParams} from "react-router-dom"
import {useProductsContext} from "../context/products_context"
import {single_product_url as url} from "../utils/constants"
import {formatPrice} from "../utils/helpers"
import {
    Loading,
    Error,
    ProductImages,
    AddToCart,
    Stars,
    PageHero,
} from "../components"
import styled from "styled-components"
import {Link} from "react-router-dom"

const SingleProductPage = () => {
    const {id} = useParams()
    const {singleProduct, getProduct, singleProductLoading} =
        useProductsContext()
    useEffect(() => {
        getProduct(url, id)
    }, [id])
    const {name, price, description, stock, company, images} = singleProduct

    if (singleProductLoading) {
        return <div className="loading"></div>
    }

    return (
        <Wrapper>
            <PageHero title={name} product />
            <div className="section section-center page">
                <Link className="btn" to="/products">
                    back to products
                </Link>
                <div className="product-center">
                    <ProductImages images={images} />
                    <section className="content">
                        <h2>{name}</h2>
                        <Stars />
                        <h5 className="price">${formatPrice(price)}</h5>
                        <p className="desc">{description}</p>
                        <p className="info">
                            <span>Avalable: </span>
                            {stock > 0 ? "In Stock" : "Out of Stock"}
                        </p>
                        <p className="info">
                            <span>SKU: </span>
                            {id}
                        </p>
                        <p className="info">
                            <span>Brand: </span>
                            {company}
                        </p>
                        <hr />
                        {stock ? (
                            <AddToCart singleProduct={singleProduct} />
                        ) : (
                            ""
                        )}
                    </section>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.main`
    .product-center {
        display: grid;
        gap: 4rem;
        margin-top: 2rem;
    }
    .price {
        color: var(--clr-primary-5);
    }
    .desc {
        line-height: 2;
        max-width: 45em;
    }
    .info {
        text-transform: capitalize;
        width: 300px;
        display: grid;
        grid-template-columns: 125px 1fr;
        span {
            font-weight: 700;
        }
    }

    @media (min-width: 992px) {
        .product-center {
            grid-template-columns: 1fr 1fr;
            align-items: center;
        }
        .price {
            font-size: 1.25rem;
        }
    }
`

export default SingleProductPage
