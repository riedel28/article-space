import { ValidateProfileError } from '../../consts/consts';
import { validateProfileData } from './validateProfileData';

const data = {
  username: 'admin',
  lastname: 'Doe',
  first: 'John',
  avatar: 'https://example.com/avatar.jpg'
};

describe('validateProfileData.test', () => {
  test('success', async () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  test('without first and last name', async () => {
    const result = validateProfileData({
      ...data,
      first: '',
      lastname: ''
    });

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });

  test('without first name only', async () => {
    const result = validateProfileData({
      ...data,
      first: ''
    });

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });

  test('without last name only', async () => {
    const result = validateProfileData({
      ...data,
      lastname: ''
    });

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });

  test('no data', async () => {
    const result = validateProfileData(undefined);

    expect(result).toEqual([ValidateProfileError.NO_DATA]);
  });

  test('empty object', async () => {
    const result = validateProfileData({});

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });
});
