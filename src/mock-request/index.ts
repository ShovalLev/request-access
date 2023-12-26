type MockResponse = {
	error?: boolean;
	data?: {
		message: string;
	};
};

export const mockRequest = (delay = 2000): Promise<MockResponse> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				error: false,
				data: {
					message: 'Request created',
				},
			});
		}, delay);
	});
};
