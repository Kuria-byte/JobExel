# Contributing to JobExel

First off, thank you for considering contributing to JobExel! It's people like you that make JobExel such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Request Process

1. Fork the repo and create your branch from `main`.
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. Install dependencies and set up your development environment:
   ```bash
   pnpm install
   cp .env.example .env.local
   # Configure your environment variables
   ```

3. Make your changes and ensure they follow our coding standards:
   ```bash
   pnpm lint        # Run ESLint
   pnpm type-check  # Run TypeScript checks
   pnpm test        # Run tests
   ```

4. Update documentation if needed:
   - README.md for user-facing changes
   - API documentation for backend changes
   - Component documentation for frontend changes

5. Create a pull request:
   - Fill out the PR template completely
   - Link any relevant issues
   - Include screenshots for UI changes

### Development Guidelines

#### TypeScript

```typescript
// Use explicit typing
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

// Use proper error handling
async function fetchUserProfile(id: string): Promise<UserProfile> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
}
```

#### React Components

```typescript
// Use functional components with TypeScript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant, children, onClick }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded',
        variant === 'primary' ? 'bg-primary text-white' : 'bg-secondary text-gray-800'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

#### Testing

```typescript
// Write comprehensive tests
describe('UserProfile', () => {
  it('should render user information correctly', () => {
    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user' as const,
    };

    const { getByText } = render(<UserProfile user={user} />);
    expect(getByText('John Doe')).toBeInTheDocument();
  });
});
```

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
feat: add job application tracking
^--^  ^------------------------^
|     |
|     +-> Summary in present tense
|
+-------> Type: feat, fix, docs, style, refactor, test, or chore
```

### Branch Naming

- Feature branches: `feature/description`
- Bug fixes: `fix/description`
- Documentation: `docs/description`
- Performance improvements: `perf/description`

## Issue Reporting Guidelines

1. Use the issue templates provided
2. Include reproducible steps for bugs
3. Provide screenshots or videos when possible
4. Tag issues appropriately

### Bug Report Template

```markdown
**Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 91]
- Version: [e.g., 1.0.0]
```

### Feature Request Template

```markdown
**Problem Statement**
A clear description of the problem this feature would solve.

**Proposed Solution**
A clear description of what you want to happen.

**Alternative Solutions**
Any alternative solutions you've considered.

**Additional Context**
Add any other context about the feature request here.
```

## Setting Up Your Development Environment

1. **Prerequisites**
   - Node.js (v18 or higher)
   - pnpm (v8 or higher)
   - PostgreSQL (v14 or higher)
   - Redis (v6 or higher)

2. **Local Setup**
   ```bash
   # Clone the repository
   git clone https://github.com/yourusername/jobexel.git
   cd jobexel

   # Install dependencies
   pnpm install

   # Set up environment variables
   cp .env.example .env.local

   # Start development server
   pnpm dev
   ```

3. **Database Setup**
   ```bash
   # Run migrations
   pnpm db:migrate

   # Seed database with test data
   pnpm db:seed
   ```

## Code Review Process

1. **Automated Checks**
   - ESLint for code style
   - TypeScript for type checking
   - Jest for unit tests
   - Cypress for E2E tests

2. **Manual Review**
   - Code quality and standards
   - Performance considerations
   - Security implications
   - Documentation updates

3. **Approval Process**
   - At least one core team member approval
   - All automated checks passing
   - Documentation updated
   - Tests added/updated

## Getting Help

- Join our [Discord community](https://discord.gg/jobexel)
- Check out the [documentation](https://docs.jobexel.com)
- Ask questions in GitHub Discussions
- Follow us on [Twitter](https://twitter.com/JobExel)

## Recognition

Contributors will be recognized in:
- The [CONTRIBUTORS.md](CONTRIBUTORS.md) file
- Release notes
- Our public communications

Thank you for contributing to JobExel! 🎉 