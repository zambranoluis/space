"use client";

import React from "react";

import Section from "./Section"

export default function Faqs() {
  const toggleAnswer = (id: number) => {
    const container = document.getElementById(`answerContainer${id}`);
    const answer = document.getElementById(`answer${id}`);
    const arrow = document.getElementById(`arrow${id}`);

    if (answer?.classList.contains("hidden")) {
      answer?.classList.remove("hidden");
      arrow?.classList.add("rotate-180");
    } else {
      answer?.classList.add("hidden");
      arrow?.classList.remove("rotate-180");
    }
  }

  return (
    <section className="flex max-md:mt-[130px] md:mt-[100px]">
      <Section 
        toggleAnswer={toggleAnswer}
      />
    </section>
  )

}