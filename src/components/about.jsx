import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const About = () => {
  let location = useLocation();
  let nav = useNavigate();

  return <h1>About -- {location.pathname}</h1>;
};

export default About;
