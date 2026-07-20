import dotenv from "dotenv";
dotenv.config();

import session from "express-session";
import MongoStore from "connect-mongo";

const sessionMiddleware = session({
  secret: process.env.JWT_SECRET,

  resave: false,
  saveUninitialized: false,

  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
  }),

  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
  },
});

export default sessionMiddleware;