import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message: "Too many login attempts from this IP, please try again later.",
  },
  handler: (req, res, options) => {
    console.log(
      `Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin} `
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true, // return reate limit info in the RateLimit Headers
  legacyHeaders: false, //disable x-ratelimit headers
});

export default loginLimiter;
