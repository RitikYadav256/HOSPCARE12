import express from "express";
import { FetchAllDoctors, bookappointment, fetchappointment } from "../controller/treatment.controller.js";
import { valid } from "../controller/auth.controller.js";
import sendAppointmentEmail from "../controller/Scheduling.controller.js";
const router = express.Router();


router.get("/doctors", FetchAllDoctors);
router.post("/bookappointment", bookappointment);
router.get("/doctors/appointment", fetchappointment);
router.post("/doctors/appointment/Mail",sendAppointmentEmail);

export default router; 