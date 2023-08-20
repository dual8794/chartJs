import { Route, Routes } from "react-router-dom";
import Examples from "./Pages/Examples";
import Misbar from "./Pages/Misbar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Examples />} />
      <Route path="/misbar" element={<Misbar />} />
    </Routes>
  );
}

export default App;
