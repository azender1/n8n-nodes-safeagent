import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
rmSync(dist, { recursive: true, force: true });

const compiler = resolve(root, 'node_modules/.bin/tsc');
const result = spawnSync(compiler, [], { cwd: root, stdio: 'inherit' });
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

const iconDir = resolve(dist, 'nodes/SafeAgent');
mkdirSync(iconDir, { recursive: true });
for (const name of ['safeagent.svg', 'safeagent-dark.svg']) {
  cpSync(resolve(root, 'nodes/SafeAgent', name), resolve(iconDir, name));
}
