"use client";

import { useState } from "react";
import { Image } from "@nextui-org/image";

import  {portfolio} from "./portfolioFile"

import { MdCancel } from "react-icons/md";




const Section:React.FC = () => {


  const handleScrollToProject = (sectionId: string) => {
    const targetSection = document.getElementById(sectionId);
    
    if (targetSection) {
      const offset = 180; // Ajusta este valor según el tamaño del header fijo si lo hay
      const elementPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;
  
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const handleCloseModal = (modal: string) => {
    const modalContainer = document.getElementById(modal);
      modalContainer?.classList.add("hidden");
  };

  const [selectedPicture, setSelectedPicture] = useState<string | null>(null);

  const handleOpenModal = (project: string, group: string , index:string) => {
    const projectNumber = Number(project)
    const pictureNumber = Number(index)
    const modalContainer = document.getElementById("modal");
    if (group === "before"){
      const currentPicture = portfolio[projectNumber].beforePictures.large[pictureNumber].url;
      if(currentPicture){
        setSelectedPicture(currentPicture)
        if ( modalContainer ){
          modalContainer.classList.remove("hidden");
        }
      }
    } else if (group === "after"){
      const currentPicture = portfolio[projectNumber].afterPictures.large[pictureNumber].url;
      if(currentPicture){
        setSelectedPicture(currentPicture)
        if ( modalContainer ){
          modalContainer.classList.remove("hidden");
        }
      }
    }
    
  }


  return (
    <main className="flex flex-col bgblue-300 w-full gap-8">
      <section className="bgred-300">
        <div className="max-md:flex-col flex">
          <div className="flex max-md:w-full md:w-[50%] max-md:justify-center md:justify-start p-20 items-center bgrose-500 ">
            <h1 className="text-5xl md:text-6xl font-bold text-black">Styles Gallery</h1>
          </div>
          <div className="flex max-md:w-full md:w-[50%] bg-green-300 p2">
            <Image className="rounded-none h-full" src={"https://github.com/BPM94/SCCTMD/raw/main/portfolio/landing.png"} />
          </div>
        </div>
        <div className="grid grid-cols-1 bg-[#f2f2f1] sm:grid-cols-2 py-12 px-8  lg:grid-cols-4 gap-16">
          {
            portfolio.map((project, index) => (
              <button className="flex place-self-center max-sm:w-[70%] sm:w-full h-full" style={{backgroundColor: project.color}}  key={index} onClick={() => handleScrollToProject(`project-${index}`)}>
                <div className="flex">
                  <Image className="w-[120px] rounded-none " src={project.stylePicture} alt=""/>
                </div>
                <div className="flex justify-start pl-6 items-center w-full bgred-300 h-full">
                  <h1 className="text-left text-sm">{project.style}</h1>
                </div>
              </button>
            ))
          }
        </div>
      </section>
      <section  className="flex flex-col bggreen-300 gap8 pt-24 ">
        <div id={`modal`} className="bg-black/70 hidden fixed w-full left-0 max-md:h-[calc(100vh-130px)] md:h-[calc(100vh-100px)] top-[130px] md:top-[100px] z-[1000] flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col w-[80%] h-full bgred-300 ">
            <div className="w-full bgred-300  justify-end flex p-4 xl:pr-24">
              <MdCancel className="text-5xl cursor-pointer" onClick={() => handleCloseModal(`modal`)}/>
            </div>
            {selectedPicture ? (
                <div className="flex h-[80%] w-full bgred-300 justify-center"><Image className="h-full w-full" src={selectedPicture} alt="Selected Image" /></div>
              ) : (
                <p className="text-white">No Image Selected</p>
              )
            }
          </div>
        </div>
      {
        portfolio.map((project, indexProject) => (
          <div  className="py12 flex flex-col bgred-300 py16" id={`project-${indexProject}`} key={indexProject}>
            <div className="px12 flex max-md:flex-col lg:relative" style={{backgroundColor: project.color}}>
              <div className="flex max-lg:flex-col md:gap-8 max-lg:p-6 justify-center items-center bgorange-600 md:w-[50%]">
                <Image className="h-[130px] rounded-none bgyellow-200" src={project.stylePicture} alt=""/>
                <h1 className="max-md:py-4 text-5xl  ">{project.style}</h1>
              </div>
              <div className="h-full bgblue-800 md:w-[50%] lg:absolute right-16 top-[-50px] lg:justify-end flex">
                <Image className=" rounded-none  lg:h-[220px]" src={project.displayPicture} alt=""/>
              </div>
            </div>
            <div className="flex flex-col gap-4 py-24 ">
              <div className="text-[#716e70] text-sm px-20 text-justify">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam assumenda asperiores, id totam debitis hic expedita ut modi repellendus enim repudiandae quaerat? Error quibusdam, est laborum quos corporis animi cumque. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis repudiandae, natus voluptates doloribus esse illo id, deserunt quae tenetur, itaque deleniti laborum repellendus! Quo cum sint omnis repellat mollitia obcaecati! Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium aliquam minima doloribus iste tempora veniam officia, libero odit, suscipit inventore ratione, totam ex tempore eius ea. Soluta quo vel ipsa?
              </div>
              <div className="flex flex-col px-20 py-8 ">
                <h1 className="text-[#6d786f] pb-8 text-3xl">Before</h1>
                <div className="grid max-w-[800px] place-self-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-12 place-content-center place-items-center">
                  {
                    project.beforePictures.small.map((image, indexBeforePicture) => (
                      <div className="flex cursor-pointer bg-white rounded-3xl p-8 flex-col gap-6 shadow-xl shadow-black/40" key={indexBeforePicture} onClick={() => {handleOpenModal(`${indexProject}`, "before", `${indexBeforePicture}`)}}>
                        <h2 className="text-[#6d786f] text-sm lg:text-2xl">Picture {indexBeforePicture + 1}</h2>
                        <Image className="rounded-none w-full max-h-[250px]" src={image.url} alt="" />
                      </div>
                    ))
                  }
                </div>
                
              </div>
              <div className="flex flex-col px-20 py-8" style={{backgroundColor: project.color}}>
                <h1 className=" pb-8 text-3xl text-white">Now</h1>
                <div className="grid max-w-[800px] place-self-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-12 place-content-center place-items-center">
                  {
                    project.afterPictures.small.map((image, indexAfterPicture) => (
                      <div className="flex cursor-pointer bg-white rounded-3xl p-8 flex-col gap-6 shadow-xl shadow-black/40" key={indexAfterPicture} onClick={() => {handleOpenModal(`${indexProject}`, "after",  `${indexAfterPicture}`)}}>
                        <h2 className="text-[#6d786f] text-sm lg:text-2xl">Picture {indexAfterPicture + 1}</h2>
                        <Image className="rounded-none w-full max-h-[250px]" src={image.url} alt="" />
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        ))
      }
      </section>
    </main>
  );
}

export default Section;