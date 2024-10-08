import React from 'react';

const KPIBox = ({ title, value }) => {
  return (
    <div className="bg-blue-500 text-white p-4 rounded w-full shadow-md md:w-1/4 m-2 ml-0">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-xl">{value}</p>
    </div>
  );
};

export default KPIBox;
