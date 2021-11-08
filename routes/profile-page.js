const {client} = require('../db')
const {head, footer} = require('../templets')
const app = require('express').Router();

module.exports = app;

app.get( '/:id', async(req, res, next) => {
  try{
    const id = await req.params.id;
    const response = await client.query('SELECT * FROM profiles;')
    const profile = await response.rows[id-1];
    if (!profile.id) {
      res.statusCode = 404;
      res.send('<h1>Page not found</h1>');
      res.end();
    }
    else{
      const html =`
      <html>
      <div class='wrapper'>
      ${ head({ title: profile.name})}
        <body>
          <div class="main">
          <h3 class="profile-name">${profile.name}</h3>
          <div  class='profile-page'>
            <div class='img-profile'>
              <img src="/assets/id${profile.id}.png" height="400"/>
            </div>
            <div class='info'>
              <div>
                <span class='headline' class='child'>Full Name: </span><span class='child'>${profile.fullname}</span>
              </div>
              <div>
                <span class='headline' class='child'>Species: </span><span class='child'>${profile.species}</span>
              </div>
              <div>
                <span class='headline' class='child'>Gender: </span><span class='child'>${profile.gender}</span>
              </div>
              <div>
                <span class='headline' class='child'>Occupation: </span><span class='child'>${profile.occupation}</span>
              </div>
              <p id='full-info'>${profile.moreinfo}</p>
              <div class="back-btn">
              <a href="/"><button>Back</button></a>
              </div>
            </div>
            </div>
            </div>
            </body>
        ${ footer()}
      </div>
      </html>`;
    res.send(html);
    res.end()
    }
  }
  catch(ex){
    next(ex);
  }
});

