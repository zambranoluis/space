"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Section from "./Section";



import { apiService } from "../../services/apiService";

import { GetProjectsByPurchasesId, Customer } from '../../utils/dataInterfaces';

interface ProjectsClientProps {
  projects: GetProjectsByPurchasesId[];
  customer: Customer | null;
}

interface ProjectsWorkerProps {

}

const ProjectsClient: React.FC<ProjectsClientProps> = ({ projects, customer }) => {

  const toggleProject = (id: number) => {
    const project = document.getElementById(`project${id}Container`);
    project?.classList.toggle("max-h-0");
  };
  const toggleStep = (projectId: number, stepId: number) => {
    const step = document.getElementById(`project${projectId}Step${stepId}Container`);
    const arrow = document.getElementById(`project${projectId}Arrow${stepId}`);
    arrow?.classList.toggle("rotate-180");
    step?.classList.toggle("max-h-0");
  };

  return (
    <section>
      <Section
        projects={projects}
        customer={customer}
        toggleProject={toggleProject}
        toggleStep={toggleStep}
      />
    </section>
  );
};

const ProjectsWorker: React.FC<ProjectsWorkerProps> = () => {


  const handleProjectDevelopment = () => {
    window.open("/project-development?1234", "_blank");
  };

  return (
    <section className='flex flex-col w-full  place-self-center bgblue-300 justify-center items-center pt-8 pb-4 h-full '>
      <div className='flex flex-col bgred-200 w-[90%] p-4 rounded-3xl bg-[#f0f0ef] h-full'>
        <div className='flex bggreen-200 gap4 text-[#69664c] text-sm sm:text-lg font-bold w-full'>
          <div className='w-full w[100px] px-6 py-4 bgpurple-300 flex justify-center items-center text-center'>
            ID
          </div>
          <div className='w-full w[150px] px-6 py-4 bgorange-300 flex justify-center items-center text-center'>
            Package name
          </div>
          <div className='w-full w[170px] px-6 py-4 bgyellow-200 flex justify-center items-center text-center'>
            Project Manager
          </div>
        </div>
        <div className='flex flex-col text-xs  overflow-y-auto .noScrollBar h-full bgred-200 sm:text-sm md:text-base w-full bgslate-400 gap-4 py-8 px-4 '>
          <div
            className='flex cursor-pointer bg-[#848d5a] rounded-3xl  w-full h-[90px]'
            onClick={handleProjectDevelopment}>
            <div className='w-full w[100px]  flex justify-center items-center'>
              12345678
            </div>
            <div className='flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1'>
              <p>1 Area Pro</p>
              <p>BACKYARD</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
            </div>
            <div className='flex w-full w[170px]  justify-center items-center'>
              Joao Da Silva
            </div>
          </div>

          <div className='flex cursor-pointer bg[#848d5a] text-black rounded-3xl  w-full h-[90px]'>
            <div className='w-full w[100px]  flex justify-center items-center'>
              12345678
            </div>
            <div className='flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1'>
              <p>1 Area Pro</p>
              <p>BACKYARD</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
            </div>
            <div className='flex w-full w[170px]  justify-center items-center'>
              Joao Da Silva
            </div>
          </div>

          <div className='flex cursor-pointer bg-[#6b776d] rounded-3xl  w-full h-[90px]'>
            <div className='w-full w[100px]  flex justify-center items-center'>
              12345678
            </div>
            <div className='flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1'>
              <p>1 Area Pro</p>
              <p>BACKYARD</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
            </div>
            <div className='flex w-full w[170px]  justify-center items-center'>
              Joao Da Silva
            </div>
          </div>

          <div className='flex cursor-pointer bg[#848d5a] text-black rounded-3xl  w-full h-[90px]'>
            <div className='w-full w[100px]  flex justify-center items-center'>
              12345678
            </div>
            <div className='flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1'>
              <p>1 Area Pro</p>
              <p>BACKYARD</p>
              <p>Lighting Plan</p>
            </div>
            <div className='flex w-full w[170px]  justify-center items-center'>
              Joao Da Silva
            </div>
          </div>

          <div className='flex cursor-pointer bg-[#302626] rounded-3xl  w-full h-[90px]'>
            <div className='w-full w[100px]  flex justify-center items-center'>
              12345678
            </div>
            <div className='flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1'>
              <p>1 Area Pro</p>
              <p>BACKYARD</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
            </div>
            <div className='flex w-full w[170px]  justify-center items-center'>
              Joao Da Silva
            </div>
          </div>

          <div className='flex cursor-pointer bg[#302626] text-black rounded-3xl  w-full h-[90px]'>
            <div className='w-full w[100px]  flex justify-center items-center'>
              12345678
            </div>
            <div className='flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1'>
              <p>1 Area Pro</p>
              <p>BACKYARD</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
            </div>
            <div className='flex w-full w[170px]  justify-center items-center'>
              Joao Da Silva
            </div>
          </div>

          <div className='flex cursor-pointer bg-[#3b543e]  rounded-3xl  w-full h-[90px]'>
            <div className='w-full w[100px]  flex justify-center items-center'>
              12345678
            </div>
            <div className='flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1'>
              <p>1 Area Pro</p>
              <p>BACKYARD</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
            </div>
            <div className='flex w-full w[170px]  justify-center items-center'>
              Joao Da Silva
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ProjectsClient, ProjectsWorker };
