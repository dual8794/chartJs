import { Route, Routes } from "react-router-dom";
import Examples from "./Pages/Examples";

function App() {
  return (
    <Routes>
      <Route path="/examples" element={<Examples />} />
    </Routes>
  );
}

export default App;
