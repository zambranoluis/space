"use client";

import { Image } from "@nextui-org/image";
import Link from "next/link";

const portfolio = [
  {
    name: "PROJECT 1",
    beforePictures: [
      {
        url: "/portfolio/p1b1.jpg"
      },
      {
        url: "/portfolio/p1b2.jpg"
      },
      {
        url: "/portfolio/p1b3.jpg"
      },
      {
        url: "/portfolio/p1b4.jpg"
      }
    ],
    style: "Traditional",
    stylePicture: "/portfolio/p1s.jpg",
    proposalPictures: [
      {
        url: "/portfolio/p1p1.jpg"
      },
      {
        url: "/portfolio/p1p2.jpg"
      },
      {
        url: "/portfolio/p1p3.jpg"
      },
      {
        url: "/portfolio/p1p4.jpg"
      },
      {
        url: "/portfolio/p1p5.jpg"
      },
      {
        url: "/portfolio/p1p6.jpg"
      },
      {
        url: "/portfolio/p1p7.jpg"
      }
    ]
  },
  {
    name:"PROJECT 2",
    beforePictures: [
      {
        url: "/portfolio/p2b1.jpg"
      },
      {
        url: "/portfolio/p2b2.jpg"
      },
      {
        url: "/portfolio/p2b3.jpg"
      },
      {
        url: "/portfolio/p2b4.jpg"
      }
    ],
    style: "Modern",
    stylePicture: "/portfolio/p2s.jpg",
    proposalPictures: [
      {
        url: "/portfolio/p2p1.jpg"
      },
      {
        url: "/portfolio/p2p2.jpg"
      },
      {
        url: "/portfolio/p2p3.jpg"
      },
      {
        url: "/portfolio/p2p4.jpg"
      },
      {
        url: "/portfolio/p2p5.jpg"
      },
      {
        url: "/portfolio/p2p6.jpg"
      },
      {
        url: "/portfolio/p2p7.jpg"
      }
    ]
  },
  
]

const Portfolio: React.FC = () => {
  return (
    <main className="flex flex-col bgblue-300 w-full overflow-y-scroll noScrollBar">
      {
        portfolio.map((project, index) => (
          <div className={`${index % 2 === 0 ? "bg-[#322727]" : "bg-[#6d786f]"}`} key={index}>
            <div className="flex justify-start items-center  w-[150px] pl-2 pt-2">
              <Link href="/">
                <Image className="" src="https://github.com/BPM94/SCCTMD/raw/main/logoSpaceCreations.png" />
              </Link>
            </div>
            <section className={` flex max-md:flex-col  gap-2 p-4`}>
              <div id="projectName" className="projectName flex justify-center items-center bgrose-500 md:px-12 ">
                <h1 className={`${index % 2 === 0 ? "text-[#5f5252]" : "text-[#89968b]"}  flex md:-rotate-180   max-md:text-center font-black text-3xl md:text-6xl `}>{project.style}</h1>
              </div>
              <div id="projectDetails" className="bgslate-800 flex flex-col gap-6" >
                <div id="media" className="bgblue-400 flex flex-col gap-4">
                  <div id="beforeAndStyle" className="flex bgblue-300 max-md:flex-col gap-4 ">
                    <div id="before" className="bggreen-800 gap-2 flex flex-col p2 ">
                      <div id="">
                        <h2 className="text-white font-bold">Before</h2>
                      </div>
                      <div className={` bgred-300 flex h-full flex-col  border-2  ${index % 2 === 0 ? "border-[#665858]" : "border-[#b6c6b8]"}`}>
                        <div className="grid max-md:grid-cols-2 h-full place-content-center place-items-center sm:grid-cols-4 bgred-200  py-4 px-6 gap-4">
                          {
                            project.beforePictures.map((picture, index) => (
                              <div className="bgred-300 flex w-full justify-center items-center h-full  items-" key={index}>
                                <Image className="  object-cover object-center rounded-none border-none outline-none" src={picture.url} alt="" />
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                    <div id="style" className="bgorange-800   flex flex-col  ">
                      <div className=" ">
                        <h2 className="text-white font-bold">{project.style} Style</h2>
                      </div>
                      <div className={`bgslate-800 justify-center items-center flex border-2   ${index % 2 === 0 ? "border-[#665858]" : "border-[#b6c6b8]"}`}>
                        <Image className="  object-cover rounded-none border-none outline-none" src={project.stylePicture} alt="" />
                      </div>
                    </div>
                  </div>
                  <div id="proposal" className=" bgpurple-500 h[400px]  gap-2 flex flex-col ">
                    <div className=" ">
                      <h2 className="text-white font-bold">Proposal</h2>
                    </div>
                    <div className={`bgslate-800 border-2 flex px-6 py-4  ${index % 2 === 0 ? "border-[#665858]" : "border-[#b6c6b8] "}`}>
                      <div id="left" className="w-[40%] p-2 flex bgred-300">
                        <Image className="  object-cover h-full  rounded-none border-none outline-none" src={project.proposalPictures[0].url} alt="" />
                      </div>
                      <div id="right" className="flex flex-col w-[60%] bgblue-300">
                        <div id="first" className="flex">
                          <div className="p-2">
                            <Image className="  object-cover   rounded-none border-none outline-none" src={project.proposalPictures[1].url} alt="" />
                          </div>
                          <div className="p-2">
                            <Image className="  object-cover   rounded-none border-none outline-none" src={project.proposalPictures[2].url} alt="" />
                          </div>
                        </div>
                        <div className="flex">
                          <div id="second" className="flex  bgred-300">
                            <div className="p-2">
                              <Image className="  object-cover  rounded-none border-none outline-none" src={project.proposalPictures[3].url} alt="" />
                            </div>
                            <div className="p-2">
                              <Image className="  object-cover  rounded-none border-none outline-none" src={project.proposalPictures[4].url} alt="" />
                            </div>
                          </div>
                          <div id="third" className="flex flex-col  p2 bgred-300 ">
                            <div className="p-2">
                              <Image className=" object-cover   rounded-none border-none outline-none" src={project.proposalPictures[5].url} alt="" />
                            </div>
                            <div className="p-2">
                              <Image className=" bgblue-400 object-cover   rounded-none border-none outline-none" src={project.proposalPictures[6].url} alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="description" className={`${index % 2 === 0 ? "text-[#636161]" : "text-white"} text-justify text-xs sm:text-sm bgyellow-400 gap-2 p-3`}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque, dicta deleniti rerum sapiente saepe veritatis harum consectetur totam nesciunt culpa voluptate sequi error tenetur illum at a blanditiis nisi vel! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore veniam ad cupiditate impedit autem odio deserunt recusandae officiis ducimus harum veritatis a, soluta sapiente commodi sunt qui dolorem possimus. Unde? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis vero, omnis, ab voluptas consequatur mollitia sapiente odio laudantium unde temporibus excepturi nobis animi numquam ducimus quod nihil dolorum! Tempore, ipsa?
                </div>
              </div>
            </section>
          </div>
        ))
      }
    </main>
  );
}

export default Portfolio;