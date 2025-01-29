"use client";

import { Image } from "@nextui-org/image";

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
        url: ""
      },
      {
        url: ""
      },
      {
        url: ""
      },
      {
        url: ""
      },
      {
        url: ""
      },
      {
        url: ""
      },
      {
        url: ""
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
        url: ""
      },
      {
        url: ""
      },
      {
        url: ""
      },
      {
        url: ""
      },
      {
        url: ""
      },
      {
        url: ""
      },
      {
        url: ""
      }
    ]
  },
  
]

const Portfolio: React.FC = () => {
  return (
    <main className="flex flex-col bgblue-300 w-full overflow-y-scroll noScrollBar">
      {
        portfolio.map((project, index) => (
          <section className={`${index % 2 === 0 ? "bg-[#322727]" : "bg-[#6d786f]"} h-screen flex max-md:flex-col  gap-2 p-4`} key={index}>
            {/* <div id="projectName" className="projectName flex justify-center items-center bgrose-500 px-6 ">
              <h1  className="text-[#5f5252] flex md:-rotate-180   max-md:text-center font-black text-3xl md:text-6xl ">{project.name}</h1>
            </div> */}
            {/* <div id="projectDetails" className="bg-slate-800 p-2" >
              <div id="media" className="bgblue-400">
                <div id="beforeAndStyle" className="flex max-md:flex-col">
                  <div id="before" className="bggreen-800 gap-2 flex flex-col p-2">
                    <div id="">
                      <h2 className="text-white font-bold">Before</h2>
                    </div>
                    <div className={`  flex flex-col  border-2  ${index % 2 === 0 ? "border-[#665858]" : "border-[#b6c6b8]"}`}>
                      <div className="grid max-md:grid-cols-2 md:grid-cols-4 bgred-200  py-2 px-4 gap-4">
                        {
                          project.beforePictures.map((picture, index) => (
                            <div className="flex justify-center  items-center bg-cover  bg-no-repeat" key={index}>
                              <Image  className=" w-full h-full object-cover rounded-none border-none outline-none" src={picture.url} alt=""/>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                  <div id="style" className="bgorange-800 gap-2 flex flex-col p-2 ">
                    <div className=" ">
                      <h2 className="text-white font-bold">{project.style} Style</h2>
                    </div>
                    <div className={`bg-slate-800 border-2 ${index % 2 === 0 ? "border-[#665858]" : "border-[#b6c6b8]"}`}>
                      <Image className="w-full object-cover rounded-none border-none outline-none" src={project.stylePicture} alt="" />
                    </div>
                  </div>
                </div>
                <div id="proposal" className="md:h-[500px] bgpurple-500 gap-2 flex flex-col p-2">
                  <div className=" ">
                    <h2 className="text-white font-bold">Proposal</h2>
                  </div>
                  <div className={`bg-slate-800 border-2 h-full  ${index % 2 === 0 ? "border-[#665858]" : "border-[#b6c6b8]"}`}>
                  </div>
                </div>
              </div>
              <div id="description" className={`${index % 2 === 0 ? "text-[#636161]" : "text-white"} text-justify text-xs bg-yellow-400 gap-2 p-3`}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque, dicta deleniti rerum sapiente saepe veritatis harum consectetur totam nesciunt culpa voluptate sequi error tenetur illum at a blanditiis nisi vel! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore veniam ad cupiditate impedit autem odio deserunt recusandae officiis ducimus harum veritatis a, soluta sapiente commodi sunt qui dolorem possimus. Unde? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis vero, omnis, ab voluptas consequatur mollitia sapiente odio laudantium unde temporibus excepturi nobis animi numquam ducimus quod nihil dolorum! Tempore, ipsa?
              </div>
            </div> */}
          </section>
        ))
      }
    </main>
  );
}

export default Portfolio;