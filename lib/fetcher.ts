interface AuthHeader {
	Authorization: string;
}

const Fetcher = async (
	url: string,
	body: object | void,
	headers?: AuthHeader
) => {
	const res = await fetch(url, {
		method: body ? 'post' : 'get',
		body: body ? JSON.stringify(body) : null,
		headers: body
			? {
					'Content-Type': 'application/json',
			  }
			: {},
	});
	const data = await res.json();
	return { res, data };
};

export default Fetcher;
