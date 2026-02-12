import express from 'express';
import type {Express} from 'express';

const app: Express = express();

app.get('/hello', function(req, res){
  res.send('Hello World!');
});

app.listen(8000, function(){
  console.log('Server is listening on port 8000');
});