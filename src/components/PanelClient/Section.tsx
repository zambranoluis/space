"use client"

import { ProjectsClient } from "@/components/Projects/Projects";
import MyProfile from "@/components/MyProfile/MyProfile";
import { Purchases } from "@/components/Purchases/Purchases";

import { IoCloseOutline } from "react-icons/io5";


interface Area {
  nameArea: string;
  isActive: boolean;
}

interface Extra {
  extra: {
    name: string;
  };
  isActive: boolean;
}

interface Product {
  name: string;
  type: string;
}

interface Purchase {
  _id: string;
  product: Product;
  selectedAreas: Area[];
  extras: Extra[];
  total: number;
  status: string;
}

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




interface SectionProps {
  closeSiteContainer: () => void;
  asideSelectedOption: string;
  customer: Customer | null;
  purchases: Purchase[];
}

const Section: React.FC<SectionProps> = ({
  closeSiteContainer,
  asideSelectedOption,
  customer,
  purchases}) => {
  return (
    <section
        className='w-full h-full bg-cover bg-no-repeat bg-center '
        style={{ backgroundImage: `url('https://github.com/BPM94/SCCTMD/raw/main/panel-client/panel-clientBg.jpg')` }}>
        <div className='relative w-full h-full'>
          <div className='absolute w-full h-full gap-8 flex flex-col'>
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
                    {asideSelectedOption === "projects" && <ProjectsClient />}
                    {(asideSelectedOption === "myprofile" && customer) && (
                      <MyProfile customer={customer} />
                    )}
                    {asideSelectedOption === "purchases" && <Purchases purchases={purchases} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default Section;