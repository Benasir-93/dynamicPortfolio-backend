import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required:true, 
  },
  email: {
    type: String,
  },
  phoneNo:{
    type:Number,
  },
  name: {
    type: String,
  },
  headerTitle: {
    type: String,
  },
  about: {
    type: String,
  },
  skills: {
    type: String,
  },
  companyName:{
    type:String
  },
  exp: {
    type: String,
  },
  project1: {
    type: String,
  },
  descriptionWithUr1:{
    type:String,
  },
  project2: {
    type: String,
  },
  descriptionWithUr2:{
    type:String,
  },
  githubLinks: {
    type: String,
  },
  linkedinLinks: {
    type:String ,
  },
  start:{
    type:Date,
  },
  end:{
    type:Date,
  },
  currentlyWorking:{
    type:Boolean,
  },
  resumeLink: {
    type: String,
  },

});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export { Portfolio };
