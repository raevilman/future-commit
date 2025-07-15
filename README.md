# What?
A tiny utility to `git commit` in the future.  

[![Release](https://img.shields.io/github/v/release/raevilman/future-commit)](https://github.com/raevilman/future-commit/releases)
[![Tests](https://img.shields.io/badge/tests-40%20passing-green)](./docs/testing.md)
[![Coverage](https://img.shields.io/badge/coverage-52.3%25-yellow)](./docs/testing.md)


# Install


```
brew tap raevilman/tap
brew install future-commit
```

# Demo

![](./assets/demo.gif)

</br>
</br>
</br>
---

## Development

### Prerequisites
- Node.js (v14 or higher)
- npm
- Git

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/raevilman/future-commit.git
   cd future-commit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
Run the tool directly with Node.js:
```bash
node index.js 1h -m "Test commit message"
```

Or make it executable and run:
```bash
chmod +x index.js
./index.js 1h -m "Test commit message"
```

### Testing
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run specific test file
npx jest tests/index.test.js
```

### Building
```bash
# Build for distribution
npm run build

# Package as executable
npm run package
```

### Project Structure
```
├── index.js           # Main CLI script
├── package.json       # Dependencies and scripts
├── docs/             # Documentation
│   └── testing.md          # Test coverage and strategy
├── tests/            # Test suite
│   ├── index.test.js        # Unit tests
│   ├── integration.test.js  # Integration tests
│   ├── edge-cases.test.js   # Edge case tests
│   ├── performance.test.js  # Performance tests
│   └── setup.js            # Test configuration
├── build/            # Built files (generated)
└── dist/             # Packaged executables (generated)
```

### Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass: `npm test`
6. Commit your changes: `git commit -m "Description"`
7. Push to your fork: `git push origin feature-name`
8. Create a pull request

### Debugging
For verbose test output:
```bash
VERBOSE_TESTS=1 npm test
```

To test without actual git commits:
```bash
node index.js 1h -m "test" --dry-run
```

## 📦 Releases

This project uses semantic versioning. Each release includes:
- **Comprehensive release notes** with detailed changelogs
- **Pre-built binaries** for multiple platforms
- **Test coverage reports** and quality metrics
- **Migration guides** for breaking changes

### Latest Release: v0.2.0
- **Package updates**: All dependencies updated to latest stable versions
- **Custom duration parser**: Eliminated external dependency
- **Comprehensive test suite**: 40 tests with 100% pass rate
- **Enhanced user experience**: Better error handling and CLI feedback

See [Releases](https://github.com/raevilman/future-commit/releases) for complete changelog and download links.

### Creating Releases
For maintainers, releases can be created using:
```bash
# Using GitHub CLI (recommended)
./scripts/create-release.sh v0.2.0

# Or manually via GitHub Actions on tag push
git tag v0.2.0
git push origin v0.2.0
```