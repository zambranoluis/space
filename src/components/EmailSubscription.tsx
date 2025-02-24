"use client";

import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";



const EmailSubscription = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  return (
    <div className="flex flex-col bgred-300">
      <div className="flex mt-4">
        <button className="bg-[#848d5c] text-white px-4 py-2 rounded-xl" onClick={onOpen}>
          Subscription form
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
                      <div className="flex bg-red-300 justify-center relative">
                        <button className="bg-[#6b776d] text-white rounded-bl-xl rounded-tr-xl px-4 py-1 hover:bg-green-950 text-sm font-semibold absolute top-[10px]">
                          Submit Email
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
);
}

export default EmailSubscription;