import SearchBar from "./searchBar";
import React from "react";


export default function Header() {

  return (
    <div className="header">
      <img className="header-icon" src="../../public/logo192.png" alt="img not found" />
      <span className="header-text">fake</span>
      <span className="header-text">stack</span>
      <span className="header-text">overflow</span>
      <SearchBar />
    </div>
  );
}


