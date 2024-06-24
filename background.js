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
  
  // Handle messages from content scripts
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'setLastUsedDevice' && message.lastUsedDevice !== undefined) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: (lastUsedDevice) => {
            const editButton = document.querySelector('[data-automation-id="ticket-page-change-device:atera-icon-button"]');
            if (editButton) {
              editButton.click();
              setTimeout(() => {
                const searchButton = document.querySelector('button[data-automation-id="ticket-page-select-agent-dialog-input:atera-dropdown-select"]');
                if (searchButton) {
                  searchButton.click();
                  setTimeout(() => {
                    const searchBar = document.querySelector('input[data-automation-id="_search-input:input"]');
                    if (searchBar) {
                      searchBar.value = lastUsedDevice;
                      searchBar.dispatchEvent(new Event('input', { bubbles: true }));
                      setTimeout(() => {
                        const saveButton = document.querySelector('button[data-automation-id="ticket-page-select-agent-dialog-ok:atera-button"]');
                        if (saveButton) {
                          saveButton.click();
                        }
                      }, 1000); // Adjust the delay as needed
                    }
                  }, 500); // Adjust the delay as needed
                }
              }, 1000); // Adjust the delay as needed
            }
          },
          args: [message.lastUsedDevice]
        });
      });
      if (message.closeTab) {
        chrome.tabs.remove(sender.tab.id);
      }
    }
  });
  