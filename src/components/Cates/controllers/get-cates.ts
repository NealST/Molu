// get cate list in notes

import { readDir } from "@tauri-apps/plugin-fs";
import getCatesPath from "./get-cates-path";

const getCates = async function (catePath: string) {
  try {
    const notesPath = await getCatesPath(catePath);
    const entries = await readDir(notesPath);
    return entries;
  } catch (e) {
    return [];
  }
};

export default getCates;
