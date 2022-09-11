export enum ErrorCodes {
	Unauthorized = 401,
	NotFound = 404,
	MethodNotAllowed = 405,
	UnsupportedMediaType = 415,
	InternalServerError = 500
}

export function checkResponseStatus(status: ErrorCodes) {
	switch (status) {
		case ErrorCodes.Unauthorized:
			throw new Error('Invalid username, password, token, or missing permissions.');
		case ErrorCodes.NotFound:
			throw new TypeError(
				'Resource could not been found, either an invalid URL or parameters passed.'
			);
		case ErrorCodes.MethodNotAllowed:
			throw new TypeError('Wrong method requested to the API.');
		case ErrorCodes.UnsupportedMediaType:
			throw new Error('An unsupported media type was requested as the Content-Type header.');
		case ErrorCodes.InternalServerError:
			throw new Error('An internal SchoolSoft error occured whilst making a request.');
		default:
			break;
	}
}
