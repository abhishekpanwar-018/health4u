import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

function ProviderDashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/providers/patients")
      .then((res) => setPatients(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page">Loading patients...</div>;

  return (
    <div className="page">
      <h2>Provider Dashboard</h2>
      <div className="card">
        <h3>My Patients</h3>
        {patients.length === 0 && <p>No patients found.</p>}
        {patients.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Last Login</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.lastLoginAt ? new Date(p.lastLoginAt).toLocaleString() : "Never"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProviderDashboard;
