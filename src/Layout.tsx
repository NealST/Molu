// layout 布局
import { useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import cn from "classnames";
import { sceneList } from "./config";

const Layout = function () {
  const [activeNavId, setActiveNavId] = useState("home");

  return (
    <Router>
      <div className="layout">
        <div className="layout-labels">
          {sceneList.map((item) => {
            const { path, label, id } = item;
            return (
              <div
                className={cn(
                  "label-item",
                  activeNavId === id ? "label-item-active" : ""
                )}
                key={id}
                onClick={() => setActiveNavId(id)}
              >
                <Link to={path}>{label}</Link>
              </div>
            );
          })}
        </div>
        <div className="layout-panel">
          <Suspense fallback={<div>Loading</div>}>
            <Routes>
              {sceneList.map((item) => {
                const { path, Component, id } = item;
                return <Route path={path} key={id} element={<Component />} />;
              })}
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
};

export default Layout;
