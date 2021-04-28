import React from "react";
import Menu from "./Menu";
import styled, { keyframes } from "styled-components";

// Styled Components
const Gradient = keyframes`
   {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
  }
`;
const Jumbotron = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30vh;
  color: #fff;
  border-radius: 0px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  -webkit-animation: ${Gradient} 15s ease infinite;
  -moz-animation: ${Gradient} 15s ease infinite;
  animation: ${Gradient} 15s ease infinite;
`;

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div>
    <Menu />
    <Jumbotron className="jumbotron">
      <div>
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>
    </Jumbotron>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
