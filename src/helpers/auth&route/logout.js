export const logout = (deleteToken, fn, attr) => {
    deleteToken();
    localStorage.removeItem('token');
    fn(attr);
};