export const roleCheckMiddleware = async (req, res, next) => {
  try {
    // console.log("role check middleware");

    const user = req.user;

    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }
    next();
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};
