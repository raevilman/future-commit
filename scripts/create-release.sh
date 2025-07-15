#!/bin/bash

# GitHub Release Creator for future-commit
# Usage: ./create-release.sh v0.2.0

set -e

# Configuration
REPO_OWNER="raevilman"
REPO_NAME="future-commit"
VERSION="${1:-v0.2.0}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Creating GitHub Release for ${REPO_OWNER}/${REPO_NAME} ${VERSION}${NC}"

# Check if gh CLI is available
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI (gh) is not installed. Please install it first.${NC}"
    echo "Install: https://cli.github.com/"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${RED}❌ Not authenticated with GitHub CLI.${NC}"
    echo "Run: gh auth login"
    exit 1
fi

# Check if tag exists
if ! git tag -l | grep -q "^${VERSION}$"; then
    echo -e "${RED}❌ Tag ${VERSION} does not exist locally.${NC}"
    echo "Available tags:"
    git tag -l
    exit 1
fi

# Check if release notes file exists
RELEASE_NOTES_FILE="GITHUB_RELEASE_${VERSION}.md"
if [ ! -f "$RELEASE_NOTES_FILE" ]; then
    echo -e "${YELLOW}⚠️  Release notes file ${RELEASE_NOTES_FILE} not found.${NC}"
    echo "Creating release with basic notes..."
    RELEASE_NOTES_FILE=""
fi

# Build the project
echo -e "${YELLOW}🔨 Building project...${NC}"
npm run build || {
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
}

echo -e "${YELLOW}📦 Packaging executable...${NC}"
npm run package || {
    echo -e "${RED}❌ Package failed${NC}"
    exit 1
}

# Create the release
echo -e "${YELLOW}📤 Creating GitHub release...${NC}"

if [ -n "$RELEASE_NOTES_FILE" ] && [ -f "$RELEASE_NOTES_FILE" ]; then
    # Create release with notes file
    gh release create "$VERSION" \
        --title "future-commit $VERSION" \
        --notes-file "$RELEASE_NOTES_FILE" \
        --latest \
        dist/future-commit \
        build/index.js
else
    # Create release with basic notes
    gh release create "$VERSION" \
        --title "future-commit $VERSION" \
        --notes "Release $VERSION - See commit history for details" \
        --latest \
        dist/future-commit \
        build/index.js
fi

echo -e "${GREEN}✅ Release $VERSION created successfully!${NC}"
echo -e "${GREEN}🔗 View at: https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/tag/${VERSION}${NC}"

# Optional: Show release info
echo -e "${YELLOW}📋 Release info:${NC}"
gh release view "$VERSION" --web