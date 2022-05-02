export interface Submission {
    case: number;
    input: any;
    output: any;
    expected: any;
    result: boolean;
    stdout: string;
    runtime: number;
}
