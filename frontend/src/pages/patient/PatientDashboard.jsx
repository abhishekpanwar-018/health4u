import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

function PatientDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/patients/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page">Loading dashboard...</div>;

  const { todayGoal, reminders, tip } = data || {};

  return (
    <div className="page">
      <h2>My Wellness Dashboard</h2>

      <div className="grid">
        <div className="card">
          <h3>Today's Goals</h3>
          {todayGoal ? (
            <>
              <p><strong>Steps:</strong> {todayGoal.steps?.achieved} / {todayGoal.steps?.target}</p>
              <p><strong>Sleep:</strong> {todayGoal.sleep?.achievedHours} / {todayGoal.sleep?.targetHours} hrs</p>
              <p><strong>Water:</strong> {todayGoal.waterIntake?.achievedMl} / {todayGoal.waterIntake?.targetMl} ml</p>
              <p className={`status-chip ${todayGoal.status === "ON_TRACK" ? "success" : "danger"}`}>
                {todayGoal.status === "ON_TRACK" ? "On Track" : "Behind"}
              </p>
            </>
          ) : (
            <p>No goals set for today.</p>
          )}
        </div>

        <div className="card">
          <h3>Preventive Care Reminders</h3>
          {reminders && reminders.length > 0 ? (
            <ul className="list">
              {reminders.map((r) => (
                <li key={r._id}>
                  <div>
                    <strong>{r.title}</strong>
                    <span className="muted">
                      {new Date(r.dueDate).toLocaleDateString()} • {r.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming reminders.</p>
          )}
        </div>

        <div className="card">
          <h3>Health Tip of the Day</h3>
          {tip ? (
            <>
              <h4>{tip.title}</h4>
              <p className="muted">{tip.category}</p>
              <p>{tip.body}</p>
            </>
          ) : (
            <p>No tip available today.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
