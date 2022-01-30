export enum ErrorCodes {
	UNAUTHORIZED = 401,
	NOT_FOUND = 404,

	LENGTH = 858,
	MIN_LENGTH = 859,
	MAX_LENGTH = 860,
}

export enum RequestMethod {
	GET = 'GET',
	POST = 'POST',
	DELETE = 'DELETE',
	PUT = 'PUT',
	PATCH = 'PATCH',
}

export enum ContentType {
	JSON = 'application/json',
	FORM_URL_ENCODED = 'application/x-www-form-urlencoded',
	FORM_DATA = 'multipart/form-data',
	TEXT = 'text/html',
}

export type HeadersType = { [key: string]: string };

export type RequestConfig = {
	method: RequestMethod;
	body?: unknown;
	accessToken?: string | null;
	headers?: HeadersType;
};

const getFormattedBody = (body?: unknown, headers: HeadersType = {}): any => {
	if (body) {
		switch (headers['Content-Type']) {
			case ContentType.JSON:
				return JSON.stringify(body);
			case ContentType.FORM_URL_ENCODED:
				return new URLSearchParams(body as Record<string, string>);
			case ContentType.FORM_DATA: {
				return body;
			}
			default:
				return body;
		}
	}

	return null;
};

const getFormattedResponse = (response: Response): Promise<any> | undefined => {
	const formattedContentTypeHeader = response.headers.get('content-type')?.split(';')[0];

	switch (formattedContentTypeHeader) {
		case ContentType.JSON:
			return response.json();
		case ContentType.FORM_URL_ENCODED:
			return response.formData();
		case ContentType.TEXT:
			return response.text();
	}
};

export const fetchWrapper = async <T = unknown>(
	endpoint: string,
	{ method = RequestMethod.GET, body, headers }: Partial<RequestConfig> = {}
): Promise<T> => {
	const formattedHeaders: Record<string, string> = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token') || '{}')}`,
		...headers,
	};

	const config = {
		method,
		headers: formattedHeaders,
		body: getFormattedBody(body, formattedHeaders),
	};

	if (config.headers['Content-Type'] === ContentType.FORM_DATA) {
		delete config.headers['Content-Type'];
	}

	console.log(config, endpoint);

	const response: any = await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config);

	if (response.ok) {
		return getFormattedResponse(response);
	} else {
		throw response;
	}
};
