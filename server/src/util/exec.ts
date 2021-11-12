import * as childProcess from 'child_process';

/**
 * Max time alloted to run exec.
 * Helps prevent infinite loops.
 */
const TIMEOUT = 5000;

/**
 * Executes a command in a child shell.
 * @param command Command to run.
 * @returns A promise object resolving the standard output.
 */
const exec = (command: string): Promise<string> =>
    new Promise<string>((resolve, reject) => {
        childProcess.exec(command, { timeout: TIMEOUT }, (error, stdout, stderr) => {
            if (error) {
                reject(error.message);
            } else if (stdout) {
                resolve(stdout);
            } else {
                resolve(stderr);
            }
        });
    });

export default exec;
