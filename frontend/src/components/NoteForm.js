import React, { useState } from "react";

const styles = {
  noteForm: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  
  formTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '25px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
  },
  
  field: {
    marginBottom: '25px',
  },
  
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#374151',
    fontSize: '0.95rem',
  },
  
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #e5e7eb',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: '#fff',
    boxSizing: 'border-box',
  },
  
  inputFocus: {
    borderColor: '#667eea',
    outline: 'none',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
  },
  
  textarea: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #e5e7eb',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: '#fff',
    minHeight: '120px',
    resize: 'vertical',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  
  button: {
    flex: 1,
    padding: '14px 20px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontSize: '1rem',
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

const StyledInput = ({ value, onChange, placeholder, style = {} }) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...styles.input,
        ...(focused ? styles.inputFocus : {}),
        ...style,
      }}
    />
  );
};

const StyledTextarea = ({ value, onChange, placeholder, style = {} }) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...styles.textarea,
        ...(focused ? styles.inputFocus : {}),
        ...style,
      }}
    />
  );
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

const NoteForm = ({
  name,
  title,
  content,
  setName,
  setTitle,
  setContent,
  editMode,
  addOrUpdateNote,
  cancelUpdate,
}) => {
  return (
    <div style={styles.noteForm}>
      <h3 style={styles.formTitle}>
        {editMode ? 'Edit Note' : 'Create New Note'}
      </h3>
      
      <div style={styles.field}>
        <label style={styles.label}>Name</label>
        <StyledInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>
      
      <div style={styles.field}>
        <label style={styles.label}>Title</label>
        <StyledInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
        />
      </div>
      
      <div style={styles.field}>
        <label style={styles.label}>Content</label>
        <StyledTextarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
        />
      </div>
      
      <div style={styles.buttonContainer}>
        <StyledButton onClick={addOrUpdateNote}>
          {editMode ? "Update Note" : "Add Note"}
        </StyledButton>
        
        {editMode && (
          <StyledButton onClick={cancelUpdate} variant="warning">
            Cancel Update
          </StyledButton>
        )}
      </div>
    </div>
  );
};

export default NoteForm;