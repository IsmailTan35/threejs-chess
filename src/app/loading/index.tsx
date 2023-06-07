"use client";
import React, { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createPortal } from "react-dom";

const Loading = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    let loader = new GLTFLoader();
    loader.load("models/chess_set.glb", gltf => {
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);
    });
  }, []);

  return (
    <>
      {!isLoaded &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              ></div>
              <div
                style={{
                  zIndex: 1001,
                  background: "white",
                  padding: "20px",
                  color: "black",
                  borderRadius: "3px",
                  fontSize: "20px",
                }}
              >
                {" "}
                Kaplamalar Yükleniyor...
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Loading;
