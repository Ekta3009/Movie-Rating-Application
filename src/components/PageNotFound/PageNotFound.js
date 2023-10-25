import React from "react";
import pnf from "../../images/pnf.jpg";
import "./PageNotFound.scss";

const PageNotFound = () => {
  return (
    <div className="pnf">
      <img src={pnf} alt="Page Not Found" />
    </div>
  );
};

export default PageNotFound;
