# Demo Mail Web Application

This is a demo mail web application that allows users to send, receive, and manage emails. The frontend is developed with vanilla JavaScript and communicates with a backend API.

## Features

- Users can compose and send emails to one or more recipients, with a subject and a body.
- Users can view their inbox, sent mailbox, and archive mailbox, and see the latest emails in each mailbox.
- Users can view the details of an email, including the sender, recipients, subject, timestamp, and body.
- Users can mark an email as read or unread, and archive or unarchive an email.
- Users can reply to an email, with the recipient, subject, and body pre-filled.

## Installation

To run this project locally, follow these steps:
1. Clone this repository to your local machine.
2. Install the required dependencies by running `pip install -r requirements.txt` in the project directory.
3. Run the migrations by running `python manage.py makemigrations` and `python manage.py migrate` in the project directory.
4. Create an admin user to access the Django admin interface by running `python manage.py createsuperuser` in the project directory and following the prompts.
5. Run the server by running `python manage.py runserver` in the project directory.
6. Go to [http://127.0.0.1:8000/](^1^) to view the site.


## Usage

To use the demo mail web application, you need to register and login with a username and a password. You can use any valid email address as your username.

Once you are logged in, you can see your inbox with the most recent emails. You can click on an email to view its details. You can also mark it as read or unread, archive or unarchive it, or reply to it.

To compose a new email, click on the "Compose" button at the top. You can enter one or more recipients, separated by commas, a subject, and a body. Then click on the "Send" button to send the email.

To view your sent mailbox, click on the "Sent" button at the top. You can see the emails that you have sent, and click on them to view their details.

To view your archive mailbox, click on the "Archive" button at the top. You can see the emails that you have archived, and click on them to view their details. You can also unarchive them if you want.

To logout, click on the "Logout" button at the top.

### This is project 3 from the Harvard CS50 course 

## License

This project is licensed under the MIT License. See the [LICENSE](^2^) file for more details.
