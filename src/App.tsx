import {useState } from 'react'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Popular from "./Components/Watch/Popular";
import Header from "./Components/Header/Head";
import Result from "./Components/Search/Results";
import Vid from "./Components/Watch/Video";
import SideBar from "./Components/Sidebar/Side";
import SideModal from './Components/Sidebar/SidebarModal';

function App() {
  const [sideState, setSide] = useState<string>('full')
  const [showSide, setShow] = useState<boolean>(true)

  return (
    <Router basename="/">
      <div>
        <Header sideState={sideState} setSide={setSide} showSide={showSide} setShow={setShow}/>
        <div className='flex'>
          <SideBar sideState={sideState} setSide={setSide} showSide={showSide} setShow={setShow} />
          <SideModal sideState={sideState} setSide={setSide}  showSide={showSide} setShow={setShow}/>
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
