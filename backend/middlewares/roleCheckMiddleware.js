export const roleCheckMiddleware = async (req, res, next) => {
  try {
    // console.log("role check middleware");

    const user = req.user;

    if (user.role === "admin") {
      next();
    } else {
      return res.status(200).send({
        sucess: true,
        role: user.role,
      });
    }
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};
