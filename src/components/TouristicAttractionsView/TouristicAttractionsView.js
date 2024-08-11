import React, { useEffect, useState } from 'react';
import EntityInfo from '../EntityInfo/EntityInfo';
import EntityList from '../EntityList/EntityList';
import ResponseTime from '../ResponseTime/ResponseTime';
import { getAllTouristicAttractions } from '../../services/ColombianApiService';
import { agruparAtraccionesPorDeptoCiudad } from '../../utils/Groupers';
import Modal from '../Modal/Modal';
import AtracByDepCiud from '../AtracByDepCiud/AtracByDepCiud'
import Spinner from '../Spinner/Spinner'

const TouristicAttractionsView = () => {
  const [attractions, setAttractions] = useState([]);
  const [loadingTime, setLoadingTime] = useState(0);

  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [groupAttractions, setGroupAttractions] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const start = performance.now();
      const data = await getAllTouristicAttractions();
      const end = performance.now();
      const agrupado = agruparAtraccionesPorDeptoCiudad(data);
      setGroupAttractions(agrupado);
      setLoadingTime(end - start);
      setAttractions(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleItemClick = (attraction) => {
    console.log(attraction)
    setSelectedAttraction(attraction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAttraction(null);
  };

  const modalContent = selectedAttraction ? (
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
          {selectedAttraction.name}
        </h2>
        <p style={{
          margin: '10px 0',
          fontSize: '1rem',
          color: '#666',
        }}>
          <b>Ciudad:</b> {selectedAttraction.city.name}
        </p>
        <p style={{
          margin: '10px 0',
          fontSize: '1rem',
          color: '#666',
        }}>
          <b>Descripción:</b> {selectedAttraction.description}
        </p>
        <p style={{
          margin: '10px 0',
          fontSize: '1rem',
          color: '#666',
        }}>

        </p>

      </div>
      <img
        src={selectedAttraction.images[0]}
        alt={`${selectedAttraction.name}`}
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
          <EntityInfo title="Cantidad de atracciones turísticas" count={attractions.length} />
          <EntityList data={attractions} title={'Lista de registros de atracciones turísticas'} itemsPerPage={10} onItemClick={handleItemClick} />
          <AtracByDepCiud data={groupAttractions}></AtracByDepCiud>
          <ResponseTime time={loadingTime} />
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            content={modalContent}
          />
        </div>
      )
      }
    </div>
  );
};

export default TouristicAttractionsView;
