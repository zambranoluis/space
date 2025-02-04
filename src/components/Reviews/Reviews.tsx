"use client"



import { useState } from "react";

import Section from "./Section"


import {reviews} from "./reviewsFile"

interface Review {
  id: number,
  date: string,
  name: string,
  rating: number,
  avatar: string,
  background: string,
  text: string
};



const Reviews: React.FC = () => {
  const [selectedReview1, setSelectedReview1] = useState<Review>(reviews[0]);
  const [selectedReview2, setSelectedReview2] = useState<Review>(reviews[1]);

  const handleSelectedReview = (direction: string) => {
    const currentIndex1 = reviews.findIndex(review => review.id === selectedReview1.id);
    const currentIndex2 = reviews.findIndex(review => review.id === selectedReview2.id);
  
    switch (direction) {
      case "next": {
        const nextIndex1 = (currentIndex1 + 2) % reviews.length;
        const nextIndex2 = (currentIndex2 + 2) % reviews.length;
  
        setSelectedReview1(reviews[nextIndex1]);
        setSelectedReview2(reviews[nextIndex2 < reviews.length ? nextIndex2 : 0]);
        break;
      }
  
      case "prev": {
        const prevIndex1 = (currentIndex1 - 2 + reviews.length) % reviews.length;
        const prevIndex2 = (currentIndex2 - 2 + reviews.length) % reviews.length;
  
        setSelectedReview1(reviews[prevIndex1]);
        setSelectedReview2(reviews[prevIndex2 >= 0 ? prevIndex2 : reviews.length - 1]);
        break;
      }
  
      default:
        break;
    }
  };




  return (
    
    <section className="w-full">
      <Section
      selectedReview1={selectedReview1}
      selectedReview2={selectedReview2}
      handleSelectedReview={handleSelectedReview}
      />
    </section>
  );
};

export default Reviews