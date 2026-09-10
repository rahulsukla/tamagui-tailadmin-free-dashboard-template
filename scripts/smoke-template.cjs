#!/usr/bin/env node
/**
 * Smoke-test the Expo template packaging path:
 * 1) npm pack this repo
 * 2) create-expo-app from the tarball
 * 3) typecheck + import key UI modules
 *
 * Usage: node scripts/smoke-template.cjs
 */
const { execSync } = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')

const root = path.join(__dirname, '..')
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'verdant-smoke-'))
const appName = 'verdant-smoke-app'
const appDir = path.join(work, appName)

function run(cmd, cwd = root) {
  console.log(`\n> ${cmd}`)
  execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, CI: '1' } })
}

console.log('Verdant template smoke test')
console.log('===========================')
console.log(`workspace: ${work}`)

try {
  run('npm pack --pack-destination ' + JSON.stringify(work))
  const tgz = path.join(work, `${pkg.name}-${pkg.version}.tgz`)
  if (!fs.existsSync(tgz)) {
    throw new Error(`Expected tarball missing: ${tgz}`)
  }
  console.log(`packed: ${tgz}`)

  run(
    `npx --yes create-expo-app@latest ${appName} --template ${JSON.stringify(tgz)} --yes`,
    work
  )

  // Prove UI modules resolve from the generated app
  const probe = `
const assert = require('assert')
const path = require('path')
const fs = require('fs')
const root = process.cwd()
const mustExist = [
  'components/ui/Button.tsx',
  'components/ui/ProgressBar.tsx',
  'components/ecommerce/KpiStatCards.tsx',
  'components/ecommerce/TrafficPieCard.tsx',
  'components/charts/SimplePieChart.tsx',
  'components/cards/TileVariants.tsx',
  'components/PortalProviders.tsx',
  'app/(dashboard)/index.tsx',
  'app/(dashboard)/landing.tsx',
  'app/(dashboard)/cards.tsx',
  'docs/components.md',
]
for (const rel of mustExist) {
  const p = path.join(root, rel)
  assert.ok(fs.existsSync(p), 'missing ' + rel)
}
const btn = fs.readFileSync(path.join(root, 'components/ui/Button.tsx'), 'utf8')
assert.ok(btn.includes('export function AppButton'), 'AppButton export missing')
const home = fs.readFileSync(path.join(root, 'app/(dashboard)/index.tsx'), 'utf8')
assert.ok(home.includes('KpiStatCards'), 'home should compose KpiStatCards')
assert.ok(home.includes('TrafficPieCard'), 'home should compose TrafficPieCard')
const tiles = fs.readFileSync(path.join(root, 'components/cards/TileVariants.tsx'), 'utf8')
assert.ok(tiles.includes('export function ChatTile'), 'ChatTile export missing')
const nav = fs.readFileSync(path.join(root, 'navigation/navItems.ts'), 'utf8')
assert.ok(nav.includes("/landing"), 'nav should link Landing')
assert.ok(nav.includes("/cards"), 'nav should link Cards')
console.log('UI inventory OK (' + mustExist.length + ' files)')
`
  fs.writeFileSync(path.join(appDir, 'scripts-smoke-probe.cjs'), probe)
  run('node scripts-smoke-probe.cjs', appDir)
  run('npm run typecheck', appDir)
  run('npm run audit:pages', appDir)

  console.log('\nSmoke test passed.')
  console.log(`App dir kept for inspection: ${appDir}`)
} catch (err) {
  console.error('\nSmoke test failed.')
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
}
