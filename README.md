# Anvaya CRM – Lead Management App

Anvaya CRM is a simple yet powerful Lead Management System designed to help you track, manage, and organize leads by status and priority. The app supports full CRUD functionality for leads and also provides filtering, sorting, and viewing options grouped by sales agents.

---

## 🔗 Demo Link

[Live Demo](https://lead-management-app-wine.vercel.app/)

---

## 🚀 Quick Start

```bash
git clone https://github.com/prateek1361/Lead-Management-App
cd Lead-Management-App
npm install
npm run dev 
``` 

---

## 🛠️ Technologies

### Frontend:
- React JS
- React Router
- Bootstrap
- CSS Modules

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Demo Video
Watch a walkthrough (6 minutes) of all the major features of this app:
[Google Drive](https://drive.google.com/file/d/1R59G7y5qBNj0JvJBg5vR7wNslJ9bjOQc/view?usp=drive_link)


---

## 📦 Features

**Dashboard**
- Sidebar navigation
- View 3 Leads and lead status with status filters 
- Clicking a lead navigates to the Lead Management page
- Includes a button to add a new lead

**Leads**
- Sidebar navigation
- Filter by Status, agents
- Sort by priority and time to close
- Includes a button to add a new lead
- All leads are displayed here
- Clicking a lead opens the Lead Management page

**Add new lead**
- Sidebar navigation
- Form to add new lead
- Create lead button

**Lead management**
- Sidebar navigation
- View detailed of the speicific lead selected
- A button to edit leads
- Display all previous comments by users
- An input box to add a new comment

**Agents**
- Sidebar navigation
- All agents are displayed here
- A button which redirects to a add new agent page

**Add new agent**
- Sidebar navigation
- Form to add new agent
- Create Agent button

**Reports**
- Sidebar navigation
- Pie chart of tottal leads closed and in pipeline
- Bar chart of leads closed by sales agent
- Piew chart of lead status distribution

**Lead status view**
- Sidebar navigation
- Filters by status buttons
- leads displayed by the status selected
- Filter by agents and priority
- Sort by time to close

**Sales Agent View**
- Sidebar navigation
- Filter by status and priority
- Sort by time to close
- Leads are displayed by their agents

**Settings**
- Sidebar navigation
- Option to deleted any lead

 


---

## 📁 API Endpoints

**GET /leads** 
- Fetch all leads  
- Sample Response:  
[{ _id, title, status, priority, source, assignedAgent, comments, tags }, ...]  

**POST /leads**  
- Create a new lead  
- Request: { title, status, priority, source, assignedAgent }  
- Sample Response: { _id, title, status, priority, source, assignedAgent, comments, tags }  

**DELETE /leads/:leadId** 
- Delete a lead by ID  
- Sample Response: { message }

**POST /leads/:leadId/comments**  
- Add a comment to a lead  
- Request: { commentText }  
- Sample Response: { _id, commentText, lead, createdAt }  

**GET /leads/:leadId/comments**  
- Fetch all comments for a lead  
- Sample Response:  
[{ _id, commentText, lead, createdAt }, ...]  

**GET /agents**  
- Fetch all sales agents  
- Sample Response: [{ _id, name, email }, …]  

**POST /agents**  
- Create a new sales agent  
- Request: { name, email }  
- Sample Response: { _id, name, email }  


---

## Contact

For buys or feature request, please reach out to prateek20091234@gmail.com





