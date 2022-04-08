import mongoose from 'mongoose';
import Debug from '@root/util/debug';
import { getSubdirectories, readFile } from '@root/util/fileman';
import { codeToString } from '@root/util/strings';
import { request } from '@root/models/problem';
import { DB_URL } from '@root/util/constants';
import * as Problem from '@root/models/problem';

const PROBLEMS_DIRECTORY_PATH = 'src/problems';

/**
 * Publishes all problems into MongoDB.
 * All existing problems are updated, all new problems are inserted,
 * and all outlier problems are deleted.
 */
const publish = async () => {
    const problemsToUpdate: request['body'][] = [];
    const problemsToInsert: request['body'][] = [];
    const problemsToRemove: string[] = [];

    // Fetch the existing problem ids
    const existingProblems: request['body'][] = await Problem.model.find();
    const existingIds = new Map<string, string>();
    existingProblems.forEach((problem) => existingIds.set(problem.directory, problem._id));

    // Extracts and rebuilds all problem data
    Debug.server('Building all problems...');
    const paths = await getSubdirectories(PROBLEMS_DIRECTORY_PATH);
    await Promise.all(
        paths.map(async (path) => {
            const readme = await readFile(`${path}/README.md`);
            const parsedReadme = codeToString(readme);
            const dirName = path.substring(path.lastIndexOf('/') + 1);
            const info = await readFile(`${path}/info.json`);
            const problem: request['body'] = JSON.parse(info);

            // Insert the dynamic data
            problem.description = parsedReadme;
            problem.directory = dirName;

            const { error } = Problem.validation.validate(problem);
            if (error) {
                throw new Error(`[${problem.directory}] ${error.message}`);
            }

            if (existingIds.has(problem.directory)) {
                problem._id = existingIds.get(problem.directory);
                existingIds.delete(problem.directory);
                problemsToUpdate.push(problem);
            } else {
                problemsToInsert.push(problem);
            }
        })
    );

    // Find all outlier problems to delete
    existingIds.forEach((_id) => {
        problemsToRemove.push(_id);
    });

    await Promise.all(
        problemsToUpdate.map(async (problem) => {
            const model = new Problem.model(problem);
            await Problem.model.findByIdAndUpdate(problem._id, model, { overwrite: true });
        })
    );
    Debug.db(`Problems updated: ${problemsToUpdate.length}`);

    await Promise.all(
        problemsToInsert.map(async (problem) => {
            const model = new Problem.model(problem);
            await model.save();
        })
    );
    Debug.db(`Problems inserted: ${problemsToInsert.length}`);

    await Promise.all(
        problemsToRemove.map(async (_id) => {
            await Problem.model.findByIdAndRemove(_id);
        })
    );
    Debug.db(`Problems removed: ${problemsToRemove.length}`);
};

if (require.main === module) {
    (async () => {
        await mongoose.connect(DB_URL, { serverSelectionTimeoutMS: 2000 });
        try {
            await publish();
            Debug.server('Success: all problems have been published to the database');
        } catch (err) {
            Debug.server(`${err}`);
        }
        await mongoose.connection.close();
    })().catch((err) => {
        Debug.server(`${err}`);
    });
}
