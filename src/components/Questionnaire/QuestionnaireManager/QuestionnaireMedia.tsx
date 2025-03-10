"use client";
import { useEffect, useState } from "react";
import { Image } from "@heroui/image";

import { apiService } from "@/services/apiService";

interface QuestionnaireMediaProps {
  isAnsweredExtra: boolean[];
  projectId: string | undefined;
}

const QuestionnaireMedia: React.FC<QuestionnaireMediaProps> = ({
  isAnsweredExtra,
  projectId,
}) => {
  const [imagesData, setImagesData] = useState<string[]>([]);

  const [images1, setImages1] = useState<string[]>([]);
  const [images2, setImages2] = useState<string[]>([]);
  const [images3, setImages3] = useState<string[]>([]);

  const handleFileChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setImages1((prevImages) => [...prevImages, ...newImages]);
  };

  const handleSubmitFiles1 = async (category: string) => {
    console.log("preparing to upload images1: ", images1);

    if (images1.length === 0) {
      console.error("No images selected");
      return;
    }

    const formData = new FormData();
    formData.append("project", projectId || "");
    formData.append("category", category);

    for (const [index, imageBlob] of images1.entries()) {
      const response = await fetch(imageBlob); // Descargar el blob
      const blob = await response.blob(); // Convertirlo a Blob
      const extension = blob.type.split("/")[1]; // Obtener la extensión basada en el tipo MIME
      const fileName = `image_${index}.${extension}`; // Crear un nombre de archivo dinámico
      const file = new File([blob], fileName, { type: blob.type }); // Convertirlo a File
      formData.append("files", file);
    }

    console.log("FormData content:");
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]); // Muestra cada clave y su valor
    }

    try {
      await apiService.uploadFiles(formData);
      console.log("Images uploaded successfully");
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleFileChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setImages2((prevImages) => [...prevImages, ...newImages]);
  };

  const handleSubmitFiles2 = async (category: string) => {
    console.log("preparing to upload images2: ", images2);

    if (images2.length === 0) {
      console.error("No images selected");
      return;
    }

    const formData = new FormData();
    formData.append("project", projectId || "");
    formData.append("category", category);

    for (const [index, imageBlob] of images2.entries()) {
      const response = await fetch(imageBlob); // Descargar el blob
      const blob = await response.blob(); // Convertirlo a Blob
      const extension = blob.type.split("/")[1]; // Obtener la extensión basada en el tipo MIME
      const fileName = `image_${index}.${extension}`; // Crear un nombre de archivo dinámico
      const file = new File([blob], fileName, { type: blob.type }); // Convertirlo a File
      formData.append("files", file);
    }

    console.log("FormData content:");
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]); // Muestra cada clave y su valor
    }

    try {
      await apiService.uploadFiles(formData);
      console.log("Images uploaded successfully");
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleFileChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setImages3((prevImages) => [...prevImages, ...newImages]);
  };

  const handleSubmitFiles3 = async (category: string) => {
    console.log("preparing to upload images3: ", images3);

    if (images3.length === 0) {
      console.error("No images selected");
      return;
    }

    const formData = new FormData();
    formData.append("project", projectId || "");
    formData.append("category", category);

    for (const [index, imageBlob] of images3.entries()) {
      const response = await fetch(imageBlob); // Descargar el blob
      const blob = await response.blob(); // Convertirlo a Blob
      const extension = blob.type.split("/")[1]; // Obtener la extensión basada en el tipo MIME
      const fileName = `image_${index}.${extension}`; // Crear un nombre de archivo dinámico
      const file = new File([blob], fileName, { type: blob.type }); // Convertirlo a File
      formData.append("files", file);
    }

    console.log("FormData content:");
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]); // Muestra cada clave y su valor
    }

    try {
      await apiService.uploadFiles(formData);
      console.log("Images uploaded successfully");
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <section
      id="customerUploads"
      className={`${
        isAnsweredExtra[isAnsweredExtra.length - 1] ? "" : "hidden"
      } w-full flex flex-col bgred-300 justify-center items-center gap-12 py-8`}
    >
      <div
        id="title"
        className="flex flex-col sm:flex-row bggreen-300 max-sm:h-[500px] sm:h-[300px] w-[85%] rounded-3xl  border-2 border-[#68664d]"
      >
        <div className="flex  sm:w-[50%] justify-center items-center max-sm:h-[200px] text-[#68664d]">
          <h1 className="text-3xl lg:text-5xl max-sm:text-center sm:pl-16">
            Customer Uploads
          </h1>
        </div>
        <div
          className="bg-[#68664d] sm:w-[50%] max-sm:h-[300px]  h-full w-full bg-cover bg-center bg-no-repeat max-sm:rounded-b-[20px] sm:rounded-r-[20px]"
          style={{
            backgroundImage:
              "url('https://github.com/BPM94/SCCTMD/raw/main/questionnaire/questionnaireBgCostumerUploads.webp')",
          }}
        ></div>
      </div>
      <div id="filesContainer" className="flex flex-col w-[90%] gap-12">
        <div
          id="f1"
          className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#e6e7eb] justify-center items-center"
        >
          <div className="flex bg-[#6c786e] relative pt-4 pl-8 pb-6 text-xl  rounded-t-3xl w-full">
            <div className="w-full bggreen-300 p-2 flex">
              <h1 className="bgred-200 font-light">
                Please upload here: The photos of the area to be worked on
              </h1>
            </div>
          </div>
          <div className="flex w-full justify-center items-center h-[250px] p-2">
            <div className="flex max-sm:w-[40%]  sm:w-[20%] bgblue-300  justify-center items-center">
              <div className="flex">
                <label
                  htmlFor="files1"
                  className="flex bg-[#6c786e] p-3 rounded-full cursor-pointer shadow-black shadow-sm"
                >
                  <Image
                    className="w-[40px] aspect-square object-contain"
                    src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-13.png"
                    alt=""
                  />
                </label>
                <input
                  id="files1"
                  name="files1"
                  className="hidden"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(event) => handleFileChange1(event)}
                />
              </div>
            </div>
            {/* Miniaturas de imágenes subidas */}
            <div
              className={`flex max-sm:w-[60%] sm:w-[80%] bgred-300 gap-6 ${
                images1.length === 0 ? "justify-center" : ""
              } items-center p-2 overflow-x-auto whitespace-nowrap flex-nowrap`}
            >
              {images1.length > 0 ? (
                images1.map((src, index) => (
                  <Image
                    key={index}
                    className="roundednone shadow-black shadow-sm min-w-[150px] max-w-[150px] aspect-square object-cover"
                    src={src}
                    alt={`Uploaded preview ${index + 1}`}
                  />
                ))
              ) : (
                // Placeholder si no hay imágenes subidas
                <>
                  <Image
                    className="h-full   rounded-none "
                    src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png"
                    alt=""
                  />
                  <Image
                    className="h-full   rounded-none max-sm:hidden"
                    src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png"
                    alt=""
                  />
                  <Image
                    className="h-full   rounded-none max-md:hidden"
                    src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png"
                    alt=""
                  />
                  <Image
                    className="h-full   rounded-none max-lg:hidden"
                    src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png"
                    alt=""
                  />
                  <Image
                    className="h-full  rounded-none max-xl:hidden"
                    src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png"
                    alt=""
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex w-full justify-end items-center p-4">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg cursor-pointer shadow-black shadow-sm"
              onClick={() => {
                handleSubmitFiles1("rawArea");
              }}
            >
              Submit files
            </button>
          </div>
        </div>
        <div
          id="f2"
          className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#e6e7eb] justify-center items-center"
        >
          <div className="flex bg-[#6c786e] relative pt-4 pl-8 pb-6 text-xl  rounded-t-3xl w-full">
            <div className="w-full bggreen-300 p-2 flex">
              <h1 className="bgred-200 font-light">
                Please upload here: Sketches of the areas to be worked
              </h1>
            </div>
          </div>
          <div className="flex w-full justify-center items-center h-[250px]">
            <div className="flex max-sm:w-[40%]  sm:w-[20%] bgblue-300  justify-center items-center">
              <div className="flex">
                <label
                  htmlFor="files2"
                  className="flex bg-[#6c786e] p-3 rounded-full cursor-pointer shadow-black shadow-sm"
                >
                  <Image
                    className="w-[40px] aspect-square object-contain"
                    src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-13.png"
                    alt=""
                  />
                </label>
                <input
                  id="files2"
                  name="files2"
                  className="hidden"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(event) => handleFileChange2(event)}
                />
              </div>
            </div>
            <div
              className={`flex max-sm:w-[60%] sm:w-[80%] bgred-300 gap-6 ${
                images2.length === 0 ? "justify-center" : ""
              } items-center p-2 overflow-x-auto whitespace-nowrap flex-nowrap`}
            >
              {images2.length > 0 ? (
                images2.map((src, index) => (
                  <Image
                    key={index}
                    className="roundednone shadow-black shadow-sm min-w-[150px] max-w-[150px] aspect-square object-cover"
                    src={src}
                    alt={`Uploaded preview ${index + 1}`}
                  />
                ))
              ) : (
                // Placeholder si no hay imágenes subidas
                <>
                  <Image
                    className="h-full   rounded-none "
                    src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png"
                    alt=""
                  />
                  <Image
                    className="h-full   rounded-none max-sm:hidden"
                    src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png"
                    alt=""
                  />
                  <Image
                    className="h-full   rounded-none max-md:hidden"
                    src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png"
                    alt=""
                  />
                  <Image
                    className="h-full   rounded-none max-lg:hidden"
                    src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png"
                    alt=""
                  />
                  <Image
                    className="h-full  rounded-none max-xl:hidden"
                    src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png"
                    alt=""
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex w-full justify-end items-center p-4">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg cursor-pointer shadow-black shadow-sm"
              onClick={() => {
                handleSubmitFiles2("sketchs");
              }}
            >
              Submit files
            </button>
          </div>
        </div>
        <div
          id="f3"
          className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#e6e7eb] justify-center items-center"
        >
          <div className="flex bg-[#6c786e] relative pt-4 pl-8 pb-6 text-xl  rounded-t-3xl w-full">
            <div className="w-full bggreen-300 p-2 flex">
              <h1 className="bgred-200 font-light">
                Please upload here: Images of plants and other landscaping
                designs that you like:
              </h1>
            </div>
          </div>
          <div className="flex w-full justify-center items-center h-[250px]">
            <div className="flex max-sm:w-[40%]  sm:w-[20%] bgblue-300  justify-center items-center">
              <div className="flex">
                <label
                  htmlFor="files3"
                  className="flex bg-[#6c786e] p-3 rounded-full cursor-pointer shadow-black shadow-sm"
                >
                  <Image
                    className="w-[40px] aspect-square object-contain "
                    src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-13.png"
                    alt=""
                  />
                </label>
                <input
                  id="files3"
                  name="files3"
                  className="hidden"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(event) => handleFileChange3(event)}
                />
              </div>
            </div>
            <div
              className={`flex max-sm:w-[60%] sm:w-[80%] bgred-300 gap-6 ${
                images3.length === 0 ? "justify-center" : ""
              } items-center p-2 overflow-x-auto whitespace-nowrap flex-nowrap`}
            >
              {images3.length > 0 ? (
                images3.map((src, index) => (
                  <Image
                    key={index}
                    className="roundednone shadow-black shadow-sm min-w-[150px] max-w-[150px] aspect-square object-cover"
                    src={src}
                    alt={`Uploaded preview ${index + 1}`}
                  />
                ))
              ) : (
                // Placeholder si no hay imágenes subidas
                <>
                  <Image
                    className="h-full   rounded-none "
                    src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png"
                    alt=""
                  />
                  <Image
                    className="h-full   rounded-none max-sm:hidden"
                    src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png"
                    alt=""
                  />
                  <Image
                    className="h-full   rounded-none max-md:hidden"
                    src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png"
                    alt=""
                  />
                  <Image
                    className="h-full   rounded-none max-lg:hidden"
                    src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png"
                    alt=""
                  />
                  <Image
                    className="h-full  rounded-none max-xl:hidden"
                    src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png"
                    alt=""
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex w-full justify-end items-center p-4">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg cursor-pointer shadow-black shadow-sm"
              onClick={() => {
                handleSubmitFiles3("extras");
              }}
            >
              Submit files
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionnaireMedia;
