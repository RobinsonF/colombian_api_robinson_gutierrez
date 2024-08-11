import React from 'react';
import './AtracByDepCiud.css'
import { useState } from 'react';

const AtracByDepCiud = ({ data }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.flatMap(item =>
        item.ciudades.flatMap(ciudad => (
            ciudad.atracciones.map(atraccion => ({
                atraccion: atraccion.name,
                ciudad: ciudad.ciudad,
                departamento: item.departmentId,
                conteo: ciudad.conteo,
            }))
        ))
    ).slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.flatMap(item =>
        item.ciudades.flatMap(ciudad => (
            ciudad.atracciones.map(atraccion => ({
                atraccion: atraccion.name,
                ciudad: ciudad.ciudad,
                departamento: item.departmentId,
                conteo: ciudad.conteo,
            }))
        ))
    ).length / rowsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <>
            <div className='container'>
                <div className="title">Atracciones túristicas por departamento y ciudad</div>
                <div>
                    <p><center> <b>Nota: </b>La respuesta del api no traia el objeto departamento por tal razón solo va el id</center></p>
                </div>
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
                                Atracción túristica
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.departamento}</td>
                                <td>{row.ciudad} #{row.conteo}</td>
                                <td>{row.atraccion}</td>
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

export default AtracByDepCiud;
