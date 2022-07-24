import React, { useEffect, useState, useRef } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as S from "./style";

const CheckBox = ({ isChecked, onChange, label, value, removeF, applyF }) => {
  const [ischecked, setischecked] = useState(false);
  const handleChange = () => {
    onChange && onChange(value);
    setischecked(!ischecked);
  };

  useEffect(() => {
    if (ischecked) {
      applyF(value);
    }
    else
      removeF(value);
  }, [ischecked])

  return (
    <S.CheckBox>
      <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={handleChange} color="primary" />}
        label={label}
      />
    </S.CheckBox>
  );
};

export default CheckBox;
