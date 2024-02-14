const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload")
const db = require("./src/config/db.js")
const userRoutes = require("./src/routes/auth.js");
const consultantUserRoutes = require("./src/routes/consultantAuth.js")
const categoryRoutes = require("./src/routes/service.js")


dotenv.config();
db.connect()

const app = express()
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/auth", consultantUserRoutes);
app.use("/api/v1/service", categoryRoutes);



app.use(cors({
    origin: 'https://pro-backend.vercel.app',
    credentials: true // Enable credentials if your frontend sends cookies or authorization headers
}));


app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});


app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})



