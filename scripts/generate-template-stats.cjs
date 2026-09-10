#!/usr/bin/env node
/**
 * Compute real template metrics and write docs/template-stats.json
 * for the dashboard TemplateStatsCard (no invented numbers).
 *
 * Usage: node scripts/generate-template-stats.cjs
 */
const { execSync } = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')

const root = path.join(__dirname, '..')
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const outPath = path.join(root, 'docs', 'template-stats.json')

function walkCount(dir, pred) {
  let n = 0
  if (!fs.existsSync(dir)) return 0
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === 'node_modules' || ent.name === 'dist' || ent.name === '.git') continue
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) n += walkCount(p, pred)
    else if (pred(ent.name, p)) n += 1
  }
  return n
}

const componentTsxCount = walkCount(path.join(root, 'components'), (name) => name.endsWith('.tsx'))
const appTsxCount = walkCount(path.join(root, 'app'), (name) => name.endsWith('.tsx'))
const dashboardRouteCount = fs
  .readdirSync(path.join(root, 'app/(dashboard)'))
  .filter((f) => f.endsWith('.tsx') && !f.startsWith('_') && !f.startsWith('+')).length

const navSrc = fs.readFileSync(path.join(root, 'navigation/navItems.ts'), 'utf8')
const navHrefCount = [...navSrc.matchAll(/href:\s*'([^']+)'/g)].length

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'verdant-stats-'))
let packedBytes = 0
let packedFile = ''
try {
  execSync(`npm pack --pack-destination ${JSON.stringify(tmp)}`, {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, npm_config_ignore_scripts: 'true' },
  })
  const files = fs.readdirSync(tmp).filter((f) => f.endsWith('.tgz'))
  if (!files.length) throw new Error('npm pack produced no tarball')
  packedFile = files[0]
  packedBytes = fs.statSync(path.join(tmp, packedFile)).size
} finally {
  try {
    fs.rmSync(tmp, { recursive: true, force: true })
  } catch {
    /* ignore */
  }
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(2)} MB`
}

const stats = {
  generatedAt: new Date().toISOString(),
  version: pkg.version,
  packedBytes,
  packedLabel: formatBytes(packedBytes),
  packedFile,
  componentTsxCount,
  appTsxCount,
  dashboardRouteCount,
  navHrefCount,
}

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, JSON.stringify(stats, null, 2) + '\n')
console.log(`Wrote ${path.relative(root, outPath)}`)
console.log(JSON.stringify(stats, null, 2))
