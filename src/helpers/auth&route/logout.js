export const logout = (deleteUser, fn, attr) => {
    deleteUser({
        auth: undefined,
    });
    localStorage.removeItem('token');
    fn(attr);
};