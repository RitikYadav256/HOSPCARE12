import { useEffect, useState } from "react";
import styles from "../../CSS/Appointments.module.css";
import Banner3 from "../../assets/Banner3.png";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [windowAppointments, setWindowAppointments] = useState([]);
  const [windowSize, setWindowSize] = useState(5);

 
  const scheduling = async (data)  => {
    setAppointments(data);
    const firstBatch = data.slice(0, windowSize);
    let n = firstBatch.length;
    const mail_id = "yadavritik000999@gmail.com";
      const response = await fetch(
        `http://localhost:5000/api/doctors/appointment/Mail?userEmail=${mail_id}&number=${5}`,
        {
          method: "Post",
          headers: { "Content-Type": "application/json" },
        }
      );
    setWindowAppointments(firstBatch);
  };


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("Data"));
        if (!user || !user.email || !user.category) {
          setError("User data not found");
          setLoading(false);
          return;
        }

        const { email: userEmail, category, doctorEmail } = user;

        const response = await fetch(
          `http://localhost:5000/api/doctors/appointment?userEmail=${userEmail}&doctorEmail=${doctorEmail}&category=${category}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        scheduling(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Handler for attending an appointment (for doctors)
  const Attend = (appointment) => {
    // Save selected appointment details for treatment page
    localStorage.setItem("userDetails", JSON.stringify(appointment));

    // Reduce windowSize by 1 (to simulate removing attended appointment from the current window)
    if (windowSize > 0) setWindowSize((prev) => prev - 1);

    // Navigate to treatment page
    window.location.href = "/appointment/treatment";
  };

  // Update windowAppointments when windowSize or appointments change
  useEffect(() => {
    setWindowAppointments(appointments.slice(0, windowSize));
  }, [windowSize, appointments]);

  // Get user data for conditional rendering
  const userData = JSON.parse(localStorage.getItem("Data"));

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <img src={Banner3} alt="Loading Appointments" className={styles.loadingImage} />
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Fetching your appointments, please wait...</p>
        <p className={styles.loadingSubtext}>
          Your health is our top priority. We're syncing your data securely with our medical system.
          <br />
          Please stay with us while we get everything ready for you! 💙
        </p>
      </div>
    );

  if (error)
    return (
      <div className={styles.errorContainer}>
        <img src={Banner3} alt="Health Alert" className={styles.alertImage} />

        <h2 className={styles.errorTitle}>⚠️ Session Expired!</h2>
        <p className={styles.errorText}>
          You have been <strong>automatically logged out</strong> due to inactivity or a security timeout. For
          your protection, it's essential to stay secure when accessing sensitive medical information.
        </p>

        <p className={styles.errorText}>
          Please <a href="/login" className={styles.loginLink}>Log In</a> again to continue managing your
          appointments, prescriptions, and medical history.
        </p>

        <hr className={styles.divider} />

        <h3 className={styles.benefitsTitle}>💊 Your Health, Our Priority</h3>
        <ul className={styles.benefitsList}>
          <li>✅ View and book doctor appointments instantly</li>
          <li>✅ Track your medical reports and lab test history</li>
          <li>✅ Get reminders for medications and follow-ups</li>
          <li>✅ 24/7 chat support with certified professionals</li>
        </ul>

        <p className={styles.helpText}>
          <em>Need help?</em> Visit our <a href="/help" className={styles.helpLink}>Help Center</a> or contact support
          for immediate assistance.
        </p>
      </div>
    );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>All Appointments</h2>
      <div className={styles.cardGrid}>
        {windowAppointments.length > 0 ? (
          windowAppointments.map((appointment, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardHeader}>
                <h5 className={styles.cardTitle}>{appointment.serviceType}</h5>
                <span className={styles.date}>
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </span>
              </div>
              <div className={styles.cardBody}>
                <p>
                  <strong>Doctor:</strong> {appointment.doctorEmail}
                </p>
                <p>
                  <strong>Organization:</strong> {appointment.doctorOrganization}
                </p>
                <p>
                  <strong>User Email:</strong> {appointment.userEmail}
                </p>
                <p>
                  <strong>Age:</strong> {appointment.userAge}
                </p>
                <p>
                  <strong>Mobile:</strong> {appointment.userMobile}
                </p>
              </div>

              {userData?.category === "doctor" && (
                <div className={styles.cardFooter}>
                  <button className={styles.attendBtn} onClick={() => Attend(appointment)}>
                    Attend
                  </button>
                  <button className={styles.trashBtn}>Trash</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className={styles.noData}>No Appointments Found</div>
        )}
      </div>
    </div>
  );
}

export default Appointments;
