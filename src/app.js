import { useState } from "react";
import Header from "./components/header";

import initialEmails from "./data/emails";

import "./styles/app.css";

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [readToggle, setReadToggle] = useState(false);

  const emailsToDisplay = emails.filter((email) => {
    if (readToggle === true && email.read === true) {
      return false;
    }
    return true;
  });

  const toggleUnread = () => {
    if (readToggle) {
      setReadToggle(false);
    }
    if (!readToggle) {
      setReadToggle(true);
    }
  };

  const countUnread = () => {
    const unreadEmails = emails.filter((email) => !email.read);
    return unreadEmails.length;
  };

  const [unreadCount, setUnreadCount] = useState(countUnread());

  const countStarred = () => {
    const starredEmails = emails.filter((email) => email.starred);
    return starredEmails.length;
  };

  const [starredCount, setStarredCount] = useState(countStarred());

  const changeReadStatus = (email) => {
    const emailArray = emails.map((item) => {
      if (item.id === email.id) {
        item.read = !item.read;
      }
      return item;
    });
    setEmails(emailArray);
    setUnreadCount(countUnread());
  };

  const changeStarStatus = (email) => {
    const emailArray = emails.map((item) => {
      if (item.id === email.id) {
        item.starred = !item.starred;
      }
      return item;
    });
    setEmails(emailArray);
    setStarredCount(countStarred());
  };

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadCount}</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">{starredCount}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={readToggle}
              onChange={(e) => toggleUnread(emails)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {emailsToDisplay.map((email) => {
          const { id, sender, title, starred, read } = email;
          return (
            <li key={id} className={email.read ? "email read" : "email unread"}>
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  onChange={(e) => changeReadStatus(email)}
                  checked={read}
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  onChange={(e) => changeStarStatus(email)}
                  checked={starred}
                />
              </div>
              <div className="sender">{sender}</div>
              <div className="title">{title}</div>
            </li>
          );
        })}
      </main>
    </div>
  );
}

export default App;
