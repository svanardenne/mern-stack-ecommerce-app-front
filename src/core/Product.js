import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setreleatedProducts] = useState([]);
  const [error, setError] = useState(false);

  // calls read method from apiCore and loads it into state
  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setreleatedProducts(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
    // event listener adds a slight margin to the top of the related
    // products div when window size is smaller than 1200px
    window.addEventListener("resize", () => {
      const related = document.querySelector(".related");
      if (window.innerWidth < 1200) {
        related.style.marginTop = "10px";
      } else {
        related.style.marginTop = "0";
      }
    });
  }, []);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12 col-xl-8">
          {product && product.description && (
            <div>
              <Card product={product} showViewProductButton={false} />
            </div>
          )}
        </div>
        <div className="col-12 col-xl-4 related">
          <h4>Related Products</h4>
          {relatedProducts.map((p, i) => (
            <div key={i} className="mb-3">
              <Card product={p} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
