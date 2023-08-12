
import app from './app';
import config from './config.json'

const PORT = process.env.PORT || config.env.port;

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
