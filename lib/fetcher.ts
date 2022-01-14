interface AuthHeader {
	Authorization: string;
}

const Fetcher = async (
	url: string,
	{
		body,
		headers,
		method = 'GET',
	}: {
		body?: object | void | null;
		headers?: AuthHeader;
		method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
	}
) => {
	const res = await fetch(url, {
		method,
		body: body ? JSON.stringify(body) : null,
		headers: {
			...{ ...headers },
			'Content-Type': 'application/json',
		},
	});
	const data = await res.json();
	return { res, data };
};

export default Fetcher;
