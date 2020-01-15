'use strict';

//script.js

(function () {
  var seminars = 'https://raw.githubusercontent.com/WilliamBarela/eeb-seminar/master/seminars/2020_spring.yml';

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
    let date = document.createElement('h3');
    setDate(seminar, date);
    row.appendChild(date);

    if(seminar.is_holiday === true){
      genHolidayRow(row, date, seminar_list, seminar);
    }
    else{
      genSeminarRow(row, date, seminar_list, seminar);
    }

    setRowClass(row, seminar);
  }
  
  function genSeminarRow(row, date, seminar_list, seminar){
    let title = document.createElement('div');
    let speaker = document.createElement('div');
    let host = document.createElement('div');

    setRowElements(seminar, date, title, speaker, host);
    appendRowElements(row, date, title, speaker, host);
    seminar_list.appendChild(row);
  }

  function genHolidayRow(row, date, seminar_list, seminar){
    let holiday_name = document.createElement('div')

    setHoliday(seminar, holiday_name)
    row.appendChild(date); 
    row.appendChild(holiday_name);
    seminar_list.appendChild(row);
  }

  function setRowClass(row, seminar) {
    let seminar_date = new Date(seminar.date);
    let now = new Date();
    if(seminar_date < now){
      row.setAttribute('class', 'past_seminar');
    }
  }

  function setHoliday(seminar, holiday_name){
    holiday_name.setAttribute('class', 'holiday');
    holiday_name.textContent = `Holiday: ${seminar.holiday_name}`;
  }

  function setDate(seminar, date){
    date.setAttribute('class', 'date');
    date.textContent = seminar.date;
  }

  function setTitle(seminar, title){
    title.setAttribute('class', 'title');
    title.textContent = `Title: ${seminar.title}`;
  }

  function setSpeaker(seminar, speaker){
    speaker.setAttribute('class', 'speaker');
    setSpeakerWebsite(seminar, speaker);
  }

  function setSpeakerWebsite(seminar, speaker){
    if(seminar.speaker_website !== ''){
      let speaker_website = document.createElement('a');
      speaker_website.setAttribute('class', 'speaker_website');
      speaker_website.setAttribute('href', seminar.speaker_website);
      speaker_website.setAttribute('title', seminar.speaker);
      speaker_website.setAttribute('target', '_blank');
      speaker_website.textContent = seminar.speaker;

      speaker.textContent = "Speaker: ";
      speaker.appendChild(speaker_website);
    }
    else{
      speaker.textContent = `Speaker: ${seminar.speaker}`;
    }
  }

  function setHost(seminar, host){
    host.setAttribute('class','host');
    setHostWebsite(seminar, host);
  }

  function setHostWebsite(seminar, host){
    if(seminar.host_website !== ''){
      let host_website = document.createElement('a');
      host_website.setAttribute('class', 'host_website');
      host_website.setAttribute('href', seminar.host_website);
      host_website.setAttribute('title', seminar.host);
      host_website.setAttribute('target', '_blank');
      host_website.textContent = seminar.host;

      host.textContent = "Host: ";
      host.appendChild(host_website);
    }
    else{
      host.textContent = `Host: ${seminar.host}`;
    }
  }

  function setRowElements(seminar, date, title, speaker, host){
    setTitle(seminar, title);
    setSpeaker(seminar, speaker);
    setHost(seminar, host);
  }

  function appendRowElements(row, date, title, speaker, host){
    row.appendChild(title);
    row.appendChild(speaker);
    row.appendChild(host);
  }

  /* in case of fetch failure, this function defaults */
  function updateUIFailure() {
    console.log("Request failed.");
  };
})();
