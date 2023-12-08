import React from 'react';
import Button from './button';
export function ProfileForm(){

    return(


<div className="container d-flex  p-center justify-content-center">
    <div className="card p-3 py-4">
        <div className="text-center"> 
		<img src="https://i.postimg.cc/0jp7hjFc/ui-profile-icon-vector.jpg" width="100"  className='round-img' alt="Profile Image"/>
            <h3 className="mt-2">NAME</h3>
			<span className="mt-1 clearfix">Active Member</span>
			
			<div className="row mt-3 mb-3">
			
			  <div className="col-md-4">
				<h5>Votes</h5>
				<span className="num">10</span>
			  </div>
			  <div className="col-md-4">
			  <h5>Questioons</h5>
				<span className="num">10</span>
			  </div>
			  <div className="col-md-4">
			  <h5>Member</h5>
				<span className="num">Active</span>
			  </div>
			
			</div>
			
			<hr className="line"/>
			
	
			  
			 <div className="profile mt-5">
             
			 <Button className="profile_button px-5" label ="Menu"/>
             <Button className="profile_button px-5" label ="Log out"/>
            

		</div>
			   
        </div>
    </div>
</div>




    
    );
}
export default ProfileForm;