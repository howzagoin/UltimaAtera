let lastTicketCount = 0;

function checkForNewTickets() {
  const ticketElements = document.querySelectorAll('.ticket-row');
  const openTickets = Array.from(ticketElements).filter(ticket => 
    ticket.querySelector('.status-column').textContent.trim().toLowerCase() === 'open'
  );

  if (openTickets.length > lastTicketCount) {
    const newTickets = openTickets.slice(lastTicketCount);
    newTickets.forEach(ticket => {
      const ticketId = ticket.querySelector('.ticket-id').textContent.trim();
      const ticketTitle = ticket.querySelector('.ticket-title').textContent.trim();
      chrome.runtime.sendMessage({
        action: 'newTicket',
        ticketInfo: { id: ticketId, title: ticketTitle }
      });
    });
  }

  lastTicketCount = openTickets.length;
}

const observer = new MutationObserver(checkForNewTickets);
observer.observe(document.body, { childList: true, subtree: true });

checkForNewTickets(); // Initial check when the script loads