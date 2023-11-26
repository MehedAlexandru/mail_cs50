document.addEventListener('DOMContentLoaded', function () {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');

});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  send_email();

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {

  // Show the mailbox and hide other views
  const mailView = document.querySelector('#emails-view')
  const composeView = document.querySelector('#compose-view')
  composeView.style.display = 'none';
  mailView.style.display = 'block';

  if (mailbox == 'inbox') {
    load_inbox(mailView);
  } else if (mailbox == 'sent') {
    load_sent(mailView);
  } else if (mailbox == 'archive') {
    load_archive(mailView);
  }


  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}


function mailOpen(id) {
  console.log(id);
  fetch(`/emails/${id}`)
    .then(response => response.json())
    .then(email => {
      // Print email
      console.log(email);
      const mailView = document.querySelector('#emails-view')
      const composeView = document.querySelector('#compose-view')
      composeView.innerHTML = '';
      mailView.innerHTML = '';
      // (`<div class="email card shadow p-3"><p>Sender: ${email.sender}</p></br><p>Subject: ${email.subject}</p></br><p>Body: ${email.body}</p></br></div>`);
      mailView.innerHTML =
        `<div class="container mx-5 p-4">
         <div class="">From: ${email.sender}</div></br>
         <div class="">Subject: ${email.subject}</div></br>
         <div class="">Body: ${email.body}</div></br>
         <div class="">Timestamp: ${email.timestamp}</div></br>
      </div>`;
      if (email.read == false){
        fetch(`/emails/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            read: true
          })
        });
      }

      if (email.archived == false){
        mailView.innerHTML += `<button class="btn btn-warning" onclick="archive(${email.id})">Archive</button>`;
      }else{
        mailView.innerHTML += `<button class="btn btn-secondary" onclick="unarchive(${email.id})">Unarchive</button>`;
      }
      
    });
}


function archive(id) {
  console.log(id);
  fetch(`/emails/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      archived: true
    })
  });
  load_mailbox('inbox');
}

function unarchive(id) {
  console.log(id);
  fetch(`/emails/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      archived: false
    })
  });
  load_mailbox('inbox');
}


function load_inbox(mailView) {

  fetch('/emails/inbox')
    .then(response => response.json())
    .then(emails => {
      // Print emails
      console.log(emails);
      mailView.innerHTML = emails.map((email) => {
      
        return ( `<div onclick="mailOpen(${email.id})" class="row card" ${email.read ? 'style="background: grey"': ''}>
         <div class="col-3">${email.sender}</div>
         <div class="col-6">${email.subject}</div>
         <div class="col-3">${email.timestamp}</div>
      </div>`);
      
      });

    });

}

function load_archive(mailView) {
  fetch('/emails/archive')
    .then(response => response.json())
    .then(emails => {
      // Print emails
      console.log(emails);
      mailView.innerHTML = emails.map((email) => {
      
        return ( `<div onclick="mailOpen(${email.id})" class="row card">
         <div class="col-3">${email.sender}</div>
         <div class="col-6">${email.subject}</div>
         <div class="col-3">${email.timestamp}</div>
      </div>`);
      
      });

    });
}

function load_sent(mailView) {

  fetch('/emails/sent')
    .then(response => response.json())
    .then(emails => {
      // Print emails
      console.log(emails);
      mailView.innerHTML = emails.map((email) => {
        // `<div class="email card shadow p-3"><p>Sender: ${email.sender}</p></br><p>Subject: ${email.subject}</p></br><p>Body: ${email.body}</p></br></div>`);
        return (
          `<div class="row">
         <div class="col-3">${email.sender}</div>
         <div class="col-6">${email.subject}</div>
         <div class="col-3">${email.timestamp}</div>
      </div>`);
      });

    });

}


function send_email() {
  document.querySelector('#compose-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const recipients = document.querySelector('#compose-recipients').value;
    const subject = document.querySelector('#compose-subject').value;
    const body = document.querySelector('#compose-body').value;
    console.log(recipients);
    console.log(subject);
    console.log(body);

    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
}
