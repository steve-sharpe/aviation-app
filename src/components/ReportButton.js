import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

function ReportButton({ label, onClick, isSelected }) {
  const getIcon = (label) => {
    if (label.toLowerCase().includes('airport')) return faMapMarkedAlt;
    if (label.toLowerCase().includes('flight')) return faPlane;
    return null;
  };

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? '#007bff' : '#f8f9fa',
        color: isSelected ? 'white' : 'black',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '10px 15px',
        margin: '5px',
        cursor: 'pointer',
      }}
    >
      {getIcon(label) && (
        <FontAwesomeIcon
          icon={getIcon(label)}
          style={{ marginRight: '10px' }}
        />
      )}
      {label}
    </button>
  );
}

export default ReportButton;