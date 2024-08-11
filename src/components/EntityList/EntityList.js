import React from 'react';
import { useState } from 'react';
import './EntityList.css';

const EntityList = ({ title, data, itemsPerPage, onItemClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="entity-list-container">
      <div className="entity-list-title">{title}</div>
      {currentItems.map((item, index) => (
        <div 
          key={index} 
          className="entity-list-item" 
          onClick={() => onItemClick(item)}
        >
          <span className="entity-list-item-name">{item.name}</span>
          <span className="entity-list-item-action">Ver detalles</span>
        </div>
      ))}
      <div className="pagination">
        <button 
          className="pagination-button" 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button 
            key={index} 
            className="pagination-button" 
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button 
          className="pagination-button" 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default EntityList;
