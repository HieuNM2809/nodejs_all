import cookieParser from "cookie-parser";
import express from "express";
import httpErrors from "http-errors";
import logger from "morgan";
import path from "path";
import { serve, setup } from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors";

// Router
import indexRouter from "./routes/index.js";
import majorRouter from "./routes/majorRoute.js";
import regionRouter from "./routes/regionRoute.js";
import postTypeRouter from "./routes/postTypeRoute.js";
import schoolLevelRouter from "./routes/schoolLevelRoute.js";
import combineRouter from "./routes/combineRoute.js";
import postRouter from "./routes/postRoute.js";
import postImageRouter from "./routes/postImageRoute.js";
import schoolRouter from "./routes/schoolRoute.js";
import schoolReviewRouter from "./routes/schoolReviewRoute.js";
import schoolImageRouter from "./routes/schoolImageRoute.js";
import testRouter from "./routes/testRoute.js";
import majorDetailRouter from "./routes/majorDetailRoute.js";
import majorReviewRouter from "./routes/majorReviewRoute.js";
import careerRoadMapRouter from "./routes/careerRoadMapRoute.js";
import appRouter from "./routes/appRoute.js";

const app = express();
const __dirname = path.resolve();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:4000",
      "https://careers-guidance-website.herokuapp.com",
      "https://careers-guidance-frontend.vercel.app",
      "https://careers-guidance-frontend-admin.vercel.app",
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Careers Guidance Website",
      version: "0.1.0",
      description: "The careers guidance website APIs documentation",
    },
    servers: [
      {
        // url: `http://localhost:${process.env.PORT}`,
        url: `https://careers-guidance-website.herokuapp.com`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.set("views", path.join(__dirname, "views"));
// view engine setup
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api-docs", serve, setup(swaggerDocs));

app.use("/", indexRouter);

app.use("/app", appRouter);

app.use("/major", majorRouter);

app.use("/major-detail", majorDetailRouter);

app.use("/major-reviews", majorReviewRouter);

app.use("/post", postRouter);

app.use("/post-images", postImageRouter);

app.use("/post-type", postTypeRouter);

app.use("/region", regionRouter);

app.use("/combine", combineRouter);

app.use("/test", testRouter);

app.use("/school", schoolRouter);

app.use("/school-images", schoolImageRouter);

app.use("/school-level", schoolLevelRouter);

app.use("/school-reviews", schoolReviewRouter);

app.use("/career-road-map", careerRoadMapRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
