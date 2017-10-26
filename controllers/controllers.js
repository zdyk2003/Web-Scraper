var express = require("express");
var request = require("request"); 
var cheerio = require("cheerio");
var router = express.Router();
var app = express();
var mongoose = require("mongoose");
mongoose.Promise = Promise;

// var db = require("../models/");

var Article = require("../models/article.js");

//load main page
	router.get("/", function(req,res) {
		res.render("index");
	});
//scrape idahostatesman for articles
	router.get("/submit-scrape", function(req, res) {
		request("http://www.idahostatesman.com/", function (error, response, html) {
			//save the loaded HTML here
			var $ = cheerio.load(html);
			// //array to hold scraped data
			var articles = [];
//*loop through the articles and save to the database

			$("h4.title").each(function (i, element) {
				var link = $(element).children().attr("href");
				var title = $(element).children().text();

				if (title && link) {
					articles.push({
						title: title,
						link: link
				});
				};
				return i < 15;
			});
			res.render("index", {articles: articles});
			console.log(articles);
		});	
	});

//save article to Mongoose

router.post("/save", function(req,res) {
	console.log("req.body",req.body);
	var newArticle = new Article(req.body); 
		
	newArticle.save(function(error, doc) {
		if (error) {
			console.log(error);
		}
		else {
			Article.findOneAndUpdate({}, {$push: { "h4.title": doc.title} }, {"link": doc.link}, function (error, saved ) {
				if(error) {
					res.send(error);
				}	
				else {
					res.send(saved);
				}
			});
		}
	});
});
	

router.get("/saved", function (req, res) {
	Article.find({}, function(error, doc){
		if (error) {
			res.send(error);
		}
		else {
			res.send(doc);
		}
	});
});
module.exports = router;