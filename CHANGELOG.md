# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Types of Changes

- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

## [Unreleased]

### Added

- Added rate limit header information to response object.

## [0.1.7] - 2023-07-11

### Added

- Can now get people from People app (go figure!).

### Changed

- Renamed root paths.

## [0.1.6] - 2023-07-10

### Added

- Responses are now logged.
- Request / response logging is no configurable.

## [0.1.5] - 2023-07-09

### Added

- Can now get emails and phone numbers from People app.

### Fixed

- The wrong URL path was being used for creating donations.

## [0.1.4] - 2023-07-06

### Fixed

- Release process was not including some files.

## [0.1.3] - 2023-07-06

### Changed

- Restructured client.
- Updated release process.

## [0.1.2] - 2023-06-15

### Changed

- Client configuration is now optional at every level with sane defaults.

### Fixed

- A packaging issue was causing invalid API URLs to be used.
- A packaging issue was causing problems importing the client.

## [0.1.1] - 2023-06-15

### Changed

- Changed NPM publish path.

## [0.1.0] - 2023-06-13

### Added

- Added support for application-level GET requests.

[unreleased]: https://github.com/brannonh/pco-client/compare/v0.1.7...HEAD
[0.1.7]: https://github.com/brannonh/pco-client/compare/v0.1.6...v0.1.7
[0.1.6]: https://github.com/brannonh/pco-client/compare/v0.1.5...v0.1.6
[0.1.5]: https://github.com/brannonh/pco-client/compare/v0.1.4...v0.1.5
[0.1.4]: https://github.com/brannonh/pco-client/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/brannonh/pco-client/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/brannonh/pco-client/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/brannonh/pco-client/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/brannonh/pco-client/releases/tag/v0.1.0
