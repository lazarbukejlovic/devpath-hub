import { useLocalStorage } from "./useLocalStorage";

export function useSavedVideos() {
  const [saved, setSaved] = useLocalStorage<string[]>("devpath.saved", []);
  const toggle = (id: string) =>
    setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const isSaved = (id: string) => saved.includes(id);
  return { saved, toggle, isSaved };
}
