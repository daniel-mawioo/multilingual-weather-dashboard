import React from 'react';
import './Descriptions.css';
import { FaArrowDown, FaArrowUp, FaWind } from 'react-icons/fa';
import { BiHappy } from 'react-icons/bi';
import { MdCompress } from 'react-icons/md';
import { FormattedMessage } from 'react-intl';

const Descriptions = ({ weather, units }) => {
    if (!weather) {
        // If weather data is not available, display an error message
        return <div className='error-message'>Weather data not available</div>;
    }

    const tempUnit = units === 'metric' ? '°C' : '°F';
    const windUnit = units === 'metric' ? 'm/s' : 'm/h';

    const cards = [
        {
            id: 1,
            icon: <FaArrowDown />,
            title: <FormattedMessage id="min_temperature" />,
            data: weather.temp_min?.toFixed(),
            unit: tempUnit,
        },
        {
            id: 2,
            icon: <FaArrowUp />,
            title: <FormattedMessage id="max_temperature" />,
            data: weather.temp_max?.toFixed(),
            unit: tempUnit,
        },
        {
            id: 3,
            icon: <BiHappy />,
            title: <FormattedMessage id="feels_like" />,
            data: weather.feels_like?.toFixed(),
            unit: tempUnit,
        },
        {
            id: 4,
            icon: <MdCompress />,
            title: <FormattedMessage id="pressure" />,
            data: weather.pressure,
            unit: "hPa",
        },
        {
            id: 5,
            icon: <MdCompress />,
            title: <FormattedMessage id="humidity" />,
            data: weather.humidity,
            unit: "%",
        },
        {
            id: 6,
            icon: <FaWind />,
            title: <FormattedMessage id="wind_speed" />,
            data: weather.speed?.toFixed(),
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
                    <h2>{`${data !== undefined ? data : '--'} ${unit}`}</h2>
                </div>
            ))}
        </div>
    );
};

export default Descriptions;
