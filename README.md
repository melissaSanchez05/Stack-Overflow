


Stack overflow

## Description

This is an interactive webpage that provides a platform for user to ask questions and provide answers to computer science related topics.
The porpuse of the webpage is to build a community within the Computer science world. Where users of all different knowledge levels can advice,
peer review, suggest, share codding ideas, solutions, implementations and common mistakes. Each user have the option to create an account or to browse as a guest. Restrictions and interactions is restricted based on the method of login. For compleate web access, an account must be created.

-update
This is a interactive webpage dedicated to fostering a vibrant community focus on computer science and related fields. This platform serves a hub where users can pose questions, share insights, and engage in discussions on a broad spectrum topics. The primary objective of this webpage is to cultivate a supportive and collaborate community that transcends diverse knowledge levels, fostering an  where users can provide advice, participate in peer review, suggest ideas, showcase implementations and ideas and discuss common pitfails.(coun't)


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Images](#images)


## Installation
To run this web application on a local machine you must:
1. clone the reposity from github on your local machine either using the HTTPS or SSH key
2. install the necessart libraries.

    MongDB; This application uses MongoDB as the database. Once install, mongosh (the Mongo shell)    will be installed as well. The use the command npm install mongoose to connect it to the database
    Node : use npm install and then npm start to install Node.js
    Express : use npm install express to install express which is used to write front-end code
    Axios : use npm install axios to install axios which is uses to handle HTTP requests
    CORS : cords will be used to handle middleware, which eases connection between the client and the server

2. run the server 
    To run the serve travel to the file in which the application is saved
    cd root varies based on the user file download-/projectfakeso-texas_wranglers
    type the following command nodemon server/server.js in the terminal
    the comamand will re-start the server whenever any changes are made
    the server should run in localhost:8000
3. run the client
    to run the client travel to the file in which the application is saved
    cd root varies based on the user file download-/projectfakeso-texas_wranglers
    the cd client
    Once inside the client, type the following command in the terminal npm start or yarn start 
    the client should run in localhost:3000
    At this point the website should be visible 
    type all the following command to install corresponding packages
    
```bash
git clone hhttps://github.com/sbu-ckane-f23-cse316-projectorg/projectfakeso-texas_wranglers.git
cd 
npm install
npm start
npm install mongoose
npm install express
npm install -g nodemon
npm install axios
nodemon server/server.js 

```

At this point the website should be visible at 'http://localhost:3000/' 
and the server at 'http://localhost:8000/'
## usage

Fake Stack Overflow aims to provide a user-friendly and seamless experience for both registered users and guests. Upon entering the website, users can effortlessly navigate through various sections, including questions, tags, and community discussions through the comments section. The "Questions" tab presents newly posted questions, allowing users to switch between unanswered questions, newly posted questions, and those with recent answers. The "Tags" tab categorizes questions based on different topics, enabling users to explore specific subjects of interest. The search bar facilitates keyword-based question searches. Users are prompted to log in if registered, register as new users, or enter as guests. Registered users enjoy additional privileges such as posting questions, providing answers, and participating in peer reviews through comments, upvoting or downvoting questions and answers. User profiles display information like the member's username, reputation points, number of questions posted, time on the site, and a list of posted questions. Users can edit, repost, or delete their questions, contributing to an intuitive interface that fosters collaboration and knowledge-sharing in the field of computer science.



## features
1. Question Navigation: Users can effortlessly browse through newly posted questions, switch between unanswered questions, explore newly posted questions, and discover questions with recent answers under the "Questions" tab.

2. Tag navigation: The "Tags" tab categorizes questions based on different topics, allowing users to focus on specific subjects of interest and easily find relevant questions related to the selected tag.

3. Search Functionality: The search bar enables users to perform keyword-based searches, streamlining the process of finding specific questions or topics within the platform.

4. User Authentication: Upon entering the website, users are prompted to log in if registered, register as new users, or enter as guests, ensuring a safe transporation of passward between the browser-client and client-server. In addition to personalized experience for registered users.

5. User Profiles: Registered users have individual profiles displaying their username, reputation points, the number of questions posted, and time spent on the site. Users can edit, repost, or delete their questions, adding a layer of personalization.

6. Community Interaction: Users can engage in community discussions through the comments section, providing answers, posting comments, and participating in peer reviews by upvoting or downvoting questions and answers. Registered users are allow to upvote questions and answers only if they have at least 50 reputation points. Such restriction applies upon the creation of new tags.

7. User Repuation : Registered users can gain 10 repuation points when other registered users upvote their question or answers. On the contrary, registered users can decrease their repupation points when other registered users downvote their questions or answers.

7. Responsive Design: The website boasts a responsive design, ensuring a consistent and enjoyable user experience across different devices, catering to both seasoned developers and newcomers seeking guidance.


## Images
1. Log In
<img width="1710" alt="Screenshot 2024-03-04 at 09 55 17" src="https://github.com/sbu-ckane-f23-cse316-projectorg/projectfakeso-texas_wranglers/assets/123083767/4f2a4a17-dc4c-46a9-bfe7-a133954b2cfa">
2. User registration
<img width="1710" alt="Screenshot 2024-03-04 at 09 56 08" src="https://github.com/sbu-ckane-f23-cse316-projectorg/projectfakeso-texas_wranglers/assets/123083767/cf0a6909-5792-4dd6-be0f-e958ff2911b1">
3. Question Tab
<img width="1710" alt="Screenshot 2024-03-04 at 09 51 54" src="https://github.com/sbu-ckane-f23-cse316-projectorg/projectfakeso-texas_wranglers/assets/123083767/950c4444-2667-454a-bb60-fb9b9ee4e87c">
4. Tags Tab
<img width="1710" alt="Screenshot 2024-03-04 at 09 52 04" src="https://github.com/sbu-ckane-f23-cse316-projectorg/projectfakeso-texas_wranglers/assets/123083767/fdafa40c-35b9-4175-8703-7614421ab14a">
5. Link to question commens
<img width="1710" alt="Screenshot 2024-03-04 at 09 52 25" src="https://github.com/sbu-ckane-f23-cse316-projectorg/projectfakeso-texas_wranglers/assets/123083767/c6872f8c-5793-4326-b37a-ec32b6cd1daa">

6. User profile
<img width="1710" alt="Screenshot 2024-03-04 at 09 51 41" src="https://github.com/sbu-ckane-f23-cse316-projectorg/projectfakeso-texas_wranglers/assets/123083767/1db04224-e8ab-4e86-b5d8-925c13129e87">
7. Post a question
<img width="1710" alt="Screenshot 2024-03-04 at 09 52 10" src="https://github.com/sbu-ckane-f23-cse316-projectorg/projectfakeso-texas_wranglers/assets/123083767/25154742-d8d0-4ddf-81b3-89e3b84322d5">
8. Respond to a question
<img width="1710" alt="Screenshot 2024-03-04 at 09 52 33" src="https://github.com/sbu-ckane-f23-cse316-projectorg/projectfakeso-texas_wranglers/assets/123083767/7cb63aa6-de30-46ec-b2b1-eaee488a5995">
9. Upvote a question
<img width="1710" alt="Screenshot 2024-03-04 at 10 03 08" src="https://github.com/sbu-ckane-f23-cse316-projectorg/projectfakeso-texas_wranglers/assets/123083767/8e0d9a0c-c42d-4d62-b0fc-fb39ec63fa2e">
10. Downvote a question
<img width="1710" alt="Screenshot 2024-03-04 at 10 03 14" src="https://github.com/sbu-ckane-f23-cse316-projectorg/projectfakeso-texas_wranglers/assets/123083767/d9666c5d-cab4-4003-95e6-da3ac59bce5c">
11. Comment a question
<img width="1710" alt="Screenshot 2024-03-04 at 10 03 23" src="https://github.com/sbu-ckane-f23-cse316-projectorg/projectfakeso-texas_wranglers/assets/123083767/0ceeec19-4f5e-447b-afe1-8bbfaa4d662b">
12. Upvote a comment
<img width="1710" alt="Screenshot 2024-03-04 at 10 03 31" src="https://github.com/sbu-ckane-f23-cse316-projectorg/projectfakeso-texas_wranglers/assets/123083767/770a0b23-c918-4f7b-b5a6-5ccc2ae3416b">
13. Downvote a comment
<img width="1710" alt="Screenshot 2024-03-04 at 10 03 44" src="https://github.com/sbu-ckane-f23-cse316-projectorg/projectfakeso-texas_wranglers/assets/123083767/94a788cf-e614-4966-8143-fc570a069878">

## collaboration
This projected was designed and programmed by Melissa Sanchez Pena.



