import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../CSS/Treatment.module.css";

function Treatment() {
  const [token, setToken] = useState("");
  const [patientDetails, setPatientDetails] = useState({});
  const [allMedicines, setAllMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    const storedUser = localStorage.getItem("userDetails");
    console.log(storedUser);

    if (!storedToken) {
      alert("⚠️ Token missing. Please log in again.");
      return;
    }

    setToken(storedToken);
    setPatientDetails(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (!token) return;

    async function fetchMedicines() {
      try {
        const res = await fetch("http://localhost:5000/api/Medical/Medicine", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setAllMedicines(data);
        console.log(data[0]);
      } catch (err) {
        console.error("Error fetching medicines:", err);
        alert("❌ Failed to fetch medicine data.");
      }
    }

    fetchMedicines();
  }, [token]);

  // Filter medicines based on searchTerm
  const filteredMedicines = allMedicines.filter((med) => {
    const name = med[" Name "]?.trim().toLowerCase();
    return name?.includes(searchTerm.toLowerCase());
  });

  return (
    <div className={styles.treatmentContainer}>
      <div className="card shadow-sm m-4 p-4">
        <div>
        <h4 className="text-primary">Patient Info</h4>
        <p><strong>Email:</strong> {patientDetails?.email || "N/A"}</p>
        <p><strong>Name:</strong> {patientDetails?.name || "N/A"}</p>
        </div>
        <div className="table-responsive">
          <h4 className="mt-1 text-black">SEARCH</h4>
          <input
            type="search"
            className="form-control w-50"
            placeholder="Search by medicine name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <h5 className="mt-4 text-success">All Medicines</h5>
          <table className="table table-bordered table-striped mt-3">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Medicine Name</th>
                <th>Stock</th>
                <th>Quantity</th>
                <th>Assign</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.length > 0 ? (
                filteredMedicines.map((med, index) => {
                  const name = med[" Name "]?.trim();
                  const stock = med?.S?.N;

                  return (
                    <tr key={med._id || index}>
                      <td>{index + 1}</td>
                      <td>{name || "Unknown"}</td>
                      <td>{stock ?? "N/A"}</td>
                      <td>
                        <input
                          type="text"
                          className={styles.input_box}
                          placeholder="Qty"
                        />
                      </td>
                      <td>
                        <button className={styles.add_btm}>add</button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No medicines found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Treatment;
