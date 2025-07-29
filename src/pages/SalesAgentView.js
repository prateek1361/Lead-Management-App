import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../useFetch";

export default function SalesAgentView() {
  const {
    data: leads = [],
    loading,
    error,
  } = useFetch("https://project-2-beige-three.vercel.app/leads");

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const statuses = ["New", "Qualified", "Contacted", "Closed"];
  const priorities = ["High", "Medium", "Low"];

  const filteredLeads = leads
    .filter((lead) => {
      const statusMatch = statusFilter ? lead.status === statusFilter : true;
      const priorityMatch = priorityFilter
        ? lead.priority === priorityFilter
        : true;
      return statusMatch && priorityMatch;
    })
    .sort((a, b) =>
      sortBy === "timeToClose" ? a.timeToClose - b.timeToClose : 0
    );
  const uniqueAgents = [];
  for (let lead of filteredLeads) {
    if (
      lead.assignedAgent.name &&
      !uniqueAgents.includes(lead.assignedAgent.name)
    ) {
      uniqueAgents.push(lead.assignedAgent.name);
    }
  }

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
          <h1 className="mb-4">Leads by Sales Agent</h1>

          <div className="d-flex flex-wrap gap-3 mb-4">
            <select
              className="form-select w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
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

          {loading ? (
            <p>Loading leads...</p>
          ) : error ? (
            <p className="text-danger">Error fetching leads.</p>
          ) : (
            uniqueAgents.map((agent) => (
              <div key={agent} className="mb-4 bg-white p-4 rounded shadow">
                <h4 className="fw-bold mb-3">Sales Agent: {agent}</h4>
                <ul className="list-group">
                  {filteredLeads
                    .filter((lead) => lead.assignedAgent.name === agent)
                    .map((lead) => (
                      <li key={lead._id} className="list-group-item">
                        <strong>{lead.name}</strong> — [Status: {lead.status},
                        Priority: {lead.priority}, Time to close:{" "}
                        {lead.timeToClose}]
                      </li>
                    ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
