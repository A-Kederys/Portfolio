export const getImageURL = (path) => {
    return new URL(`/assets/${path}`, import.meta.url).href;
};