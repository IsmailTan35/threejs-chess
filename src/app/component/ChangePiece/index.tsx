import React from "react";

const ChangePiece = () => {
  return (
    <div>
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
              display: "flex",
            }}
          >
            {" "}
            <div>Kale</div>
            <div>Vezir</div>
            <div>Fil</div>
            <div>At</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePiece;
