import axios from 'axios';
import { Problem } from 'store/problems/types';
import { User } from 'store/user/types';
import { Submission } from 'store/submission/types';
import Languages from 'util/languages';

const BASE_URL = 'http://localhost:3000/api';
const DEFAULT_TIMEOUT = 5000;

export const getProblems = async () => {
    return new Promise<Problem[]>(async (resolve, reject) => {
        try {
            const response = await axios.get(`${BASE_URL}/problems`, {
                timeout: DEFAULT_TIMEOUT,
            });
            const problems = response.data as Problem[];
            if (problems) {
                resolve(problems);
            } else {
                reject('GET problems error: cast error');
            }
        } catch (err) {
            reject(`GET problems error: ${err}`);
        }
    });
};

export const getProblem = async (_id: string, language: Languages) => {
    return new Promise<Problem>(async (resolve, reject) => {
        try {
            const response = await axios.get(`${BASE_URL}/problems/${_id}?language=${language}`, {
                timeout: DEFAULT_TIMEOUT,
            });
            const problem = response.data as Problem;
            if (problem) {
                resolve(problem);
            } else {
                reject('GET problem error: cast error');
            }
        } catch (err) {
            reject(`GET problem error: ${err}`);
        }
    });
};

export const getUser = async (_id: string) => {
    return new Promise<User>(async (resolve, reject) => {
        try {
            const response = await axios.get(`${BASE_URL}/users/${_id}`, {
                timeout: DEFAULT_TIMEOUT,
            });
            const user = response.data as User;
            if (user) {
                resolve(user);
            } else {
                reject('GET user error: cast error');
            }
        } catch (err) {
            reject(`GET user error: ${err}`);
        }
    });
};

export const postSubmission = (user: string, problem: string, language: string, code: string) => {
    return new Promise<Submission>(async (resolve, reject) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/submit`,
                {
                    user,
                    problem,
                    language,
                    code,
                },
                {
                    timeout: DEFAULT_TIMEOUT,
                }
            );
            const submission = response.data as Submission;
            if (submission) {
                resolve(submission);
            } else {
                reject('POST submission error: cast error');
            }
        } catch (err) {
            reject(`POST submission error: ${err}`);
        }
    });
};
