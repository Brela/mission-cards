// this is the VITE way of importing .env variables
export const API_URL =
    import.meta.env.PROD
        ? import.meta.env.VITE_PRODUCTION_API_URL
        : import.meta.env.VITE_DEVELOPMENT_API_URL;

export const GUEST_USERNAME = import.meta.env.VITE_GUEST_USERNAME
export const GUEST_PASSWORD = import.meta.env.VITE_GUEST_PASSWORD