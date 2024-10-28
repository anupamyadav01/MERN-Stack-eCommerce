export const roleCheckMiddleware = async (req, res, next) => {
  try {
    const user = req.user;

    if (user?.role === "admin") {
      next();
    } else {
      return res.status(200).send({
        user,
      });
    }
  } catch (error) {
    console.log(error);
    console.log("Role Check Executed");
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};
