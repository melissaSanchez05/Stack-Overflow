

export function VoteButtonForm({onUpvote, onDownvote, showDownvote}){
    return (

        <>
        
    <script src="https://use.fontawesome.com/fe459689b4.js"></script>

  <button className="btn" onClick={onUpvote} ><i className="fa fa-thumbs-up fa-lg" aria-hidden="true"></i></button>
  {showDownvote ? <button className="btn" onClick={onDownvote}><i className="fa fa-thumbs-down fa-lg" aria-hidden="true"></i></button> : ''}

        
        </>
    );
}

export default VoteButtonForm;