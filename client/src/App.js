// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import './stylesheets/App.css';
import Header from './components/header';
import { LeftSideMenu } from './components/mainPage';
import DataTesting from './components/DataTesting';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { QuestionsContent } from './components/questionDisplay';
import { TagContent } from './components/tagsDisplay';
import { TagRelatedQuestions } from './components/tagSelectedDisplay';

function HomePage(){
  return(
      <>
      <Header/>
      <LeftSideMenu/>
      
      </>
  );
}
function QuestionHome({activeTab}){
  return(
      <>
      <Header/>
      <LeftSideMenu activeTab={'Questions'} component={<QuestionsContent activeTab={activeTab} />}/>
      
      </>
  );
}
function TagHome(){
return(
  <>

    <Header/>
    <LeftSideMenu activeTab={'Tags'} component={<TagContent/>}>
    </LeftSideMenu>
   
  </>
);
}
function TagSelected(){
  const {activeTag} = useParams();
  return(
  <>
  <Header />
  <LeftSideMenu activeTab={'Tags'} component={<TagRelatedQuestions tag_name={activeTag}/>}>
  </LeftSideMenu>
  </>
  );
}

function App() {
  return (

<BrowserRouter>
    <Routes>
       <Route path = '/' element={<HomePage/>}  />
        <Route path = '/Questions/Newest' element={<QuestionHome activeTab={'Newest'} />}/>
        <Route path = '/Questions/Active' element={<QuestionHome activeTab={'Active'}/>}/>
        <Route path = '/Questions/Unanswered' element={<QuestionHome activeTab={'Unanswered'}/>}/>
        <Route path = '/Tags' element={<TagHome />}  />
        <Route path = '/Tags/:activeTag' element={<TagSelected/>}  />
    </Routes>
</BrowserRouter>
  
     
  );
}



export default App;
