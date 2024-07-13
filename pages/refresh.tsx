import React, { useState } from 'react';

const MyComponent: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      {/* Render your component content */}
      <button onClick={handleRefresh}>Refresh</button>
      {refresh && <span>Component Refreshed!</span>}
    </div>
  );
};

export default MyComponent;
