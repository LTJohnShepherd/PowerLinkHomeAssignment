import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "pages";
import { Favorites } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";

const AppRouter = () => {
  const [favoriteUsrlLst, setFavoriteUsrlLst] = useState([]);

  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" >
            <Home favoriteusers={favoriteUsrlLst} setFavoriteusers={setFavoriteUsrlLst} />
          </Route>
          <Route exact path="/Favorites" >
            <Favorites favoriteusers={favoriteUsrlLst} setFavoriteusers={setFavoriteUsrlLst} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
