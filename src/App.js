

// import React, { useState } from 'react';
// import Navbar from './Components/Navbar/Navbar';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Pages/Home/Home';
// import Video from './Pages/Video/Video';
// import SearchResults from './Components/Search/Search'; // Import the SearchResults component

// const App = () => {
//   const [sidebar, setSidebar] = useState(true);

//   return (
//     <div>
//       <Router>
//         <Navbar setSidebar={setSidebar} />
//         <Routes>
//           <Route path="/" element={<Home sidebar={sidebar} />} />
//           <Route path="/video/:categoryId/:videoId" element={<Video />} />
//           <Route path="/search/:query" element={<SearchResults />} /> {/* Add this line */}
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Home from './Pages/Home/Home';
import Video from './Pages/Video/Video';
import SearchResults from './Components/Search/Search'; // Import the SearchResults component
import './App.css'; // Assuming you have a CSS file for your layout styles

const App = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <Router>
      <div className="app-container">
        <Navbar setSidebar={setSidebar} />
        <div className="content-wrapper">
          <Sidebar sidebar={sidebar} />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home sidebar={sidebar} />} />
              <Route path="/video/:categoryId/:videoId" element={<Video />} />
              <Route path="/search/:query" element={<SearchResults />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
