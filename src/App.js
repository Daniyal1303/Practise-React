import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Navbar from "./Navbar";
import Form from "./Formik";
import ReactTable from "./React-Tables";
import { AuthContext } from "./context/Auth.context.js";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const { user } = useContext(AuthContext);
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          {!user ? (
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Navbar />}>
                <Route index element={<ReactTable />} />
                <Route path="form" element={<Form />} />
              </Route>
            </Routes>
          )}
        </Router>
      </QueryClientProvider>
      {/* <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/navbar" element={<Navbar/>} /> */}
    </div>
  );
}

export default App;
