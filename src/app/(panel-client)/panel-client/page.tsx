"use client";

import { useEffect, useState, ReactNode, useCallback, use } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { apiService } from "@/services/apiService";

import { IoCloseOutline } from "react-icons/io5";

import NavbarClient from "@/components/NavbarClient";

import AsideClient from "@/components/AsideClient";

import ChatModal from "@/components/ChatModal";

import { ProjectsClient } from "@/components/Projects/Projects";
import MyProfile from "@/components/MyProfile/MyProfile";

import { Purchases } from "@/components/Purchases/Purchases";
import { s } from "framer-motion/client";

interface Customer {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: {
    areaCode: string;
    number: string;
  }[];
  skype: string;
  address: string;
  birthdate: string;
}

function PanelClient() {
  const searchParams = useSearchParams();
  const panel = searchParams.get("panel");
  const isPanelPurchases = panel === "purchases";

  const [asideSelectedOption, setAsideSelectedOption] = useState<string>("");
  useEffect(() => {
    if (isPanelPurchases) {
      setAsideSelectedOption("purchases");
    } else {
      setAsideSelectedOption("projects");
    }
  }, [isPanelPurchases]);

  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(true);
  

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoadingCustomer, setIsLoadingCustomer] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const getCustomer = useCallback(async () => {
    setIsLoadingCustomer(true);
    setError(null);
    try {
      const response = await apiService.getCustomer("678b3cb754c8efd3f5677ee5");
      if (response) {
        // console.log("response customer en panel client: ", response);
        setTimeout(() => {
          setCustomer(response);
        }, 300);
        setIsLoadingCustomer(false);
        // console.log("data customer en panel client: ", response);
      }
    } catch (err: unknown) {
      // if (axios.isAxiosError(err) && err.response) {
      //   setError(`Error: ${err.response.status} - ${err.response.data.message}`);
      // } else {
      //   setError('Error: No se pudo obtener el cliente.');
      // }
    } finally {
      // setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getCustomer();
  }, [getCustomer]);

  const toggleAside = () => {
    setIsAsideOpen((prev) => !prev);
  };

  const toggleSiteContainer = (tag: string) => {
    // console.log("tag: ", tag);
    // console.log("asideSelectedOption: ", asideSelectedOption);
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
        style={{ backgroundImage: `url('/panel-clientBg.jpg')` }}>
        <div className='relative w-full h-full'>
          <div className='absolute w-full h-full gap-8 flex flex-col'>
            <NavbarClient />
            <AsideClient
              toggleAside={toggleAside}
              isAsideOpen={isAsideOpen}
              toggleSiteContainer={toggleSiteContainer}
              asideSelectedOption={asideSelectedOption}
            />
            <div
              id='siteContainer'
              className={`bgred-400 transition-all duration-300 overflowhidden absolute w-full h-full bgred-300 flex max-md:pl-12  md:justify-center items-center `}>
              <div className='max-md:w-[90%] w-[80%] h-[70%] flex bg-white rounded-3xl shadow-md shadow-black'>
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
                    {(asideSelectedOption === "projects" ) && <ProjectsClient />}
                    {asideSelectedOption === "myprofile" && customer && (
                      <MyProfile customer={customer} />
                    )}
                    {(asideSelectedOption === "purchases" ) && <Purchases />}
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

export default PanelClient;
