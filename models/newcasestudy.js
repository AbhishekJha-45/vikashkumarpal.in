const mongoose = require("mongoose");
const newcaseStudy = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  post_url: {
    type: String,
    required: true,
  },
  redirect_url: {
    type: String,
    required: true,
    default: null,
  },
  author_name: {
    type: String,
    required: true,
  },
  cannonical_tag: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  robots: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.UTC,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.UTC,
  },
});

module.exports = mongoose.model("NewCaseStudy", newcaseStudy);
