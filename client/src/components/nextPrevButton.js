

export function NextPrevButton({onPrev, onNext}){
    return(
        <>
        <div className="footer">
          <a href="#" className="previous" onClick={onPrev}>&laquo; Previous</a>
          <a href="#" className="next" onClick={onNext}>Next &raquo;</a>
        </div>
      </>
    );
}