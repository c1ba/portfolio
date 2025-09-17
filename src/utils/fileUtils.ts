import {readdirSync} from 'fs';
import path from 'path';

export const PROJECT_PATH = path.join(process.cwd());

export const getRecursivePaths = (
  currentPath: string,
  targetFilenames: string[],
) => {
  const results: string[] = [];
  const dirents = readdirSync(currentPath, {withFileTypes: true});
  if (!dirents.length) {
    return results;
  }

  const queryFilePaths = dirents
    .filter(
      (dirent) => dirent.isFile() && targetFilenames.includes(dirent.name),
    )
    .map((dirent) => `${dirent.parentPath}\\${dirent.name}`);
  results.push(...queryFilePaths);
  const directories = dirents.filter((dirent) => !dirent.isFile());
  if (!directories.length) {
    return results;
  }

  directories.forEach((directory) => {
    const directoryPath = path.join(currentPath, directory.name);
    results.push(...getRecursivePaths(directoryPath, targetFilenames));
  });
  return results;
};

export const convertAbsoluteToProjectPaths = (absolutePath: string) =>
  absolutePath
    .replace(PROJECT_PATH, '@')
    .replaceAll('\\', '/')
    .replace('/src', '')
    .replace(/\.(js|ts)$/, '');
