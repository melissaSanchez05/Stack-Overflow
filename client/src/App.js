// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import './stylesheets/App.css';
import './stylesheets/logIn.css'
import './stylesheets/profile.css'
import './stylesheets/register.css'
import './stylesheets/success.css'
import './stylesheets/comment.css'
import Header from './components/header';
import { LeftSideMenu } from './components/mainPage';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { QuestionsContent } from './components/questionDisplay';
import { TagContent } from './components/tagsDisplay';
import { TagRelatedQuestions } from './components/tagSelectedDisplay';
import { AnswerContent } from './components/answerDisplay';
import { AskQuestionForm } from './components/postQuestionDisplay';
import { AnswerQuestionForm } from './components/postAnswerDisplay';
import LoginForm from './components/logIn';
import ProfileForm from './components/profileDisplay';
import RegistrationForm from './components/registerUserDisplay';
import SuccessForm from './components/successDisplay';
import LogOutForm from './components/logout';
import CommentsDisplay from './components/postComment';

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
function QuestionSelected(){
  const {activeTab, questionId} = useParams();
  
  return(
    
    <>
    <Header />
    <LeftSideMenu activeTab={activeTab} component={<AnswerContent questionId={questionId}/>}>
  </LeftSideMenu>
    </>
  );
}
function AnswerQuestion() {
  const {questionId} = useParams();

  return (
    <>
      <AnswerQuestionForm questionId={questionId} />
    </>
  );
}
function AskQuestion(){
  return(
    <>  
    <AskQuestionForm/>
    </>
  );
}
function LogIn(){
  return(

<>
<LoginForm/>

</>

  );
}
function Profile(){
  return(
  <>
  <ProfileForm/>
  </>
  );
}
function Register(){
  return(
    <>
    <RegistrationForm/>
    </>
  );
}
function Success(){
  return(
    <>
    <SuccessForm/>
    </>
  );
}
function LogOut(){
  return(
    <>
    <LogOutForm/>
    </>
  );
}
function Comments(){
  const {answerId} = useParams();
  return(
    <>
    <CommentsDisplay answerId={answerId}/>
    </>
  );
}

function App() {
  return (

<BrowserRouter>
    <Routes>
        <Route path = '/' element={<LogIn/>}  />
        <Route path = '/AddComment/:answerId' element={<Comments/>}  />
        <Route path = '/LogOut' element={<LogOut/>}  />
        <Route path = '/Home' element={<HomePage/>}  />
        <Route path = '/Profile' element={<Profile/>}  />
        <Route path = '/Success' element={<Success/>}  />
        <Route path = '/Register' element={<Register/>}  />
        <Route path = '/Questions/Newest' element={<QuestionHome activeTab={'Newest'} />}/>
        <Route path = '/Questions/Active' element={<QuestionHome activeTab={'Active'}/>}/>
        <Route path = '/Questions/Unanswered' element={<QuestionHome activeTab={'Unanswered'}/>}/>
        <Route path = '/Questions/:activeTab/:questionId' element={<QuestionSelected/>}/>
        <Route path = '/Tags' element={<TagHome />}  />
        <Route path = '/Tags/:activeTag' element={<TagSelected/>}  />
        <Route path = '/AnswerQuestion/:questionId' element={<AnswerQuestion/>}  />
        <Route path = '/AskQuestion' element={<AskQuestion/>}  />
        
    </Routes>
</BrowserRouter>
  
     
  );
}



export default App;
