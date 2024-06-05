# toy-robot

[![Powered by skuba](https://img.shields.io/badge/🤿%20skuba-powered-009DC4)](https://github.com/seek-oss/skuba)

## Challenge

[See coding challenge](./coding-challenge.md) for details

The architecture has been broken down into 2 layers:

1. The game. This handles all the core game logic
2. The CLI. This resolves user inputs into game interactions and visualises the game state

The goal is to separate concerns which allows you to essentially swap out the input and UI without modifying the core game.

**Note:** the game layer solves the challenge while other layers may add niceties for fun.

Assumptions

- We use skuba which gracefully handles linting, testing, and all the _other concerns_ and DX not directly related to the challenge. This is fine for SEEK as it is SEEK-opinionated however you probably should use some other framework or custom setup.

## Development

### Test

```shell
pnpm test
```

### Lint

```shell
# Fix issues
pnpm format

# Check for issues
pnpm lint
```

### Start

```shell
# Start a live-reloading process
pnpm start

# Start with Node.js Inspector enabled
pnpm start:debug
```

This runs a live-reloading Node.js process pointing to the [src/app.ts](src/app.ts) entrypoint.
