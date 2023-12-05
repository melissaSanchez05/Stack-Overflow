import React ,{useState}from "react";
import { useNavigate } from 'react-router-dom';
import { QuestionsContent } from "./questionDisplay";
import { TagContent } from "./tagsDisplay";




   export function LeftSideMenu({activeTab, component}){
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState(activeTab);

    
     
    const handleButton= (label) =>{
       if (label === 'Tags') {
       
        navigate('/Tags')
    } else{
        navigate('/Questions/Newest')
        
    }
       
    };
    const getMenuItemClassName = (tab) => {
      return `left-menu-text selectable ${tab === activeButton ? 'selected-menu' : ''}`;
  };

 


    return (
        <div className="left-menu">
        <div className="left-menu-header">PUBLIC</div>
        <div className= {getMenuItemClassName('Questions')}  onClick= {()=> handleButton('Questions')}>Question</div>
        <div className= {getMenuItemClassName('Tags')}  onClick= {()=> handleButton('Tags')}>Tags</div>
        <div className="right-content">
        {component}
       
        </div>
        </div>
      );
}



