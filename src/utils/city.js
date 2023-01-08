const CITY_NAME = "hkzf_city";

const getCity = () => JSON.parse(localStorage.getItem(CITY_NAME)) || {};

const setCity = (value) => localStorage.setItem(CITY_NAME, value);

export { getCity, setCity };
