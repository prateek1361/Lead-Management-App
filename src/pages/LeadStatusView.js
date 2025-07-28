import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../useFetch";

export default function LeadStatusView() {
  const {
    data: leads,
    loading,
    error,
  } = useFetch("https://project-2-beige-three.vercel.app/leads");

  const [statusFilter, setStatusFilter] = useState("");
  const [agentFilter, setAgentFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const leadsData = leads || [];

  const statuses = [...new Set(leadsData.map((lead) => lead.status))];
  const agents = [
    ...new Set(leadsData.map((lead) => lead.assignedAgent?.name)),
  ];
  const priorities = [...new Set(leadsData.map((lead) => lead.priority))];

  let filteredLeads = leadsData;

  if (statusFilter) {
    filteredLeads = filteredLeads.filter(
      (lead) => lead.status === statusFilter
    );
  }

  if (agentFilter) {
    filteredLeads = filteredLeads.filter(
      (lead) => lead.assignedAgent?.name === agentFilter
    );
  }

  if (priorityFilter) {
    filteredLeads = filteredLeads.filter(
      (lead) => lead.priority === priorityFilter
    );
  }

  if (sortBy === "timeToClose") {
    filteredLeads = [...filteredLeads].sort(
      (a, b) => a.timeToClose - b.timeToClose
    );
  }

  // Rest of the component remains the same...

  return (
    <div className="bg-body-secondary">
      <div className="row">
        <div className="col-md-3 bg-light p-4 px-5">
          <div className="container mt-2 vh-100">
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
        </div>

        <div className="col-md-9 p-4 px-5">
          <div className="container">
            <h1 className="mb-4">Leads by Status</h1>

            <div className="mb-5">
              {statuses.map((status) => (
                <button
                  key={status}
                  className={`btn me-2 ${
                    statusFilter === status
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h5 className="fw-bold mb-3">Status: {statusFilter}</h5>

              {loading ? (
                <p>Loading leads...</p>
              ) : error ? (
                <p className="text-danger">Error loading leads.</p>
              ) : filteredLeads.length === 0 ? (
                <p>No leads found.</p>
              ) : (
                <ul className="list-group">
                  {filteredLeads.map((lead) => (
                    <li key={lead._id} className="list-group-item">
                      <strong>{lead.name}</strong> — [Sales Agent:{" "}
                      {lead.assignedAgent?.name || "Unassigned"}]
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="d-flex gap-3 mb-4 mt-5">
              <select
                className="form-select w-auto"
                value={agentFilter}
                onChange={(e) => setAgentFilter(e.target.value)}
              >
                <option value="">All Agents</option>
                {agents.map((agent) => (
                  <option key={agent} value={agent}>
                    {agent}
                  </option>
                ))}
              </select>

              <select
                className="form-select w-auto"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="">All Priorities</option>
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>

              <select
                className="form-select w-auto ms-auto"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="timeToClose">Time to Close</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
