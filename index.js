const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const {restrictedToLogin}=require("./middlewares/auth")
const express = require("express");
const axios = require('axios');
const app = express();
const path=require("path");
const cookieParser=require('cookie-parser');
const methodOverride=require('method-override') 
const { v4: uuid } = require('uuid');
const mongoose = require("mongoose");
const User=require('./models/User');
app.use(express.json());
const userRoute=require("./routes/user");
app.set('view engine','ejs');
app.use(cookieParser());
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use("/user",userRoute);
mongoose.connect('mongodb+srv://sa:W2bnN2fhRdP16eVd@rankers.hqvuplj.mongodb.net/?retryWrites=true&w=majority&appName=rankers').then(()=>{console.log("Db connected successfully");}).catch((err)=>{
  console.log(err);
  console.log("errror");
})


const width = 800; // Width of the chart
const height = 600; // Height of the char
const backgroundColour ='#fff'
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height,backgroundColour  });

const generatechartforces=async(data)=>{
  const labels = data.result.map(item => new Date(item.ratingUpdateTimeSeconds * 1000).toLocaleDateString());
  const ratings = data.result.map(item => item.newRating);
  

  const configuration = {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: "User Ratings",
        data: ratings,
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 1)',
        pointBackgroundColor: 'rgba(255, 159, 64, 1)',
        pointBorderColor: 'black',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 159, 64, 1)',
        fill: false,
        tension: 0, // Smooth line
      }]
    },
    options: {
      plugins: {
        legend: {
          display: true,
          labels: {
            color: 'black',
          }
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function(context) {
              return `Rating: ${context.parsed.y}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
            color: 'black',
          },
          ticks: {
            color: 'black',
          }
        },
        y: {
          title: {
            display: true,
            text: 'Rating',
            color: 'black',
          },
          ticks: {
            color: 'black',
          }
        }
      },
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  };

  return await chartJSNodeCanvas.renderToDataURL(configuration);

};
  
const generatechartcode=async(data)=>{
  // const labels = data.result.map(item => new Date(item.ratingUpdateTimeSeconds * 1000).toLocaleDateString());
  // const ratings = data.result.map(item => item.newRating);
  const labels=data.contestParticipation.map(item=>new Date(item.contest.startTime*1000).toLocaleDateString());
  const ratings=data.contestParticipation.map(item=>item.rating)

  const configuration = {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: "User Ratings",
        data: ratings,
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 1)',
        pointBackgroundColor: 'rgba(255, 159, 64, 1)',
        pointBorderColor: 'black',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 159, 64, 1)',
        fill: false,
        tension: 0, // Smooth line
      }]
    },
    options: {
      plugins: {
        legend: {
          display: true,
          labels: {
            color: 'black',
          }
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function(context) {
              return `Rating: ${context.parsed.y}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
            color: 'black',
          },
          ticks: {
            color: 'black',
          }
        },
        y: {
          title: {
            display: true,
            text: 'Rating',
            color: 'black',
          },
          ticks: {
            color: 'black',
          }
        }
      },
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  };

  return await chartJSNodeCanvas.renderToDataURL(configuration);
}

app.get("/", (req, res) => {
  // res.send("Server working 🔥");
  res.render('home');
  // res.render('index');
});
app.get("/home",(req,res)=>{
  res.render('home');
})
app.get("/signup",(req,res)=>{
  res.render("signup");
})
app.get("/login",(req,res)=>{
  return res.render("login")
})
// app.get('/leetcode/:username',async(req,res)=>{
//   const username = req.params.username;
//   const url = `https://alfa-leetcode-api.onrender.com/${username}/contest`;
  
//   try{
//     const {data}=await axios.get(url);
//     const image=await generatechartcode(data);
    
//     res.render('result',{ imageData: image })
//     // res.set('Content-Type','image/png');
//     // res.send(image);
//     // res.send(data);
//   }
  
//   catch(err){ res.status(500).json({ error: 'Failed to fetch profile.' });}


// })


// app.get('/codeforces/:username', async (req, res) => {
//   const username = req.params.username;
//   const url = `https://codeforces.com/api/user.rating?handle=${username}`;
  
//   try {
//     const {data} = await axios.get(url);
//     // res.send(data.result); 
//     const image=await generatechartforces(data);
//     res.set('Content-Type','image/png');
//     res.send(image);
//   } catch (error) {
//     // Log the error for debugging purposes
//     res.status(500).json({ error: 'Failed to fetch profile.' });
//   }
// });

app.post('/submit',restrictedToLogin, async (req,res)=>{
  const {username,leetid,codeid}=req.body;
//  await User.create({ username,leetid,codeid});
// console.log("hi posted");
    const lurl=`https://alfa-leetcode-api.onrender.com/${leetid}/contest`
    var leetimage='';
    try{
      const {data}=await axios.get(lurl); 
      leetimage=await generatechartcode(data);
    }catch(err){ res.status(500).json({ error: 'Failed to fetch profile.' });}
  
    const curl=`https://codeforces.com/api/user.rating?handle=${codeid}`;
    var codeimage='';
    try{
      
      const {data}=await axios.get(curl);
      codeimage=await generatechartforces(data);
    }catch(err){ res.status(500).json({ error: 'Failed to fetch profile.' });}
    res.render('result',{username,leetid,codeid,leetimage,codeimage});


})
app.get("/rankings",async(req,res)=>{
  try{
    const users =await User.find().sort({leetRate:-1});
    const rankings = users.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      leetRate: user.leetRate,
    }));
    // res.send(rankings);
    res.render('ranking',{rankings});
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
})
app.listen(8080, () => {console.log("serverrunnnnn");});
