const express = require("express");
const cors = require("cors");
const app = express();
const AuthController = require('./controllers/authController');
const userRouter = require('./routers/userRouters');
const roleRouter = require('./routers/roleRouters');
const permissionRouter = require('./routers/permissionRouters');
const emailTemplateRouter = require('./routers/emailTemplatesRouters');
const globalErrorHandler = require('./controllers/errorController');
var morgan = require("morgan");
const path = require('path');
// 1) MIDLEWARES
if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "http://localhost:3000",
      "http://limitless.local",
      "http://localhost:8080",
      "https://limitless-authdemo.netlify.app"
    ],
    methods: ["GET","POST","DELETE","PATCH"],
    allowedHeaders: ["X-Requested-With", "content-type","Authorization"],
    credentials: true,
  })
);
app.use(express.static(`${__dirname}`));
app.use(express.static(path.join(process.cwd(), 'public')));

// 2) ROUTES
app.post('/api/login', AuthController.login);
app.post('/api/signup',AuthController.signup);
app.post('/api/forgotpassword',AuthController.forgotPassword);
app.patch('/api/resetpassword/:token',AuthController.resetPassword);
app.use('/api/dashboard/counters', AuthController.dashboardCounters);
app.use('/api/users', userRouter);
app.use('/api/roles',roleRouter);
app.use('/api/permissions', permissionRouter);
app.use('/api/email-templates', emailTemplateRouter);
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(globalErrorHandler);

module.exports = app;