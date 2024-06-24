document.addEventListener('DOMContentLoaded', () => {
    const urlForm = document.getElementById('urlForm');
    const urlList = document.getElementById('urlList');
    const newUrl = document.getElementById('newUrl');
    const buttonUrlForm = document.getElementById('buttonUrlForm');
    const buttonUrlInput = document.getElementById('buttonUrl');
  
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
  
    buttonUrlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const buttonUrl = buttonUrlInput.value.trim();
      if (buttonUrl) {
        chrome.storage.sync.set({ buttonUrl });
        alert('Button URL saved!');
      }
    });
  
    chrome.storage.sync.get('buttonUrl', (data) => {
      if (data.buttonUrl) {
        buttonUrlInput.value = data.buttonUrl;
      }
    });
  
    updateUrlList();
  });
  