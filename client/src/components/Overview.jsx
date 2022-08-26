import React from 'react';
import ProductImage from './overview/ProductImage.jsx';
import ProductInfo from './overview/ProductInfo.jsx';


const Overview = () => {
  return (
    <div>
      <div className="ov-wrapper">
        <ProductImage/>
        <ProductInfo/>
      </div>
      <div>

      </div>
    </div>
  )
}



export default Overview;