import React, { useState } from 'react';
import PresidentsView from '../PresidentsView/PresidentsView'
import AirportsView from '../AirportsView/AirportsView';
import TouristicAttractionsView from '../TouristicAttractionsView/TouristicAttractionsView';
import './TabComponent.css';

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState('presidents');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'presidents':
        return <PresidentsView />;
      case 'airports':
        return <AirportsView />;
      case 'touristicAttractions':
        return <TouristicAttractionsView />;
      default:
        return null;
    }
  };

  return (
    <div className="tab-container">
      <ul className="tab-list">
        <li className={`tab-list-item ${activeTab === 'presidents' ? 'active' : ''}`} onClick={() => setActiveTab('presidents')}>Presidentes</li>
        <li className={`tab-list-item ${activeTab === 'airports' ? 'active' : ''}`} onClick={() => setActiveTab('airports')}>Aeropuertos</li>
        <li className={`tab-list-item ${activeTab === 'touristicAttractions' ? 'active' : ''}`} onClick={() => setActiveTab('touristicAttractions')}>Atracciones Turísticas</li>
      </ul>
      <div className="">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TabComponent;