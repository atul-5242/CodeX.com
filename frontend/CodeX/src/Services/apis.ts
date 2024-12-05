const BASE_URL ="http://localhost:3002/api"

// Auth Endpoints:
export const AuthEndPoints = {
    LOGIN_API:BASE_URL+"/auth/login",
    SIGNIN_API:BASE_URL+"/auth/signIn",
}

// User Endpoints:
export const UserEndPoints = {
    GET_ALL_USER_API:BASE_URL+"/user/getAllUser",
    GET_USER_BY_ID_API:BASE_URL+"/user/getUserById",
}