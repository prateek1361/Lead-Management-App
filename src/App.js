import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LeadList from "./pages/LeadList";
import LeadForm from "./pages/LeadForm";
import AgentManagement from "./pages/AgentManagement";
import AgentForm from "./pages/AgentForm";
import LeadManagement from "./pages/LeadManagement";
import Report from "./pages/Report";
import LeadStatusView from "./pages/LeadStatusView";
import SalesAgentView from "./pages/SalesAgentView";
import Setting from "./pages/Setting";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/leads" element={<LeadList />} />
        <Route path="/leadForm" element={<LeadForm />} />
        <Route path="/agents" element={<AgentManagement />} />
        <Route path="/agentForm" element={<AgentForm />} />
        <Route path="/leadManagement/:id" element={<LeadManagement />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/leadStatus" element={<LeadStatusView />} />
        <Route path="/salesAgentView" element={<SalesAgentView />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </Router>
  );
}

export default App;
