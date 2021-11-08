const {getProfiles} = require('../db')
const {head, footer} = require('../templets')
const app = require('express').Router();

module.exports = app;

app.get("/", async(req, res, next) => {
  try{
    const profiles = await getProfiles()
    const html =`
    <html>
      ${ head({ title: 'Main Page'})}
      <body>
        <div class='front-page-profile'>
        ${profiles.map(profile => `
          <div class='new-item'> 
            <h3 class="profile-name">${profile.name}</h3>
            <a class='main-page-img' href="/profile/${profile.id}"><img src="assets/id${profile.id}.png" height="400"/></a>
            <div>
            <p>Full Name: ${profile.fullname}</p>
            <p>${profile.shortinfo}</p>
            <a href="/profile/${profile.id}"><button class='more-info-btn'>More Info</button></a>
            </div>
          </div>`
        ).join('')}
        ${ footer()}
      </div>
      </body>
    </html>`;
    res.send(html);
    res.end()
  }
  catch(ex){
    next(ex)
  }
});