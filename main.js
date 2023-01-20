const APIURL = 'https://api.github.com/users/';
const searchBox = document.querySelector('#search');
const main = document.querySelector('#main');

const getUser = async (username) => {
    const response = await fetch(APIURL + username);
    const data = await response.json();
    // console.log(data);

    const card = `
        <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos"></div>
            </div>
        </div>`

    main.innerHTML = card;
    getRepos(username);
}

getUser('a-rayhan');


const getRepos = async (username) => {
    const repos = document.querySelector('#repos');
    const response = await fetch(APIURL + username + '/repos');
    const data = await response.json();
    // console.log(data);

    data.forEach((item) => {
        const element = document.createElement('a');
        element.classList.add('repo')
        element.href = item.html_url
        element.innerText = item.name
        element.target = '_blank'
        repos.appendChild(element)
    })
}

const formSubmit = () => {
    if (searchBox.value != '') {
        getUser(searchBox.value);
        searchBox.value = '';
    }

    return false;
}


// < a class="repo" href = "#" target = "_blank" > Repo 1</a >
// <a class="repo" href="#" target="_blank">Repo 2</a>
// <a class="repo" href="#" target="_blank">Repo 3</a>