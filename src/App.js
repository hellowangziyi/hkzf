import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import "antd-mobile-v2/dist/antd-mobile.css";

import "./assets/fonts/iconfont.css";

import AuthRoute from "./components/AuthRoute";

import Home from "./pages/Home";
import CityList from "./pages/CityList";
import HouseDetail from "./pages/HouseDetail";
import Login from "./pages/Login";
import Rent from "./pages/Rent";
import RentAdd from "./pages/Rent/Add";
import RentSearch from "./pages/Rent/Search";

function App() {
  return (
    // <Router>
    //   <div className="App">
    //     <Routes>
    //       {routers.map((item, index) => {
    //         return (
    //           <Route
    //             key={index}
    //             path={item.path}
    //             element={<item.component />}
    //           />
    //         )
    //       })}
    //     </Routes>

    //   </div>
    // </Router>
    <Router>
      {/* <Switch>
        {routers.map((item, index) => {
          return (
            <Route
              key={index}
              exact
              path={item.path}
              component={<item.component />}
            //或：
            //render={() => {
            //  return <item.component/>;
            //}}
            />
          );
        })}
      </Switch>
      
      */}

      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Route path="/home" component={Home} />
      {/* <Route path="/map" component={Map} /> */}
      <Route path="/citylist" component={CityList} />
      <Route path="/detail/:id" component={HouseDetail} />
      <Route path="/login" component={Login} />

      {/* 登录后才能访问 */}
      <AuthRoute exact path="/rent" component={Rent}></AuthRoute>
      {/* <AuthRoute path="/rent/add" component={RentAdd}></AuthRoute> */}
      {/* <AuthRoute path="/rent/search" component={RentSearch}></AuthRoute> */}
      <Route path="/rent/search" component={RentSearch}></Route>
      <Route path="/rent/add" component={RentAdd}></Route>
    </Router>
  );
}

export default App;
