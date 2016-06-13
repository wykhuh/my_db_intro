# instructions

Sign up for [github](https://github.com/) account.

Sign up for [cloud9](https://c9.io) account. Cloud9 is an online code editor. We are using c9 so people don't have to install stuff on their laptops.

## set up cloud9 workspace

Create [new workspace](https://c9.io/new) on cloud9.
- Give the workspace a name
- Choose public
- Under "Clone from Git or Mercurial URL", paste https://github.com/wykhuh/wwc_db_intro.git
- Under "Choose a template", choose Node.js
- Click "Create workspace"

## set up app

After the workspace is created, you should see something like this. ![Image of screen](http://i.imgur.com/trrbyzK.png?1)

 Type these command into the command line at the bottom.
- `npm install`
- `npm install -g bower`
- `bower install`

## start the app

- double click on `app.js` in the side menu.
- click on the green run button at the top of the screen.
- you should see something like in the command line.

```
Your code is running at https://<project name>.c9users.io.

```
- go to that url in a new browser tab. You should see the "My Favorite Books" with the name and author of one book.
- Send Wai-Yin a message via Meetup with the name and author of the book listed.
