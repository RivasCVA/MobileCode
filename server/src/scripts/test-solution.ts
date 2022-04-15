/* eslint-disable no-console */
import { submit } from '@root/routes/submit';
import { readFile } from '@root/util/fileman';
import { prompt } from '@root/util/io';
import { LanguageManager, Language } from '@root/util/language';

const PROBLEMS_DIRECTORY_PATH = 'src/problems';

/**
 * Tests the server solution for any given problem and any given language
 * by running the solution against its corresponding test cases.
 * This helps ensure that the solution functions correctly and the test cases
 * are working as expected before deploying to production.
 */
const testSolution = async (): Promise<string> => {
    const problem = await prompt('Problem: ');
    const language = (await prompt('Language: ')) as Language;

    // Check if input language is valid
    const languageManager = LanguageManager[language];
    if (!languageManager) {
        const message = `Unsupported language: ${language}`;
        return Promise.reject(new Error(message));
    }

    // Check if the problem is valid
    let solution: string;
    const solutionFileName = languageManager.getSolutionFileName();
    const path = `${PROBLEMS_DIRECTORY_PATH}/${problem}/${solutionFileName}`;
    try {
        solution = await readFile(path);
    } catch {
        const note1 = `Note 1: Make sure the problem directory exists, "${problem}"`;
        const note2 = `Note 2: Make sure the solution file exists, "${solutionFileName}"`;
        const message = `No such path: "${path}"\n${note1}\n${note2}`;
        return Promise.reject(new Error(message));
    }

    try {
        const result = await submit('test-user', problem, language, solution);
        return Promise.resolve(result);
    } catch (err) {
        return Promise.resolve(err);
    }
};

if (require.main === module) {
    (async () => {
        const stdout = await testSolution();
        console.log('result:');
        console.log(JSON.parse(stdout));
    })().catch((err) => {
        console.log(err.message);
    });
}
