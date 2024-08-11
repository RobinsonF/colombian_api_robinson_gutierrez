import React from 'react';
import './AirByDepCiudType.css'
import { useState } from 'react';

const flattenData = (data) => {
    const rows = [];

    if (!data || !data.region) {
        return rows;
      }

    Object.keys(data.region).forEach(regionKey => {
        const region = data.region[regionKey];

        Object.keys(region.departamento).forEach(deptoKey => {
            const departamento = region.departamento[deptoKey];

            Object.keys(departamento.ciudad).forEach(cityKey => {
                const ciudad = departamento.ciudad[cityKey];

                Object.keys(ciudad.tipo).forEach(tipoKey => {
                    rows.push({
                        region: regionKey,
                        departamento: deptoKey,
                        ciudad: cityKey,
                        tipo: tipoKey,
                        cantidad: ciudad.tipo[tipoKey]
                    });
                });
            });
        });
    });

    return rows;
};

const AirByDepCiudType = ({ data }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

    const rows = flattenData(data);

    const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);


    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const pageNumbers = [];

    for (let i = 1; i <= rows.length / rowsPerPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <div className='container'>
                <div className="title">Aeropuertos por región, departamento, ciudad y tipo</div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Región
                            </th>
                            <th>
                                Departamento
                            </th>
                            <th>
                                Ciudad
                            </th>
                            <th>
                                Tipo
                            </th>
                            <th>
                                Conteo
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.region}</td>
                                <td>{row.departamento}</td>
                                <td>{row.ciudad}</td>
                                <td>{row.tipo}</td>
                                <td>{row.cantidad}</td>
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
    );
};

export default AirByDepCiudType;

