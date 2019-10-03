const fakeAnswer = {
    data: true,
    status: 200
};

export const fakeRequest = () => {
    return new Promise((resolve) => resolve(fakeAnswer))
};