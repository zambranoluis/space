"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import { IoCloseOutline } from "react-icons/io5";

import NavbarWorker from "@/components/NavbarWorker";

import AsideWorker from "@/components/AsideWorker";

import ChatModal from "@/components/ChatModal";

import { ProjectsWorker } from "@/components/Projects/Projects";

import History from "@/components/History/History";
import MyProfile from "@/components/MyProfile/MyProfile";
import WorkCalendar from "@/components/Work-Calendar/WorkCalendar";

import { Customer } from "@/utils/dataInterfaces";



function PanelWorker() {
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(true);
  const [asideSelectedOption, setAsideSelectedOption] = useState<string>("projects");

  const [customer, setCustomer] = useState<Customer | null>(null); // Cliente inicializado como `null`

  const getCustomer = async () => {
    try {
      const res = await axios.get<Customer>(
        "http://localhost:4000/space/customers/6789c1afce8c2f0ad7736d00",
      );
      setCustomer(res.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
      } else {
      }
    } finally {
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);

  const toggleAside = () => {
    setIsAsideOpen((prev) => !prev);
  };

  const toggleSiteContainer = (tag: string) => {
    const container = document.getElementById(`siteContainer`);
    if (tag !== asideSelectedOption) {
      if (container?.classList.contains("togglePanel")) {
        setAsideSelectedOption(tag);
        container?.classList.remove("togglePanel");
      } else {
        container?.classList.add("togglePanel");
        setTimeout(() => {
          setAsideSelectedOption(tag);
        }, 300);
        setTimeout(() => {
          container?.classList.remove("togglePanel");
        }, 300);
      }
    } else if (tag === asideSelectedOption) {
      if (container?.classList.contains("togglePanel")) {
        container?.classList.remove("togglePanel");
      }
    }
  };

  const closeSiteContainer = () => {
    const container = document.getElementById(`siteContainer`);
    if (container?.classList.contains("togglePanel")) {
      return;
    } else {
      container?.classList.add("togglePanel");
    }
  };

  return (
    <main className='flex flex-col h-full w-full'>
      <section
        className='w-full h-full bg-cover bg-no-repeat bg-center '
        style={{ backgroundImage: `url('/spacePanelBackground.webp')` }}>
        <div className='relative w-full h-full'>
          <div className='absolute w-full h-full gap-8 flex flex-col'>
            <NavbarWorker />
            <AsideWorker
              toggleAside={toggleAside}
              isAsideOpen={isAsideOpen}
              toggleSiteContainer={toggleSiteContainer}
              asideSelectedOption={asideSelectedOption}
            />
            <div
              id='siteContainer'
              className={` transition-all duration-300 overflow-hidden absolute w-full h-full bgred-300 flex justify-center items-center z-[1000]`}>
              <div className='w-[60%] h-[70%] flex bg-white rounded-3xl shadow-md shadow-black'>
                <div className='flex flex-col w-full rounded-t-3xl'>
                  <div className='w-full  flex justify-end items-center rounded-t-3xl  p-2'>
                    <div
                      className='bgrose-400 cursor-pointer '
                      onClick={() => {
                        closeSiteContainer();
                      }}>
                      <IoCloseOutline className='text-xl bgblue-300' />
                    </div>
                  </div>
                  <div
                    id='site'
                    className={` h-full w-full bggreen-300 overflow-y-scroll noScrollBar rounded-b-3xl`}>
                    {asideSelectedOption === "projects" && <ProjectsWorker />}
                    {asideSelectedOption === "myprofile" && (
                      <MyProfile customer={customer} />
                    )}
                    {asideSelectedOption === "history" && <History />}
                    {asideSelectedOption === "workcalendar" && <WorkCalendar />}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex bgred-200 absolute bottom-[10px] items-end  right-[10px] z-[3000]'>
            <ChatModal />
          </div>
        </div>
      </section>
    </main>
  );
}

export default PanelWorker;
