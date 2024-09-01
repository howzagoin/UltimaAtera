document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get('buttonUrl', (data) => {
    const buttonUrl = data.buttonUrl || 'https://example.com';
    // Removed all code related to adding the "Add Last Used Device" button and setting the last used device.
  });
});
