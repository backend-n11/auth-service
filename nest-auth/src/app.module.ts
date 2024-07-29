import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { ThrottlerModule } from "@nestjs/throttler";
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.register({
      global: true,
      secret: "qwer12345",
      signOptions: { expiresIn: '5m' },

    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 50,
    }]),
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard
    // },

  ],
})
export class AppModule { }
