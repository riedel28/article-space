import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Profile } from '@/entities/Profile';
import { $api } from '@/shared/api/api';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
  id: '1',
  first: 'admin',
  lastname: 'admin',
  username: 'admin213',
  avatar: 'https://example.com/avatar.jpg'
};

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile
    },
    user: {
      authData: { id: '1', username: 'admin' }
    }
  },
  asyncReducers: {
    profile: profileReducer
  }
};

describe('features/EditableProfileCard', () => {
  test('Readonly mode should toggle', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('ProfileCard.EditButton'));
    expect(screen.getByTestId('ProfileCard.CancelButton')).toBeInTheDocument();
  });

  test('On cancel, values should be reset', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('ProfileCard.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
    await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
    await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');

    await userEvent.click(screen.getByTestId('ProfileCard.CancelButton'));

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin');
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
  });

  test('Validation error should appear', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('ProfileCard.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

    await userEvent.click(screen.getByTestId('ProfileCard.SaveButton'));

    expect(
      screen.getByTestId('EditableProfileCard.Error.Paragraph')
    ).toBeInTheDocument();
  });

  test('If no validation errors, PUT request should be sent', async () => {
    const mockPutReq = jest.spyOn($api, 'put');
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('ProfileCard.EditButton'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');

    await userEvent.click(screen.getByTestId('ProfileCard.SaveButton'));

    expect(mockPutReq).toHaveBeenCalled();
  });
});
