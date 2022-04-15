/* eslint-disable import/prefer-default-export */
import * as readline from 'readline';

/**
 * Creates a question prompt in the command line.
 * @param question Message to display.
 * @returns A promise resolving with the user input.
 */
export const prompt = (question: string) =>
    new Promise<string>((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question(question, (answer) => {
            resolve(answer);
            rl.close();
        });
    });
