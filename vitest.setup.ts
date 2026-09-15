import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

/*
 * Testing Library registers this itself only when Vitest runs with
 * `globals: true`. Explicit imports are preferable to globals, so the teardown
 * is wired up here instead — without it every render accumulates in the same
 * document and queries start matching elements from earlier tests.
 */
afterEach(cleanup);
