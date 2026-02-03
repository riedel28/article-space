import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { loginByUsername } from './loginByUsername';

describe('loginByUsername.test', () => {
  test('success login', async () => {
    const thunk = new TestAsyncThunk(loginByUsername);

    const mockSelect = jest.fn().mockReturnValue({
      eq: jest.fn().mockReturnValue({
        single: jest.fn().mockResolvedValue({
          data: {
            id: 'uuid-1',
            username: 'admin',
            avatar: null,
            roles: ['ADMIN'],
            features: {},
            json_settings: {}
          },
          error: null
        })
      })
    });

    (thunk.supabase.from as jest.Mock).mockReturnValue({ select: mockSelect });
    (thunk.supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      error: null
    });
    (thunk.supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: { user: { id: 'uuid-1' } }
    });

    const result = await thunk.callThunk({
      username: 'admin',
      password: '123'
    });

    expect(thunk.supabase.auth.signInWithPassword).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(
      expect.objectContaining({ id: 'uuid-1', username: 'admin' })
    );
  });

  test('error login', async () => {
    const thunk = new TestAsyncThunk(loginByUsername);
    (thunk.supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      error: { message: 'Invalid credentials' }
    });

    const result = await thunk.callThunk({
      username: 'admin',
      password: 'wrong'
    });

    expect(result.meta.requestStatus).toBe('rejected');
  });
});
