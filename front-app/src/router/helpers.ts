export const isAuthenticated = () => {
    const authToken = localStorage.getItem('authToken');
    return authToken !== null;
};

export const getRole = () => {
    const userData = localStorage.getItem('userData');
    console.log(userData);
    if (userData) {
        return JSON.parse(userData).role;
    }
    return null;
}
export const getToken = () => localStorage.getItem('authToken');

export const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
})