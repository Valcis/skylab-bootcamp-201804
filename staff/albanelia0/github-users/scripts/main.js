'use strict';

const handleClickUser = event => {
  const url = event.target.getAttribute('url');

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const image = document.querySelector('.profile img');
      const name = document.querySelector('.profile .name');
      const bio = document.querySelector('.profile .bio');
      const repos = document.querySelector('.profile .repos');

      image.setAttribute('src', data.avatar_url);
      name.innerHTML = data.name;
      bio.innerHTML = data.bio;
      repos.innerHTML = `Repos: ${data.public_repos}`;
    })
    .catch(error => alert(`The following error occurred: ${error}`));
}

const handleClickSearch = event => {
  event.preventDefault();
  const input = document.getElementsByClassName('input-text')[0].value;

  fetch(`https://api.github.com/search/users?q=${input}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      let htmlOutput = data.items.map(user => {
        return `<li class="user" url="${user.url}">${user.login}</li>`;
      }).join('');
      htmlOutput = `<ul>${htmlOutput}</ul>`;
      document.getElementsByClassName('results-container')[0].innerHTML = htmlOutput;

      // add click event to all the new li's
      const listItems = document.querySelectorAll('.user');
      listItems.forEach(item => item.addEventListener('click', handleClickUser));
    })
    .catch(error => alert(`The following error occurred: ${error}`));
}

// add click event to submit button
const submit = document.getElementsByClassName('input-submit')[0];
submit.addEventListener('click', handleClickSearch);
