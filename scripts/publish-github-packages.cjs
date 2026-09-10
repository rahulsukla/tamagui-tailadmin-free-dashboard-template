#!/usr/bin/env node
/**
 * Publish a scoped copy to GitHub Packages so the repo Packages sidebar lists it.
 * Public npm stays unscoped: verdant-tamagui-admin-template
 * GitHub Packages: @rahulsukla/verdant-tamagui-admin-template
 *
 * Auth: NODE_AUTH_TOKEN must be a GitHub token with `write:packages`
 *   export NODE_AUTH_TOKEN=$(gh auth token)
 *   npm run release:github-packages
 */
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const pkgPath = path.join(root, 'package.json')
const original = fs.readFileSync(pkgPath, 'utf8')
const pkg = JSON.parse(original)

const owner = 'rahulsukla'
const baseName = pkg.name.includes('/') ? pkg.name.split('/')[1] : pkg.name
const scopedName = `@${owner}/${baseName}`

if (!process.env.NODE_AUTH_TOKEN) {
  console.error('NODE_AUTH_TOKEN is required (GitHub token with write:packages).')
  console.error('Example: NODE_AUTH_TOKEN=$(gh auth token) npm run release:github-packages')
  process.exit(1)
}

const next = {
  ...pkg,
  name: scopedName,
  publishConfig: {
    registry: 'https://npm.pkg.github.com',
    access: 'public',
  },
}

fs.writeFileSync(pkgPath, `${JSON.stringify(next, null, 2)}\n`)

const npmrcPath = path.join(root, '.npmrc')
const npmrcHad = fs.existsSync(npmrcPath)
const npmrcBackup = npmrcHad ? fs.readFileSync(npmrcPath, 'utf8') : null
fs.writeFileSync(
  npmrcPath,
  `@${owner}:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=\${NODE_AUTH_TOKEN}\n`
)

try {
  console.log(`Publishing ${scopedName}@${pkg.version} → GitHub Packages`)
  execSync('npm publish', {
    cwd: root,
    stdio: 'inherit',
    env: process.env,
  })
  console.log('GitHub Packages publish succeeded.')
  console.log(`https://github.com/${owner}/verdant-tamagui-admin-template/pkgs/npm/${baseName}`)
} finally {
  fs.writeFileSync(pkgPath, original)
  if (npmrcHad) fs.writeFileSync(npmrcPath, npmrcBackup)
  else fs.unlinkSync(npmrcPath)
}
