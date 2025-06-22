import mongoose from 'mongoose';
import config from './config';
import app from './app';


 app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url!);
    console.log('Connected to MongooooooooDB');

  } catch (err) {
    console.error('connection failed:', err);
  }
}

bootstrap();
