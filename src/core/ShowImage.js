import React from "react";
import { API } from "../config";
import styled from "styled-components";

const ProductImage = styled.div`
  min-height: 100px;
`;

const ShowImage = ({ item, url }) => (
  <ProductImage className="product-img">
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className="mb-3"
      style={{ maxHeight: "100%", maxWidth: "100%" }}
    />
  </ProductImage>
);

export default ShowImage;
