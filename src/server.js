import app from "./app";
import cors from "cors";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

app.listen(process.env.PORT);
