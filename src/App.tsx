import React from "react";

import { AppProvider } from "./Context/AppContext";
import HomeLayout from "./Layout/HomeLayout";

const App: React.FC = () => {
  return (
    <AppProvider>
      <HomeLayout />
    </AppProvider>
  );
};

export default App;
