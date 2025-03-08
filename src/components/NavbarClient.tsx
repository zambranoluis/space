"use client";

import React, { useEffect, useState } from "react";
import { Image } from "@heroui/image";
import Link from "next/link";

interface NavbarProps {
  geolocation: string | null;
  clientName: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ geolocation, clientName }) => {
  const [currentLocation, setCurrentLocation] = useState<string>("");

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    if (geolocation) {
      const [lat, lon] = geolocation.split(",").map(Number);
      setLatitude(lat);
      setLongitude(lon);
    }
  }, [geolocation]);

  useEffect(() => {
    // Si no tenemos la latitud y longitud, no hacemos nada
    if (latitude === null || longitude === null) {
      return;
    }

    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
          {
            headers: {
              "User-Agent": "TuNombreDeAplicacion", // Reemplaza con el nombre de tu app
            },
          }
        );

        const data = await response.json();

        // Verificamos si la respuesta tiene la propiedad 'address'
        if (data?.address) {
          const { country, state } = data.address;
          const formattedLocation = `${country}, ${state}`;
          setCurrentLocation(formattedLocation);
        } else {
          setCurrentLocation("No se pudo encontrar la ubicación");
        }
      } catch (error) {
        console.error("Error al obtener la ubicación:", error);
        setCurrentLocation("Error al obtener la ubicación");
      }
    };

    fetchLocation();
  }, [latitude, longitude]);

  return (
    <nav className=" flex max-h-[100px]  top-0 bg-black/50 w-full z-[1500] py-4 bgred-300 justify-between items-center  px-4 ">
      <Link id="logoNavbar" className="flex bgred-200" href="/">
        <Image
          className=" place-self-center max-h-[80px]  drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]"
          src="https://github.com/BPM94/SCCTMD/raw/main/logos/logoSpaceCreations.png"
          alt=""
        />
      </Link>
      <div
        id="profileNavbar"
        className="flex cursorpointer justify-center items-center  gap-2 text[#6b776d] text-white h-full bgred-300"
      >
        <div className="flex flex-col max-[350px]:hidden justify-center items-end bggreen-300 ">
          <p className="textcenter text-sm min-[500px]:text-base drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]">
            {clientName}
          </p>
          <p className="textcenter text-xs min[500px]:text-base drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]">
            You current Location is: <br className="sm:hidden" />{" "}
            {currentLocation}
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
