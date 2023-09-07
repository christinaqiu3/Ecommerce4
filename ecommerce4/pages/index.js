import React, { useState } from 'react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ products, bannerData }) => {

  const [selectedTag, setSelectedTag] = useState('All');

  const filteredProducts = selectedTag === 'All' ? products : products.filter(product => product.tag.includes(selectedTag));

  return(
  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
    <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>yay finally website working</p>
    </div>


    <div className="products-container">
      <button type="button" onClick={() => setSelectedTag('All')} className="select-btn">All</button>
      <button type="button" onClick={() => setSelectedTag('person')} className="select-btn">Person</button>
      <button type="button" onClick={() => setSelectedTag('animal')} className="select-btn">Animal</button>
      <button type="button" onClick={() => setSelectedTag('food')} className="select-btn">Food</button>
    </div>




    <div className="products-container">
      {filteredProducts.map((product) => <Product key={product._id} product={product} />)}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  };
}

export default Home;