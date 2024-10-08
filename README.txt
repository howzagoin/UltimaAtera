UltimaAtera is a browser extension designed to enhance functionality while using the Atera platform. 
It provides several features to improve workflow efficiency and user experience.


Features

1. Context Menu Search
Right-click on selected text within a webpage to search using predefined search URLs or bookmarklets.

2. Automatic Page Refresh
Automatically refreshes the Atera ticket page every 1 minute and opens a new tab for newly detected tickets with the status "Open".

3. Options Page
Allows users to manage and customize:
- Adding/editing/deleting the search URLs/bookmarklets available in the right-click context menu.
- Configuration for automatic ticket page refreshing.
- Adding/editing/deleting the buttons that appear on Atera ticket pages.

4. Add Last Used Device
Adds a button to Atera ticket pages that, when clicked:
- Searches for the last used device associated with a contact name.
- If a device is found, it automatically adds the name to the ticket.

5. Automatically refreshes the page anytime a public reply is sent or an internal note is saved. 
C'mon Atera, do I have to submit a feature request? https://atera.uservoice.com/forums/936306-ideas-and-feedback


Installation

Download the Extension:
- Clone this repository or download it as a ZIP file.
- unpack the zip archive and place the folder somewhere it won't be modified, lost or easily fucked (so don't put it in your mum's bedroom).

Load the Extension in Chrome:
- Open Chrome/Edge/Brave/Chromium and go to chrome://extensions/.
- Enable "Developer mode".
- Click on "Load unpacked" and select the extension directory.

Configure Options:
Once installed, click on the extension icon in the browser toolbar to configure options such as search URLs and refresh intervals.


Usage

Context Menu Search:
Right-click on selected text in a webpage.
Choose a search engine from the context menu to search using the selected text.

Automatic Page Refresh:
The extension automatically refreshes every minute any browser tab open on https://app.atera.com/new/tickets.
If any new tickets with the status "Open" appear, they'll open in a new browser tab.

Add Last Used Device:
On Atera ticket pages, click the "Add Last Used Device" button next to the Connect button.
Searches for the last used device associated with a contact name and adds it to the ticket.

Future Plans
1. Copilot’s AI features will become a premium add-on starting 01/07/2024, methinks I need an AI model backend.
2. Microsoft Partner Center csv import and bookmarklet generator.
3. Autosuggest knowledge doc links to embed in tickets.
4. Popup paperclip helper if page sits idle for more than 5 minutes.
5. You tell me.....

Support
For any issues or suggestions, please open an issue.

License
This project is licensed under the MIT License.

