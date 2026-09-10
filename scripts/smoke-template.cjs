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
  const probe = String.raw`
const assert = require('assert')
const path = require('path')
const fs = require('fs')
const root = process.cwd()
const mustExist = [
  'components/ui/Button.tsx',
  'components/ui/ProgressBar.tsx',
  'components/ecommerce/KpiStatCards.tsx',
  'components/ecommerce/TrafficPieCard.tsx',
  'components/ecommerce/TemplateStatsCard.tsx',
  'components/tables/BasicTableOne.tsx',
  'components/charts/SimplePieChart.tsx',
  'components/cards/TileVariants.tsx',
  'components/PortalProviders.tsx',
  'app/(dashboard)/index.tsx',
  'app/(dashboard)/landing.tsx',
  'app/(dashboard)/cards.tsx',
  'app/(dashboard)/basic-tables.tsx',
  'docs/components.md',
  'docs/template-stats.json',
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
assert.ok(home.includes('TemplateStatsCard'), 'home should compose TemplateStatsCard')
const basic = fs.readFileSync(path.join(root, 'components/tables/BasicTableOne.tsx'), 'utf8')
assert.ok(basic.includes('export function BasicTableOne'), 'BasicTableOne export missing')
assert.ok((basic.match(/id:\s*\d+/g) || []).length >= 5, 'BasicTableOne needs >=5 rows')
assert.ok(!basic.includes('horizontal={compact}'), 'BasicTableOne must not use horizontal={compact}')
const tiles = fs.readFileSync(path.join(root, 'components/cards/TileVariants.tsx'), 'utf8')
assert.ok(tiles.includes('export function ChatTile'), 'ChatTile export missing')
const nav = fs.readFileSync(path.join(root, 'navigation/navItems.ts'), 'utf8')
assert.ok(nav.includes("/landing"), 'nav should link Landing')
assert.ok(nav.includes("/cards"), 'nav should link Cards')
const stats = JSON.parse(fs.readFileSync(path.join(root, 'docs/template-stats.json'), 'utf8'))
assert.ok(stats.packedBytes > 0, 'template-stats packedBytes')
console.log('UI inventory OK (' + mustExist.length + ' files)')
`
  fs.writeFileSync(path.join(appDir, 'scripts-smoke-probe.cjs'), probe)
  run('node scripts-smoke-probe.cjs', appDir)
  run('npm run typecheck', appDir)
  run('npm run audit', appDir)

  console.log('\nSmoke test passed.')
  console.log(`App dir kept for inspection: ${appDir}`)
} catch (err) {
  console.error('\nSmoke test failed.')
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
}
