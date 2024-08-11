import React from 'react';

const EntityGroup = ({ data, groupBy }) => {
  const groupedData = data.reduce((acc, item) => {
    const key = item[groupBy];
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div>
      <h3>Agrupamiento por {groupBy}</h3>
      <pre>{JSON.stringify(groupedData, null, 2)}</pre>
    </div>
  );
};

export default EntityGroup;