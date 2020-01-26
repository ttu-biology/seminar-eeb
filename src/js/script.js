'use strict';

//script.js

(function () {
  var seminars = 'https://raw.githubusercontent.com/ttu-biology/seminar-eeb/master/seminars/2020_spring.yml';

  /* fetch statement which uses the updateUISuccess and updateUIFailure functions to create the UI */
  fetch(seminars).then(function (response) {
    return response.text();
  }).then(function (response) {
    updateUISuccess(response);
  }).catch(function () {
    updateUIFailure();
  });

  /* in case of fetch success, this function to creates the UI */
  function updateUISuccess(response) {
    const seminars = jsyaml.load(response).seminars;
    let seminar_list = document.querySelector('#seminars');

    for (let i = 0; i < seminars.length; i++) {
      let seminar = seminars[i];
      genRow(seminar_list, seminar);
    }
  };
  
  /* the following functions support updateUISuccess */

  function genRow(seminar_list, seminar){
    let row = document.createElement('section');
    let date_img = document.createElement('div');
    let title_speaker = document.createElement('div');

    date_img.classList.add('date_img');
    title_speaker.classList.add('title_speaker');

    let date = document.createElement('h3');
    setDate(seminar, date);
    date_img.appendChild(date);

    let advert = document.createElement('img');
    advert.classList.add('advert');
    advert.src = 'img/eeb_hruska.jpg';
    date_img.appendChild(advert);


    if(seminar.is_holiday === true){
      genHolidayRow(title_speaker, seminar);
    }
    else{
      genSeminarRow(title_speaker, seminar);
    }

    setRowClass(row, seminar);

    row.appendChild(date_img);
    row.appendChild(title_speaker);
    seminar_list.appendChild(row);
  }
  
  function genSeminarRow(title_speaker, seminar){
    let title = document.createElement('div');
    let speaker = document.createElement('div');
    let host = document.createElement('div');

    setRowElements(seminar, title, speaker, host);
    appendRowElements(title_speaker, title, speaker, host);
  }

  function genHolidayRow(title_speaker, seminar){
    title_speaker.classList.add('holiday');
    let holiday_name = document.createElement('div');
    holiday_name.textContent = `Holiday: ${seminar.holiday_name}`;

    title_speaker.appendChild(holiday_name);
  }

  function setRowClass(row, seminar) {
	row.classList.add('seminar');
    let seminar_date = new Date(seminar.date);
    let now = new Date();
    if(seminar_date < now){
      row.classList.add('seminar', 'past_seminar');
    }
  }


  function setDate(seminar, date){
    date.classList.add('date');
    date.textContent = seminar.date;
  }

  function setSpeakerWebsite(seminar, speaker){
    if(seminar.speaker_website !== ''){
      let speaker_website = document.createElement('a');
      speaker_website.classList.add('speaker_website');
      speaker_website.href = seminar.speaker_website;
      speaker_website.title = seminar.speaker;
      speaker_website.target = '_blank';
      speaker_website.textContent = seminar.speaker;

      speaker.textContent = "Speaker: ";
      speaker.appendChild(speaker_website);
    }
    else{
      speaker.textContent = `Speaker: ${seminar.speaker}`;
    }
  }

  function setHostWebsite(seminar, host){
    if(seminar.host_website !== ''){
      let host_website = document.createElement('a');
      host_website.classList.add('host_website');
      host_website.href = seminar.host_website;
      host_website.title = seminar.host;
      host_website.target = '_blank';
      host_website.textContent = seminar.host;

      host.textContent = "Host: ";
      host.appendChild(host_website);
    }
    else{
      host.textContent = `Host: ${seminar.host}`;
    }
  }

  function setRowElements(seminar, title, speaker, host){
    title.classList.add('title');
    title.textContent = `Title: ${seminar.title}`;

    speaker.classList.add('speaker');
    setSpeakerWebsite(seminar, speaker);
    
    host.classList.add('host');
    setHostWebsite(seminar, host);
  }

  function appendRowElements(title_speaker, title, speaker, host){
    title_speaker.appendChild(title);
    title_speaker.appendChild(speaker);
    title_speaker.appendChild(host);
  }

  /* in case of fetch failure, this function defaults */
  function updateUIFailure() {
    console.log("Request failed.");
  };
})();
