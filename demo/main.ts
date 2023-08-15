import * as fsp from 'fs/promises';
import { join } from 'path';
import { Get, Try, TryAsync, } from '..';

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