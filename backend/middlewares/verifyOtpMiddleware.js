export const otpVerification = async (req, res, next) => {
  try {
    const otp = req.body.otp;
    console.log(otp);
    return res.status(200).json({ success: true, message: "OTP verified" });
  } catch (error) {
    return res.status(500).send({
      message: "Something went wrong, please try again. ( OTP Verification ) ",
    });
  }
};
