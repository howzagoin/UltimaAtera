chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setIcon({ path: 'icons/icon128_greyscale.png' });
  chrome.contextMenus.create({
    id: "searchSelectedText",
    title: "Search Selected Text",
    contexts: ["selection"]
  });
  // Set default value for alertsEnabled
  chrome.storage.sync.set({ alertsEnabled: true });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.action.setIcon({ path: 'icons/icon128_greyscale.png' });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "searchSelectedText") {
    chrome.storage.sync.get("searchUrls", (data) => {
      const searchUrls = data.searchUrls || [];
      const query = info.selectionText;
      for (const url of searchUrls) {
        const searchUrl = url.replace("%s", encodeURIComponent(query));
        chrome.tabs.create({ url: searchUrl });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateIcon') {
    let iconPath = message.color === 'original' ? 'icons/icon128.png' : 'icons/icon128_greyscale.png';
    chrome.action.setIcon({ path: iconPath });
  } else if (message.action === 'newTicket') {
    chrome.storage.sync.get('alertsEnabled', (data) => {
      if (data.alertsEnabled !== false) {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon128.png',
          title: 'New Atera Ticket',
          message: `Ticket ID: ${message.ticketInfo.id}\nTitle: ${message.ticketInfo.title}`,
          priority: 2
        });
      }
    });
  } else if (message.action === 'updateAlertStatus') {
    // This is not strictly necessary, but could be used for immediate changes
    // without waiting for a new ticket to come in
    console.log('Alert status updated:', message.enabled);
  }
});