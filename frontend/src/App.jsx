import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import Sidebar from "./Layouts/Sidebar";
import Header from "./Layouts/Header";

function App() {
  const router = useRoutes(routes);
  return (
    <div className="grid grid-cols-6 bg-green-100">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-5">
        {(router.props.match.pathname === "/" || router.props.match.pathname.includes("/login")) ? (
          <div className="container">{router}</div>
        ) : (
          <>
            <Header />
            <div className="container">{router}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
