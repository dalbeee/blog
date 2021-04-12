const localStorage = () => {
  if (typeof window === "undefined") return null;

  const setItem = (k, v) => {
    window.localStorage.setItem(k, v);
  };

  const removeItem = (k) => {
    window.localStorage.removeItem(k);
  };

  return { setItem, removeItem };
};

export default localStorage;
