import React from "react";
import Image from 'next/image';

const page = () => {
	return <div>
      <h3> Bangalore Road Traffic Analytics Dashboard </h3>
      <img
        src="https://ichef.bbci.co.uk/news/976/cpsprodpb/8CFC/production/_92729063_newairportroadnearhebbal.jpg" // Path to your image relative to the public directory
        alt="Traffic"
      />
    </div>;
};

export default page;
