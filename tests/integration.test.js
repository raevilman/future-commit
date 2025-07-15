const { spawn } = require('child_process');
const path = require('path');

describe('future-commit CLI integration tests', () => {
  const cliPath = path.join(__dirname, '../index.js');

  function runCLI(args = []) {
    return new Promise((resolve) => {
      const child = spawn('node', [cliPath, ...args], {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        resolve({ code, stdout, stderr });
      });

      // Send 'n' to decline confirmation if prompted
      child.stdin.write('n\n');
      child.stdin.end();
    });
  }

  test('should show help when no arguments provided', async () => {
    const result = await runCLI([]);
    
    expect(result.code).toBe(1);
    expect(result.stdout).toContain('Usage: future-commit <time> -m <message>');
    expect(result.stdout).toContain('Example: future-commit 1h -m "Commit message"');
  });

  test('should show error for invalid time format', async () => {
    const result = await runCLI(['invalid-time', '-m', 'test message']);
    
    expect(result.code).toBe(1);
    expect(result.stdout).toContain('Error: Invalid time format');
    expect(result.stdout).toContain('Usage: future-commit <time> -m <message>');
  });

  test('should prompt for confirmation with valid time format', async () => {
    const result = await runCLI(['1h', '-m', 'test commit']);
    
    // Should show the commit time and ask for confirmation
    expect(result.stdout).toContain('Commit time:');
    expect(result.stdout).toContain('Continue?');
  });

  test('should handle complex time formats', async () => {
    const result = await runCLI(['1h30m', '-m', 'test commit']);
    
    expect(result.stdout).toContain('Commit time:');
    expect(result.stdout).toContain('Continue?');
  });

  test('should handle additional git arguments', async () => {
    const result = await runCLI(['2h', '-m', 'test commit', '--dry-run']);
    
    expect(result.stdout).toContain('Commit time:');
    expect(result.stdout).toContain('Continue?');
  });

  test('should handle minutes format', async () => {
    const result = await runCLI(['45m', '-m', 'test commit']);
    
    expect(result.stdout).toContain('Commit time:');
    expect(result.stdout).toContain('Continue?');
  });

  test('should handle seconds format', async () => {
    const result = await runCLI(['30s', '-m', 'test commit']);
    
    expect(result.stdout).toContain('Commit time:');
    expect(result.stdout).toContain('Continue?');
  });

  test('should handle days format', async () => {
    const result = await runCLI(['1d', '-m', 'test commit']);
    
    expect(result.stdout).toContain('Commit time:');
    expect(result.stdout).toContain('Continue?');
  });
});
