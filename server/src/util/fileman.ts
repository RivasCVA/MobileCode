import fs from 'fs';

/**
 * Writes data to a file.
 * @param filePath Path of the file.
 * @param data Text data to write.
 * @returns A promise object resolving when the write completes.
 */
export const writeFile = (filePath: string, data: string): Promise<void> =>
    new Promise<void>((resolve, reject) => {
        fs.writeFile(filePath, data, 'utf-8', (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });

/**
 * Deletes the file from the system.
 * If the file is a directory, then it will remove it alongside all of its contents.
 * @param filePath Path of the file.
 * @returns A promise object resolving when the delete completes.
 */
export const deleteFile = (filePath: string): Promise<void> =>
    new Promise<void>((resolve, reject) => {
        fs.rm(filePath, { recursive: true, force: true }, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });

/**
 * Reads data from a file.
 * @param filePath Path of the file.
 * @returns A promise object resolving with the file contents.
 */
export const readFile = (filePath: string): Promise<string> =>
    new Promise<string>((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });

/**
 * Creates a new directory.
 * If the directory already exists then nothing will happen.
 * @param dirPath Path of the directory
 * @returns A promise object resolving with the create completes.
 */
export const createDirectory = (dirPath: string): Promise<void> =>
    new Promise<void>((resolve, reject) => {
        fs.mkdir(dirPath, (err) => {
            if (err && err.code !== 'EEXIST') {
                reject(err);
            }
            resolve();
        });
    });
