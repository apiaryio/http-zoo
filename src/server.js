const express = require('express');
const routes = require('./routes');

const app = express();

app.set('port', (process.env.PORT || 3000));

routes(app);

app.listen(app.get('port'), () => {
  console.log(`Server started: http://localhost:${app.get('port')}/`);
});
