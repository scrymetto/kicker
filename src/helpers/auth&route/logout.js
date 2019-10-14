export const logout = (deleteUser, fn, attr) => {
    deleteUser({
        email: undefined,
        password: undefined
    });
    localStorage.removeItem('token');
    fn(attr);
};