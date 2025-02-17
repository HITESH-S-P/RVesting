dotenv = require("dotenv");
express = require("express");
cors = require("cors"); // Import cors
const { connectDB } = require("./config/server.js");
const questionRoutes = require("./routes/questions.routes.js");
const answerRoutes = require("./routes/answers.routes.js");
const app = express();

dotenv.config();

app.use(cors()); // Enable CORS
app.use(express.json());

app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);

app.listen(5001, () => {
  connectDB();
  console.log("No sql Server is running on port http://localhost:5001");
});
