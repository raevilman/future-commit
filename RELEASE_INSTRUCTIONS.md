# GitHub Release Instructions for v0.2.0

This guide explains how to create a comprehensive GitHub release for future-commit v0.2.0.

## 📋 Prerequisites

1. **GitHub CLI** installed and authenticated:
   ```bash
   gh auth login
   ```

2. **Repository access** with release permissions

3. **Built artifacts** ready:
   ```bash
   npm run build
   ```

## 🚀 Quick Release Creation

### Option 1: Using the Release Script (Recommended)
```bash
./scripts/create-release.sh v0.2.0
```

### Option 2: Manual GitHub CLI Commands
```bash
# Create release with comprehensive notes
gh release create v0.2.0 \
  --title "future-commit v0.2.0" \
  --notes-file GITHUB_RELEASE_v0.2.0.md \
  --latest \
  dist/future-commit \
  build/index.js
```

### Option 3: Using GitHub Web Interface
1. Go to https://github.com/raevilman/future-commit/releases/new
2. Choose tag: `v0.2.0`
3. Release title: `future-commit v0.2.0`
4. Copy content from `GITHUB_RELEASE_v0.2.0.md` into description
5. Upload files:
   - `dist/future-commit` (executable)
   - `build/index.js` (built script)
6. Check "Set as the latest release"
7. Click "Publish release"

## 📦 Release Assets

The following files should be included as release assets:

1. **`dist/future-commit`** - Executable binary for Linux
2. **`build/index.js`** - Compiled Node.js script

## 📝 Release Notes Content

The release uses content from:
- **`GITHUB_RELEASE_v0.2.0.md`** - GitHub release description (concise)
- **`RELEASE_NOTES_v0.2.0.md`** - Comprehensive release notes (detailed)

## 🔧 Key Features to Highlight

### Package Updates
- yesno ^0.4.0 (latest stable)
- @vercel/ncc ^0.38.3 (latest build tool)
- pkg ^5.8.1 (latest packaging tool)
- jest ^29.7.0 (latest testing framework)

### Major Improvements
- Custom duration parser (eliminated external dependency)
- Comprehensive test suite (40 tests, 100% pass rate)
- Enhanced user experience and error handling
- Better reliability and maintainability

### Quality Metrics
- 52.3% statement coverage, 60.52% branch coverage
- Fast test execution (~1.2 seconds)
- Zero external time parsing dependencies
- Cross-platform compatibility

## 📊 Post-Release Verification

After creating the release:

1. **Verify release page**: https://github.com/raevilman/future-commit/releases/tag/v0.2.0
2. **Test download links** for all assets
3. **Check release notes formatting** and completeness
4. **Verify "latest release" badge** updates
5. **Test installation** via package managers (if applicable)

## 🔄 Future Releases

For future releases, the automation is already set up:

1. **GitHub Actions workflow** (`.github/workflows/release.yml`) will trigger on tag push
2. **Release script** (`scripts/create-release.sh`) can be used manually
3. **Release notes template** pattern established for consistency

## 📞 Support

If issues occur during release creation:

1. Check GitHub CLI authentication: `gh auth status`
2. Verify tag exists: `git tag -l | grep v0.2.0`
3. Ensure build artifacts exist: `ls -la build/ dist/`
4. Review GitHub repository permissions

## 🎯 Success Criteria

A successful release should have:
- ✅ Clear, comprehensive release notes
- ✅ Working download links for all assets
- ✅ Proper version tagging
- ✅ "Latest release" designation
- ✅ Formatted code examples and usage instructions
- ✅ Links to documentation and resources