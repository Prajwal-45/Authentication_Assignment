/* eslint-disable no-unused-vars */
import React from "react";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import logo from "./Assets/logo.png";
import boy from "./Assets/boy.png";
const HomePage = () => {

  const navigate = useNavigate()

  const x = useMotionValue(100);
  const y = useMotionValue(100);

  const rotateX = useTransform(y, [0, 200], [20, -30]);
  const rotateY = useTransform(x, [0, 200], [-20, 30]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }
  function mouseLeave(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(100);
    y.set(100);
  }

  return (
    <div className="main_container">
      <div className="container">
        <div className="button_container">
            <button type="submit" onClick={() => {navigate("/login")}}>SignIn</button>
            <button type="submit" onClick={() => {navigate("/register")}}>SignUp</button>
        </div>


        <div className="image_container">
          <motion.div
            style={{
              display: "flex",
              placeItems: "center",
              placeContent: "center",
              perspective: 1000,
            }}
            onMouseMove={handleMouse}
            onMouseLeave={mouseLeave}
          >
            <motion.div
              style={{
                rotateX: rotateX,
                rotateY: rotateY,
              }}
            >
              <div id="container">
                <div id="inner">
                  <div className="img_1">
                    {" "}
                    <img
                      style={{ height: "25em", width: "350px" }}
                      src={logo}
                      alt=""
                    />
                  </div>
                  <div className="img_2">
                    <img
                      style={{ height: "25em", width: "350px" }}
                      src={boy}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
