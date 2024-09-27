const User=require("./model");
const { generateToken, verifyToken, hashPassword, comparePassword }=require("./auth");

async function registerUser(req, res){
    try{
        const { name, username, email, password, confirmPassword }=req.body;
        if(!name || !username || !email || !password || !confirmPassword){
            return res.status(400).json({ message: "All fields are required" });
        }
        const usernameExist=await User.findOne({ username });
        if(usernameExist){
            return res.status(409).json({ message: "This username is taken" });
        }
        const emailExist=await User.findOne({ email });
        if(emailExist){
            return res.status(409).json({ message: "Email is already in use" });
        }
        const hasUpperCase=/[A-Z]/.test(password);
        const hasNumber=/[0-9]/.test(password);
        const hasSpecialCharacter=/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        switch (true) {
            case password.length < 6:
                return res.status(400).json({ message: "Password must be at least 6 characters long" });
            case !hasUpperCase:
                return res.status(400).json({ message: "Password must contain at least one uppercase letter" });
            case !hasNumber:
                return res.status(400).json({ message: "Password must contain at least one number" });
            case !hasSpecialCharacter:
                return res.status(400).json({ message: "Password must contain at least one special character" });
            default:
                break;
        }
        if(password!==confirmPassword){
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const hashedPassword=await hashPassword(password);
        const user=new User({
            name,
            username,
            email,
            password: hashedPassword
        });
        await user.save();
        const token=generateToken(user._id);
        res.cookie("auth", token, { httpOnly: true, secure: true, sameSite: "Lax", maxAge: 3600000 });
        res.status(200).json({ user, message: "User created successfully" });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

async function loginUser(req, res){
    try{
        const { credential, password }=req.body;
        if(!credential || !password){
            return res.status(400).json({ message: "All fields are required" });
        }
        const user=await User.findOne({ $or: [{ username: credential }, { email: credential }]});
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        const match=await comparePassword(password, user.password);
        if(!match){
            return res.status(403).json({ message: "Incorrect password" });
        }
        const token=generateToken(user._id);
        res.cookie("auth", token, { httpOnly: true, secure: true, sameSite: "Lax", maxAge: 3600000 });
        res.status(200).json({ user, token, message: "Login successful" });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

async function getProfile(req, res){
    try{
        const token=req.cookies.auth;
        if(!token){
            return res.status(401).json({ message: "No token found" });
        }
        const decoded=verifyToken(token);
        const user=await User.findById(decoded.userId);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

function logoutUser(req, res){
    try{
        res.cookie("auth", "", { httpOnly: true, sameSite: "Lax", expires: new Date(0)});
        res.status(200).json({ message: "Logout successfully" });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

async function updateUser(req, res){
    try{
        const token=req.cookies.auth;
        if(!token){
            return res.status(400).json({ message: "No token found" });
        }
        const decoded=verifyToken(token);
        const { name }=req.body;
        const user=await User.findByIdAndUpdate(
            decoded.userId,
            { name },
            { new: true, runValidators: true }
        );
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user, message: "User details updated" });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

async function deleteUser(req, res){
    try{
        const token=req.cookies.auth;
        if(!token){
            return res.status(401).json({ message: "No token found" });
        }
        const decoded=verifyToken(token);
        const user=await User.findByIdAndDelete(decoded.userId);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.cookie("auth", "", { httpOnly: true, sameSite: "Lax", expires: new Date(0)});
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

module.exports={
    registerUser,
    loginUser,
    getProfile,
    updateUser,
    logoutUser,
    deleteUser
}