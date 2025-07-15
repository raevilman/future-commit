# Building and Publishing Binaries for future-commit

## Prerequisites
- Node.js (v18 or later)
- npm
- pkg (`npm install -g pkg`)
- @vercel/ncc (`npm install -g @vercel/ncc`)

## Build Steps

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Build the project:**
   ```sh
   npm run build
   ```
   This creates the compiled file in `build/index.js`.

3. **Package all supported binaries:**
   Run the following command to build all supported binaries for macOS and Linux (x64 and arm64):

   ```sh
   npm run package
   ```
   This will generate binaries in the `dist/` directory for each platform and architecture as defined in the package script.

## Publishing to Homebrew Tap

1. Go to your Homebrew tap repository: [raevilman/homebrew-tap](https://github.com/raevilman/homebrew-tap)
2. Create or update a formula file (e.g., `future-commit.rb`) referencing the binary URLs from your GitHub release.
3. Upload the binaries as assets to your GitHub release for the corresponding version.
4. Update the formula's `url` and `sha256` fields to point to the correct binary and checksum.

### Example Formula Snippet
```ruby
class FutureCommit < Formula
  desc "Use future date while making git commits"
  homepage "https://github.com/raevilman/future-commit"
  url "https://github.com/raevilman/future-commit/releases/download/v0.2.0/future-commit-macos"
  sha256 "<SHA256_CHECKSUM>"
  version "0.2.0"

  def install
    bin.install "future-commit-macos" => "future-commit"
  end
end
```

## Notes
- Do not commit the `dist/` folder to source control; add it to `.gitignore`.
- Always update the formula and release assets for new versions.
- Use the correct binary for each platform.

---
For more details, see the [Homebrew documentation](https://docs.brew.sh/How-to-Create-and-Maintain-a-Tap).
