const {generatechartcode,generatechartforces}=require("../service/generate")
const {v4:uuidv4}=require('uuid');
const User=require("../models/User");
const{setUser}=require("../service/auth")
const axios = require('axios');
const { log } = require("console");

async function handleUserSignup(req,res){
    const {username,email,leetid,codeid, password} = req.body;
    await User.create({
        username,email,leetid,codeid, password
    });
    return res.redirect("/");
}
async function handleUserLogin(req,res){
    const {email, password} = req.body;
   const user= await User.findOne({
        email, password
    });
    if(!user)return res.render('login',{
        error:"Invalid Credentials"
    })
    const sessionId=uuidv4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);
    // console.log(user);
    // res.render("index")
    // next();
    // return res.redirect("/");
  const {username,leetid,codeid}=user;
  const lurl=`https://alfa-leetcode-api.onrender.com/${leetid}/contest`
  const curl=`https://codeforces.com/api/user.rating?handle=${codeid}`;
  
  var leetimage='';
  var codeimage='';
  let errorOccurred = false;
  let leetRating='';
  let leetContest='';
  let leetLast='';
  let codeRating='';
  let codeContest='';
  let codeLast='';
  try{
    const {data}=await axios.get(lurl); 
    leetimage=await generatechartcode(data);
    leetRating=Math.trunc(data.contestRating);
    leetContest=data.contestAttend;
    leetLast=data.contestParticipation[leetContest-1].contest.title
    // console.log(leetLast);
  }catch (err) {
    console.error('Failed to fetch LeetCode profile:', err);
    errorOccurred = true;
}
  try{
    
    const {data}=await axios.get(curl);
    codeimage=await generatechartforces(data);
    codeRating=data.result[data.result.length-1].newRating;
    codeContest=data.result.length
    codeLast=data.result[codeContest-1].contestName
    // console.log(codeLast);
  } catch (err) {
    console.error('Failed to fetch Codeforces profile:', err);
    errorOccurred = true;
}
if(errorOccurred){ return res.status(500).json({ error: 'Failed to fetch profiles.' });
}
  res.render('result',{username,leetid,codeid,leetimage,codeimage,leetRating,leetContest,leetLast,codeRating,codeContest,codeLast});
}


module.exports={handleUserSignup,handleUserLogin};