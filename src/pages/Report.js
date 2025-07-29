import { Link } from "react-router-dom";
import { Pie, Bar } from "react-chartjs-2";
import useFetch from "../useFetch";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Report() {
  const {
    data: leads = [],
    loading,
    error,
  } = useFetch("https://project-2-beige-three.vercel.app/leads");

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const closedCount = leads.filter((l) => l.status === "Closed").length;
  const pipelineCount = leads.length - closedCount;

  const totalChartData = {
    labels: ["Closed", "In Pipeline"],
    datasets: [
      {
        data: [closedCount, pipelineCount],
        backgroundColor: COLORS,
      },
    ],
  };

  const agentNames = [];
  const agentClosed = [];

  for (let i = 0; i < leads.length; i++) {
    if (leads[i].status === "Closed") {
      const agent = leads[i].assignedAgent?.name || "Unassigned";
      const index = agentNames.indexOf(agent);
      if (index === -1) {
        agentNames.push(agent);
        agentClosed.push(1);
      } else {
        agentClosed[index]++;
      }
    }
  }

  const agentBarData = {
    labels: agentNames,
    datasets: [
      {
        label: "Closed Leads",
        data: agentClosed,
        backgroundColor: "#8884d8",
      },
    ],
  };

  const statusLabels = [];
  const statusCounts = [];

  for (let i = 0; i < leads.length; i++) {
    const status = leads[i].status || "Unknown";
    const index = statusLabels.indexOf(status);
    if (index === -1) {
      statusLabels.push(status);
      statusCounts.push(1);
    } else {
      statusCounts[index]++;
    }
  }

  const statusChartData = {
    labels: statusLabels,
    datasets: [
      {
        data: statusCounts,
        backgroundColor: COLORS,
      },
    ],
  };

  return (
    <div className="bg-body-secondary">
      <div className="row flex-column flex-md-row min-vh-100">
        <div className="col-md-3 bg-light p-4 px-5">
          <h2 className=" mb-4">Anvaya CRM</h2>
          <hr />
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link fs-4 d-flex gap-3" to="/">
                <i className="bi bi-arrow-90deg-left"></i>
                Back To Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-md-9 p-4 px-5">
          <div className="container">
            <h1 className="mb-4">Anvaya CRM Reports</h1>

            {loading ? (
              <p>Loading reports...</p>
            ) : error ? (
              <p className="text-danger">Failed to load data.</p>
            ) : (
              <>
                <div className="bg-white p-3 rounded shadow-sm mb-3">
                  <h5 className="fw-bold mb-2">
                    Total Leads Closed and In Pipeline
                  </h5>
                  <div className="d-flex justify-content-center">
                    <div style={{ width: "320px", height: "320px" }}>
                      <Pie data={totalChartData} />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded shadow-sm mb-3">
                  <h5 className="fw-bold mb-2">Leads Closed by Sales Agent</h5>
                  <div className="d-flex justify-content-center">
                    <div style={{ width: "550px", height: "260px" }}>
                      <Bar data={agentBarData} />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded shadow-sm">
                  <h5 className="fw-bold mb-2">Lead Status Distribution</h5>
                  <div className="d-flex justify-content-center">
                    <div style={{ width: "320px", height: "320px" }}>
                      <Pie data={statusChartData} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
