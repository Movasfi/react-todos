import type { ITodo } from "./interfaces";

export const setTodo = (key: string, data: ITodo[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

export const getTodos = (key: string) => {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : [];
  } catch (error) {
    console.error(error);
  }
};

export const setTheme = (key: string, theme: boolean) => {
  try {
    localStorage.setItem(key, JSON.stringify(theme));
  } catch (error) {
    console.error(error);
  }
};

export const getTheme = (key: string) => {
  try {
    const theme = localStorage.getItem(key);
    return theme ? JSON.parse(theme) : false;
  } catch (error) {
    console.error(error);
  }
};
