import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NoteTitleInterceptor<T> implements NestInterceptor<T, T> {

  constructor(private configService: ConfigService) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {

    const n: number = this.configService.get<number>('TITLE_LENGTH', 10);

    return next.handle()
      .pipe(
        map(data => {
          if (!data) {
            return data;
          }
          if (Array.isArray(data)) {
            data.forEach(note => {
              note.title = note.title || note.content.slice(0, n);
            });
            return data;
          } else {
            data.title = data.title || data.content.slice(0, n);
            return data;
          }
        }),
      );
  }
}
