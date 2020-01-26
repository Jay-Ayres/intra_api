import app from "./app";
import cors from "cors";
import "dotenv/config";

app.use(cors());

app.listen(process.env.PORT);
