#!/usr/bin/env node
/**
 * UI / UX content audit for Verdant demo surfaces.
 * Catches empty tables, missing key exports, and the ScrollView antipattern
 * that collapsed BasicTableOne on desktop in 0.2.4.
 *
 * Usage: node scripts/audit-ui.cjs
 * Exit 1 on failure.
 */
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const failures = []

function read(rel) {
  const p = path.join(root, rel)
  if (!fs.existsSync(p)) {
    failures.push(`missing file: ${rel}`)
    return null
  }
  return fs.readFileSync(p, 'utf8')
}

function assert(cond, msg) {
  if (!cond) failures.push(msg)
}

function countMatches(src, re) {
  return (src.match(re) || []).length
}

// --- Critical demo components ---
const basic = read('components/tables/BasicTableOne.tsx')
if (basic) {
  assert(basic.includes('export function BasicTableOne'), 'BasicTableOne export missing')
  assert(countMatches(basic, /^\s*id:\s*\d+/gm) >= 5, 'BasicTableOne must keep ≥5 tableData rows')
  assert(basic.includes('tableData.map'), 'BasicTableOne must map tableData into rows')
  assert(
    !/horizontal=\{compact\}/.test(basic),
    'BasicTableOne must not use horizontal={compact} (nested vertical ScrollView collapses on web)'
  )
  assert(
    /compact\s*\?\s*\([\s\S]*<ScrollView\s+horizontal/.test(basic) ||
      /compact\s*\?\s*<ScrollView\s+horizontal/.test(basic),
    'BasicTableOne should only wrap with horizontal ScrollView when compact'
  )
}

const docs = read('components/tables/DocumentsTable.tsx')
if (docs) {
  assert(docs.includes('export function DocumentsTable'), 'DocumentsTable export missing')
  assert(countMatches(docs, /title:\s*'/g) >= 4, 'DocumentsTable must keep ≥4 ROWS')
  assert(!/horizontal=\{compact\}/.test(docs), 'DocumentsTable must not use horizontal={compact}')
}

const orders = read('components/ecommerce/RecentOrders.tsx')
if (orders) {
  assert(orders.includes('export function RecentOrders'), 'RecentOrders export missing')
  assert(countMatches(orders, /^\s*id:\s*\d+/gm) >= 5, 'RecentOrders must keep ≥5 tableData rows')
  assert(!/horizontal=\{compact\}/.test(orders), 'RecentOrders must not use horizontal={compact}')
}

const dropzone = read('components/form/sections/Dropzone.tsx')
if (dropzone) {
  assert(dropzone.includes('export function DropzoneComponent'), 'DropzoneComponent export missing')
  assert(
    /DocumentPicker|expo-document-picker|pickDocument|onPress/.test(dropzone),
    'Dropzone should remain interactive (picker / press handler)'
  )
}

const calendar = read('components/calendar/CalendarBoard.tsx')
if (calendar) {
  assert(calendar.includes('export function CalendarBoard'), 'CalendarBoard export missing')
  assert(calendar.includes('daysInMonth') || calendar.includes('grid'), 'CalendarBoard should build a day grid')
  assert(
    countMatches(calendar, /id:\s*'/.test(calendar) ? /id:\s*'/g : /$^/) >= 2 ||
      calendar.includes('setEvents'),
    'CalendarBoard should seed demo events'
  )
}

const landing = read('app/(dashboard)/landing.tsx')
if (landing) {
  assert(/FAQS|FAQ/.test(landing), 'Landing should include FAQ section')
  assert(/heroStyle|hero/i.test(landing), 'Landing should include hero')
  assert(/Final CTA|CTA/.test(landing), 'Landing should include CTA')
}

const basicPage = read('app/(dashboard)/basic-tables.tsx')
if (basicPage) {
  assert(basicPage.includes('BasicTableOne'), 'basic-tables page must render BasicTableOne')
}

const home = read('app/(dashboard)/index.tsx')
if (home) {
  assert(home.includes('TemplateStatsCard') || home.includes('template-stats'), 'Home should show template stats tile')
  assert(home.includes('KpiStatCards'), 'Home should compose KpiStatCards')
}

// Scan tables + ecommerce for the known collapse antipattern
const scanDirs = ['components/tables', 'components/ecommerce']
for (const dir of scanDirs) {
  const abs = path.join(root, dir)
  if (!fs.existsSync(abs)) continue
  for (const name of fs.readdirSync(abs)) {
    if (!name.endsWith('.tsx')) continue
    const rel = path.join(dir, name)
    const src = read(rel)
    if (!src) continue
    if (/horizontal=\{compact\}/.test(src)) {
      failures.push(`${rel}: horizontal={compact} causes empty tables on desktop web`)
    }
  }
}

// Stats artifact must exist and look real
const statsRel = 'docs/template-stats.json'
const statsSrc = read(statsRel)
if (statsSrc) {
  try {
    const stats = JSON.parse(statsSrc)
    assert(typeof stats.version === 'string', 'template-stats.json missing version')
    assert(typeof stats.packedBytes === 'number' && stats.packedBytes > 0, 'template-stats.json packedBytes invalid')
    assert(typeof stats.componentTsxCount === 'number' && stats.componentTsxCount > 0, 'template-stats.json componentTsxCount invalid')
    assert(typeof stats.dashboardRouteCount === 'number' && stats.dashboardRouteCount > 0, 'template-stats.json dashboardRouteCount invalid')
  } catch (e) {
    failures.push(`template-stats.json parse error: ${e.message}`)
  }
}

console.log('Verdant UI audit')
console.log('================')
if (failures.length) {
  console.log(`Failed (${failures.length}):`)
  for (const f of failures) console.log(`  ✗ ${f}`)
  process.exit(1)
}
console.log('✓ Critical demo components have data + safe table scroll patterns')
console.log('✓ template-stats.json present')
console.log('\nAudit passed.')
