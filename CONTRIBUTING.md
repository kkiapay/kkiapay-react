# Contributing to kkiapay-react

First off, thank you for considering contributing to kkiapay-react! It's people like you that make kkiapay-react such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to support@kkiapay.me.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title** for the issue
* **Describe the exact steps to reproduce the problem** in as much detail as possible
* **Provide specific examples** to demonstrate the steps
* **Describe the behavior you observed** and what behavior you expected to see
* **Include screenshots** if relevant
* **Include your environment details** (OS, Node version, React version, etc.)

**Bug Report Template:**
```markdown
**Description:**
A clear description of the bug.

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. ...

**Expected Behavior:**
What you expected to happen.

**Actual Behavior:**
What actually happened.

**Environment:**
- OS: [e.g., Ubuntu 22.04]
- Node: [e.g., 18.17.0]
- React: [e.g., 18.2.0]
- kkiapay-react: [e.g., 0.0.3]

**Additional Context:**
Any other relevant information.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested enhancement**
* **Provide specific examples** to demonstrate the enhancement
* **Explain why this enhancement would be useful** to most users

### Pull Requests

Please follow these steps for your contribution:

1. **Fork the repository** and create your branch from `main`
   ```bash
   git clone https://github.com/YOUR_USERNAME/kkiapay-react.git
   cd kkiapay-react
   git checkout -b feature/amazing-feature
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Make your changes** in a new git branch
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation as needed

4. **Ensure the test suite passes**
   ```bash
   npm test
   ```

5. **Run the linter**
   ```bash
   npm run lint
   ```

6. **Check TypeScript types**
   ```bash
   npm run typecheck
   ```

7. **Format your code**
   ```bash
   npm run format
   ```

8. **Commit your changes** using a descriptive commit message that follows the [Conventional Commits](https://www.conventionalcommits.org/) specification
   ```bash
   git commit -m "feat: add new payment listener"
   ```

9. **Push your branch** to GitHub
   ```bash
   git push origin feature/amazing-feature
   ```

10. **Submit a pull request** to the `main` branch

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/kkiapay-react.git
cd kkiapay-react

# Install dependencies
npm install

# Run development build with watch mode
npm run dev

# Run tests in watch mode
npm test

# Run tests with coverage
npm run test:coverage

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Check TypeScript types
npm run typecheck

# Format code
npm run format

# Build the library
npm run build
```

## Project Structure

```
kkiapay-react/
├── lib/                  # Source code for the library
│   ├── main.ts          # Entry point
│   └── useKKiaPay.ts    # Main hook implementation
├── tests/               # Test files
│   ├── setup.ts         # Test setup
│   ├── unit/            # Unit tests
│   └── integration/     # Integration tests
├── src/                 # Example/demo application
├── dist/                # Built library (generated)
├── package.json         # Package configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite build configuration
├── vitest.config.ts     # Vitest test configuration
└── README.md            # Documentation
```

## Coding Guidelines

### TypeScript

* Use TypeScript for all new code
* Ensure strict type checking passes
* Avoid using `any` type when possible
* Document complex types with JSDoc comments
* Export types that users might need

### Code Style

* Follow the existing code style
* Use meaningful variable and function names
* Keep functions small and focused (single responsibility)
* Add comments for complex logic
* Use ESLint to check your code
* Use Prettier to format your code

### React Hooks

* Follow the [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)
* Use `useCallback` and `useMemo` appropriately for performance
* Always clean up side effects in `useEffect`
* Avoid unnecessary re-renders

### Testing

* Write tests for all new features
* Maintain or improve code coverage
* Test edge cases and error scenarios
* Use descriptive test names
* Follow the Arrange-Act-Assert pattern

**Test Structure:**
```typescript
describe('Feature Name', () => {
  it('should do something specific', () => {
    // Arrange: Set up test data
    const input = 'test';
    
    // Act: Execute the code
    const result = myFunction(input);
    
    // Assert: Verify the result
    expect(result).toBe('expected');
  });
});
```

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
* `feat`: A new feature
* `fix`: A bug fix
* `docs`: Documentation only changes
* `style`: Code style changes (formatting, missing semicolons, etc.)
* `refactor`: Code refactoring (neither fixes a bug nor adds a feature)
* `perf`: Performance improvements
* `test`: Adding or updating tests
* `chore`: Maintenance tasks (dependencies, build, etc.)
* `ci`: CI/CD changes

**Examples:**
```bash
feat: add retry mechanism for failed module loading
fix: resolve memory leak on component unmount
docs: update README with new API examples
test: add integration tests for payment flow
chore: update dependencies to latest versions
```

## Testing

When adding new features or fixing bugs, please add appropriate tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Test Coverage

We aim for at least 80% code coverage. Please ensure your changes maintain or improve coverage:

```bash
npm run test:coverage
```

Coverage reports are generated in the `coverage/` directory.

## Documentation

If you're adding a new feature or changing existing functionality:

* Update the README.md with usage examples
* Add JSDoc comments to your code
* Update TypeScript type definitions if needed
* Add entries to CHANGELOG.md
* Update any relevant documentation files

## Performance Considerations

* Minimize bundle size
* Use dynamic imports where appropriate
* Memoize expensive computations
* Avoid unnecessary re-renders
* Profile performance-critical code

## Release Process

Maintainers will handle releases. The process involves:

1. Update version in `package.json` (following semver)
2. Update `CHANGELOG.md` with release notes
3. Create a git tag: `git tag v1.0.0`
4. Push tag: `git push origin v1.0.0`
5. Publish to npm: `npm publish`
6. Create GitHub release with notes

## Questions?

Feel free to:
* Open an issue with your question
* Reach out to the maintainers at support@kkiapay.me
* Check existing issues and discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to kkiapay-react! 🎉
