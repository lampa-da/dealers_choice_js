const {client, syncAndSeed, getProfiles} = require('./db')

const express = require("express");
const morgan = require("morgan");
const app = express();

const path = require("path")
app.use(morgan('dev'));
app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.use('/', require('./routes/main-page'));

app.use('/profile', require('./routes/profile-page'));

app.use((err, req, res, next) => {
   console.error(err);
   console.error(err.stack)
   res.status(err.status || 500).send(err.message || 'Internal Server Error')
});

const init = async()=>{
  try{
    await client.connect();
    await syncAndSeed();
    const port = process.env.PORT || 1340;
    app.listen(port, () => console.log(`App listening in port ${port}`))
  }
  catch(ex){
    console.log(ex)
  }
}
init()
