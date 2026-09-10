#!/usr/bin/env node
/**
 * Static route / inventory audit for Verdant.
 * Checks that Expo Router pages exist for every nav href and flags orphan pages.
 *
 * Usage: node scripts/audit-pages.mjs
 * Exit 1 if nav links point at missing routes.
 */
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const navPath = path.join(root, 'navigation/navItems.ts')
const dashboardDir = path.join(root, 'app/(dashboard)')
const authRoutes = new Set(['/signin', '/signup'])

const navSrc = fs.readFileSync(navPath, 'utf8')
const hrefs = [...navSrc.matchAll(/href:\s*'([^']+)'/g)].map((m) => m[1])

function routeToFile(href) {
  if (href === '/') return path.join(dashboardDir, 'index.tsx')
  const clean = href.replace(/^\//, '')
  if (authRoutes.has(href)) {
    return path.join(root, 'app', `${clean}.tsx`)
  }
  return path.join(dashboardDir, `${clean}.tsx`)
}

const missing = []
const ok = []
for (const href of hrefs) {
  const file = routeToFile(href)
  if (fs.existsSync(file)) ok.push(href)
  else missing.push({ href, file: path.relative(root, file) })
}

const pageFiles = fs
  .readdirSync(dashboardDir)
  .filter((f) => f.endsWith('.tsx') && !f.startsWith('_') && !f.startsWith('+'))
  .map((f) => (f === 'index.tsx' ? '/' : `/${f.replace(/\.tsx$/, '')}`))

const navSet = new Set(hrefs)
const orphans = pageFiles.filter((p) => !navSet.has(p) && p !== '/error-404')

console.log('Verdant page audit')
console.log('==================')
console.log(`Nav links: ${hrefs.length}`)
console.log(`Resolved:  ${ok.length}`)
if (missing.length) {
  console.log('\nMissing routes:')
  for (const m of missing) console.log(`  ✗ ${m.href} → ${m.file}`)
}
if (orphans.length) {
  console.log('\nPages without nav entry (ok if intentional):')
  for (const o of orphans) console.log(`  · ${o}`)
}

const brandFiles = [
  'components/BrandLogo.tsx',
  'components/auth/AuthLayout.tsx',
  'app/+not-found.tsx',
]
let brandOk = true
for (const f of brandFiles) {
  const src = fs.readFileSync(path.join(root, f), 'utf8')
  if (!src.includes('Verdant')) {
    console.log(`\n✗ Brand missing Verdant in ${f}`)
    brandOk = false
  }
  if (/TailAdmin/i.test(src)) {
    console.log(`\n✗ UI still mentions TailAdmin in ${f}`)
    brandOk = false
  }
}

// Scan UI tsx for TailAdmin product branding (allow NOTICE/README/docs)
const uiHits = []
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === 'node_modules' || ent.name === 'dist' || ent.name === '.git') continue
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(p)
    else if (/\.(tsx|ts)$/.test(ent.name)) {
      const src = fs.readFileSync(p, 'utf8')
      if (/TailAdmin|Musharof|Pimjo/i.test(src)) {
        uiHits.push(path.relative(root, p))
      }
    }
  }
}
walk(path.join(root, 'app'))
walk(path.join(root, 'components'))
walk(path.join(root, 'layout'))

if (uiHits.length) {
  console.log('\n✗ TailAdmin/profile branding still in UI sources:')
  uiHits.forEach((h) => console.log(`  · ${h}`))
} else {
  console.log('\n✓ No TailAdmin/Musharof branding in app/components/layout')
}

console.log(brandOk ? '\n✓ Brand files look OK' : '\n✗ Brand issues found')

if (missing.length || uiHits.length || !brandOk) {
  process.exit(1)
}
console.log('\nAudit passed.')
