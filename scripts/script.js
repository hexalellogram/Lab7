// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

// set listeners for header text and settings icon

const headerText = document.querySelector('header > h1');
headerText.onclick = function() {
  router.setState('home');
};

const gear = document.querySelector('header > img');
gear.onclick = function() {
  router.setState('settings');
};


document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach((entry, num) => {
        entry.num = num;
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.onclick = function() {
          router.setState('entry', entry);
        };
        document.querySelector('main').appendChild(newPost);
      });
    });
});
