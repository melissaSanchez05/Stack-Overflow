
function qs_sort_By_date(q1,q2){
    const a = q1;
    const b = q2;
    if(a.getFullYear() !== b.getFullYear()){
      if(a.getFullYear() > b.getFullYear()){
        return q1;
      }
      return q2;
    }else if(a.getMonth() !== b.getMonth()){
      if(a.getMonth() > b.getMonth()){
        return q1;
      }return q2;
    }else if(a.getDate() !== b.getDate()){
      if(a.getDate() > b.getDate()){
        return q1;
      }return q2;
      
    }else if(a.getHours() !== b.getHours()){
      if(a.getHours() > b.getHours()){
        return q1;
      }return q2;
    }else if(a.getMinutes() !== b.getHours()){
      if(a.getMinutes() > b.getHours()){
        return q1;
      }return q2;
    }if(a.getSeconds() > b.getSeconds()){
      return q1;
    }return q2;
    }
function show_relative_time(postDate){
        const currentTime = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var m = postDate.getMinutes();
              if(postDate.getMinutes() < 10){
                m = "0" + postDate.getMinutes();
              }
      
        if(currentTime.getFullYear() !== postDate.getFullYear()){//post year is older 
              
          return months[postDate.getMonth()] + " " + postDate.getDate() + ", " + postDate.getFullYear() + " at " + postDate.getHours() + ":" + m;
      
        }else if(currentTime.getMonth() !== postDate.getMonth()){//current year, but different month
          return months[postDate.getMonth()] + " " + postDate.getDate() + " at " + postDate.getHours() + ":" + m;
        }else if(currentTime.getDate() !== postDate.getDate()){//same year and month, but different date(1-31)
          return  Math.abs( currentTime.getDate() - postDate.getDate()) + " days ago" ;
        }else if(currentTime.getHours() !== postDate.getHours()){//same year,month,date
          return Math.abs(currentTime.getHours() - postDate.getHours()) + " hours ago";
        }else if(currentTime.getMinutes() !== postDate.getMinutes()){
          return Math.abs(currentTime.getMinutes() - postDate.getMinutes()) + " minutes ago";
        }else{
          return Math.abs(currentTime.getSeconds() - postDate.getSeconds()) + " seconds ago";
        }
      
      
}