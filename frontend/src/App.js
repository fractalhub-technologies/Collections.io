import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
// import Login from "./components/loginPage/login";
// import Home from "./components/homePage/home";
// import Detail from "./components/detailPage/detail";
// import User from "./components/userPage/user";
// import Notifications from "./components/notificationPage/notifications"
// import SnippetDetail from "./components/detailPage/snippetdetail";
// import Tag from "./components/tagPage/tag";
// import Explore from "./components/homePage/explore";
// import SideNav from "./components/common/sidenav";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import { ToastsContainer, ToastsStore } from "react-toasts";

import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Explore from "./components/explore/Explore";
import Collection from "./components/collection/Collection";
/*
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
        </Switch>

        <SideNav />

        <Switch>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/explore" exact>
            <Explore />
          </Route>
          <Route path="/notifications" exact>
            <Notifications />
          </Route>
          <Route path="/detail/:id" exact>
            <Detail />
          </Route>
          <Route path="/user/:username">
            <User />
          </Route>
          <Route path="/tag/:tag">
            <Tag />
          </Route>
          <Route path="/detail/:id/:snip" exact>
            <SnippetDetail />
          </Route>
        </Switch>
      </Router>

      <ToastsContainer store={ToastsStore} />
    </div>
  );
} */

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/explore" exact>
          <Explore />
        </Route>
        <Route path="/collection/:id" exact>
          <Collection />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
