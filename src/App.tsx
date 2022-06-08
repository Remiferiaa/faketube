import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Popular from "./Components/Watch/Popular";

function App() {
  return (
    <Router basename="/">
      <Popular/>
      <Routes>
        <Route></Route>
      </Routes>
    </Router>
  );
}


export default App;
