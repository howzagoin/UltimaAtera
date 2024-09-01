chrome.runtime.onInstalled.addListener(() => {
    // Set the icon to greyscale when the extension is installed
    chrome.action.setIcon({ path: 'icons/icon128_greyscale.png' });
});

chrome.runtime.onStartup.addListener(() => {
    // Set the icon to greyscale when the browser starts
    chrome.action.setIcon({ path: 'icons/icon128_greyscale.png' });
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "searchSelectedText",
    title: "Search Selected Text",
    contexts: ["selection"]
  });
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
        let iconPath = '';
        if (message.color === 'original') {
            iconPath = 'icons/icon128.png'; // Path to your original icon
        } else if (message.color === 'greyscale') {
            iconPath = 'icons/icon128_greyscale.png'; // Path to your greyscale icon
        }
        chrome.action.setIcon({ path: iconPath });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateIcon') {
        let iconPath = '';
        if (message.color === 'original') {
            iconPath = 'icons/icon128.png'; // Path to your original icon
        } else if (message.color === 'greyscale') {
            iconPath = 'icons/icon128_greyscale.png'; // Path to your greyscale icon
        }
        chrome.action.setIcon({ path: iconPath });
    }
});

