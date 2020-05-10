import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotifyGateway } from './notify.gateway';
import { EnvService } from './common/config/env.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

const config = new EnvService().read();

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@cluster0-wo26k.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`),
    EnvService,
    AuthModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService, NotifyGateway],
})
export class AppModule {}
