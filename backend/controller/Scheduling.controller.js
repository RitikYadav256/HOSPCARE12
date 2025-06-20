// Scheduling.controller.js
import nodemailer from "nodemailer";
import { UpdateTotalPatient } from "../Algorithm/TimeSchedular.js";
import { calculateEstimatedTime } from "../Algorithm/TimeCalculator.js";

const sendAppointmentEmail = async (req, res) => {
  const { userEmail, number } = req.query;
  console.log(userEmail);
  const TimeData = await UpdateTotalPatient("dinesh@gmail.com");
  const time = TimeData.time;
  const AttendedPatient = TimeData.TotalPatient;
  const PredictedTime = calculateEstimatedTime(time, AttendedPatient, number);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hritikyadav256@gmail.com",
        pass: "jzfyhlcvfwmjyujk",
      },
    });
    const resp=await transporter.sendMail({
      from: "hritikyadav256@gmail.com",
      to: userEmail,
      subject: "Regarding your Appointment",
      text: `Your appointment is now scheduled. Please be informed that the current number being served is ${number}. Kindly wait for your turn.Your Predicted time is ${PredictedTime}`,
    });
    console.log(resp);
    res.status(200).json({ message: "Email sent successfully!",resp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send email", error: err.message });
  }
};

export default sendAppointmentEmail;
