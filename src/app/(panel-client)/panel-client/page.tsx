"use client";

import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useState, ReactNode } from "react";
import { Image } from "@nextui-org/image";



import { IoCloseOutline } from "react-icons/io5";




import NavbarClient from "@/components/NavbarClient";

import AsideClient from "@/components/AsideClient";

import ChatModal from "@/components/ChatModal";

import Projects from "@/components/Projects/Projects"

// import { projects } from "./steps"

function PanelClient() {

  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(true);
  const [asideSelectedOption, setAsideSelectedOption] = useState<string>("");
  const [isSiteContainerOpen, setIsSiteContainerOpen] = useState<boolean>(false);
  
  
  
  
    const toggleAside = () => {
      setIsAsideOpen((prev) => !prev);
    };

    const toggleSiteContainer = () => {
      setIsSiteContainerOpen((prev) => !prev);
    };

    const handleSelectedOption = (option: string) => {
      setAsideSelectedOption(option);
    };

    


    

  return (
    <main className="flex flex-col h-full w-full">

      <section className='w-full h-full bg-cover bg-no-repeat bg-center ' style={{ backgroundImage: "url('/panel-clientBg.jpg')"}} >
      
      <div className="relative w-full h-full">
        <div className="absolute w-full h-full gap-8 flex flex-col">
          <NavbarClient toggleAside={toggleAside} />
          <AsideClient
            toggleAside={toggleAside}
            isAsideOpen={isAsideOpen}
            toggleSiteContainer={toggleSiteContainer}
            isSiteContainerOpen={isSiteContainerOpen}
            asideSelectedOption={asideSelectedOption}
            handleSelectedOption={handleSelectedOption}
          />
          <div id="siteContainer" className={` ${isSiteContainerOpen ? "" : "translate-x-[-50%] translate-y-[-30%] scale-x-0 scale-y-0 opacity-0"} transition-all duration-300 overflow-hidden absolute w-full h-full bgred-300 flex justify-center items-center z-[1000]`}>
            <div className="w-[60%] h-[70%] flex bg-white rounded-3xl shadow-md shadow-black">
              <div className="flex flex-col w-full rounded-t-3xl">
                <div className="w-full  flex justify-end items-center rounded-t-3xl bgred-300 p-2">
                  <div  className="bgrose-400" >
                    <IoCloseOutline className="text-xl bgblue-300" onClick={() => {toggleSiteContainer()}}/>
                  </div>
                </div>
                <div  className={` h-full w-full bggreen-300 overflow-y-scroll noScrollBar rounded-b-3xl`}>
                {/* <section className='w-[90%] py-12 flex flex-col  bgred-300 px-2 gap-8 sm:w-[80%] place-self-center' >
                  <div className="flex flex-col justify-center items-center text-[#6b776d]">
                    <h1 className="font-black text-center">Hello, Claudia Alves!</h1>
                    <p className="text-center text-sm">Welcome to your Space Creations account, here you can share photos 
                    of yourspace, your inspiration and the measurements of your home.</p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex p-4">
                      <h1 className="font-bold text-[#6b776d] text-center">Let's start designing together!</h1>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center items-center">
                      <button className="py-3 px-4 rounded-2xl bg-[#848d5a] text-xs md:text-base">Click here to schedule a call</button>
                      <button className="py-3 px-4 rounded-2xl bg-[#848d5a] text-xs md:text-base">Click here to complete the questionnaire</button>
                    </div>
                    <div className="flex flex-col py-6 gap-8 text-[#6c6c6c]">
                      <div className="flex flex-col">
                        <div className="flex p-2 font-bold bggreen-300 border-b border-b-[#6c6c6c] min-[350px]:w-[80%]">
                          <h1>CONSULTATION CALL</h1>
                        </div>
                        <div className="flex bgblue-300 p-2 text-smin-[350px]sm:text-base">
                          <p>You have a call on <span className="font-bold">December 15, 2023</span> at <span className="font-bold">10:30am</span> pst time with one of our project managers.</p>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex p-2 font-bold bggreen-300 border-b border-b-[#6c6c6c] min-[350px]:w-[80%]">
                          <h1>DESIGN PACKAGE</h1>
                        </div>
                        <div className="flex bgblue-300 p-2 text-sm sm:text-base">
                          <p>You currently have an active package to design both areas of your home (Front yard & BackYard).</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section> */}
                {
                  (asideSelectedOption === "projects") && <Projects />
                }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex bgred-200 absolute bottom-[10px] items-end  right-[10px] z-[3000]">
          <ChatModal />
        </div>
      </div>
      
      </section>

      {/* <section className='w-[90%] py-12 flex flex-col  bgred-300 px-2 gap-8 sm:w-[80%] place-self-center' >
        <div className="flex flex-col justify-center items-center text-[#6b776d]">
          <h1 className="font-black text-center">Hello, Claudia Alves!</h1>
          <p className="text-center text-sm">Welcome to your Space Creations account, here you can share photos 
          of yourspace, your inspiration and the measurements of your home.</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex p-4">
            <h1 className="font-bold text-[#6b776d] text-center">Let's start designing together!</h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center items-center">
            <button className="py-3 px-4 rounded-2xl bg-[#848d5a] text-xs md:text-base">Click here to schedule a call</button>
            <button className="py-3 px-4 rounded-2xl bg-[#848d5a] text-xs md:text-base">Click here to complete the questionnaire</button>
          </div>
          <div className="flex flex-col py-6 gap-8 text-[#6c6c6c]">
            <div className="flex flex-col">
              <div className="flex p-2 font-bold bggreen-300 border-b border-b-[#6c6c6c] min-[350px]:w-[80%]">
                <h1>CONSULTATION CALL</h1>
              </div>
              <div className="flex bgblue-300 p-2 text-smin-[350px]sm:text-base">
                <p>You have a call on <span className="font-bold">December 15, 2023</span> at <span className="font-bold">10:30am</span> pst time with one of our project managers.</p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex p-2 font-bold bggreen-300 border-b border-b-[#6c6c6c] min-[350px]:w-[80%]">
                <h1>DESIGN PACKAGE</h1>
              </div>
              <div className="flex bgblue-300 p-2 text-sm sm:text-base">
                <p>You currently have an active package to design both areas of your home (Front yard & BackYard).</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="flex flex-col w-full bg-[#f0f0ef] place-self-center bgblue-300 justify-center items-center max-sm:py-12  sm:py-24">
        <div className="flex flex-col bgred-200 w-[75%]">
          <div className="flex bggreen-200 gap4 text-[#69664c] text-sm sm:text-lg font-bold w-full">
            <div className="w-full w[100px] px-6 py-4 bgpurple-300 flex justify-center items-center text-center">ID</div>
            <div className="w-full w[150px] px-6 py-4 bgorange-300 flex justify-center items-center text-center">Package name</div>
            <div className="w-full w[170px] px-6 py-4 bgyellow-200 flex justify-center items-center text-center">Project Manager</div>
          </div>
          <div className="flex flex-col text-xs overflow-y-auto noScrollBar max-h-[600px] sm:text-sm md:text-base w-full bgslate-400 gap-2 bgred-300 py-8 ">
            <div className="flex bg-[#848d5a] rounded-3xl  w-full h-[90px]">
              <div className="w-full w[100px]  flex justify-center items-center">
                12345678
              </div>
              <div className="flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1">
                <p>1 Area Pro</p>
                <p>BACKYARD</p>
                <p>Lighting Plan</p>
                <p>Lighting Plan</p>
                <p>Lighting Plan</p>
                <p>Lighting Plan</p>

              </div>
              <div className="flex w-full w[170px]  justify-center items-center">
                Joao Da Silva
              </div>
            </div>
            <div className="flex bg[#848d5a] text-black rounded-3xl  w-full h-[90px]">
              <div className="w-full w[100px]  flex justify-center items-center">
                12345678
              </div>
              <div className="flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1">
                <p>1 Area Pro</p>
                <p>BACKYARD</p>
                <p>Lighting Plan</p>
                <p>Lighting Plan</p>
                <p>Lighting Plan</p>
                <p>Lighting Plan</p>

              </div>
              <div className="flex w-full w[170px]  justify-center items-center">
                Joao Da Silva
              </div>
            </div>

            <div className="flex bg-[#6b776d] rounded-3xl  w-full h-[90px]">
              <div className="w-full w[100px]  flex justify-center items-center">
                12345678
              </div>
              <div className="flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1">
                <p>1 Area Pro</p>
                <p>BACKYARD</p>
                <p>Lighting Plan</p>
                <p>Lighting Plan</p>
                <p>Lighting Plan</p>
                <p>Lighting Plan</p>

              </div>
              <div className="flex w-full w[170px]  justify-center items-center">
                Joao Da Silva
              </div>
            </div>

            <div className="flex bg[#848d5a] text-black rounded-3xl  w-full h-[90px]">
              <div className="w-full w[100px]  flex justify-center items-center">
                12345678
              </div>
              <div className="flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1">
                <p>1 Area Pro</p>
                <p>BACKYARD</p>
                <p>Lighting Plan</p>

              </div>
              <div className="flex w-full w[170px]  justify-center items-center">
                Joao Da Silva
              </div>
            </div>

            <div className="flex bg-[#302626] rounded-3xl  w-full h-[90px]">
              <div className="w-full w[100px]  flex justify-center items-center">
                12345678
              </div>
              <div className="flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1">
                <p>1 Area Pro</p>
                <p>BACKYARD</p>
                <p>Lighting Plan</p>
                <p>Lighting Plan</p>
                <p>Lighting Plan</p>
                <p>Lighting Plan</p>

              </div>
              <div className="flex w-full w[170px]  justify-center items-center">
                Joao Da Silva
              </div>
            </div>

            <div className="flex bg[#302626] text-black rounded-3xl  w-full h-[90px]">
              <div className="w-full w[100px]  flex justify-center items-center">
                12345678
              </div>
              <div className="flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1">
                <p>1 Area Pro</p>
                <p>BACKYARD</p>
                <p>Lighting Plan</p>
                <p>Lighting Plan</p>
                <p>Lighting Plan</p>
                <p>Lighting Plan</p>

              </div>
              <div className="flex w-full w[170px]  justify-center items-center">
                Joao Da Silva
              </div>
            </div>

            <div className="flex bg-[#3b543e]  rounded-3xl  w-full h-[90px]">
              <div className="w-full w[100px]  flex justify-center items-center">
                12345678
              </div>
              <div className="flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1">
                <p>1 Area Pro</p>
                <p>BACKYARD</p>
                <p>Lighting Plan</p>
                <p>Lighting Plan</p>
                <p>Lighting Plan</p>
                <p>Lighting Plan</p>

              </div>
              <div className="flex w-full w[170px]  justify-center items-center">
                Joao Da Silva
              </div>
            </div>

          </div>
        </div>
      </section> */}

      {/* <section className="flex w-full py-12 bgred-300 justify-center items-center">
        <div className="flex flex-col w-[90%] ">
          <div className="flex pl-6 bg-[#302626]">
            <h1 className="text-2xl font-semibold">Projects</h1>
          </div>
          <div id="projectsContainer" className="flex flex-col gap-2 px-6">
              {
              projects.map((project, index) => (
                <div className="flex flex-col   bgred-200" key={project.id}>
                  <div
                    className="flex  bg-[#f0f0ef] justify-between px-2 py-2 text-[#67664c]"
                    onClick={() => { toggleProject(project.id) }}
                  >
                    <div className="flex text-sm">{project.title}</div>
                    <div className="flex max-[400px]:flex-col text-xs justify-center items-center gap-2">
                      <button className="px-2 rounded-lg py-1 bg-[#6d786f] text-white font-bold">{project.type}</button>
                      <button className="px-2 rounded-lg py-1 bg-[#858e5b] text-white font-bold">{project.status}</button>
                    </div>
                  </div>
                  <div id={`project${project.id}Container`} className="flex flex-col bgrose-500 transition-all ease-out duration-300 max-h-0 overflow-hidden">
                    {
                      project.steps.map((step, index) => (
                        <div
                          className="p-4 border border-[#e4e0d5] text-[#6b6950] border-t-0"
                          key={step.id}
                          onClick={() => { toggleStep( project.id, step.id) }}
                        >
                          <div className="flex bgred-300 items-center p2 gap-2 font-bold">
                            <TiArrowSortedDown id={`project${project.id}Arrow${step.id}`} className="" />
                            <h3>{step.title}</h3>
                          </div>
                          <div id={`project${project.id}Step${step.id}Container`} className="flex flex-col px-6 transition ease-in-out duration-300 max-h-0 overflow-hidden">
                            {step.areaType && (
                              <div>
                                <p>Area Type: <span>{step.areaType}</span></p>
                              </div>
                            )
                            }
                            {
                              step.questions && (
                                step.questions.map((question) => (
                                  <div className="flex gap-6 justifycenter items-center text-sm" key={question.id}>
                                    <p>{question.title}</p>
                                    {
                                      (question.filled === true) && (
                                        <Image className="w-[20px] rounded-none bgred-200" src="/spaceStepCheck.png" alt="fliiedChecked" />
                                      )
                                    }
                                  </div>
                                ))
                              )
                            }
                            <div className="text-xs max-sm:flex-col max-sm:gap-2 mt-6 flex max-sm:justify-center sm:justify-between max-sm:items-start items-center">
                              <p className="">Status: {step.status}</p>
                              {(step.status === "Completed") && (
                                <p>{step.date}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))
              }
          </div>
        </div>
      </section> */}
    </main>

    
  )
}

export default PanelClient;