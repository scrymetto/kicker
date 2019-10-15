export const logout = (deleteUser, fn, attr) => {
    deleteUser({
        token: undefined,
    });
    localStorage.removeItem('token');
    fn(attr);
};