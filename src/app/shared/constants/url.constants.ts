/*const BASE_URL = 'http://localhost:5000/api';

//AUTH
export const URL_LOGIN = `${BASE_URL}/auth/login`;
export const URL_REGISTER = `${BASE_URL}/auth/register`;
export const URL_CALLBACK = `http://localhost:5000/auth/google/callback`;
export const URL_GOOGLE = `${BASE_URL}/auth/google`;
export const URL_DISCORD = `${BASE_URL}/auth/discord`;

// PRODUCTS
export const URL_PRODUCTS = `${BASE_URL}/products`;

//search
export const URL_SEARCH = `${BASE_URL}/products`;


//PROFILE
export const URL_PROFILE = `${BASE_URL}/auth/user`*/

const BASE_URL = 'http://localhost:5000/api';

// AUTH
export const URL_LOGIN = `${BASE_URL}/auth/login`;
export const URL_REGISTER = `${BASE_URL}/auth/register`;
export const URL_GOOGLE = `${BASE_URL}/auth/google`;
export const URL_DISCORD = `${BASE_URL}/auth/discord`;

// PROFILE
export const URL_PROFILE = `${BASE_URL}/auth/user`;

// EXCHANGES
export const URL_EXCHANGES = `${BASE_URL}/exchanges`;
export const URL_RECEIVED_EXCHANGES = `${BASE_URL}/exchanges/received`;
export const URL_SENT_EXCHANGES = `${BASE_URL}/exchanges/sent`;
export const URL_UPDATE_EXCHANGE_STATUS = `${BASE_URL}/exchanges/status`;
export const URL_EXCHANGE_BY_ID = `${BASE_URL}/exchanges/:exchangeId`;
export const URL_UPLOAD_RECEIPT = `${BASE_URL}/exchanges/upload-receipt`;
export const URL_ALL_EXCHANGES = `${BASE_URL}/exchanges/all`;
export const URL_COMPLETED_EXCHANGES = `${BASE_URL}/exchanges/completed`;

// PRODUCTS
export const URL_PRODUCTS = `${BASE_URL}/products`;
export const URL_SEARCH_PRODUCTS = `${BASE_URL}/products/search/:searchTerm`;
export const URL_USER_PRODUCTS = `${BASE_URL}/products/user-products`;
export const URL_PRODUCT_BY_ID = `${BASE_URL}/products/:productId`;
export const URL_REGISTER_EXCHANGE = `${BASE_URL}/products/exchange`;
export const URL_EDIT_PRODUCT = `${BASE_URL}/products/:id`;
export const URL_DELETE_PRODUCT = `${BASE_URL}/products/:id`;

// USERS
export const URL_USER_BY_ID = `${BASE_URL}/user/:userId`;
export const URL_FOLLOW_USER = `${BASE_URL}/user/:userId/follow`;

// UPLOADS
export const URL_UPLOAD = `${BASE_URL}/upload`;

// PAYMENTS
export const URL_PAYMENTS = `${BASE_URL}/payments`;

export const URL_ADMIN = `${BASE_URL}/admin`;

// ADMIN - USERS
export const URL_ADMIN_USERS = `${BASE_URL}/admin/users`;
export const URL_ADMIN_CREATE_USER = `${BASE_URL}/admin/users`;
export const URL_ADMIN_EDIT_USER = `${BASE_URL}/admin/users/:id`;
export const URL_ADMIN_DELETE_USER = `${BASE_URL}/admin/users/:id`;

// ADMIN - PRODUCTS
export const URL_ADMIN_PRODUCTS = `${BASE_URL}/admin/products`;
export const URL_ADMIN_CREATE_PRODUCT = `${BASE_URL}/admin/products`;
export const URL_ADMIN_EDIT_PRODUCT = `${BASE_URL}/admin/products/:id`;
export const URL_ADMIN_DELETE_PRODUCT = `${BASE_URL}/admin/products/:id`;

// ADMIN - ROLES
export const URL_ADMIN_ROLES = `${BASE_URL}/admin/roles`;
export const URL_ADMIN_CREATE_ROLE = `${BASE_URL}/admin/roles`;
export const URL_ADMIN_EDIT_ROLE = `${BASE_URL}/admin/roles/:id`;
export const URL_ADMIN_DELETE_ROLE = `${BASE_URL}/admin/roles/:id`;

// ADMIN - INFO TRUEQUECITO

export const URL_ADMIN_INFO = `${BASE_URL}/admin/info`;