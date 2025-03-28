'use client'

import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";


import { MdOutlineEmail } from "react-icons/md";



const FaqsContactUsEmail = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex bg-[#6b776d]/70 px-4 py-6 text-white w-[200px] h-[200px]  ">
      <div className="flex flex-col bgred-300">
        <MdOutlineEmail className="text-5xl bgblue-300" />
        <div className="flex text-left">
          <p className="text-sm font-semibold leading-4 ">Do you have<br />any questions?<br />Write to us and we will answer your questions</p>
        </div>
        <div className="flex mt-4">
          <button className=" bg-white text-[#6b776d] rounded-lg"
          onClick={onOpen}
          >
            <p className="text-xs px-3 py-2  ">Click here</p>
          </button>
          <div className="bggreen-300 ">
            <Modal
              className="bgred-300 rounded-3xl absolute z-[5000]  top-[150px] sm:top-[80px] shadow-[0px_0px_30px_rgba(50,50,50,1)] "
              size="md"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            >
              <ModalContent className=''>
                {() => (
                  <div className="flex flex-col p-4 bg-white">
                    <ModalBody>
                      <div className="flex flex-col">
                        <h2 className="font-regular text-black">Our Email: </h2>
                        <p className="text-[#858e5b] font-black">space-creation@space-creation.net</p>
                      </div>
                      <form className="flex flex-col gap-4 bg-[#f5f5f5] px-6 py-6 rounded-3xl" onSubmit={(e) => {e.preventDefault();}}>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col">
                            <h2 className="font-regular text-black">Your Name: </h2>
                            <input className="border-2 bg-white text-black border-gray-300 rounded-full p-3 pl-6" type="email" name="email" id="email" placeholder="John Doe" required />
                          </div>
                          <div className="flex flex-col">
                            <h2 className="font-regular text-black">Your Email: </h2>
                            <input className={`border-2 bg-white text-black  border-gray-300 rounded-full p-3 pl-6`} type="email" name="email" id="email" placeholder="john.doe@email.com" required />
                          </div>
                        </div>
                        <div className="flex">
                          <textarea className="bg-white text-black pl-6 w-full h-[250px] border-2 border-gray-300 rounded-3xl p-4" name="" id="" placeholder="Let us know your questions here..."></textarea>
                        </div>
                        <div className="flex bg-red-300 justify-center relative">
                          <button className="bg-[#6b776d] text-white rounded-bl-xl rounded-tr-xl px-4 py-1 hover:bg-green-950 text-sm font-semibold absolute top-[10px]">
                            Send Message
                          </button>
                        </div>
                      </form>
                    </ModalBody>
                  </div>
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}


export { FaqsContactUsEmail };