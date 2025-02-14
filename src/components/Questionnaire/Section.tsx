'use client';

import { useEffect, useState, useRef} from "react";
import { Image } from "@nextui-org/image";
import Link from "next/link";

import QuestionnaireManager from "./QuestionnaireManager/QuestionnaireManager";


function Questionnaire() {
  const landingRef = useRef<HTMLElement | null>(null);
  const [showProgress, setShowProgress] = useState(false);  

  useEffect(() => {
    const handleScroll = () => {
      if (landingRef.current) {
        const rect = landingRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Si la mitad de la sección ya salió del viewport, mostramos `QuestionnaireProgress`
        if (rect.top <= -(rect.height / 2)) {
          setShowProgress(true);
        } else {
          setShowProgress(false);
        }
      }
    };

    // Agregar evento de scroll
    window.addEventListener("scroll", handleScroll);

    // Ejecutar la función inmediatamente para verificar el estado inicial
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  return (
    <main className="w-full bgrose-400 flex flex-col pb-12 gap-20 justify-center items-center">
      <section ref={landingRef} id="Landing" className="flex max-md:flex-col w-full md:h-[230px] lg:h-[280px] xl:h-[380px]">
        <div className="flex flex-col w-full md:w-[50%] bgred-200 p-2 justify-center gap-4 md:gap-8  py-12">
          <Link className="flex bggreen-300 p-2 min-lg:pl-12 justify-center items-center" href={"/shopping-cart"}>
            <Image className={`w-full bgblue-300 max-w-[250px] dropshadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]`}
              src="https://github.com/BPM94/SCCTMD/raw/main/logos/logoGreen.png"
              alt=""
            />
          </Link>
          <div className=" flex flex-col  gap-2 p-6  justify-center items-center bgrose-500">
            <div className="flex flex-col md:pl-8 bggreen-400">
              <h1 className="font-black text-3xl text-[#6c786e] min-[400px]text-5xl bgorange-200">Questionnaire</h1>
              <p className="text-xs text-black min-[400px]text-lg bgorange-500">Answer the following questions to help us<br />
              design your dream space</p>
            </div>
          </div>
        </div>
        <div id="landing" className="flex h-full bgred-300 w-full max-md:h-[500px]  md:w-[50%] bg-top bg-cover bg-no-repeat scale-x-[-1]" style={{backgroundImage: "url('https://github.com/BPM94/SCCTMD/raw/main/questionnaire/questionnaireLanding.webp')",}}>
        </div>
      </section>
    
      <QuestionnaireManager showProgress={showProgress} />

    </main>
  );
}

export default Questionnaire;