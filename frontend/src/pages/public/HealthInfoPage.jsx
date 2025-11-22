import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

function HealthInfoPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/health-info/public")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="page">
      <h2>Health Information</h2>
      <p className="muted">
        Trusted wellness content and preventive care tips for patients and families.
      </p>
      <div className="grid">
        {articles.map((a) => (
          <div className="card" key={a._id}>
            <h3>{a.title}</h3>
            <p className="muted">{a.category}</p>
            <p>{a.body}</p>
          </div>
        ))}
        {articles.length === 0 && <p>No articles available.</p>}
      </div>
    </div>
  );
}

export default HealthInfoPage;
