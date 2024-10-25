import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Display from "./components/Display";

const queryClient = new QueryClient();
// src/App.jsx

const App = () => {
  return (
    <div className="container">
      <QueryClientProvider client={queryClient}>
        <Display />
      </QueryClientProvider>
    </div>
  );
};



export default App;
