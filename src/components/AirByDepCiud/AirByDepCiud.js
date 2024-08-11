import React from 'react';
import './AirByDepCiud.css'
import { useState } from 'react';

const AirByDepCiud = ({ data }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.flatMap(item =>
        item.ciudades.flatMap(ciudad => (
            ciudad.aeropuertos.map(aeropuerto => ({
                aeropuerto: aeropuerto.name,
                ciudad: ciudad.ciudad,
                departamento: item.departmentName,
                conteo: ciudad.conteo,
            }))
        ))
    ).slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.flatMap(item =>
        item.ciudades.flatMap(ciudad => (
            ciudad.aeropuertos.map(aeropuerto => ({
                aeropuerto: aeropuerto.name,
                ciudad: ciudad.ciudad,
                departamento: item.departmentName,
                conteo: ciudad.conteo
            }))
        ))
    ).length / rowsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <>
            <div className='container'>
                <div className="title">Aeropuertos por departamento y ciudad</div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Departamento
                            </th>
                            <th>
                                Ciudad
                            </th>
                            <th>
                                Aeropuerto
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.departamento}</td>
                                <td>{row.ciudad} #{row.conteo}</td>
                                <td>{row.aeropuerto}</td>
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

export default AirByDepCiud;
