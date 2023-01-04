const express= require('express');
const app= express();
const port=3000;
const db= require('./credentials/mongo');


// INCLUDING COOKIE PARSER TO ACCESS THE COOKIES

// TO READ POST REQUEST 
app.use(express.urlencoded());
app.use(express.json());
// MIDDLEWARE TO USE COOKIE


//just after the views 



// using express router 
app.use('/api/v1/todo',require('./routes/todo')); 





app.listen(port,function(err) {

    if(err) { 
        //console.log ('Error in running the server ' , err ) ;
            console.log(`Error in running the server : ${err}`); // backtick "Interpolation"
    }
   // console.log ( ' Yup ! My Express Server is running on Port : ' , port ) ;
        console.log(`My Express Server is running on Port : ${port}`);
} ) ;