import axios from 'axios';
import { Problem } from 'store/problems/types';
import { User } from 'store/user/types';

const BASE_URL = 'http://localhost:3000/api';
const DEFAULT_TIMEOUT = 5000;

export const fetchProblems = async () => {
    return new Promise<Problem[]>(async (resolve, reject) => {
        try {
            const response = await axios.get(`${BASE_URL}/problems`, {
                timeout: DEFAULT_TIMEOUT,
            });
            const problems = response.data as Problem[];
            if (problems) {
                resolve(problems);
            } else {
                reject('Error fetching problems: cast error');
            }
        } catch (err) {
            reject('Error fetching problems');
        }
    });
};

export const fetchProblem = async (_id: string) => {
    return new Promise<Problem>(async (resolve, reject) => {
        try {
            const response = await axios.get(`${BASE_URL}/problems/${_id}`, {
                timeout: DEFAULT_TIMEOUT,
            });
            const problem = response.data as Problem;
            if (problem) {
                resolve(problem);
            } else {
                reject('Error fetching problem: cast error');
            }
        } catch (err) {
            reject('Error fetching problems');
        }
    });
};

export const fetchUser = async (_id: string) => {
    return new Promise<User>(async (resolve, reject) => {
        try {
            const response = await axios.get(`${BASE_URL}/users/${_id}`, {
                timeout: DEFAULT_TIMEOUT,
            });
            const user = response.data as User;
            if (user) {
                resolve(user);
            } else {
                reject('Error fetching user: cast error');
            }
        } catch (err) {
            reject('Error fetching user');
        }
    });
};
