export const logout = (deleteUser, fn, attr) => {
    deleteUser({
        login: undefined,
        password: undefined
    });
    localStorage.removeItem('token');
    fn(attr);
};