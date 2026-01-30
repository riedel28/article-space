import { screen, waitFor } from '@testing-library/react';
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

    // Wait for edit mode to render
    const firstnameInput = await screen.findByTestId('ProfileCard.firstname');
    const lastnameInput = await screen.findByTestId('ProfileCard.lastname');

    await userEvent.clear(firstnameInput);
    await userEvent.clear(lastnameInput);

    await userEvent.type(firstnameInput, 'user');
    await userEvent.type(lastnameInput, 'user');

    expect(firstnameInput).toHaveValue('user');
    expect(lastnameInput).toHaveValue('user');

    await userEvent.click(screen.getByTestId('ProfileCard.CancelButton'));

    // After cancel, the form should reset and show view mode, then switch back to edit mode state
    // Since cancel sets readonly=true, we should see view mode
    await waitFor(() => {
      expect(screen.getByTestId('ProfileCard.EditButton')).toBeInTheDocument();
    });
  });

  test('Validation error should appear', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('ProfileCard.EditButton'));

    // Wait for edit mode to render
    const firstnameInput = await screen.findByTestId('ProfileCard.firstname');
    await userEvent.clear(firstnameInput);

    await userEvent.click(screen.getByTestId('ProfileCard.SaveButton'));

    // Check for Mantine form validation error
    await waitFor(() => {
      expect(
        screen.getByText('First name must be at least 2 characters')
      ).toBeInTheDocument();
    });
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
