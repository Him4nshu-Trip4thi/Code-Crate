import React from 'react';

const ErrorBanner = ({ message }) => {
  if (!message) return null;
  return (
    <div role="alert" aria-live="assertive" style={{
      background: '#ffecec',
      color: '#900',
      padding: '8px 12px',
      borderRadius: 4,
      marginBottom: 12,
    }}>
      {message}
    </div>
  );
};

export default ErrorBanner;
