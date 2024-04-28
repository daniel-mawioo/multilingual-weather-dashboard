// LanguageSelect.js

import React from "react";
import styled from "styled-components";
import { FaGlobe } from "react-icons/fa";

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledSelect = styled.select`
  appearance: none;
  padding: 10px 25px 10px 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  outline: none;
  margin-right: -0.1rem;
`;

const LanguageSelect = ({ locale, onChange }) => {
  return (
    <SelectContainer>
      <StyledSelect value={locale} onChange={onChange}>
        <option value="en">English</option>
        <option value="sw">Swahili</option>
      </StyledSelect>
      <FaGlobe
        className="lang-icon"
        style={{
          position: "absolute",
          top: "50%",
          right: "-0.1px",
          transform: "translateY(-50%)",
        color: "red"
        }}
      />
    </SelectContainer>
  );
};

export default LanguageSelect;
