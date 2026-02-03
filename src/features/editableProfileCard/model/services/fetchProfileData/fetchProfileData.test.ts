import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { fetchProfileData } from './fetchProfileData';

const profileRow = {
  id: '1',
  username: 'admin',
  avatar: null,
  roles: ['USER'],
  features: {},
  json_settings: {},
  first_name: 'asd',
  last_name: 'ulbi tv',
  age: 22,
  currency: Currency.USD,
  country: Country.Ukraine,
  city: 'asf'
};

describe('fetchProfileData.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);

    (thunk.supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: profileRow,
            error: null
          })
        })
      })
    });

    const result = await thunk.callThunk('1');

    expect(thunk.supabase.from).toHaveBeenCalledWith('profiles');
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(
      expect.objectContaining({ username: 'admin', first: 'asd' })
    );
  });

  test('error', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);

    (thunk.supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: null,
            error: { message: 'Not found' }
          })
        })
      })
    });

    const result = await thunk.callThunk('1');

    expect(result.meta.requestStatus).toBe('rejected');
  });
});
