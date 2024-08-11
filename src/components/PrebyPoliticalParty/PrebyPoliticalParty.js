import React from 'react';
import './PrebyPoliticalParty.css'
import { useState } from 'react';

const PrebyPoliticalParty = ({ data }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.flatMap(item =>
    item.presidentes.map(presidente => ({
      partidoPolitico: item.partidoPolitico,
      name: presidente.name,
      lastName: presidente.lastName,
      conteo: item.conteo
    }))
  ).slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.flatMap(item =>
    item.presidentes.map(presidente => ({
      partidoPolitico: item.partidoPolitico,
      name: presidente.name,
      lastName: presidente.lastName,
      conteo: item.conteo
    }))
  ).length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }


  return (
    <>
      <div className='container'>
      <div className="title">Presidentes por partido político</div>
        <table>
          <thead>
            <tr>
              <th>
                Partido político
              </th>
              <th>
                Presidente
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index}>
                <td>{row.partidoPolitico} #{row.conteo}</td>
                <td>{row.name} {row.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={number === currentPage ? 'active' : ''}
            >
              {number}
            </button>
          ))}
        </div>
      </div>

    </>
  )

};

export default PrebyPoliticalParty;
