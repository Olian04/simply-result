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

const a = Ok(2) as Result<number, Error>;

const e = mapErr(a, e => e.name);
const b = map(e, v => v === 0 ? None : Some(2 / v));
const d = map(b.unwrap(), v => String(v * 6));

console.log(typeof d.unwrap(), d.unwrap());

