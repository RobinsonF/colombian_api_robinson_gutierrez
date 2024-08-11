import React from 'react';
import './EntityInfo.css';

const EntityInfo = ({ title, count }) => (
  <div className="entity-info-container">
    <div className="entity-info-title">{title}</div>
    <div className="entity-info-detail">Total: {count}</div>
  </div>
);

export default EntityInfo;
