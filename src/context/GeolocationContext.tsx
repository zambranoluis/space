"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

interface GeolocationContextType {
  geolocation: string | null;
  fetchGeolocation: () => Promise<void>;
}

const GeolocationContext = createContext<GeolocationContextType | undefined>(undefined);

export const GeolocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [geolocation, setGeolocation] = useState<string | null>(null);

  const fetchGeolocation = async () => {
    if (!geolocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = `${position.coords.latitude},${position.coords.longitude}`;
            setGeolocation(location);
            sessionStorage.setItem("geolocation", location);
          },
          () => setGeolocation(null)
        );
      } else {
        setGeolocation(null);
      }
    }
  };

  useEffect(() => {
    const storedLocation = sessionStorage.getItem("geolocation");
    if (storedLocation) {
      setGeolocation(storedLocation);
    }
  }, []);

  return (
    <GeolocationContext.Provider value={{ geolocation, fetchGeolocation }}>
      {children}
    </GeolocationContext.Provider>
  );
};

export const useGeolocation = () => {
  const context = useContext(GeolocationContext);
  if (!context) {
    throw new Error("useGeolocation must be used within a GeolocationProvider");
  }
  return context;
};