import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import ShowImage from "./ShowImage";

const Button = styled.button`
  border-radius: 0px;
`;

const Card = ({ product, showViewProductButton = true }) => {
  // logic for rendering view project button
  const showViewButton = (showViewProductButton) =>
    showViewProductButton && (
      <Link to={`/product/${product._id}`}>
        <Button className="btn btn-outline-primary mt-2 mb-2 mr-2">
          View Product
        </Button>
      </Link>
    );

  return (
    <div className="card">
      <div className="card-header">{product.name}</div>
      <div className="card-body">
        <ShowImage item={product} url="product" />
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-9">${product.price}</p>
        <p className="black-8">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">Added {moment(product.createdAt).fromNow()}</p>
        {showViewButton(showViewProductButton)}
        <Button className="btn btn-outline-warning mt-2 mb-2">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Card;
