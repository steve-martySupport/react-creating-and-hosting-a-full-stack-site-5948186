import express from 'express';
import { MongoClient, ServerApiVersion, Db } from "mongodb";


let db:Db;
async function connectToMongoDB() {
  const uri = "mongodb+srv://stevemarty08_db_user:4KceEJiIlScRci1x@cluster0.3lzjemj.mongodb.net/?appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    db = client.db("linkedinlearning");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

const app = express();

app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {
  const articleName = req.params.name;
  const article = await db.collection("articles").aggregate([
    { $match: { name: articleName } },
    {
      $set: {
        comments: {
          $sortArray: {
            input: "$comments",
            sortBy: { date: -1 } // newest first
          }
        }
      }
    }
  ]).toArray();

  if (article && article.length > 0) {
    res.status(200).json(article[0]);
  } else {
    res.status(404).json({message: `Article ${articleName} not found!`});
  }
});

app.post('/api/articles/:name/upvote', async (req, res) => {
  const articleName = req.params.name;
  const article = await db.collection("articles").findOne({"name":articleName});
  
  if (article) {
    await db.collection("articles").updateOne({"name":articleName}, {
      $inc: { upvotes: 1 }
    });
    const updatedArticle = await db.collection("articles").findOne({"name":articleName});
    res.status(200).json({upvotes: updatedArticle?.upvotes, message: `Article ${articleName} upvoted successfully! Current upvotes: ${updatedArticle?.upvotes}`});
  } else {
    res.status(404).json({message: `Article ${articleName} not found!`});
  }
});

app.post('/api/articles/:name/add-comment', async (req, res) => {
  const articleName = req.params.name;
  const { username, text } = req.body;
  const article = await db.collection("articles").findOne({"name":articleName});
  
  if (article) {
    await db.collection("articles").updateOne({"name":articleName}, {
      $push: { comments: { username, text,date: new Date() } as any }
    });
    const updatedArticle = await db.collection("articles").aggregate([
      { $match: { name: articleName } },
      {
        $set: {
          comments: {
            $sortArray: {
              input: "$comments",
              sortBy: { date: -1 } // newest first
            }
          }
        }
      }
    ]).toArray();
    res.status(200).json({article: updatedArticle[0], message: `Comment added to article ${articleName} successfully! Current comments: ${JSON.stringify(updatedArticle[0]?.comments)}`});
  } else {
    res.status(404).json({message: `Article ${articleName} not found!`});
  }
});
async function startServer() {
  try {
    await connectToMongoDB();
    app.listen(8000, function(){
      console.log('Server is listening on port 8000');
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}
startServer();