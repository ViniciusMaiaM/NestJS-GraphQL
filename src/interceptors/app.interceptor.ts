import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const response = context.switchToHttp().getResponse();
        // Customize the error message here
        if (
          error instanceof QueryFailedError &&
          error.message.includes('UQ_415c35b9b3b6fe45a3b065030f5')
        ) {
          // Customize the error message for this specific error
          const errorMessage = 'Duplicate entry: This record already exists.';

          // Send a customized error response
          response.status(400).json({
            statusCode: 400,
            message: errorMessage,
          });
        } else if (error.name === 'ValidationError') {
          // Handle validation errors (e.g., from class-validator)
          const validationErrors = error.response || [];
          const errorMessage = 'Validation failed. Please check your input.';

          // Send a customized error response with validation details
          response.status(400).json({
            statusCode: 400,
            message: errorMessage,
            errors: validationErrors,
          });
        } else if (error.name === 'UnauthorizedException') {
          // Handle unauthorized errors (e.g., from Passport authentication)
          const errorMessage =
            'Unauthorized. Please log in to access this resource.';

          // Send a customized error response for unauthorized access
          response.status(401).json({
            statusCode: 401,
            message: errorMessage,
          });
        }
        // For other errors, use a generic error message
        const genericErrorMessage =
          'An error occurred. Please try again later.';

        // Send a generic error response
        response.status(500).json({
          statusCode: 500,
          message: genericErrorMessage,
        });

        return throwError(error);
      }),
    );
  }
}
