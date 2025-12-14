const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


const {GoogleGenerativeAI}= require("@google/generative-ai");


dotenv.config();
//creating a server using express
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// we are grabbing the secret string from the .env file
//creating a database to work with
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.error(" MongoDB Connection Error:", err));

//AI brain setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({model:"gemini-2.5-flash"});

//route of working
// frontend will send POST request here with a "topic" for generation through AI
app.post('/api/generate',async (req,res)=>{try{
    //1.) get the topic from the backend
    const {topic}=req.body;

    if(!topic){
        return res.status(400).json({error:"Please provide a topic"});
    }

    //2.)create a prompt for generation
    const prompt= `Act as a professional blog writer. 
    Write a complete, engaging blog post about this topic: "${topic}".
    
    The blog must include:
    1. A Catchy Title.
    2. An Introduction.
    3. Three Main Points.
    4. A Conclusion.
    
    IMPORTANT: Do not ask follow-up questions. Write the full content immediately in clean Markdown format.`;
    //3.)ask gemini to generate the content for the user
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    //4.)send result back to frontend
    res.json({success: true,content:text});
}catch(error){

    console.error("AI error: ",error);
    res.status(500).json({error:"Failed to generate blog"});

}
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});