document.addEventListener('DOMContentLoaded', () => {
  const urlForm = document.getElementById('urlForm');
  const urlList = document.getElementById('urlList');
  const newUrl = document.getElementById('newUrl');
  const alertToggle = document.getElementById('alertToggle');

  function updateUrlList() {
    chrome.storage.sync.get('searchUrls', (data) => {
      const searchUrls = data.searchUrls || [];
      urlList.innerHTML = '';
      searchUrls.forEach((url, index) => {
        const li = document.createElement('li');
        const urlText = document.createElement('span');
        urlText.textContent = url;
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        editButton.addEventListener('click', () => {
          const newUrl = prompt('Edit URL:', url);
          if (newUrl !== null) {
            searchUrls[index] = newUrl;
            chrome.storage.sync.set({ searchUrls });
            updateUrlList();
          }
        });

        deleteButton.addEventListener('click', () => {
          searchUrls.splice(index, 1);
          chrome.storage.sync.set({ searchUrls });
          updateUrlList();
        });

        li.appendChild(urlText);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        urlList.appendChild(li);
      });
    });
  }

  urlForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = newUrl.value.trim();
    if (url) {
      chrome.storage.sync.get('searchUrls', (data) => {
        const searchUrls = data.searchUrls || [];
        searchUrls.push(url);
        chrome.storage.sync.set({ searchUrls });
        newUrl.value = '';
        updateUrlList();
      });
    }
  });

  // Load and set the initial state of the alert toggle
  chrome.storage.sync.get('alertsEnabled', (data) => {
    alertToggle.checked = data.alertsEnabled !== false; // Default to true if not set
  });

  // Save the state of the alert toggle when changed
  alertToggle.addEventListener('change', () => {
    chrome.storage.sync.set({ alertsEnabled: alertToggle.checked });
    // Notify the background script about the change
    chrome.runtime.sendMessage({ action: 'updateAlertStatus', enabled: alertToggle.checked });
  });

  updateUrlList();
});