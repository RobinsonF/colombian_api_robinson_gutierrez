import React, { useEffect, useState } from 'react';
import EntityInfo from '../EntityInfo/EntityInfo';
import EntityList from '../EntityList/EntityList';
import ResponseTime from '../ResponseTime/ResponseTime';
import { getAllAirports } from '../../services/ColombianApiService';
import Modal from '../Modal/Modal';
import AirByDepCiud from '../AirByDepCiud/AirByDepCiud';
import { agruparAeropuertosPorDeptoCiudad, agruparAeropuertosPorRegionDeptoCiudadTipo } from '../../utils/Groupers';
import AirByDepCiudType from '../AirByDepCiudType/AirByDepCiudType'
import Spinner from '../Spinner/Spinner'

const AirportsView = () => {
  const [airports, setAirports] = useState([]);
  const [loadingTime, setLoadingTime] = useState(0);

  const [selectedAirport, setSelectedAirport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [groupAirports, setGroupAirports] = useState([]);
  const [groupAirportsType, setGroupAirportsType] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const start = performance.now();
      const data = await getAllAirports();
      const end = performance.now();
      const agrupado = agruparAeropuertosPorDeptoCiudad(data);
      const agrupadoType = agruparAeropuertosPorRegionDeptoCiudadTipo(data);
      setGroupAirports(agrupado);
      setGroupAirportsType(agrupadoType);
      setLoadingTime(end - start);
      setAirports(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleItemClick = (airport) => {
    setSelectedAirport(airport);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAirport(null);
  };

  const modalContent = selectedAirport ? (
    <div style={{
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      maxWidth: '500px',
      margin: '20px auto',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6'
    }}>
      <p style={{ margin: '10px 0', fontSize: '16px', color: '#333' }}>
        <b style={{ color: '#007bff' }}>Nombre:</b> {selectedAirport.name}
      </p>
      <p style={{ margin: '10px 0', fontSize: '16px', color: '#333' }}>
        <b style={{ color: '#007bff' }}>Departamento:</b> {selectedAirport.department.name}
      </p>
      <p style={{ margin: '10px 0', fontSize: '16px', color: '#333' }}>
        <b style={{ color: '#007bff' }}>Ciudad:</b> {selectedAirport.city.name}
      </p>
      <p style={{ margin: '10px 0', fontSize: '16px', color: '#333' }}>
        <b style={{ color: '#007bff' }}>Latitud:</b> {selectedAirport.latitude}
      </p>
      <p style={{ margin: '10px 0', fontSize: '16px', color: '#333' }}>
        <b style={{ color: '#007bff' }}>Longitud:</b> {selectedAirport.longitude}
      </p>
      <p style={{ margin: '10px 0', fontSize: '16px', color: '#333' }}>
        <b style={{ color: '#007bff' }}>Tipo:</b> {selectedAirport.type}
      </p>
    </div>
  ) : null;

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <EntityInfo title="Cantidad de aeropuertos" count={airports.length} />
          <EntityList data={airports} title={'Lista de registros de aeropuertos'} itemsPerPage={10} onItemClick={handleItemClick} />
          <AirByDepCiud data={groupAirports}></AirByDepCiud>
          <AirByDepCiudType data={groupAirportsType}></AirByDepCiudType>
          <ResponseTime time={loadingTime} />
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            content={modalContent}
          />
        </div>
      )}
    </div>

  );
};

export default AirportsView;
