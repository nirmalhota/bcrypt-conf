import CreateContract from './pages/createContract/createContract';
import './App.css';
import {Helmet} from "react-helmet";
import Mint from './pages/mint/mint';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <Helmet>
        <style>{"body { background: linear-gradient(to bottom right, red, yellow); }"}</style>
      </Helmet> */}
      {/* <CreateContract/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateContract/>}/>
          <Route path="/mint" element={<Mint/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
