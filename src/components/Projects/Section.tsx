"use client"

import React from "react";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";

import { TiArrowSortedDown } from "react-icons/ti";

import { Image } from "@nextui-org/image";
import Link from "next/link";

import { GetProjectsByPurchasesId } from "../../utils/dataInterfaces";

interface SectionProps {
  projects: GetProjectsByPurchasesId[];
  toggleProject: (id: number) => void;
  toggleStep: (projectId: number, stepId: number) => void;
}

const Section: React.FC<SectionProps> = ({
  projects,
  toggleProject,
  toggleStep
}) => {
  return (
    <div>
      <section className='w-[90%] py-8 flex flex-col  bgred-300 px-2 gap-8 sm:w-[80%] place-self-center'>
        <div className='flex flex-col justify-center items-center text-[#6b776d]'>
          <h1 className='font-black text-center'>Hello, Claudia Alves!</h1>
          <p className='text-center text-sm'>
            Welcome to your Space Creations account, here you can share photos of
            yourspace, your inspiration and the measurements of your home.
          </p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex p-4'>
            <h1 className='font-bold text-[#6b776d] text-center'>
              Let&apos;s start designing together!
            </h1>
          </div>
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center items-center'>
            <button className='py-3 px-4 rounded-2xl bg-[#848d5a] text-xs md:text-base'>
              Click here to schedule a call
            </button>
            <Link
              className='py-3 px-4 rounded-2xl bg-gray-500 bg[#848d5a] text-xs md:text-base'
              href='/questionnaire'>
              Click here to complete the questionnaire
            </Link>
          </div>
          <div className='flex flex-col py-6 gap-8 text-[#6c6c6c]'>
            <div className='flex flex-col'>
              <div className='flex p-2 font-bold bggreen-300 border-b border-b-[#6c6c6c] min-[350px]:w-[80%]'>
                <h1>CONSULTATION CALL</h1>
              </div>
              <div className='flex bgblue-300 p-2 text-smin-[350px]sm:text-base'>
                <p>
                  You have a call on <span className='font-bold'>December 15, 2023</span>{" "}
                  at <span className='font-bold'>10:30am</span> pst time with one of our
                  project managers.
                </p>
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='flex p-2 font-bold bggreen-300 border-b border-b-[#6c6c6c] min-[350px]:w-[80%]'>
                <h1>DESIGN PACKAGE</h1>
              </div>
              <div className='flex bgblue-300 p-2 text-sm sm:text-base'>
                <p>
                  You currently have an active package to design both areas of your home
                  (Front yard & BackYard).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='flex w-full bgred-300 justify-center items-center py-8'>
        <div className='flex flex-col w-[90%] '>
          <div className='flex pl-6 bg-[#302626]'>
            <h1 className='text-2xl font-semibold'>Projects</h1>
          </div>
          <div id='projectsContainer' className='flex flex-col gap-2 px-6'>
            {
              (projects?.length > 0) && projects.map((project, index) => (
                <div className='flex flex-col   bgred-200' key={index}>
                  <div
                    className='flex max-md:flex-col max-md:gap-2 bg-[#f0f0ef] justify-between px-2 py-2 text-[#67664c]'
                    onClick={() => {
                      toggleProject(index);
                    }}>
                    <div className='flex text-sm w-full md:w-[35%] max-md:justify-center md:justify-start pl-2 items-center'>
                      Project - {project.name}
                    </div>
                    <div className='flex  bgred-200  w-full md:w-[35%]  text-white sm:font-bold text-xs justify-center items-center gap-2'>
                      <button className='px-2 rounded-lg py-1 bg-[#6d786f] '>
                        {project.description.type}
                      </button>
                      <button className='px-2 rounded-lg py-1 bg-[#858e5b] '>
                        {(project.isActive === true) ? "Pending" : "Completed"}
                      </button>
                    </div>
                    <div className='flex w-full text-xs md:w-[30%] justify-center items-center'>
                      <p>{(project.team.designer) ? project.team.designer : "No Designer Assigned"}</p>
                    </div>
                  </div>
                  <div
                    id={`project${index}Container`}
                    className='flex flex-col bgrose-500 transition-all ease-out duration-300 max-h-0 overflow-hidden'>
                    {project.steps.map((step: any, indexStep: number) => (
                      <div
                        className='p-4 border border-[#e4e0d5] text-[#6b6950] border-t-0'
                        key={indexStep}
                      >
                        <div className='flex place-self-start bgred-300 items-center p2 gap-2 font-bold cursor-pointer select-none' onClick={() => {
                          toggleStep(index, indexStep);
                        }}>
                          <TiArrowSortedDown
                            id={`project${index}Arrow${indexStep}`}
                            className=''
                          />
                          <h3>{step.step}</h3>
                        </div>
                        <div
                          id={`project${index}Step${indexStep}Container`}
                          className='flex flex-col px-6 max-h-0 overflow-hidden'
                        >
                          <div className='bgblue-300 flex flex-col'>
                            {(indexStep === 0) && (
                              <div className="flex max-sm:flex-col w-full justify-between bgred-300 mt-4 text-xs">
                                <p className=''>Status: {(step.isActive === true) ? "Completed" : "Pending"}</p>
                                {project.isActive === true && <p>{format(new Date(project.createdAt), "MMMM dd, yyyy. HH:mm:ss z", { locale: enUS })}</p>}
                              </div>
                            )}
                          </div>

                          <div>
                            {(indexStep === 1) && (
                              <div className="flex flex-col gap-1 py-1">
                                {
                                  project.questionnaire.category.map((category: string, indexCategory: number) => (
                                    <div
                                      className='flex gap-2 justify-between items-center text-sm bgred-300 place-self-start'
                                      key={indexCategory}
                                    >
                                      <Image
                                        className={`${(category.isComplete ? "" : "hidden" )} w-[20px] rounded-none bgred-200`}
                                        src='https://github.com/BPM94/SCCTMD/raw/main/panel-client/projects/spaceStepCheck.png'
                                        alt='fliiedChecked'
                                      />
                                      <p>Questionnaire {category.type}</p>
                                    </div>
                                  ))
                                }
                                <div
                                  className='flex gap-2 justifycenter items-center text-sm'>
                                  <Image
                                    className='w-[20px] rounded-none bgred-200 hidden'
                                    src='https://github.com/BPM94/SCCTMD/raw/main/panel-client/projects/spaceStepCheck.png'
                                    alt='fliiedChecked'
                                  />
                                  <p>Customer Files</p>
                                </div>
                                <div className="flex max-sm:flex-col w-full justify-between bgred-300 mt-4 text-xs">
                                  <p className=''>Status: {(step.isActive === true) ? "Completed" : "Pending"}</p>
                                  {project.isActive === true && <p>{format(new Date(project.createdAt), "MMMM dd, yyyy. HH:mm:ss z", { locale: enUS })}</p>}
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            {
                              (indexStep > 1) && (
                                <div className="flex max-sm:flex-col w-full justify-between bgred-300 text-xs">
                                  <p className=''>Status: {(step.isActive === true) ? "Completed" : "Pending"}</p>
                                  {project.isActive === true && <p>{format(new Date(project.createdAt), "MMMM dd, yyyy. HH:mm:ss z", { locale: enUS })}</p>}
                                </div>
                              )
                            }
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
}

export default Section;