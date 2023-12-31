import React, { useEffect, useState } from "react";
import "./newIssue.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addIssue } from "../issueSlice";
import { issueDetails } from "../../../Config/issueDetails";
import { addNotification } from "../../Notifications/notificationsSlice";
import { formatTimestamp } from "../../../utils";
import { selectAllUsers } from "../../Users/userSlice";
import { selectAllProjects } from "../../Projects/projectSlice";
import { selectTheme } from "../../Users/User/Settings/settingsSlice";

function NewIssue() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector(selectTheme);

  const [newId, setNewId] = useState(0);
  const users = useSelector(selectAllUsers);
  const [inputValues, setInputValues] = useState({});
  const issues = useSelector((state) => state.issues);
  const projects = useSelector(selectAllProjects);
  const currentDate = formatTimestamp(Date.now());
  const date = new Date().toISOString();

  const newIssue = {};

  issueDetails.forEach((detail) => {
    newIssue[detail.toLowerCase()] = inputValues[detail] || "";
  });

  newIssue.id = newId;
  newIssue.created = formatTimestamp(Date.now());

  const handleInputChange = (event, detail) => {
    const { value } = event.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [detail]: value,
    }));
  };

  const handleSaveNewIssue = (event) => {
    event.preventDefault();

    dispatch(addIssue(newIssue));
    dispatch(addNotification({ message: 'New issue created', title: newIssue.title, date: date }));

    alert("New issue was created!");

    setInputValues({});
    navigate(`/issues/${newIssue.id}`);
  };

  useEffect(() => {
    currentDate;
    if (issues && issues.length > 0) {
      const highestId = Math.max(...issues.map((issue) => issue.id), 0);
      setNewId(highestId + 1);
    } else {
      setNewId(1);
    }
  }, []);

  return (
    <section className="new-issue">
      <div
        className="new-issue-container"
        style={{
          border: `2px solid ${theme.border}`,
          color: theme.font_color,
          background: theme.primary_color,
        }}
      >
        <div className="new-issue-title">New Issue</div>
        <form className="new-issue-form">
          {issueDetails.map((detail) => (
            <div
              key={detail}
              className="new-issue-details"
              style={{ borderBottom: `1px solid ${theme.border}` }}
            >
              <div className="new-issue-detail">{detail}:</div>
              {detail === "Id" ? (
                <div className="new-issue-input id">Issue-{newId}</div>
              ) : detail === "Type" ? (
                <select
                  className="new-issue-input"
                  value={issueDetails[detail]}
                  onChange={(event) => handleInputChange(event, detail)}
                  style={{
                    background: theme.background_color,
                    border: `0.5px solid ${theme.border}`,
                    color: theme.font_color,
                  }}
                >
                  <option value="">Select a type...</option>
                  <option value="Bug">Bug</option>
                  <option value="Feature">Feature</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Crash">Crash</option>
                  <option value="Task">Task</option>
                </select>
              ) : detail === "Status" ? (
                <select
                  className="new-issue-input"
                  value={issueDetails[detail]}
                  onChange={(event) => handleInputChange(event, detail)}
                  style={{
                    background: theme.background_color,
                    border: `0.5px solid ${theme.border}`,
                    color: theme.font_color,
                  }}
                >
                  <option value="">Select a status...</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Postponed">Postponed</option>
                  <option value="Closed">Closed</option>
                </select>
              ) : detail === "Priority" ? (
                <select
                  className="new-issue-input"
                  value={issueDetails[detail]}
                  onChange={(event) => handleInputChange(event, detail)}
                  style={{
                    background: theme.background_color,
                    border: `0.5px solid ${theme.border}`,
                    color: theme.font_color,
                  }}
                >
                  <option value="">Select a priority level...</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              ) : detail === "Project" ? (
                <select
                  className="new-issue-input"
                  value={issueDetails[detail]}
                  onChange={(event) => handleInputChange(event, detail)}
                  style={{
                    background: theme.background_color,
                    border: `0.5px solid ${theme.border}`,
                    color: theme.font_color,
                  }}
                >
                  <option value="">Select a project...</option>
                  {projects.map((project, index) => (
                    <option key={index} value={`${project.title}`}>
                      {project.title}
                    </option>
                  ))}
                </select>
              ) : detail === "Submitter" ? (
                <select
                  className="new-issue-input"
                  value={issueDetails[detail]}
                  onChange={(event) => handleInputChange(event, detail)}
                  style={{
                    background: theme.background_color,
                    border: `0.5px solid ${theme.border}`,
                    color: theme.font_color,
                  }}
                >
                  <option value="">Select a Submitter...</option>
                  {users.map((user, index) => (
                    <option
                      key={index}
                      value={`${user.name.first} ${user.name.last}`}
                    >
                      {user.name.first} {user.name.last}
                    </option>
                  ))}
                </select>
              ) : detail === "Developer" ? (
                <select
                  className="new-issue-input"
                  value={issueDetails[detail]}
                  onChange={(event) => handleInputChange(event, detail)}
                  style={{
                    background: theme.background_color,
                    border: `0.5px solid ${theme.border}`,
                    color: theme.font_color,
                  }}
                >
                  <option value="">Select a Developer...</option>
                  {users.map((user, index) => (
                    <option
                      key={index}
                      value={`${user.name.first} ${user.name.last}`}
                    >
                      {user.name.first} {user.name.last}
                    </option>
                  ))}
                </select>
              ) : detail === "Created" ? (
                <div className="new-issue-input date">{currentDate}</div>
              ) : detail === "Description" ? (
                <textarea
                  type="text"
                  className="new-issue-input description"
                  placeholder={` Enter ${detail}...`}
                  value={inputValues[detail] || ""}
                  onChange={(event) => handleInputChange(event, detail)}
                  style={{
                    background: theme.background_color,
                    border: `0.5px solid ${theme.border}`,
                    color: theme.font_color,
                  }}
                />
              ) : (
                <input
                  type="text"
                  className="new-issue-input text"
                  placeholder={` Enter ${detail}...`}
                  value={inputValues[detail] || ""}
                  onChange={(event) => handleInputChange(event, detail)}
                  style={{
                    background: theme.background_color,
                    border: `0.5px solid ${theme.border}`,
                    color: theme.font_color,
                  }}
                />
              )}
            </div>
          ))}
        </form>
        <div className="new-issue-button-container">
          <button
            className="new-issue-button"
            onClick={handleSaveNewIssue}
            style={{
              border: `2px solid ${theme.border}`,
              color: theme.font_color,
              background: theme.background_color,
            }}
          >
            Create
          </button>
        </div>
      </div>
    </section>
  );
}

export default NewIssue;
