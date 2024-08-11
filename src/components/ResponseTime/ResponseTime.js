import React from 'react';
import './ResponseTime.css';

const ResponseTime = ({ time }) => (
  <div className="response-time-container">
    <h2 className="response-time-heading">Tiempo de Respuesta</h2>
    <p className="response-time-message">
      El tiempo de respuesta es <span className="response-time">{time} ms</span>.
    </p>
  </div>
);

export default ResponseTime;
