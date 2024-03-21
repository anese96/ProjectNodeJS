const express = require("express");
const app = express();
const Article = require("./models/Article")
const mongoose = require("mongoose");

mongoose
	.connect("mongodb+srv://benkhaouaanes70:FmhNCMeilvDkCN0x@cluster0.xs4jpvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
		//"mongodb+srv://yarob2:yarob123@myfirstnodejscluster.toaytf9.mongodb.net/?retryWrites=true&w=majority"
	)
	.then(() => {
		console.log("connected successfully");
	})
	.catch((error) => { 
		 console.log("error with connecting with the DB ", error);
	});




app.use(express.json());

app.get("/", (req, res) => {
	res.send("hello in node js project");
});
app.get("/hello",(req,res) =>{
    res.send("Hello")
})

app.get("/say",(req,res) =>{
    //console.log(req.body.name);
    res.send("Your name is " + req.body.articleTitle)
})
app.get("/hi",(req,res) =>{
   //res.send("you visited hi")
    res.render("numbers.ejs", {
        name:"Anes",
    });
})
app.post("/test/:nb1/:bn2",(req,res) =>{
    const n1 = req.params.nb1;
    const n2 = req.params.bn2;
    const total = Number(n1) + Number(n2);

    //res.send(`The total is  ${total}`  )
    res.send( "The total is " + total )
})
app.post("/articles",async(req,res) =>{
   const newArticle = new Article()

   newArticle.title = req.body.articleTitle
   newArticle.body =  req.body.articleBody
   newArticle.numberOfLikes = 100
    await newArticle.save()

   res.send( "Add successfully " )
})
app.get("/articles/:articleId", async(req,res) =>{
    const id = req.params.articleId;

	try {
		const article = await Article.findById(id);
		res.json(article);
		return;
	} catch (error) {
		console.log("error while reading article of id ", id);
		return res.send("error");
	}
 })

 app.delete("/articles/:articleId", async (req, res) => {
	const id = req.params.articleId;

	try {
		const article = await Article.findByIdAndDelete(id);
		res.json(article);
		return;
	} catch (error) {
		console.log("error while reading article of id ", id);
		return res.json(error);
	}
});

app.get("/showArticles", async (req, res) => {
	const articles = await Article.find();

	res.render("articles.ejs", {
		allArticles: articles,
	});
});

app.listen(3000, () => {
	console.log("I am listening in port 3000");
});