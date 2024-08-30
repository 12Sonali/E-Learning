const app =require('./app');
const { config } =require('dotenv');
config();

const PORT = process.env.PROCESS || 5000;
app.listen(PORT, () => {
    console.log('App is running at http:localhost:${PORT}');
});