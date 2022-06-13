import {useState} from 'react'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Popular from "./Components/Watch/Popular";
import Header from "./Components/Header/Head";
import Result from "./Components/Search/Results";
import Vid from "./Components/Watch/Video";
import SideBar from "./Components/Sidebar/Side";

function App() {
  const [sideState, setSide] = useState<string>('Active')
  return (
    <Router basename="/">
      <Header sideState={sideState} setSideState={setSide}/>
      <SideBar/>
      <Routes>
        <Route path="/" element={<Popular />}></Route>
        <Route path="/results" element={<Result />}></Route>
        <Route path="/watch/:id" element={<Vid/>}></Route>
      </Routes>
    </Router>
  );
}


export default App;
