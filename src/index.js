import './style.css';

const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const gameID = 'geNkiCY06ZXBLWm1WIb4';
const requestedURL = `${baseURL}/games/${gameID}/scores`;
const btnRefresh = document.querySelector('.btn-refresh');
const scoreList = document.querySelector('.score-list');
const btnSubmit = document.querySelector('.btn-submit');

const renderScores = (items) => {
  let listItem = '';
  items.forEach((item) => {
    listItem += `<li>${item.user}: ${item.score}</li>`;
  });
  scoreList.innerHTML = listItem;
};

const getScores = async () => {
  const response = await fetch(requestedURL);
  const data = await response.json();
  renderScores(data.result);
};

btnRefresh.addEventListener('click', () => {
  getScores();
});

const addScore = async (userName, userScore) => {
  await fetch(requestedURL, {
    method: 'POST',
    body: JSON.stringify({
      user: userName,
      score: userScore,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json());
};

btnSubmit.addEventListener('click', () => {
  const userName = document.querySelector('.user-name');
  const userScore = document.querySelector('.user-score');
  const regex = /^[0-9]+$/;

  if (userName.value && userScore.value) {
    if (userScore.value.match(regex)) {
      addScore(userName.value, userScore.value);
    }
  }
  userName.value = '';
  userScore.value = '';
});

getScores();
