export function loadState<T>(key: string): T | undefined {
  try {
    const state = localStorage.getItem(key);
    if (!state) {
      return undefined;
    }
    return JSON.parse(state);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export function saveSorage<T>(state: T, key: string) {
  const json = JSON.stringify(state);
  localStorage.setItem(key, json);
}
