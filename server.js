import {connectDB} from './data/database.js'
import {app} from './app.js';

connectDB();
// console.log(process.env.PORT);

app.listen(process.env.PORT,()=>{
    console.log(`Server Working on port:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})