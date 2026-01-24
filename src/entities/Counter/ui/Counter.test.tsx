import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Counter } from './Counter';

describe('Counter', () => {
  test('test render', () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } }
    });
    expect(screen.getByTestId('value-title')).toHaveTextContent('10');
  });

  test('increment', async () => {
    const user = userEvent.setup();
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } }
    });
    await user.click(screen.getByTestId('increment-btn'));
    expect(screen.getByTestId('value-title')).toHaveTextContent('11');
  });

  test('decrement', async () => {
    const user = userEvent.setup();
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } }
    });
    await user.click(screen.getByTestId('decrement-btn'));
    expect(screen.getByTestId('value-title')).toHaveTextContent('9');
  });
});
