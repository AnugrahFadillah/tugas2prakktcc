import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import { BASE_URL } from "../utils";

const styles = {
  appContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  },
  
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    minHeight: '100vh',
    transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
  },
  
  containerLogout: {
    opacity: 0,
    transform: 'scale(0.95) translateY(20px)',
  },
  
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '20px 30px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  
  headerTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0,
  },
  
  logoutButton: {
    padding: '12px 24px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  
  logoutButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(255, 107, 107, 0.3)',
  },
  
  logoutButtonClicked: {
    transform: 'scale(0.95)',
    background: 'linear-gradient(135deg, #ff5252 0%, #d32f2f 100%)',
  },
  
  ripple: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.6)',
    transform: 'scale(0)',
    animation: 'ripple 0.6s linear',
    pointerEvents: 'none',
  },
  
  loadingSpinner: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTopColor: 'white',
    animation: 'spin 1s linear infinite',
    marginRight: '8px',
  },
  
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  
  overlayVisible: {
    opacity: 1,
  },
  
  logoutMessage: {
    background: 'white',
    padding: '30px',
    borderRadius: '20px',
    textAlign: 'center',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    transform: 'scale(0.8)',
    transition: 'transform 0.3s ease',
  },
  
  logoutMessageVisible: {
    transform: 'scale(1)',
  },
  
  // Notification styles
  notificationContainer: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 2000,
  },
  
  notification: {
    background: 'white',
    padding: '16px 24px',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    transform: 'translateX(400px)',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  },
  
  notificationVisible: {
    transform: 'translateX(0)',
  },
  
  notificationIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    marginRight: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  },
  
  notificationSuccess: {
    borderLeft: '4px solid #4CAF50',
  },
  
  notificationError: {
    borderLeft: '4px solid #f44336',
  },
  
  notificationIconSuccess: {
    background: '#4CAF50',
    color: 'white',
  },
  
  notificationIconError: {
    background: '#f44336',
    color: 'white',
  },
  
  notificationText: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
  },
};

// CSS animations
const globalStyles = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;

// Inject global styles
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('notes-app-styles');
  if (!existingStyle) {
    const styleElement = document.createElement('style');
    styleElement.id = 'notes-app-styles';
    styleElement.textContent = globalStyles;
    document.head.appendChild(styleElement);
  }
}

const LogoutButton = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    if (isLoggingOut) return;
    
    // Efek ripple
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rippleId = Date.now();
    
    setRipples(prev => [...prev, { id: rippleId, x, y }]);
    
    // Hapus ripple setelah animasi selesai
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== rippleId));
    }, 600);
    
    // Efek klik
    setClicked(true);
    setIsLoggingOut(true);
    
    setTimeout(() => setClicked(false), 150);
    
    // Panggil fungsi logout setelah animasi
    setTimeout(() => {
      onClick();
    }, 1500);
  };
  
  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={isLoggingOut}
      style={{
        ...styles.logoutButton,
        ...(hovered && !isLoggingOut ? styles.logoutButtonHover : {}),
        ...(clicked ? styles.logoutButtonClicked : {}),
        cursor: isLoggingOut ? 'not-allowed' : 'pointer',
        opacity: isLoggingOut ? 0.8 : 1,
      }}
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          style={{
            ...styles.ripple,
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
          }}
        />
      ))}
      {isLoggingOut && <div style={styles.loadingSpinner} />}
      {isLoggingOut ? 'Logging out...' : 'Logout'}
    </button>
  );
};

const LogoutOverlay = ({ visible, onComplete }) => {
  const [messageVisible, setMessageVisible] = useState(false);
  
  useEffect(() => {
    if (visible) {
      setTimeout(() => setMessageVisible(true), 100);
      setTimeout(() => {
        setMessageVisible(false);
        setTimeout(() => onComplete(), 300);
      }, 1500);
    }
  }, [visible, onComplete]);
  
  if (!visible) return null;
  
  return (
    <div style={{
      ...styles.overlay,
      ...(visible ? styles.overlayVisible : {})
    }}>
      <div style={{
        ...styles.logoutMessage,
        ...(messageVisible ? styles.logoutMessageVisible : {})
      }}>
        <div style={styles.loadingSpinner} />
        <h3 style={{ margin: '10px 0 5px 0', color: '#333' }}>Logging out...</h3>
        <p style={{ margin: 0, color: '#666' }}>See you soon!</p>
      </div>
    </div>
  );
};

const Notification = ({ notification, onClose }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (notification) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onClose(), 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);
  
  if (!notification) return null;
  
  const isSuccess = notification.type === 'success';
  
  return (
    <div style={{
      ...styles.notification,
      ...(isSuccess ? styles.notificationSuccess : styles.notificationError),
      ...(visible ? styles.notificationVisible : {})
    }}>
      <div style={{
        ...styles.notificationIcon,
        ...(isSuccess ? styles.notificationIconSuccess : styles.notificationIconError)
      }}>
        {isSuccess ? '✓' : '✕'}
      </div>
      <span style={styles.notificationText}>
        {notification.message}
      </span>
    </div>
  );
};

const NotificationContainer = ({ notifications, onRemoveNotification }) => {
  return (
    <div style={styles.notificationContainer}>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          notification={notification}
          onClose={() => onRemoveNotification(notification.id)}
        />
      ))}
    </div>
  );
};

const NotesApp = ({ handleLogout }) => {
  const [notes, setNotes] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${BASE_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
      addNotification("Failed to fetch notes", "error");
    }
  };
  
  const addOrUpdateNote = async () => {
    if (!name || !title || !content) {
      addNotification("All fields are required!", "error");
      return;
    }
  
    try {
      const token = localStorage.getItem("accessToken");
  
      if (editMode) {
        await axios.put(`${BASE_URL}/notes/${editId}`, { name, title, content }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        addNotification("Note updated successfully!");
      } else {
        await axios.post(`${BASE_URL}/notes`, { name, title, content }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        addNotification("Note added successfully!");
      }
      resetForm();
      fetchNotes();
    } catch (error) {
      console.error("Error adding or updating note:", error);
      addNotification(
        editMode ? "Failed to update note" : "Failed to add note",
        "error"
      );
    }
  };
  
  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${BASE_URL}/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      addNotification("Note deleted successfully!");
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
      addNotification("Failed to delete note", "error");
    }
  };
  

  const editNote = (note) => {
    setName(note.name);
    setTitle(note.title);
    setContent(note.content);
    setEditMode(true);
    setEditId(note.id);
  };

  const resetForm = () => {
    setName("");
    setTitle("");
    setContent("");
    setEditMode(false);
    setEditId(null);
  };

  const handleLogoutWithAnimation = () => {
    setIsLoggingOut(true);
    setShowLogoutOverlay(true);
  };

  const completeLogout = () => {
    setShowLogoutOverlay(false);
    handleLogout();
  };

  return (
    <>
      <div style={styles.appContainer}>
        <div style={{
          ...styles.container,
          ...(isLoggingOut ? styles.containerLogout : {})
        }}>
          <div style={styles.header}>
            <h1 style={styles.headerTitle}>Notes App</h1>
            <LogoutButton onClick={handleLogoutWithAnimation} />
          </div>
          
          <NoteForm
            name={name}
            title={title}
            content={content}
            setName={setName}
            setTitle={setTitle}
            setContent={setContent}
            editMode={editMode}
            addOrUpdateNote={addOrUpdateNote}
            cancelUpdate={resetForm}
          />
          
          <NoteList
            notes={notes || []}
            search={search}
            setSearch={setSearch}
            onEdit={editNote}
            onDelete={deleteNote}
          />
        </div>
      </div>
      
      <LogoutOverlay 
        visible={showLogoutOverlay} 
        onComplete={completeLogout}
      />
      
      <NotificationContainer
        notifications={notifications}
        onRemoveNotification={removeNotification}
      />
    </>
  );
};

export default NotesApp;