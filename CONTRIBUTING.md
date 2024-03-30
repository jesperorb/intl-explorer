# Contributing to Intl Explorer

A big welcome and thank you for considering contributing to _Intl Explorer_!

Reading and following these guidelines will help us make the contribution process easy and effective for everyone involved. It also communicates that you agree to respect the time of the developers managing and developing these open source projects. In return, we will reciprocate that respect by addressing your issue, assessing changes, and helping you finalize your pull requests.

## Quicklinks

- [Getting Started](#getting-started)
  - [Issues](#issues)
  - [Pull Requests](#pull-requests)
  - [Adding Translations](#adding-translations)
- [License](#license)

## Getting Started

Contributions are made to this repo via Issues and Pull Requests (PRs). If you are unsure about anything when contributing do not hesitate to open an Issue and ask what your next step should be.

### Issues

Issues should be used to report problems with the website, request a new feature, or to discuss potential changes before a PR is created.

If you find an Issue that addresses the problem you're having, please add your own reproduction information to the existing issue rather than creating a new one. Adding a [reaction](https://github.blog/2016-03-10-add-reactions-to-pull-requests-issues-and-comments/) can also help be indicating to our maintainers that a particular problem is affecting more than just the reporter.

### Pull Requests

PRs to the repository are always welcome and can be a quick way to get your fix or improvement slated for the next release. In general, PRs should:

- Only fix/add the functionality in question.
- Add tests for fixed or changed functionality (if a test suite already exists).

In general, we follow the ["fork-and-pull" Git workflow](https://github.com/susam/gitpr)

1. Fork the repository to your own Github account
2. Clone the project to your machine
3. Create a branch locally with a succinct but descriptive name
4. Be sure to lint and format before commiting (`pnpm format`, `pnpm lint`) and fix any issues that the linter finds.
5. Commit changes to the branch. We use [commitlint](https://github.com/conventional-changelog/commitlint) to check if your commit message follows [conventional commits format](https://www.conventionalcommits.org/en/v1.0.0/)
6. Push changes to your fork
7. Open a PR in our repository and follow the PR template so that we can efficiently review the changes.

## Adding Translations

1. Fork and clone the repository to your local machine
2. Create a new branch for your translation with the name `feat/translations/<language-code>` (e.g. `feat/translations/es`)
3. Add your language code to the property `languageTags` to the file [./project.inlang/settings.json](./project.inlang/settings.json)
4. Add a file with the name of your language code in the folder [./messages](./messages) (e.g. `es.json`)
5. Copy contents of the file [./messages/en.json](./messages/en.json) to your new file and start translating the strings.
6. Run project locally and check if your translations are working as expected.
  - You can change language under "Settings" in the top right corner of the page.
7. Commit your changes and push to your fork and open a PR to this repository.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
