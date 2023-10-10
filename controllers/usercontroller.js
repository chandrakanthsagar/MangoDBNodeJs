
const bcrypt = require('bcryptjs')

const user = require('../models/user.model')

const {generateToken,verifyToken} = require('../middleware/jwtMiddleware');
const User = require('../models/user.model');

module.exports = {
    registerUser : async (req,res) => {
        try{
            const{FirstName, SecondName,email,password} = req.body;
            
            const existingUser = await User.findOne({email})
            if(existingUser){
                res.status(400).json({error:"Email already exists"});
            }
            const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ FirstName,  SecondName, email, password: hashedPassword });

    await newUser.save();
    const token = generateToken(newUser);

    res.redirect('/signin');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'User registration failed' });
  }
    },
    signInUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: 'Authentication failed' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
              
                const token = generateToken(user);

               
                const verifiedUser = verifyToken(token);
                if (verifiedUser) {
                    res.redirect('/start');
                } else {
                    // Handle invalid or expired token
                    res.status(401).json({ error: 'Authentication failed' });
                }
            } else {
                res.status(401).json({ error: 'Authentication failed' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Sign-in failed' });
        }
    }
}