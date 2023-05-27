import { BrowserRouter, Routes, Route } from "react-router-dom";

import SideNavBar from "./SideNavBar/SideNavBar";
import HomePage from "./components/home/HomePage";

import Header from "./components/layouts/Header";
import Canvas from "./components/layouts/Canvas";
import LeftTabs from "./components/goods/LeftTabs";
import Purchased from "./components/Purchased";
import { MyProvider } from "./components/context/MyContext";

function App() {
  const style = {
    display: "flex",
  };

  const wrapAllDiv = {
    position: "relative",
  };

  const card = {
    position: "fixed", 
    top: "20%", 
    left: "95%",
  }
  // const divContainer = {
  //   flex: 1,
  //   display: "flex",
  //   flexDirection: "column",
  // };

  // const divContent = {
  //   flex: 1,
  //   overflow: "auto",
  // };

  const options = [
  {
    name: 'Cart',
    scroll: true,
    backdrop: false,
  },
  ]

  return (
    <BrowserRouter>
      <MyProvider>
        <div style={wrapAllDiv}>
          {/* <SideNavBar /> */}
          <Header/>
          <div>
            
            <div style={card}>
              {options.map((props) => (
                <Canvas {...props} />
              ))}
            </div>
          </div>

          {/* <div > */}
            <div>
              <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/market" element={<LeftTabs/>} />
                <Route path="/purchased" element={<Purchased />} />
                {/* <Route path="/Detail/:id" element={<Detail />} /> */}
              </Routes>
            </div>
          {/* </div> */}
        </div>
      </MyProvider>
    </BrowserRouter>
  );
}

export default App;
