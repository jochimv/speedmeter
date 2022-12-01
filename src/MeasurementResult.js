import React from "react";

const MeasurementResult = ({ type, color }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div>{type}</div>
      <div
        style={{
          marginLeft: 10,
          width: 10,
          height: 10,
          backgroundColor: color,
          borderRadius: "50%"
        }}
      />
    </div>
  );
};

export default MeasurementResult;
