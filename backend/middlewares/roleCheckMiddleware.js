export const roleCheckMiddleware = async (req, res, next) => {
  try {
    const user = req.user;

    if (user?.role === "admin") {
      console.log("Get User Details Executed");
      next();
    } else {
      return res?.status(200).send({
        sucess: true,
        role: user,
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
