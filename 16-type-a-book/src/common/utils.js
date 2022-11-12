import { keyGroups, keys } from "./constants";

export const getKeyboard = () => {
    return keyGroups.map(row => row.map(group => group.map(key => keys[key])));
};