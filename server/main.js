const express = require('express');
const cors = require('cors')
const connectDB = require('./configs/db')


const authRouter = require('./routers/authRouter');
const mainRouter = require('./routers/mainRouter');
const usersRouter = require('./routers/usersRouter');
const shiftsRouter = require('./routers/shiftsRouter');
const employeesRouter = require('./routers/employeesRouter');
const departmentsRouter = require('./routers/departmentsRouter');
const usersDBRouter = require('./routers/usersDBRouter');

const app = express();
const port = 8000;

connectDB()

app.use(cors())

app.use(express.json());

// routers
app.use('/auth', authRouter);
app.use('/main', mainRouter);
app.use('/users', usersRouter);
app.use('/usersDB', usersDBRouter);
app.use('/shifts', shiftsRouter);
app.use('/employees', employeesRouter);
app.use('/departments', departmentsRouter);


app.listen(
  port,
  () => console.log(`app is listening at http://localhost:${port}`)
);