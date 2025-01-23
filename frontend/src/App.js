// // App.js
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Student from './components/Student';
// import UserHistory from './components/UserHistory';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
        
//           <Route path="/" element={<Student />} />
//           <Route path="/student" element={<Student />} />
//          <Route path="/user-history" element={<UserHistory />} />
//          <Route path="/user-service" element={<userService />} />

//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Student from './components/Student';
import UserHistory from './components/UserHistory';
import AddUser from './components/AddUser';  // Correct import
import EditUser from './components/EditUser';  // Correct import
import UserList from './components/UserList';  // Correct import
// import UserService from './components/UserService';  // Correct capitalization of UserService
// import AddImg from './components/AddImg'; // Update the path as needed
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Student />} />
          <Route path="/student" element={<Student />} />
          <Route path="/user-history" element={<UserHistory />} />
          {/* <Route path="/addimg" element={<AddImg />} /> */}
          <Route path="/user-service" element={<userService />} /> {/* Fixed component name */}
          <Route path="/" element={<UserList />} />  {/* Main route for UserList */}
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
