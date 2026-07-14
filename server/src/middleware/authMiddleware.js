export const isAuthenticated = (req, res, next) => {
  console.log("SESSION:", req.session);

  if (!req.session || !req.session.user) {
    return res.status(401).json({
      success: false,
      message: "Please login first",
    });
  }

  next();
};