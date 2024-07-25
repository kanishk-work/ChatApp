import React, { createContext, useContext, useState, ReactNode } from "react";

type ViewState = "chatList" | "chatWindow";

interface AppContextProps {
  view: ViewState;
  setView: React.Dispatch<React.SetStateAction<ViewState>>;
  currentChatId: number | null;
  setCurrentChatId: React.Dispatch<React.SetStateAction<number | null>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [view, setView] = useState<ViewState>("chatList");
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);

  return (
    <AppContext.Provider
      value={{ view, setView, currentChatId, setCurrentChatId }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
