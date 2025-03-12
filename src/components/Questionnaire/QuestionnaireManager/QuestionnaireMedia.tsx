"use client";
import { useEffect, useState } from "react";
import { Image } from "@heroui/image";

import Swal from "sweetalert2";

import { apiService } from "@/services/apiService";

import { ViewFiles } from "@/utils/dataInterfaces";
import { de } from "date-fns/locale";

const BACK_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace("/space", "");

interface QuestionnaireMediaProps {
  isAnsweredExtra: boolean[];
  projectId: string | undefined;
  imagesData: {
    [key: string]: string[];
  };
  setIsMediaUploaded: React.Dispatch<
    React.SetStateAction<{
      rawArea: boolean;
      sketchs: boolean;
      extras: boolean;
    }>
  >;
}

const QuestionnaireMedia: React.FC<QuestionnaireMediaProps> = ({
  isAnsweredExtra,
  projectId,
  imagesData,
  setIsMediaUploaded,
}) => {
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
      const response = await apiService.uploadFiles(formData);
      console.log("Images uploaded successfully");
      console.log("response: ", response);
      setIsMediaUploaded((prev) => ({
        ...prev,
        [category]: true,
      }));
      Swal.fire({
        icon: "success",
        title: "Images from Area to be worked on uploaded successfully",
        showConfirmButton: false,
        timer: 1500,
      });
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
      setIsMediaUploaded((prev) => ({
        ...prev,
        [category]: true,
      }));
      Swal.fire({
        icon: "success",
        title: "Images from Sketches uploaded successfully",
        showConfirmButton: false,
        timer: 1500,
      });
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
      setIsMediaUploaded((prev) => ({
        ...prev,
        [category]: true,
      }));
      Swal.fire({
        icon: "success",
        title: "Images from Extras uploaded successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleSubmitFiles = async (category: string) => {
    console.log("preparing to upload images2: ", images2);

    switch (category) {
      case "rawArea":
        if (images1.length === 0) {
          Swal.fire({
            icon: "error",
            title: "No images selected for Area to be worked on",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        const formDataRaw = new FormData();
        formDataRaw.append("project", projectId || "");
        formDataRaw.append("category", category);

        for (const [index, imageBlob] of images1.entries()) {
          const response = await fetch(imageBlob); // Descargar el blob
          const blob = await response.blob(); // Convertirlo a Blob
          const extension = blob.type.split("/")[1]; // Obtener la extensión basada en el tipo MIME
          const fileName = `image_${index}.${extension}`; // Crear un nombre de archivo dinámico
          const file = new File([blob], fileName, { type: blob.type }); // Convertirlo a File
          formDataRaw.append("files", file);
        }

        console.log("FormData content:");
        for (const pair of formDataRaw.entries()) {
          console.log(pair[0], pair[1]); // Muestra cada clave y su valor
        }

        try {
          await apiService.uploadFiles(formDataRaw);
          console.log("Images uploaded successfully");
          setIsMediaUploaded((prev) => ({
            ...prev,
            [category]: true,
          }));
          Swal.fire({
            icon: "success",
            title: "Images for Area to be worked on uploaded successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error("Error uploading images 1:", error);
        }
        break;

      case "sketchs":
        if (images2.length === 0) {
          Swal.fire({
            icon: "error",
            title: "No images selected for Sketches",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        const formDataSketches = new FormData();
        formDataSketches.append("project", projectId || "");
        formDataSketches.append("category", category);

        for (const [index, imageBlob] of images2.entries()) {
          const response = await fetch(imageBlob); // Descargar el blob
          const blob = await response.blob(); // Convertirlo a Blob
          const extension = blob.type.split("/")[1]; // Obtener la extensión basada en el tipo MIME
          const fileName = `image_${index}.${extension}`; // Crear un nombre de archivo dinámico
          const file = new File([blob], fileName, { type: blob.type }); // Convertirlo a File
          formDataSketches.append("files", file);
        }

        console.log("FormDataSketches content:");
        for (const pair of formDataSketches.entries()) {
          console.log(pair[0], pair[1]); // Muestra cada clave y su valor
        }

        try {
          await apiService.uploadFiles(formDataSketches);
          console.log("Images for sketches uploaded successfully");
          setIsMediaUploaded((prev) => ({
            ...prev,
            [category]: true,
          }));
          Swal.fire({
            icon: "success",
            title: "Images for Sketches uploaded successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error("Error uploading images 2:", error);
        }
        break;

      case "extras":
        if (images3.length === 0) {
          Swal.fire({
            icon: "error",
            title: "No images selected for Extras",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        const formDataExtras = new FormData();
        formDataExtras.append("project", projectId || "");
        formDataExtras.append("category", category);

        for (const [index, imageBlob] of images3.entries()) {
          const response = await fetch(imageBlob); // Descargar el blob
          const blob = await response.blob(); // Convertirlo a Blob
          const extension = blob.type.split("/")[1]; // Obtener la extensión basada en el tipo MIME
          const fileName = `image_${index}.${extension}`; // Crear un nombre de archivo dinámico
          const file = new File([blob], fileName, { type: blob.type }); // Convertirlo a File
          formDataExtras.append("files", file);
        }

        console.log("FormDataExtras content:");
        for (const pair of formDataExtras.entries()) {
          console.log(pair[0], pair[1]); // Muestra cada clave y su valor
        }

        try {
          await apiService.uploadFiles(formDataExtras);
          console.log("Images for Extras uploaded successfully");
          setIsMediaUploaded((prev) => ({
            ...prev,
            [category]: true,
          }));
          Swal.fire({
            icon: "success",
            title: "Images for uploaded successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error("Error uploading images 2:", error);
        }
        break;
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
              className={`flex max-sm:w-[60%] sm:w-[80%] bgred-300 gap-6 items-center p-2 overflow-x-auto whitespace-nowrap flex-nowrap`}
            >
              {imagesData.rawArea.length > 0 ? (
                imagesData.rawArea.map((image, index) => (
                  <div key={index}>
                    <Image
                      src={`${BACK_URL}${image}`}
                      alt={`Image ${index}`}
                      className="roundednone shadow-black shadow-sm min-w-[150px] max-w-[150px] aspect-square object-cover"
                    />
                  </div>
                ))
              ) : images1.length > 0 ? (
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
                handleSubmitFiles("rawArea");
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
          <div className="flex w-full justify-center items-center h-[250px] p-2">
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
              className={`flex max-sm:w-[60%] sm:w-[80%] bgred-300 gap-6 items-center p-2 overflow-x-auto whitespace-nowrap flex-nowrap`}
            >
              {imagesData.sketchs.length > 0 ? (
                imagesData.sketchs.map((image, index) => (
                  <div key={index}>
                    <Image
                      src={`${BACK_URL}${image}`}
                      alt={`Image ${index}`}
                      className="roundednone shadow-black shadow-sm min-w-[150px] max-w-[150px] aspect-square object-cover"
                    />
                  </div>
                ))
              ) : images2.length > 0 ? (
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
                handleSubmitFiles("sketchs");
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
          <div className="flex w-full justify-center items-center h-[250px] p-2">
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
              className={`flex max-sm:w-[60%] sm:w-[80%] bgred-300 gap-6 items-center p-2 overflow-x-auto whitespace-nowrap flex-nowrap`}
            >
              {imagesData.extras.length > 0 ? (
                imagesData.sketchs.map((image, index) => (
                  <div key={index}>
                    <img
                      src={`${BACK_URL}${image}`}
                      alt={`Image ${index}`}
                      className="roundednone shadow-black shadow-sm min-w-[150px] max-w-[150px] aspect-square object-cover"
                    />
                  </div>
                ))
              ) : images3.length > 0 ? (
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
                handleSubmitFiles("extras");
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
