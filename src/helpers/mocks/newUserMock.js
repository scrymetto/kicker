const fakeAnswer = {
    data: true,
    status: 200
};

export const newUserAnswer = () => {
    return new Promise((resolve) => resolve(fakeAnswer))
};