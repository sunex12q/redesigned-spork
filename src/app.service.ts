import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  sayHello(name: string): object {
    return {
      message: `Hello, ${name}!`,
      timestamp: new Date(),
    };
  }
}