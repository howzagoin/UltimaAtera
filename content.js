document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get('buttonUrl', (data) => {
      const buttonUrl = data.buttonUrl || 'https://example.com';
  
      // Function to add the "Add Last Used Device" button
      function addLastUsedDeviceButton() {
        const deviceElements = document.querySelectorAll('[data-automation-id^="ticket-page-requester-info-device:ticket-device-view"]');
        deviceElements.forEach(deviceElement => {
          if (deviceElement.textContent.trim() === '') {
            const connectButton = deviceElement.closest('.some-container-selector').querySelector('.double-button-but.large');
            if (connectButton) {
              const lastUsedDeviceButton = document.createElement('button');
              lastUsedDeviceButton.textContent = 'Add Last Used Device';
              lastUsedDeviceButton.style.marginLeft = '10px';
              lastUsedDeviceButton.className = 'atera-button-base atera-button-primary atera-button-sm';
  
              lastUsedDeviceButton.addEventListener('click', () => {
                // Extract contact name
                const contactNameElement = document.querySelector('[data-automation-id="ticket-page-requester-info-user:ticket-card-row"]');
                if (contactNameElement) {
                  const contactName = contactNameElement.textContent.trim();
                  if (contactName) {
                    // Open the devices page and search for the contact name
                    chrome.tabs.create({ url: 'https://app.atera.com/new/devices' }, (newTab) => {
                      chrome.scripting.executeScript({
                        target: { tabId: newTab.id },
                        func: searchLastUsedDevice,
                        args: [contactName]
                      });
                    });
                  }
                }
              });
  
              connectButton.parentElement.appendChild(lastUsedDeviceButton);
            }
          }
        });
      }
  
      // Function to search for the last used device
      function searchLastUsedDevice(contactName) {
        document.getElementById('searchBar').value = contactName;
        document.getElementById('searchBar').dispatchEvent(new Event('input', { bubbles: true }));
  
        // Add a small delay to allow search results to populate
        setTimeout(() => {
          const deviceElement = document.querySelector('a[ng-bind="device.DisplayName"]');
          if (deviceElement) {
            const lastUsedDevice = deviceElement.textContent.trim();
            
            // Send the last used device name back to the original tab
            chrome.runtime.sendMessage({ action: 'setLastUsedDevice', lastUsedDevice, closeTab: true });
          } else {
            chrome.runtime.sendMessage({ action: 'setLastUsedDevice', lastUsedDevice: null, closeTab: false });
          }
        }, 2000); // Adjust the delay as needed
      }
  
      // Function to set the last used device in the original ticket tab
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'setLastUsedDevice' && message.lastUsedDevice !== undefined) {
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
                    searchBar.value = message.lastUsedDevice;
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
        }
      });
  
      // Call the function to add the button after the page is fully loaded
      addLastUsedDeviceButton();
    });
  });
  