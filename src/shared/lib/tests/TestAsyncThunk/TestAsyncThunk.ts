import { SupabaseClient } from '@supabase/supabase-js';

import { StateSchema } from '@/app/providers/StoreProvider';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
export class TestAsyncThunk<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any>;

  getState: () => StateSchema;

  actionCreator: any;

  supabase: jest.Mocked<SupabaseClient>;

  navigate: jest.MockedFn<any>;

  constructor(actionCreator: any, state?: DeepPartial<StateSchema>) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn(() => state as StateSchema);

    this.supabase = {
      from: jest.fn(),
      auth: {
        getSession: jest.fn(),
        signInWithPassword: jest.fn(),
        signOut: jest.fn(),
        getUser: jest.fn()
      }
    } as any;
    this.navigate = jest.fn();
  }

  async callThunk(arg?: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(this.dispatch, this.getState, {
      supabase: this.supabase
    });

    return result;
  }
}
