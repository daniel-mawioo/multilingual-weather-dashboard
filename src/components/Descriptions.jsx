import React from 'react';
import './Descriptions.css';
import { FaArrowDown, FaArrowUp, FaWind } from 'react-icons/fa';
import { BiHappy } from 'react-icons/bi';
import { MdCompress } from 'react-icons/md';

const Descriptions = ({ weather, units }) => {
    console.log(weather); // Log the weather object for debugging

    const tempUnit = units === 'metric' ? '°C' : '°F';
    const windUnit = units === 'metric' ? 'm/s' : 'm/h';
    const cards = [
        {
            id: 1,
            icon: <FaArrowDown />,
            title: "min",
            data: weather?.temp_min?.toFixed(), // Use optional chaining here
            unit: tempUnit,
        },
        {
            id: 2,
            icon: <FaArrowUp />,
            title: "max",
            data: weather?.temp_max?.toFixed(), // Use optional chaining here
            unit: tempUnit,
        },
        {
            id: 3,
            icon: <BiHappy />,
            title: "feels like",
            data: weather?.temp_max?.toFixed(),
            unit: tempUnit,
        },
        {
            id: 4,
            icon: <MdCompress />,
            title: "pressure",
            data: weather?.pressure,
            unit: "hPa",
        },
        {
            id: 5,
            icon: <MdCompress />,
            title: "humidity",
            data: weather?.humidity,
            unit: "%",
        },
        {
            id: 6,
            icon: <FaWind />,
            title: "wind speed",
            data: weather?.speed?.toFixed(), // Use optional chaining here
            unit: windUnit,
        },
    ];

    return (
        <div className='section section__descriptions'>
            {cards.map(({ id, icon, title, data, unit }) => (
                <div key={id} className='card'>
                    <div className='description__card-icon'>
                        {icon}
                        <small>{title}</small>
                    </div>
                    <h2>{`${data} ${unit}`}</h2>
                </div>
            ))}
        </div>
    );
};

export default Descriptions;
