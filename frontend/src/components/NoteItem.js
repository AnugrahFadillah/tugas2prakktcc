import React, { useState } from "react";

const styles = {
  noteItem: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '5px',
    color: '#667eea',
  },
  subtitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#764ba2',
  },
  content: {
    fontSize: '1rem',
    marginBottom: '20px',
    color: '#374151',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
  },
  buttonWarning: {
    background: 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)',
  },
  buttonWarningHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(254, 202, 87, 0.3)',
  },
};

const StyledButton = ({ onClick, variant = 'primary', children }) => {
  const [hovered, setHovered] = useState(false);
  
  let buttonStyle = { ...styles.button };
  let hoverStyle = styles.buttonHover;
  
  if (variant === 'warning') {
    buttonStyle = { ...buttonStyle, ...styles.buttonWarning };
    hoverStyle = styles.buttonWarningHover;
  }
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...buttonStyle,
        ...(hovered ? hoverStyle : {}),
      }}
    >
      {children}
    </button>
  );
};

const NoteItem = ({ note, onEdit, onDelete }) => (
  <div style={styles.noteItem}>
    <h2 style={styles.title}>{note.name}</h2>
    <h3 style={styles.subtitle}>{note.title}</h3>
    <p style={styles.content}>{note.content}</p>
    <div style={styles.buttonContainer}>
      <StyledButton onClick={() => onEdit(note)}>Edit</StyledButton>
      <StyledButton onClick={() => onDelete(note.id)} variant="warning">
        Delete
      </StyledButton>
    </div>
  </div>
);

export default NoteItem;
