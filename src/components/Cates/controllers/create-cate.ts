import { mkdir } from '@tauri-apps/plugin-fs';
import getCatesPath from './get-cates-path';
import { NOTES_PATH } from '@/constants';

const createCate = async function(name: string) {
  const notesPath = await getCatesPath(NOTES_PATH);
  const ret = await mkdir(`${notesPath}/${name}`);
  return ret;
}

export default createCate;
