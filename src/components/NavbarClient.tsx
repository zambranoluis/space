"use client";
import { Image } from "@nextui-org/image";
import Link from "next/link";




const Navbar: React.FC = ( {  } ) => {

  
  return (
    <nav  className=" flex max-h-[100px]  top-0 bg-black/50 w-full z-[1500] py-4 bgred-300 justify-between items-center  px-4 ">
      <Link id="logoNavbar" className="flex bgred-200" href="/">
        <Image className=" place-self-center max-h-[80px]  drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]"
          src="https://github.com/BPM94/SCCTMD/raw/main/logos/logoSpaceCreations.png"
          alt=""
        />
      </Link>
      <div id="profileNavbar" className="flex cursor-pointer justify-center items-center  gap-2 text[#6b776d] text-white h-full bgred-300">
        <div className="flex flex-col max-[350px]:hidden justify-center items-end bggreen-300 ">
          <p className="textcenter text-xs min[500px]:text-base drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]">arkweb@gmail.com</p>
          <p className="textcenter text-sm min-[500px]:text-base drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]">Claudia Alves</p>
          <p className="textcenter text-xs min[500px]:text-base drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]">Client</p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;