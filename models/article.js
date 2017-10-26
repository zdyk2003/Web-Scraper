var mongoose = require("mongoose");
//create a schema
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

	title: {
		type: String
		// required: true
	},
	link: {
		type: String
		// required: true
	}
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;