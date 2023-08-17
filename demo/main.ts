import * as fsp from 'fs/promises';
import { join } from 'path';
import { Get, None, Ok, Result, Some, Try, TryAsync, map, mapErr } from '..';

const readFile = (path: string) => TryAsync<string, Error>(async () =>
    (await fsp.readFile(path)).toString()
);

const parseJson = (body: string) => Try<Record<string, string | number>, Error>(() =>
    JSON.parse(body)
);

(async () => {
    const pkgPath = join(__dirname, '..', 'package.json');
    const pkgBody = (await readFile(pkgPath)).unwrapOr('{}');
    const pkg = parseJson(pkgBody).unwrap();
    const version = Get(pkg, 'version').unwrapOr('Unknown');
    console.log(`Version: ${version}`);
})();

const doSomeWork = (): Result<number, Error> => Ok(3);

const a = doSomeWork();
const b = mapErr(a, e => e.name);
const c = map(b, v => v === 0 ? None : Some(1 / v));
const d = c.unwrapOr(Some(0));
const e = map(d, v => String(v * 6));

console.log(e.unwrap()); // "2"

