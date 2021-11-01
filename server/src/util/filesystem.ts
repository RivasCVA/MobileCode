import fs from 'fs';

/**
 * Writes data to a file.
 * @param file Path of the file.
 * @param data Text data to write.
 * @returns A promise object resolving when the write completes.
 */
export const writeFile = (file: string, data: string) =>
    new Promise<void>((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });

/**
 * Deletes the file from the system.
 * @param file Path of the file.
 * @returns A promise object resolving when the delete completes.
 */
export const deleteFile = (file: string) =>
    new Promise<void>((resolve, reject) => {
        fs.unlink(file, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
