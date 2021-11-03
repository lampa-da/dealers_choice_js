const express = require("express");
const morgan = require("morgan");
const app = express();
const html = require("html-template-tag")
const profileBank = require("./profileBank")
const path = require("path")

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'assets')))


app.get("/", (req, res, next) => {
const profiles = profileBank.list()
const html =`
<html>

<head>
  <title>The Simpsons</title>
  <link rel="stylesheet" type="text/css" href="style.css" />
  <a href="/"><img src="The_simpsons_logo.svg" height="100"
  width="200"/></a>
</head>
<body>
  <div class='front-page-profile'>
  ${profiles.map(profile => `
    <div class='new-item'> 
      <h3 class="profile-name">${profile.name}</h3>
      <a class='main-page-img' href="/cheracters/id${profile.id}"><img src="id${profile.id}.png" height="400"/></a>
      <div>
      <p>Full Name: ${profile.fullName}</p>
      <p>${profile.shortInfo}</p>
      <a href="/cheracters/id${profile.id}"><button class='more-info-btn'>More Info</button></a>
      </div>
    </div>`
  ).join('')}
  <footer>
        <a href="http://www.katesv.com"><p>&copy Kate Sv</p></a>
      </footer>
  </div>
  </body>


</html>`;
res.send(html);
res.end()
});

app.get( '/cheracters/id:id', (req, res) => {
  const id = req.params.id;
  const profile = profileBank.find(id);
  const profiles = profileBank.list()
  if (!profile.id) {
    res.statusCode = 404;
    res.send('<h1>Page not found</h1>');
    res.end();
  }
  else{
    const html =`
    <html>
    <div class='wrapper'>
      <head>
        <title>The Simpsons</title>
        <link rel="stylesheet" type="text/css" href="../style.css" />
        <a href="/"><img src="../The_simpsons_logo.svg" height="100"
        width="200"/></a>
      </head>
      <body>
        <div class="main">
        <h3 class="profile-name">${profile.name}</h3>
        <div  class='profile-page'>
          <div class='img-profile'>
            <img src="../id${profile.id}.png" height="400"/>
          </div>
          <div class='info'>
            <div>
              <span class='headline' class='child'>Full Name: </span><span class='child'>${profile.fullName}</span>
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
            <p id='full-info'>${profile.moreInfo}</p>
            <div class="back-btn">
            <a href="/"><button>Back</button></a>
            </div>
          </div>
          </div>
          </div>
          </body>
      <footer>
        <a href="http://www.katesv.com"><p>&copy Kate Sv</p></a>
      </footer>
    </div>
    </html>`;
  res.send(html);
  res.end()
  }
});


app.get('*', (req, res) => res.send('<h1>Page Not found</h1>'));

const PORT = 1340;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
})