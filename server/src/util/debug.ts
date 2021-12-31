import debug from 'debug';

/**
 * Print debug statements to the console.
 * Use `Debug` over `console.log` when printing a statement for production.
 */
export default class Debug {
    public static server = debug('server');

    public static db = debug('db');
}
