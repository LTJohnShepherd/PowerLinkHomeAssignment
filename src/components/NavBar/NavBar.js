import React, { useState } from "react";
import { Link } from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const NavBar = () => {
  const [value, setValue] = useState(parseInt(localStorage.getItem("currentPage")));

  const handleChange = (_e, newValue) => {
    setValue(newValue);
    localStorage.setItem("currentPage", JSON.stringify(newValue))
  };

  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Home" index={0} onFocus={() => setValue(0)} to="/" component={Link} />
        <Tab label="Favorites" index={1} onFocus={() => setValue(1)} to="/Favorites" component={Link}>
        </Tab>
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
