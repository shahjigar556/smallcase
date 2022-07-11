# Small Case
The web-app is build using  `ReactJS` 

Install the require dependencies by command `npm install` in root directory 

Run the command `npm start` in root directory  React application on port 3000
### The Task contains following functionalities
<ol>
 <li>Search Bar where user can search for country by its name</li>
 <li>Rather then making api calls for each input entered on the textbox api call uis fired when the user halts for 2 seconds</li>
 <li>The query is cached and stored in frontend local storage so that api calls are not fired for same query</li>
 <li>To handle race condition in react all the former api are cancelled when new api calls is fired This leads to consistent state</li>
 <li>The look and feel of the website is in accordance with smallcase.com</li>
 <li>The webpage is responsive and is done with the help of react-boostrap library</li>
 <li>Pagination for the table is implemented via custom hooks</li>
</ol>

For Optimising the network calls rather then making api calls on each and every request , an api call is only fired when there is delay of  `one second` in typing 
<br/>
This concept is known as  `debouncing`
<br/>
To keep the UI in consistent state all the former api calls are cancelled when new api call is fired this is done using `Abort Controller`
<br/>
The search query are also cached in frontend It can be done in two ways `Cookies` and `local storage` For our implementaion `local storage` has been used
![image](https://user-images.githubusercontent.com/64774218/178158390-99da4d8b-6d4c-4282-b9ca-d6d6ca080f54.png)
