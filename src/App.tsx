import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Popular from "./Components/Watch/Popular";
import Header from "./Components/Header/Head";
import Result from "./Components/Search/Results";
import Vid from "./Components/Watch/Video";
import SideBar from "./Components/Sidebar/Side";

function App() {
  const [sideState, setSide] = useState<string>('full')
  return (
    <Router basename="/">
      <div>
        <Header sideState={sideState} setSideState={setSide} />
        <div className='flex'>
          <SideBar sideState={sideState} />
          <Routes>
            <Route path="/" element={<Popular />}></Route>
            <Route path="/results" element={<Result />}></Route>
            <Route path="/watch/:id" element={<Vid />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
