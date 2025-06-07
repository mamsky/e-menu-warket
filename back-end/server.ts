import app from './app';
import { config } from './src/config/config';

app.listen(config.port, () => {
  console.log(`running at http://localhost:${config.port}`);
});
