type MockResponse = {
	error?: boolean;
	data?: {
		message: string;
	};
};

export const mockRequest = (): Promise<MockResponse> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				error: false,
				data: {
					message: 'Request created',
				},
			});
		}, 2000);
	});
};
