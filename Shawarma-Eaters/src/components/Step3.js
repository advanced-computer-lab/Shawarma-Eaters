import React from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";

const Step3 = props => {
  if (props.currentStep !== 3) {
    return null;
  }

  return (
    <>
      <p>Summery</p>
      
    </>
  );
};

export default Step3;
