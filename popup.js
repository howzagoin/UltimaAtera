document.getElementById('start').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'startMonitoring' });
  });
  
  document.getElementById('stop').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'stopMonitoring' });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateTicketList') {
      const ticketList = document.getElementById('ticketList');
      ticketList.innerHTML = '';
      message.tickets.forEach(ticket => {
        const li = document.createElement('li');
        li.textContent = ticket;
        ticketList.appendChild(li);
      });
    }
  });
  
document.getElementById('start').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'startMonitoring' });
    chrome.runtime.sendMessage({ action: 'updateIcon', color: 'original' });
});

document.getElementById('stop').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'stopMonitoring' });
    chrome.runtime.sendMessage({ action: 'updateIcon', color: 'greyscale' });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateTicketList') {
        const ticketList = document.getElementById('ticketList');
        ticketList.innerHTML = '';
        message.tickets.forEach(ticket => {
            const li = document.createElement('li');
            li.textContent = ticket;
            ticketList.appendChild(li);
        });
    }
});
