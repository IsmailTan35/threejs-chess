"use client";
import React, { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createPortal } from "react-dom";

const colors = [
  {
    hexCode: "#00ff00",
    description: "İlerleme hareketi.",
  },
  { hexCode: "#ff3333", description: "Saldırı hareketi." },
  { hexCode: "#a9a9a9", description: "Bloklanmış hareket" },
  { hexCode: "#656565", description: "Seçili taş." },
  {
    hexCode: "#000000",
    description: "Yasaklanmış hareket.",
  },
];

const Loading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [windowLoaded, setWindowLoaded] = useState(false);

  useEffect(() => {
    let loader = new GLTFLoader();
    setIsLoading(true);
    loader.load("models/chess_set.glb", gltf => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });
  }, []);

  useEffect(() => {
    setWindowLoaded(true);
  }, []);

  return (
    <>
      {!closeModal &&
        windowLoaded &&
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
                  width: "425px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "50px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Tanıtım
                  </div>
                  {colors.map((color, idx) => (
                    <div
                      style={{
                        display: "flex",
                        fontSize: "30px",
                        alignItems: "center",
                      }}
                      key={idx}
                    >
                      <div
                        style={{
                          background: color.hexCode,
                          width: "20px",
                          height: "20px",
                          marginRight: "10px",
                          border: "1px solid black",
                        }}
                      ></div>
                      <div>{color.description}</div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  {isLoading ? (
                    <div
                      style={{
                        fontSize: "30px",
                      }}
                    >
                      Kaplamalar Yükleniyor...
                    </div>
                  ) : (
                    <div
                      onClick={() => setCloseModal(true)}
                      className="close-button"
                      style={{
                        border: "1px solid black",
                      }}
                    >
                      Pencereyi Kapat
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Loading;
