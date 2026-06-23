import React from 'react';
import './OpenStatus.css';

function OpenStatus({ hours }) {
  const checkIsOpen = (hoursString) => {
    if (!hoursString || hoursString.toLowerCase() === 'closed') return false;

    try {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const [startStr, endStr] = hoursString.split('-');
      if (!startStr || !endStr) return false;

      const parseTimeToMinutes = (timeStr) => {
        const cleanStr = timeStr.trim().toUpperCase();
        const isPM = cleanStr.includes('PM');
        const isAM = cleanStr.includes('AM');
        
        const timeParts = cleanStr.replace(/[AMP]/g, '').trim().split(':');
        let hours = parseInt(timeParts[0], 10);
        let minutes = timeParts[1] ? parseInt(timeParts[1], 10) : 0;

        if (isPM && hours !== 12) hours += 12;
        if (isAM && hours === 12) hours = 0;

        return hours * 60 + minutes;
      };

      const startMinutes = parseTimeToMinutes(startStr);
      const endMinutes = parseTimeToMinutes(endStr);

      if (endMinutes < startMinutes) {
        return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
      }

      return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
    } catch (e) {
      return false;
    }
  };

  const isOpen = checkIsOpen(hours);

  return (
    <span className={`status-badge ${isOpen ? 'open' : 'closed'}`}>
      {isOpen ? 'Open Now' : 'Closed'}
    </span>
  );
}

export default OpenStatus;