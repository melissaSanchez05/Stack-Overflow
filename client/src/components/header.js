import SearchBar from "./searchBar";
import React from "react";

const userType = sessionStorage.getItem('userType');

export default function Header() {

    
  return (
    <>
    <div className="header">
      <img className="header-icon" src="https://i.postimg.cc/1zqXvTLK/download.png" alt="img not found" />
      <span className="header-text">fake</span>
      <span className="header-text">stack</span>
      <span className="header-text">overflow</span>
      
      <SearchBar />
     
      
    </div>

    </>
  );
}


