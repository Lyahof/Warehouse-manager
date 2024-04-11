import { createContext, useContext, useState } from "react";

const SearhContext = createContext();

function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearhContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearhContext.Provider>
  );
}

function useSearchContext() {
  const context = useContext(SearhContext);
  return context;
}

export { SearchProvider, useSearchContext };
