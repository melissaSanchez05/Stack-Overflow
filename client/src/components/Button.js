import React from 'react';
import { useNavigate } from "react-router-dom";
const Button = ({ label, className, onClick, to }) => {
    const navigate = useNavigate();
  
    const handleButtonClick = () => {
      if (onClick) {
        onClick();
      }
      if (to) {
        navigate(to);
      }
    };
  
    return (
      <button
        className={className}
        aria-current="page"
        onClick={handleButtonClick}
      >
        {label}
      </button>
    );
  };
export default Button;