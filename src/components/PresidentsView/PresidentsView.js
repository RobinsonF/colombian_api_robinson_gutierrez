import React, { useEffect, useState } from 'react';
import EntityInfo from '../EntityInfo/EntityInfo';
import EntityList from '../EntityList/EntityList';
import ResponseTime from '../ResponseTime/ResponseTime';
import { getAllPresidents } from '../../services/ColombianApiService';
import Modal from '../Modal/Modal'
import PrebyPoliticalParty from '../../components/PrebyPoliticalParty/PrebyPoliticalParty';
import { agruparPresidentesPorPartido } from '../../utils/Groupers';
import Spinner from '../Spinner/Spinner'

const PresidentsView = () => {

  const [presidents, setPresidents] = useState([]);
  const [loadingTime, setLoadingTime] = useState(0);

  const [selectedPresident, setSelectedPresident] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [groupPresidentes, setGroupPresidentes] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const start = performance.now();
      const data = await getAllPresidents();
      const end = performance.now();
      const agrupado = agruparPresidentesPorPartido(data);
      setGroupPresidentes(agrupado);
      setLoadingTime(end - start);
      setPresidents(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleItemClick = (president) => {
    setSelectedPresident(president);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPresident(null);
  };

  const modalContent = selectedPresident ? (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: '8px',
      position: 'relative',
      overflow: 'auto',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: '20px',
    }}>
      <div style={{ flex: 1 }}>
        <h2 style={{
          marginTop: '0',
          fontSize: '1.5rem',
          color: '#333',
        }}>
          {selectedPresident.name} {selectedPresident.lastName}
        </h2>
        <p style={{
          margin: '10px 0',
          fontSize: '1rem',
          color: '#666',
        }}>
          <b>Descripción:</b> {selectedPresident.description}
        </p>
        <p style={{
          margin: '10px 0',
          fontSize: '1rem',
          color: '#666',
        }}>
          <b>Partido político: </b>{selectedPresident.politicalParty}
        </p>
        <p style={{
          margin: '10px 0',
          fontSize: '1rem',
          color: '#666',
        }}>
          <b>Período de mandato: </b>{selectedPresident.startPeriodDate} / {selectedPresident.endPeriodDate}
        </p>
      </div>
      <img
        src={selectedPresident.image}
        alt={`${selectedPresident.name}`}
        style={{
          maxWidth: '300px',
          height: 'auto',
          borderRadius: '5px',
        }}
      />
    </div>
  ) : null;



  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <EntityInfo title="Cantidad de Presidentes" count={presidents.length} />
          <EntityList data={presidents} title={'Lista de registros de presidentes'} itemsPerPage={10} onItemClick={handleItemClick} />
          <PrebyPoliticalParty data={groupPresidentes}></PrebyPoliticalParty>
          <ResponseTime time={loadingTime} />
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            content={modalContent}
          />
        </div>)}
    </div>

  );
};

export default PresidentsView;
