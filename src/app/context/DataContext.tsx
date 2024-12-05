import { createContext, useContext, useState, ReactNode } from "react";

interface DataContextProps {
  profileData: ProfileData | null;
  setProfileData: (data: ProfileData | null) => void;
  clearData: () => void;
}

interface ProfileData {
  // Define aquí la estructura de los datos del perfil
  name?: string;
  email?: string;
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

  const clearData = () => {
    setProfileData(null);
  };

  return (
    <DataContext.Provider
      value={{
        profileData,
        setProfileData,
        clearData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};