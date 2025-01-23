"use client";

import { useEffect, useState, ReactNode, useCallback, use } from "react";

import { TiArrowSortedDown } from "react-icons/ti";

import { Image } from "@nextui-org/image";

import {projects} from "../../app/(panel-client)/panel-client/steps";

import { apiService } from "@/services/apiService";





import {Tabs, Tab} from "@nextui-org/tabs";

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";

import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";

import {Tooltip} from "@nextui-org/tooltip";


import { FaUserCheck } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

import { MdOutlineFolderCopy } from "react-icons/md";
import { LuFolderCheck } from "react-icons/lu";
import { LuFolderClock } from "react-icons/lu";
import { LuFolderSync } from "react-icons/lu";
import { LuFolderSymlink } from "react-icons/lu";
import { LuFolderX } from "react-icons/lu";

import { FaTags } from "react-icons/fa6";





import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaUserPen } from "react-icons/fa6";
import { FaBan } from "react-icons/fa";



export interface Product {
  _id: string;
  name: string;
  type: string;
  area: number;
  image: string;
  include: [];
  extra: [
    {
      _id: string;
      name: string;
      description: string;
      items: [];
      cost: number;
      price: number;
      isActive: boolean;
    }
  ];
  cost: number;
  price: number;
  picture: string;
}

export interface Purchase {
  customer: string;
  selectedAreas: [
    {
      nameArea: string;
      isActive: boolean;
    },
    {
      nameArea: string;
      isActive: boolean;
    }
  ],
  product: Product;
  extras: [
    {
      extra: string;
      isActive: boolean;
    },
    {
      extra: string;
      isActive: boolean;
    },
    {
      extra: string;
      isActive: boolean;
    },
    {
      extra: string;
      isActive: boolean;
    }
  ];
  price: number;
  status: string;
  isActive: boolean;
}

interface PurchasesProps {
  customerId: string;
}


export const Purchases: React.FC<PurchasesProps> = ({ customerId }) => {
  

  const [currentClients, setCurrentClients] = useState<string | null>("All Purchases");

  const svgIcons = [
    {
      icon: <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
      width="25pt" height="25pt" viewBox="0 0 1018.000000 849.000000"
      preserveAspectRatio="xMidYMid meet">
     
     <g transform="translate(0.000000,849.000000) scale(0.100000,-0.100000)"
     fill={`${currentClients === "Pending" ? "#FFFFFF" : "#6b776d"}`} stroke="none">
     <path d="M6550 8070 c-283 -43 -497 -230 -579 -506 -21 -70 -21 -86 -21 -864
     0 -776 0 -794 21 -864 73 -249 260 -431 504 -493 63 -16 127 -18 655 -18 l585
     0 42 27 c53 35 77 79 77 144 0 64 -35 122 -91 150 -36 18 -73 19 -623 24
     l-585 5 -48 24 c-61 30 -138 107 -169 169 l-23 47 -3 478 -3 477 1378 -2 1378
     -3 5 -160 c4 -134 8 -164 24 -187 70 -104 236 -93 292 19 18 35 19 68 22 428
     2 247 -1 426 -8 489 -20 177 -77 293 -205 421 -63 63 -98 90 -165 122 -166 82
     -80 77 -1310 79 -602 1 -1120 -2 -1150 -6z m2299 -375 c71 -39 130 -98 161
     -160 21 -43 25 -69 30 -178 3 -88 1 -132 -6 -138 -7 -5 -560 -8 -1375 -7
     l-1364 3 1 130 c1 148 15 192 80 265 49 54 83 78 147 101 50 18 95 18 1162 16
     l1110 -2 54 -30z"/>
     <path d="M6720 6328 c-52 -36 -73 -71 -78 -131 -10 -129 105 -218 223 -173
     136 53 152 240 25 307 -50 27 -128 25 -170 -3z"/>
     <path d="M7414 6331 c-123 -75 -118 -244 10 -302 35 -16 68 -19 237 -19 120 0
     209 4 230 11 69 23 119 94 119 168 0 41 -40 110 -78 136 -36 25 -39 25 -262
     25 -203 0 -228 -2 -256 -19z"/>
     <path d="M8783 6155 c-70 -42 -101 -134 -69 -208 7 -18 66 -84 130 -147 63
     -63 116 -118 116 -122 0 -4 -145 -9 -322 -10 -366 -3 -373 -5 -424 -81 -53
     -80 -29 -187 54 -239 36 -23 43 -23 365 -26 180 -2 327 -6 327 -10 0 -3 -56
     -63 -124 -132 -133 -134 -146 -158 -132 -235 8 -40 55 -99 97 -121 33 -17 96
     -18 136 -3 33 12 563 536 599 591 28 44 32 104 8 151 -22 44 -550 574 -596
     598 -52 27 -114 24 -165 -6z"/>
     <path d="M2290 5735 c-111 -38 -172 -75 -245 -149 -71 -72 -120 -154 -147
     -248 -16 -55 -24 -1903 -9 -1958 5 -19 15 -57 22 -85 19 -75 55 -151 109 -229
     34 -49 380 -402 1097 -1118 859 -858 1062 -1055 1126 -1097 71 -46 107 -60
     283 -112 39 -12 199 -12 222 0 9 5 42 14 72 21 76 17 171 62 243 114 34 24
     431 415 882 868 902 905 876 875 925 1048 11 41 26 91 31 110 23 79 -7 274
     -61 396 -52 119 -105 175 -1177 1245 -811 809 -1082 1075 -1128 1102 -69 41
     -137 67 -247 97 -76 19 -100 20 -1005 19 l-928 -1 -65 -23z m961 -909 c73 -17
     134 -53 186 -109 54 -58 79 -108 93 -185 29 -163 -60 -327 -218 -400 -48 -22
     -71 -27 -142 -27 -71 0 -94 5 -142 27 -32 15 -73 39 -92 53 -74 57 -136 186
     -136 284 0 158 119 314 271 355 68 19 110 19 180 2z"/>
     </g>
    </svg>
    },
    {
      icon: <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
      width="25pt" height="25pt" viewBox="0 0 1018.000000 849.000000"
      preserveAspectRatio="xMidYMid meet">
     
     <g transform="translate(0.000000,849.000000) scale(0.100000,-0.100000)"
     fill={`${currentClients === "Development" ? "#FFFFFF" : "#6b776d"}`} stroke="none">
     <path d="M7440 8071 c-8 -5 -41 -11 -72 -15 -32 -3 -83 -13 -115 -22 -32 -9
     -71 -19 -88 -24 -72 -19 -208 -75 -305 -127 -387 -204 -684 -554 -822 -968
     -34 -103 -68 -254 -68 -305 0 -20 -5 -41 -10 -46 -12 -12 -8 -313 4 -394 26
     -174 82 -365 146 -503 124 -270 345 -528 602 -705 72 -50 225 -128 327 -167
     105 -41 310 -95 358 -95 17 0 35 -5 38 -10 8 -13 423 -12 431 1 3 5 21 9 40 9
     48 0 225 45 319 81 44 17 93 35 109 41 54 20 192 96 262 144 586 399 867 1095
     717 1773 -76 344 -218 599 -477 856 -167 167 -353 288 -564 370 -113 43 -309
     95 -362 95 -21 0 -42 5 -45 10 -8 12 -403 13 -425 1z m525 -347 c138 -35 176
     -48 281 -99 408 -197 691 -572 767 -1015 23 -130 21 -354 -2 -477 -62 -321
     -217 -589 -460 -797 -164 -141 -353 -239 -556 -290 -268 -67 -522 -58 -780 28
     -477 160 -833 572 -920 1066 -22 126 -20 379 4 505 27 139 52 211 121 350 178
     359 496 617 888 721 136 36 213 43 397 38 128 -3 180 -9 260 -30z"/>
     <path d="M7490 7398 c-20 -21 -20 -32 -20 -617 1 -453 4 -600 13 -612 16 -21
     574 -427 613 -446 48 -24 78 -3 161 112 58 79 73 107 73 136 0 44 4 41 -245
     219 -110 79 -210 153 -222 164 l-23 19 0 499 0 499 -25 24 c-23 24 -29 25
     -164 25 -131 0 -142 -1 -161 -22z"/>
     <path d="M2290 5735 c-111 -38 -172 -75 -245 -149 -71 -72 -120 -154 -147
     -248 -16 -55 -24 -1903 -9 -1958 5 -19 15 -57 22 -85 19 -75 55 -151 109 -229
     34 -49 380 -402 1097 -1118 859 -858 1062 -1055 1126 -1097 71 -46 107 -60
     283 -112 39 -12 199 -12 222 0 9 5 42 14 72 21 76 17 171 62 243 114 34 24
     431 415 882 868 902 905 876 875 925 1048 11 41 26 91 31 110 23 79 -7 274
     -61 396 -52 119 -105 175 -1177 1245 -811 809 -1082 1075 -1128 1102 -69 41
     -137 67 -247 97 -76 19 -100 20 -1005 19 l-928 -1 -65 -23z m961 -909 c73 -17
     134 -53 186 -109 54 -58 79 -108 93 -185 29 -163 -60 -327 -218 -400 -48 -22
     -71 -27 -142 -27 -71 0 -94 5 -142 27 -32 15 -73 39 -92 53 -74 57 -136 186
     -136 284 0 158 119 314 271 355 68 19 110 19 180 2z"/>
     </g>
    </svg>
    },
    {
      icon: <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
      width="25pt" height="25pt" viewBox="0 0 1018.000000 849.000000"
      preserveAspectRatio="xMidYMid meet">
     
     <g transform="translate(0.000000,849.000000) scale(0.100000,-0.100000)"
     fill={`${currentClients === "Completed" ? "#FFFFFF" : "#6b776d"}`} stroke="none">
     <path d="M8360 7969 c-34 -15 -169 -144 -567 -542 l-523 -522 -232 232 c-245
     244 -270 263 -356 263 -89 0 -185 -63 -217 -142 -22 -57 -21 -137 3 -190 26
     -58 660 -690 714 -713 57 -23 135 -19 194 10 71 35 1264 1230 1293 1295 87
     193 -116 396 -309 309z"/>
     <path d="M9091 7031 c-51 -18 -107 -72 -935 -900 l-881 -881 -394 394 c-272
     273 -410 404 -445 423 -157 86 -346 -30 -346 -211 0 -91 17 -110 546 -638 524
     -522 542 -537 628 -538 102 0 46 -52 1104 1004 541 540 992 996 1003 1014 12
     18 23 57 26 90 10 111 -62 215 -171 247 -62 19 -69 19 -135 -4z"/>
     <path d="M2290 5735 c-111 -38 -172 -75 -245 -149 -71 -72 -120 -154 -147
     -248 -16 -55 -24 -1903 -9 -1958 5 -19 15 -57 22 -85 19 -75 55 -151 109 -229
     34 -49 380 -402 1097 -1118 859 -858 1062 -1055 1126 -1097 71 -46 107 -60
     283 -112 39 -12 199 -12 222 0 9 5 42 14 72 21 76 17 171 62 243 114 34 24
     431 415 882 868 902 905 876 875 925 1048 11 41 26 91 31 110 23 79 -7 274
     -61 396 -52 119 -105 175 -1177 1245 -811 809 -1082 1075 -1128 1102 -69 41
     -137 67 -247 97 -76 19 -100 20 -1005 19 l-928 -1 -65 -23z m961 -909 c73 -17
     134 -53 186 -109 54 -58 79 -108 93 -185 29 -163 -60 -327 -218 -400 -48 -22
     -71 -27 -142 -27 -71 0 -94 5 -142 27 -32 15 -73 39 -92 53 -74 57 -136 186
     -136 284 0 158 119 314 271 355 68 19 110 19 180 2z"/>
     </g>
    </svg>
    },
    {
      icon: <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
      width="25pt" height="25pt" viewBox="0 0 1018.000000 849.000000"
      preserveAspectRatio="xMidYMid meet">
     
     <g transform="translate(0.000000,849.000000) scale(0.100000,-0.100000)"
     fill={`${currentClients === "Canceled" ? "#FFFFFF" : "#6b776d"}`} stroke="none">
     <path d="M7680 8145 c-8 -2 -55 -9 -105 -15 -202 -28 -458 -119 -636 -226
     -636 -384 -955 -1108 -809 -1830 154 -762 791 -1322 1573 -1384 511 -40 1020
     160 1383 543 254 269 410 598 459 970 28 214 12 434 -46 655 -179 683 -751
     1185 -1456 1277 -98 13 -317 19 -363 10z m415 -454 c257 -58 464 -169 641
     -346 193 -192 305 -395 364 -660 19 -82 23 -132 23 -270 1 -149 -2 -184 -25
     -280 -60 -255 -173 -458 -353 -638 -191 -190 -430 -314 -696 -363 -123 -22
     -340 -20 -464 4 -272 54 -479 164 -676 361 -257 257 -382 559 -382 926 0 157
     17 265 65 409 157 468 584 817 1073 876 111 14 328 4 430 -19z"/>
     <path d="M7160 7254 c-125 -70 -224 -220 -189 -286 7 -13 131 -142 277 -286
     l265 -264 -278 -278 c-277 -278 -278 -279 -272 -315 10 -60 49 -124 108 -179
     67 -62 120 -90 172 -90 36 -1 49 11 313 274 l275 275 267 -271 c147 -150 277
     -275 290 -279 92 -27 302 163 302 275 0 33 -19 54 -270 305 -148 148 -270 274
     -270 280 0 5 122 131 270 280 242 243 270 274 270 303 0 108 -173 282 -280
     282 -31 0 -57 -23 -305 -270 -149 -148 -275 -270 -280 -270 -6 0 -132 122
     -280 270 -303 303 -293 297 -385 244z"/>
     <path d="M2290 5735 c-111 -38 -172 -75 -245 -149 -71 -72 -120 -154 -147
     -248 -16 -55 -24 -1903 -9 -1958 5 -19 15 -57 22 -85 19 -75 55 -151 109 -229
     34 -49 380 -402 1097 -1118 859 -858 1062 -1055 1126 -1097 71 -46 107 -60
     283 -112 39 -12 199 -12 222 0 9 5 42 14 72 21 76 17 171 62 243 114 34 24
     431 415 882 868 902 905 876 875 925 1048 11 41 26 91 31 110 23 79 -7 274
     -61 396 -52 119 -105 175 -1177 1245 -811 809 -1082 1075 -1128 1102 -69 41
     -137 67 -247 97 -76 19 -100 20 -1005 19 l-928 -1 -65 -23z m961 -909 c73 -17
     134 -53 186 -109 54 -58 79 -108 93 -185 29 -163 -60 -327 -218 -400 -48 -22
     -71 -27 -142 -27 -71 0 -94 5 -142 27 -32 15 -73 39 -92 53 -74 57 -136 186
     -136 284 0 158 119 314 271 355 68 19 110 19 180 2z"/>
     </g>
    </svg>
    }
  ]

  const typeClients = [
    {
      name: "All Purchases",
      icon: <FaTags className="text-2xl"/>
    },
    {
      name: "Pending",
      icon: svgIcons[0].icon
    },
    {
      name: "Development",
      icon: svgIcons[1].icon
    },
    {
      name: "Completed",
      icon: svgIcons[2].icon
    },
    {
      name: "Canceled",
      icon: svgIcons[3].icon
    },
  ]
  
  
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoadingPurchase, setIsLoadingPurchase] = useState<boolean>(false);

  const getPurchasesByCustomer = useCallback(async () => {
    setIsLoadingPurchase(true);
    try {
      const response = await apiService.getPurchasesByCustomerId("678b3cb754c8efd3f5677ee5");
      if (response) {
        console.log("1- respuesta axios getPurchasesByCustomer", response);
        setPurchases(response.data);
        setIsLoadingPurchase(false);
        console.log("2- data axios getPurchasesByCustomer", response.data);
      }
    } catch (error) {
      
    }
  }, []);
  

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getPurchasesByCustomer();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [getPurchasesByCustomer]);

  useEffect(() => {
    console.log("purchase: ", purchases);
  }, [purchases]);

  const toggleProject = (id: number) => {
    const project = document.getElementById(`project${id}Container`);
    project?.classList.toggle("max-h-0");
  };

  return (
    <div className="flex flex-col w-[90%] h-full place-self-center bgred-200  gap-2 ">
          <div className="flex  place-self-center border-[#6b776d] border-2 text-[#6b776d] rounded-md p2 w-[90%] max-w-[415px] overflow-x-scroll scrollbar-hide">
            {typeClients.map((client, index) => (
              <div className={`flex justify-center items-center p-1 `} key={index}>
                <p className={`${currentClients === client.name ? "bg-[#6b776d] text-white rounded-md" : ""} text-xs transition-all duration-300 select-none flex flex-col text-center justify-center items-center p-2 cursor-pointer whitespace-nowrap  `} onClick={() => { setCurrentClients(client.name) }} ><span className="text-lg ">{client.icon}</span>{client.name}</p>
              </div>
            ))
            }
          </div>
    
          <div className="flex flex-col  h-[80%]  w-full bgblue-400 place-self-center rounded-md border border-[#6b776d] ">
            <div className="w-full flex justify-center p-2 py6 items-center  border-b border-b-[#6b776d] bgblue-400 gap-2">
              <div className="flex  w-full max-w-[400px] bggreen-400rounded-md ">
                <div className="flex w-full ">
                  <input type="text" className="w-full border border-[#6b776d] bg-white pl-2 bgred-400 bg[--color-background] text-[#6b776d]  text[--color-text] p-1 outline-none rounded-l-md  border-r-0 max-[450px]:text-xs " />
                </div>
                <div className="flex h-full p-2 justify-center  items-center bgpink-600 text-[#6b776d] hover:text-white rounded-r-md cursor-pointer hover:bg-[#6b776d]   border border-[#6b776d] ">
                  <FaSearch className="text-xl " />
                </div>
              </div>
            </div>
    
            <div className="grid overflow-y-scroll  h-[90%]  p-2 py-4 gap-6 w-full   bgred-600">
              {
                purchases.map((purchase, index) => (
                  <div className="bgred-300 flex flex-col  p-2" key={index}>
                    <div className="flex flex-col bgblue-200 text-[#6b776d]">
                      <h1 className="text-3xl font-black">Project</h1>
                      <h2 className="text-xl">{purchase.product.name}{" "}{purchase.product.type}</h2>
                    </div>
                    <div className="flex flex-col  text-black">
                      <div className="flex text-xl bg-[#6b776d] place-self-start px-2 py-1">
                        <h2 className="text-white">Selected Areas:</h2>
                      </div>
                      {
                        purchase.selectedAreas.map((area, index) => (
                          (area.isActive && <p key={index}>{area.nameArea}</p>)
                        ))
                      }
                    </div>
                    <div className="flex flex-col text-black">
                      <div className="flex bg-[#6b776d] place-self-start px-2 py-1 ">
                        <h2 className="text-white">Extras:</h2>
                      </div>
                      <div className="flex flex-col text-black">
                        {
                          (purchase.extras.length > 0)
                            ? purchase.extras.map((extra, index) => (
                              <p key={index}>{extra.extra.name}</p>
                            ))
                            : <p>No extras selected</p>
                        }
                      </div>
                    </div>
                    <div className="flex gap-1 text-black">
                      <div className="flex">
                        <h2>Price:</h2>
                      </div>
                      <div className="flex">
                        <p>{purchase.total}</p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            
          </div>
        </div>
  );
}



