// Calendar integration utility functions

export const addToCalendar = (eventDetails) => {
  const { title, start, location, description } = eventDetails;
  
  // Format date and time for calendar URL
  const formattedStart = start.replace(/[-:]/g, '');
  
  // Create calendar URLs
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formattedStart}/${formattedStart}&location=${encodeURIComponent(location)}&details=${encodeURIComponent(description)}`;
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DTSTART:${formattedStart}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n');

  // Create blob for ICS file
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  
  // Detect mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile) {
    // For mobile devices, create both options
    const container = document.createElement('div');
    container.className = 'calendar-options';
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.background = 'white';
    container.style.padding = '20px';
    container.style.borderRadius = '10px';
    container.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    container.style.zIndex = '1000';
    
    container.innerHTML = `
      <h3 style="margin-top:0">Add to Calendar</h3>
      <button onclick="window.open('${googleCalendarUrl}', '_blank')" style="display:block;width:100%;margin:10px 0;padding:10px;border:none;background:#4285f4;color:white;border-radius:5px;cursor:pointer">
        Google Calendar
      </button>
      <button id="icsDownload" style="display:block;width:100%;margin:10px 0;padding:10px;border:none;background:#000000;color:white;border-radius:5px;cursor:pointer">
        Apple Calendar
      </button>
      <button onclick="this.parentElement.remove()" style="display:block;width:100%;margin:10px 0;padding:10px;border:1px solid #ddd;background:white;border-radius:5px;cursor:pointer">
        Cancel
      </button>
    `;
    
    document.body.appendChild(container);
    
    document.getElementById('icsDownload').onclick = () => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'event.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      container.remove();
    };
  } else {
    // For desktop, open Google Calendar in new tab and download ICS file
    window.open(googleCalendarUrl, '_blank');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'event.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};