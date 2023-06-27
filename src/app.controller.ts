import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  root(): string {
    return 'Go to /graphql to play with the API.'
  }
}
