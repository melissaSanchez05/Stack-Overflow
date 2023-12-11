import React ,{useState}from "react";
import { useNavigate } from 'react-router-dom';
import { NextPrevButton } from "./nextPrevButton";



const userType = sessionStorage.getItem('userType')
   export function LeftSideMenu({activeTab, component}){
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState(activeTab);

    
     
    const handleButton= (label) =>{
       if (label === 'Tags') {
       
        navigate('/Tags')
    } else if(label === 'Profile'){
        navigate('/Profile')
    }else{
        navigate('/Questions/Newest')
        
    }
       
    };
    const getMenuItemClassName = (tab) => {
      return `left-menu-text selectable ${tab === activeButton ? 'selected-menu' : ''}`;
  };

 


    return (
        <>
        <div className="left-menu">
        <div className="left-menu-header">PUBLIC</div>
        <div className= {getMenuItemClassName('Questions')}  onClick= {()=> handleButton('Questions')}>Question</div>
        <div className= {getMenuItemClassName('Tags')}  onClick= {()=> handleButton('Tags')}>Tags</div>
        {userType === 'guest' ? '' : <div className= {getMenuItemClassName('Profile')}  onClick= {()=> handleButton('Profile')}>Profile</div>}
        <div className="right-content">
        {component}
    
        </div>
        
        </div>

        </>
      );
}



