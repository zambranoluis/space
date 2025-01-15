"use client";
import { TiArrowSortedDown } from "react-icons/ti";

import { Image } from "@nextui-org/image";

import {projects} from "../../app/(panel-client)/panel-client/steps";

const Projects = () => {
  const toggleProject = (id: number) => {
    const project = document.getElementById(`project${id}Container`);
    project?.classList.toggle("max-h-0");
  };
  const toggleStep = ( projectId: number, stepId: number) => {
    const step = document.getElementById(`project${projectId}Step${stepId}Container`);
    const arrow = document.getElementById(`project${projectId}Arrow${stepId}`);
    arrow?.classList.toggle("rotate-180");
    step?.classList.toggle("max-h-0");
  };

  return (
    <>
      <section className='w-[90%] py12 flex flex-col  bgred-300 px-2 gap-8 sm:w-[80%] place-self-center' >
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
      </section>


    <section className="flex w-full bg-red-300 justify-center items-center">
      <div className="flex flex-col w-[90%] ">
        <div className="flex pl-6 bg-[#302626]">
          <h1 className="text-2xl font-semibold">Projects</h1>
        </div>
        <div id="projectsContainer" className="flex flex-col gap-2 px-6">
          {
            projects.map((project, index) => (
              <div className="flex flex-col   bgred-200" key={project.id}>
                <div
                  className="flex max-sm:flex-col max-sm:gap-2 bg-[#f0f0ef] justify-between px-2 py-2 text-[#67664c]"
                  onClick={() => { toggleProject(project.id) }}
                >
                  <div className="flex text-sm">{project.title}</div>
                  <div className="flex max-[400px]:flex-col text-white sm:font-bold text-xs justify-center items-center gap-2">
                    <button className="px-2 rounded-lg py-1 bg-[#6d786f] ">{project.type}</button>
                    <button className="px-2 rounded-lg py-1 bg-[#858e5b] ">{project.status}</button>
                  </div>
                </div>
                <div id={`project${project.id}Container`} className="flex flex-col bgrose-500 transition-all ease-out duration-300 max-h-0 overflow-hidden">
                  {
                    project.steps.map((step, index) => (
                      <div
                        className="p-4 border border-[#e4e0d5] text-[#6b6950] border-t-0"
                        key={step.id}
                        onClick={() => { toggleStep(project.id, step.id) }}
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
    </section>
    </>
  );
}

export default Projects;