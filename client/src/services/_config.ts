// this is the VITE way of importing .env variables
export const API_URL =
    import.meta.env.PROD
        ? import.meta.env.VITE_PRODUCTION_API_URL
        : import.meta.env.VITE_DEVELOPMENT_API_URL;