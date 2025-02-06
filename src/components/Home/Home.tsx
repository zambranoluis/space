"use client"

import { useState, useRef } from "react";

import Section from "./Section"


function HomePage() {
  const scrollContainerRef = useRef(null);

  const [currentPictureButton, setCurrentPictureButton] = useState(0);

  const handleCurrentPictureButton = (sectionId: number) => {
    const targetSection = document.getElementById(`${sectionId}`);
    setCurrentPictureButton(sectionId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <section>
      <Section
        scrollContainerRef={scrollContainerRef}
        currentPictureButton={currentPictureButton}
        handleCurrentPictureButton={handleCurrentPictureButton}
      />
    </section>
  )
}

export default HomePage;