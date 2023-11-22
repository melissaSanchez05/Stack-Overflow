import React ,{useState}from "react";

import { QuestionsContent } from "./questionDisplay";
import { TagContent } from "./tagsDisplay";



  export function LeftSideMenu(){
    const [activeButton, setActiveButton] = useState('Questions');

    const handleButton= (label) =>{
       // setActiveButton(label);
       if (label === activeButton) {
        // Clicking the same button again, temporarily set activeButton to null to force a re-render
        setActiveButton(null);
        setTimeout(() => setActiveButton(label), 0);
    } else {
        setActiveButton(label);
    }
       
    };
    const getMenuItemClassName = (buttonName) => {
      return `left-menu-text selectable ${activeButton === buttonName ? 'selected-menu' : ''}`;
  };
    const components = {
      Questions: <QuestionsContent/>,
      Tags: <TagContent activeButton={activeButton} setActiveButton={setActiveButton} />,
  };

    return (
        <div className="left-menu">
        <div className="left-menu-header">PUBLIC</div>
        <div className= {getMenuItemClassName('Questions')}  onClick= {()=> handleButton('Questions')}>Question</div>
        <div className= {getMenuItemClassName('Tags')}  onClick= {()=> handleButton('Tags')}>Tags</div>
        <div className="right-content">
        {components[activeButton]}
        </div>
        </div>
      );
}










