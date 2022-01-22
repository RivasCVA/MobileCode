import axios from 'axios';
import { Problem } from 'store/problems/types';
import { User } from 'store/user/types';

const BASE_URL = 'http://localhost:3000/api';

export const fetchProblems = async () => {
    return new Promise<Problem[]>(async (resolve, reject) => {
        try {
            const response = await axios.get(`${BASE_URL}/problems`, {
                timeout: 5000,
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

export const fetchUser = async (_id: string) => {
    return new Promise<User>(async (resolve, reject) => {
        try {
            const response = await axios.get(`${BASE_URL}/users/${_id}`, {
                timeout: 5000,
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
