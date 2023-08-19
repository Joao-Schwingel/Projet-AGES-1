import React from 'react';

import './tableCellImage.scss';
import getNameAbbreviation from 'utils/getNameAbbreviation';

interface TableCellImageProps {
  id: string;
  type: 'medicine' | 'institution';
  title: string;
  subTitle: string;
  image?: string;
}

export const TableCellImage: React.FC<TableCellImageProps> = ({
  id,
  type,
  title,
  subTitle,
  image,
}) => {
  return (
    <div id={id} className="table-cell-image-component">
      <div
        className={`table-cell-image-component-img-wrapper 
        ${type === 'medicine' && 'table-cell-image-medicine'}`}
      >
        {type === 'medicine' ? (
          <img src="/assets/pill-icon.svg" alt="icone" />
        ) : image === undefined || image === '' ? (
          <h3>{getNameAbbreviation(title)}</h3>
        ) : (
          <img src={image} alt="icone" />
        )}
      </div>
      <div className="table-cell-image-component-data-container">
        <h4>{title}</h4>
        <p>{subTitle}</p>
      </div>
    </div>
  );
};
