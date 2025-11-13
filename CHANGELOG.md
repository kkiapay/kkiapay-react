# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Comprehensive error handling with try-catch blocks
- Loading state (`isLoading`) to track module loading
- Ready state (`isReady`) to indicate when module is ready to use
- Error state (`error`) to capture and expose loading errors
- Retry function to reload the module after failure
- Cleanup function to prevent memory leaks on unmount
- JSDoc documentation for the hook and types
- Performance optimizations with `useMemo` and `useCallback`
- Type-safe module extraction without `any` casts
- Complete test suite with Vitest
- Unit tests for hook functionality
- Integration tests for payment flows
- Test coverage reporting
- Prettier configuration for code formatting
- ESLint improvements
- CI/CD with GitHub Actions
- Comprehensive documentation (README, CONTRIBUTING, SECURITY)

### Changed
- Improved TypeScript type safety
- Enhanced return type with `UseKKiaPayReturn` interface
- Better error messages with contextual logging
- Optimized re-renders with memoization

### Fixed
- Race condition when component unmounts during module loading
- Memory leaks from unhandled async operations
- Missing import in README example

## [0.0.3] - 2024-XX-XX

### Added
- Initial release
- Basic `useKKiaPay` hook
- TypeScript support
- Dynamic import of kkiapay module

## [0.0.2] - 2024-XX-XX

### Fixed
- Minor bug fixes

## [0.0.1] - 2024-XX-XX

### Added
- First version
- Basic functionality
