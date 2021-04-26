import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ShowImage from "./ShowImage";

const Button = styled.button`
  border-radius: 0px;
`;

const Card = ({ product }) => {
  return (
    <div className="col--12 col-md-6 col-xl-4 mb-3">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          <ShowImage item={product} url="product" />
          <p>{product.description}</p>
          <p>${product.price}</p>
          <Link to="/">
            <Button className="btn btn-outline-primary mt-2 mb-2 mr-2">
              View Product
            </Button>
          </Link>
          <Button className="btn btn-outline-warning mt-2 mb-2">
            Add to Card
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
