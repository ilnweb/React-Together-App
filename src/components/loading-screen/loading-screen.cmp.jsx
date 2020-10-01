import React from 'react';
import './loading-screen.scss';

const LoadingScreen = (isLoading) => {
  return (
    <div className="loading-screen flex-c-c">
      <div className="spinner" />
    </div>
	);
};

export default LoadingScreen;
