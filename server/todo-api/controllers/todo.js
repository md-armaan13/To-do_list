const Todo = require("../models/todo");
const User = require("../models/user");

module.exports.signIn=(req,res)=>{
    User.findOne({ email: req.body.email }, function (err, user) { // here one email is property which we are looking for
        console.log("Sign in")
        console.log(req.body)
        // other is user's email
        if (err) {
            console.log('error in finding user --> Passport');
            return res.status(422); // report an error to passport

        }
                console.log(user);
        if (!user || req.body.password != user.password) {
            console.log("Invalid Username/Password");
            return res.status(422).json({
                "error" : "invalid username/Password"
            });// since there is no error bur authentication is not done
        }
        console.log("reached");
        return res.status(200).json({
            user : user
        });

    });
 
}


module.exports.Create_user= (req,res)=>{
    
    //Now WE FIND USER WITH SAME ID IF IT EXIST OR NOT
        User.findOne({email: req.body.email},(err,user)=>{
            if(err){console.log('error in finding the user in db',err); return res.status(422).json({
                error : err
            });}

        if(!user){ // if user does not exist
           
            User.create(req.body,(err,user)=>{  // creating user
                if(err){console.log('error in creating the user in db',err); return;}
                console.log("user created");
                console.log(user);
                return res.status(200).json({
                    user : user
                });
            })

        }else{
            console.log('user already exist');
            return res.status(400).json({
                "error" : "user already exist"
            });
        }

        })
}

// To Create a Todo
exports.createTodo = async (req, res, next) => {
    // Log This Request
    try{
        console.log(
            (new Date()).toISOString(),
            req.method,
            req.baseUrl
        );;
       
       // console.log(user);
        // Create a new todo object
        // req.body should strictly follow Todo Model
        console.log("create task",req.body);
        let todo = await Todo.create({
            description : req.body.description,
            
        });
        console.log(todo);
       // console.log(user.list);
        const user = await User.findOneAndUpdate({email : req.params.id},{"$push" : {list : todo._id}});
            // user.list.push(todo._id);
            console.log(user);
            res.status(201).json({
                'status': 'Success',
                'message': 'Todo Created SuccessFully!',
                'todo' : todo
            })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            'status': 'Error',
            'message': 'Error in DB Operation!',
            'error': err
        });
    }
    // Save the object as document in MongoDb
}

// To get list of Todos
exports.getTodos = async (req, res, next) => {
    // Log This Request
    try{
        console.log(
            (new Date()).toISOString(),
            req.method,
            req.baseUrl
        );
            const listid = req.params.id.toString()
            console.log(listid)
            const user = await User.find({email : listid}).populate('list');
            console.log(user);
            return res.status(200).json({
                data : user
            })
    }
    catch(err){
        res.status(500).json({
            'status': 'Error',
            'message': 'Error in DB Operation!',
            'error': err
        });
    }
    

    // Set up Todo query
   
    // Execute todo query
   
}

// To get a specific Todo
exports.getTodo = (req, res, next) => {
    // Log This Request
    console.log(
        (new Date()).toISOString(),
        req.method,
        req.baseUrl
    );

    // Get Todo Id to modify
    const todoId = req.params.todoId;

    // Execute todo query
    Todo.findOne({
            _id: todoId
        })
        .then(
            todo => {
                if (!todo) {
                    return res.status(404).json({
                        'status': 'Success',
                        'message': 'No Todo found with that Id!',
                        'todo': todo
                    });
                }
                res.status(200).json({
                    'status': 'Success',
                    'message': 'Todo Fetched Successfully!',
                    'todo': todo
                });
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
}

// To Update a Todo
exports.updateTodo = (req, res, next) => {
    // Log This Request
    console.log(
        (new Date()).toISOString(),
        req.method,
        req.baseUrl
    );

    // Get Todo Id to modify
    const todoId = req.params.todoId;

    // Get Data to be modified
    const data = req.body;

    // Execute Update
    Todo.findOneAndUpdate({
            _id: todoId
        }, {
            ...data,
            'timestamps.modifiedOn': Date.now()
        }, {
            new: true
        })
        .then(
            updatedTodo => {
                res.status(201).json({
                    'status': 'Success',
                    'message': 'Todo Updated Successfully!',
                    'todo': updatedTodo
                })
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
}

// To Mark todo Complete
exports.completeTodo = (req, res, next) => {
    // Log This Request
    console.log(
        (new Date()).toISOString(),
        req.method,
        req.baseUrl
    );

    // Get Todo Id to modify
    const text = req.params.text;
    console.log(text);

    // Execute Update
    Todo.findOneAndUpdate({
            description: text
        }, {
            'isCompleted': true,
            'timestamps.modifiedOn': Date.now(),
            'timestamps.completedOn': Date.now()
        }, {
            new: true
        })
        .then(
            updatedTodo => {
                res.status(201).json({
                    'status': 'Success',
                    'message': 'Todo Marked as Completed!',
                    'todo': updatedTodo
                })
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
}

// To Delete a Todo
exports.deleteTodo = async (req, res, next) => {
    // Log This Request
    console.log(
        (new Date()).toISOString(),
        req.method,
        req.baseUrl
    );

    // Get Todo Id to delete
    const text = req.params.text;
        console.log(text);
    // Execute Update
  const todo = await Todo.findOneAndDelete({
            description: text
        })
        
        .then(
            deletedTodo => {
                res.status(201).json({
                    'status': 'Success',
                    'message': 'Todo Deleted Successfully!'
                })
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
        console.log(todo);
}