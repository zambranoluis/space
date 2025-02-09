import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface ProfileData {
  name?: string;
  email?: string;
}

interface DataContextProps {
  profileData: ProfileData | null;
  setProfileData: (data: ProfileData | null) => void;
  geolocation: string | null;
  fetchGeolocation: () => Promise<void>;
  clearData: () => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const useDataContext = (): DataContextProps => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
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

  const clearData = () => {
    setProfileData(null);
    setGeolocation(null);
    sessionStorage.removeItem("geolocation");
  };

  return (
    <DataContext.Provider
      value={{
        profileData,
        setProfileData,
        geolocation,
        fetchGeolocation,
        clearData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
