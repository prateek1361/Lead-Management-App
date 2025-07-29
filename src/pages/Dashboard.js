import { Link } from "react-router-dom";
import useFetch from "../useFetch";
import { useState } from "react";

export default function Dashboard() {
  const {
    data: leads,
    loading,
    error,
  } = useFetch("https://project-2-beige-three.vercel.app/leads");

  const [statusFilter, setStatusFilter] = useState("");

  const newCount = leads?.filter((lead) => lead.status === "New").length || 0;
  const contactedCount =
    leads?.filter((lead) => lead.status === "Contacted").length || 0;
  const qualifiedCount =
    leads?.filter((lead) => lead.status === "Qualified").length || 0;

  const filteredLeads =
    statusFilter && leads
      ? leads.filter((lead) => lead.status === statusFilter)
      : leads?.slice(0, 3);

  return (
    <div className="container-fluid bg-body-secondary">
      <div className="row flex-column flex-md-row min-vh-100">
        <div className="col-md-3 bg-light  p-4 px-5">
          <h2 className=" mb-4">Anvaya CRM</h2>
          <hr />
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/leads">
                Leads
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/agents">
                Agents
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reports">
                Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/leadStatus">
                Lead Status
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/salesAgentView">
                Sales Agent View
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/setting">
                Settings
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-md-9 p-4  px-5 ">
          <div className="container">
            <h1 className=" mb-5">Anvaya CRM Dashboard</h1>
            <hr />

            <div className="mb-6">
              <h2 className=" mb-4 mt-5">Recent Leads</h2>
              {loading ? (
                <p>Loading leads...</p>
              ) : (
                <div className="d-flex flex-wrap gap-3">
                  {filteredLeads.slice(0, 3).map((lead) => (
                    <Link
                      key={lead._id}
                      to={`/leadManagement/${lead._id}`}
                      className="text-decoration-none text-dark"
                    >
                      <div
                        key={lead._id}
                        className="bg-light p-3 rounded shadow w-100 w-sm-75 w-md-50"
                      >
                        <p className="fw-bold">{lead.name}</p>
                        <p className="text-muted">{lead.status}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-6">
              <h2 className=" mb-4 mt-5">Lead Status</h2>
              <div className="d-flex flex-wrap gap-3">
                <div className="bg-light p-3 rounded shadow  w-100 ">
                  <p className="fw-medium">New</p>
                  <p>{newCount} Leads</p>
                </div>
                <div className="bg-light p-3 rounded shadow  w-100 ">
                  <p className="fw-medium">Contacted</p>
                  <p>{contactedCount} Leads</p>
                </div>
                <div className="bg-light p-3 rounded shadow  w-100">
                  <p className="fw-medium">Qualified</p>
                  <p>{qualifiedCount} Leads</p>
                </div>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-5">
              <button
                className="btn btn-outline-dark"
                onClick={() => setStatusFilter("New")}
              >
                New
              </button>
              <button
                className="btn btn-outline-success"
                onClick={() => setStatusFilter("Contacted")}
              >
                Contacted
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setStatusFilter("")}
              >
                Reset Filter
              </button>
            </div>

            <div className="mt-5">
              <Link to="/leadForm" className="btn btn-primary">
                + Add New Lead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
