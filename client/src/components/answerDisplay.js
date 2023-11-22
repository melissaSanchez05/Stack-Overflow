
import axios from "axios";
import {qs_sort_By_date, show_relative_time} from "./display";
export function AnswerContent({questionId}){
    
      return(
        <>
            {questionId === '' ? <div className="question-no-found">Error</div> : <QuestionSummary answer={questionId} />}

        </>
      );
}
//answer corresponds to the qs id triggered, which will be used to find the corresoing
//answers related to the current qs
function QuestionSummary({answer}){
    //
    const current_qs = meta_data.data.questions.find(function(qs){
        return qs.qid === answer;
      });
       current_qs.views = current_qs.views + 1;//updates the views

       //responses related to the qs which are sorted by the date posted
       const current_related_ans =   meta_data.data.answers.filter(function(ans){
        return current_qs.ansIds.includes(ans.aid);
      }).sort(function(ans1,ans2){
        return qs_sort_By_date(ans1.ansDate, ans2.ansDate);
      });

    return(
        <>
      
    
      <Button label ="Ask Question" className= "ask-question flush-right-t" />
      {<QuesitonDisplay question={current_qs}/>}
      {current_related_ans.length > 0 && (current_related_ans.map((answer)=> <RelatedAnswers key={answer.aid} answer={answer}/>))}
      <Button label ="Answer Question" className= "ask-question flush-right-b" />
   
        
      </>
    );
   } 
function QuesitonDisplay({question}){
        return(
        
            
                
            <div id={question.qid} className="answers-summmary post-summary">
            
           
          <QuestionStats answer={question.ansIds.length} views={question.views}/>
          
          <QuestionMeta user={question.askedBy} date={question.askDate}/>
           
          <QuestionSummaryDisplay title={question.title} summary={question.text}/>
          
          </div>
          
         
          
          
        );
    }
function QuestionSummaryDisplay({title, summary}){
      return(
        <div className="post-summary-content ans-summary-content ">
            
        <h3 className="post-summary-content-title inc-w post-link color_B inc-font bold_text">{title}</h3>
        <h3 className="post-summary-content-meta-text-container post-summary-content-title">{summary}</h3>
        

        </div>
      );
    }
function QuestionMeta({user, date, userClassName = '', timeClassName = ''}){
      return(
        <div className="ans-summary-content-meta">
        <div className="ans-summary-content-meata-user"> 
        
          <span className= {`post-summary-stats-items user-meta ${userClassName}`}>{user} </span>
          
        </div>
        <div className="ans-summary-content-meata-user"> 
        
          <span className={`post-summary-stats-items time ${timeClassName}`}>{show_relative_time(date)}</span>
          
        </div>
    
        </div>
      );
    }
function QuestionStats({answer, views}){
      return(
        <div className="post-summary-stats ans-summary-stats flex-s "> 
        <div className="post-summary-stats-items ">
          <span className="post-summary-stats-items d-front-weight d-white-space bold_text">{answer}</span>
          <span className="post-summary-stats-items bold_text"> answers</span>
        </div>
        <div className="post-summary-stats-items">
          <span className="post-summary-stats-items d-front-weight d-white-space bold_text">{views}</span>
          <span className="post-summary-stats-items bold_text "> views</span>
        </div>
    </div>
      );
    }
function RelatedAnswers({answer}){
        return(
        
            <div className="undo_border">
              <QuestionMeta user={answer.ansBy} date={answer.ansDate} newClassName="d-color-g" timeClassName="clear-element"/>

            <div className="answers-summmary post-summary">
        
          <div className="post-summary-content ans-summary-content ">
            <h3 className="post-summary-content-meta-text-container post-summary-content-title color_B">{answer.text}</h3>

            </div>
          </div>
          
          </div>
          
          
        );
    }           

