import React from "react";

const TestText = ({ text, value, unit }) => (
  <div>
    <strong>{text}</strong>: {value} {value ? unit : ""}
  </div>
);

export default TestText;
