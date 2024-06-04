import express from 'express';
import bodyParser from 'body-parser';

const app= express();
const port=3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let tasks = ['Waking up at 6','Freshening up'];

app.get('/', (req, res) => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today  = new Date();
    let day=today.toLocaleDateString("en-US",options);
    res.render('index',{day:day,tasks:tasks});
});

app.post('/add', (req, res) => {
    const newTask=req.body.task;
    tasks.push(newTask);
    res.redirect('/');
});

app.post('/delete',(req, res) => {
    if(req.body.delete){
  
        const index = tasks.indexOf(req.body.delete); 
        if (index > -1) {
            tasks.splice(index, 1);
        }
      }
      res.redirect('/');
});

app.listen(port,() => {
    console.log('Server running on port '+port);
});