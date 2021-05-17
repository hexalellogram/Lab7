// router.js

export const router = {};

setPageContent = function(state, content) {
  let body = document.getElementsByTagName('body')[0];
  let header = document.querySelector('header > h1');

  if (state == 'home') {
    // set the information for home
    body.className = '';
    header.innerHTML = 'Journal Entries';
  }
  else if (state == 'settings') {
    // set up the information for settings
    body.className = 'settings';
    header.innerHTML = 'Settings';

  }
  else if (state == 'entry') {
    // set up the information for a single entry
    body.className = 'single-entry';

    // still need to set up entry content
  }
};

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function(state, content) {
  // https://stackoverflow.com/questions/1368264/how-to-extract-the-hostname-portion-of-a-url-in-javascript
  let url = window.location.origin + '/Lab7/';
  if (state == 'home') {
    history.pushState({page: 'home'}, 'Lab 7 - Web Components', url + '/#home');
  }
  else if (state == 'entry') {
    history.pushState({page: 'entry'}, 'Entry #' + content.order, url + '/#entry' + content.order);
  }
  else if (state == 'settings') {
    history.pushState({page: 'settings'}, 'Settings',url + '/#settings');
  }

  setPageContent(state, content);
  /**
   * - There are three states that your SPA app will have
   *    1. The home page
   *    2. The entry page (showing one individual entry)
   *    3. The settings page (currently blank, no actual settings here, just a placeholder where a real settings page would go)
   * 
   * - If you look at the CSS, we have 2 classes you can add to the body element to help change states, "settings" and "single-entry"
   * - Changing states will require more than just changing these classes, for example the settings page requires you to change the title to "Settings"
   * - And each individual entry the title changes to "Entry #" based on it's number in the entry order
   *
   * - When changing states, make sure the back and forward buttons work. You can use hash URLs (e.g. https://someurl.com/#settings) when changing states
   *   to make things easier.
   * - Similarly, when viewing an individual entry, a hashed URL might look like https://someurl.com/#entry3
   * 
   * - Some tips:
   *    1. Push a new state object to the history object using history.pushState() 
   *    2. look up the documentation for how to use pushState() when you try it
   *    3. look up the documentation for the "popstate" event listener (fires only on back button), useful in your script.js file
   *    4. For each <journal-entry> element, you can grab the JSON version of its info with .entry (e.g. someJournalEntryElement.entry)
   *       a. This is useful when viewing a single entry. You may notice an <entry-page> element in the HTML, this is the element that is displayed when the
   *          .single-entry class is applied to the body. You can populate this element by using .entry similarly. So if I wanted to grab a specific <journal-entry>
   *          and populate it's info into the <entry-page>, I would simply use an assignment of entryPageElement.entry = journalEntryElement.entry
   *       b. Clearing the <entry-page> element of its previous data can be a bit tricky, it might be useful to just delete it and insert a new blank one 
   *          in the same spot each time. Just a thought.
   *
   * - Answers to some questions you may have:
   *    1. You may add as many helper functions in this file as you like
   *    2. You may modify the parameters of setState() as much as you like
   */
}
