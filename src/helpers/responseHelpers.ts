// responseHelpers.ts
interface SuccessResponse<T> {
    success: true;
    data: T;
    message: string;
}

interface ErrorResponse {
    success: false;
    message: string;
    statusCode: number;
}

type APIResponse<T> = SuccessResponse<T> | ErrorResponse;

const successResponse = <T>(data: T, message = 'Success'): SuccessResponse<T> => {
    return {
        success: true,
        data,
        message,
    };
};

const errorResponse = (message = 'An error occurred', statusCode = 500): ErrorResponse => {
    return {
        success: false,
        message,
        statusCode,
    };
};

export { successResponse, errorResponse, APIResponse };
