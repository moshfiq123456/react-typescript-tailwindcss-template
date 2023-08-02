import React from 'react';
import { Routes} from "react-router-dom";
import {getRoute} from "./routes/routes";

function App() {
  return (
      <Routes>{getRoute()}</Routes>
  );
}

export default App;
