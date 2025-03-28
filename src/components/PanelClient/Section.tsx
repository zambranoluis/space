"use client";

import ProjectsClient from "@/components/Projects/Projects";
import MyProfile from "@/components/MyProfile/MyProfile";
import Purchases from "@/components/Purchases/Purchases";

import { IoCloseOutline } from "react-icons/io5";

import {
  Customer,
  DetailedPurchase,
  GetProjectsByPurchasesId,
} from "@/utils/dataInterfaces";

interface SectionProps {
  closeSiteContainer: () => void;
  asideSelectedOption: string;
  customer: Customer | null;
  purchases: DetailedPurchase[];
  projects: GetProjectsByPurchasesId[];
  setProjects: React.Dispatch<React.SetStateAction<GetProjectsByPurchasesId[]>>;
  purchasesWithProject: string[];
}

const Section: React.FC<SectionProps> = ({
  closeSiteContainer,
  asideSelectedOption,
  customer,
  purchases,
  projects,
  setProjects,
  purchasesWithProject,
}) => {
  return (
    <section
      className="w-full h-full bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url('https://github.com/BPM94/SCCTMD/raw/main/panel-client/panel-clientBg.jpg')`,
      }}
    >
      <div className="relative w-full h-full">
        <div className="absolute w-full h-full gap-8 flex flex-col">
          <div
            id="siteContainer"
            className={` transition-all duration-300 overflow-hidden absolute w-full h-full bgred-300 flex max-md:pl-12 md:justify-center items-center`}
          >
            <div className="max-md:w-[90%] w-[80%] h-[70%] flex bg-white rounded-3xl shadow-md shadow-black">
              <div className="flex flex-col w-full rounded-t-3xl">
                <div className="w-full flex justify-end items-center rounded-t-3xl p-2">
                  <div
                    className="bgrose-400 cursor-pointer"
                    onClick={() => {
                      closeSiteContainer();
                    }}
                  >
                    <IoCloseOutline className="text-xl bgblue-300" />
                  </div>
                </div>
                <div
                  id="site"
                  className={`h-full w-full bggreen-300 overflow-y-scroll noScrollBar rounded-b-3xl`}
                >
                  {asideSelectedOption === "myprofile" && customer && (
                    <MyProfile customer={customer} />
                  )}
                  {asideSelectedOption === "projects" && (
                    <ProjectsClient projects={projects} customer={customer} />
                  )}
                  {asideSelectedOption === "purchases" && (
                    <Purchases
                      purchases={purchases}
                      purchasesWithProject={purchasesWithProject}
                      projects={projects}
                      setProjects={setProjects}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
