// To connect with your mongoDB database
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const jwt_code = "eagawagsggbesg[]}@wafwaf32egegea";
mongoose.connect('mongodb://127.0.0.1:27017', {
    dbName: 'users',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : 
    console.log('Connected to users database'));
// Schema for users of app
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
    password: {
		type: String,
		required: true,
	},
    score: {
        type: Number
    }
});

  
const User = mongoose.model('users', UserSchema);
// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

	resp.send("App is Working");
	// You can check backend is working or not by 
	// entering http://loacalhost:5000
	
	// If you see App is working means
	// backend working properly
});


app.post("/register", async (req, resp) => {
	try {
		const user = new User(req.body);
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
		let result = await user.save();
		result = result.toObject();
		if (result) {
			delete result.password;
			resp.send(req.body);
			console.log(result);
		} else {
			console.log("User already register");
		}

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});

// login endpoint
app.post("/login", async (request, response) => {
	// check if email exists
    const {email, password} = request.body;
	User.findOne({ email: request.body.email })
  
	  // if email exists
	  .then((user) => {
		// compare the password entered and the hashed password found
		bcrypt
		  .compare(request.body.password, user.password)
  
		  // if the passwords match
		  .then((passwordCheck) => {
  
			// check if password matches
			if(!passwordCheck) {
			  return response.status(400).send({
				message: "Passwords does not match",
				error,
			  });
			}
  
			//   create JWT token
			const token = jwt.sign(
			  {
				userId: user._id,
				userEmail: user.email,
                userScore: user.score
			  },
			  jwt_code,
			  { expiresIn: "24h" }
			);
  
			//   return success response
			response.status(200).send({
			  message: "Login Successful",
			  email: user.email,
              score: user.score,
			  token,
			});
		  })
		  // catch error if password does not match
		  .catch((error) => {
			response.status(400).send({
			  message: "Passwords does not match",
			  error,
			});
		  });
	  })
	  // catch error if email does not exist
	  .catch((e) => {
		response.status(404).send({
		  message: "Email not found",
		  e,
		});
	  });
  });

app.post("/userProfile", async (req,res) =>
{
    
    const {token} = req.body;
    console.log(token);
    try{
        const userEmail = token;
        User.findOne({ email: userEmail}).then((data) =>{
        res.send({status: "ok", data: data});
    })
    .catch((error) => {
        res.send({status: "error", data: error});
    });
    } catch(error) {console.log("errorra akadtunk");}
});

app.post("/updateScore", async (req, res) => {
    try {
      const { email, score } = req.body;
        console.log(email);
        console.log(score);
  
      //const user = jwt.verify(token, jwt_code);
        console.log("update előtt");
      // Adatbázis frissítése
      await User.updateOne({email: email} ,
        {
            $set:{
                score:score
            }
        });
  
      res.json({ status: "ok", message: "Score updated successfully" });
    } catch (error) {
      console.error("Error updating score:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });
  
  app.get("/getCurrentPoint", async(req,res)=>{
	try{
		const score = await User.find({})
		console.log(score);
		res.send({status:"ok",data:score})
	} catch(error){
		console.log(error);
	}

});
app.listen(5000);
