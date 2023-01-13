import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import WithInternetConnection from './WithInternetConnection';

describe('WithInternetConnection component tests', () => {
  it('render a paragraph when an internet connection is available', async () => {
    render(
      <WithInternetConnection>
        <p>test text</p>
      </WithInternetConnection>,
    );

    expect(screen.getByText(/test text/)).toBeInTheDocument();
  });

  it('an error is being rendered when the internet connection is not available', async () => {
    const onLineSpy = jest.spyOn(global.navigator, 'onLine', 'get');
    onLineSpy.mockReturnValue(true);

    await act(() => {
      const offlineEvent = new Event('offline');

      onLineSpy.mockReturnValue(false);
      window.dispatchEvent(offlineEvent);

      render(
        <WithInternetConnection>
          <p>test text</p>
        </WithInternetConnection>,
      );

      expect(screen.queryByText(/test text/)).not.toBeInTheDocument();
    });
  });

  it('snapshot when internet is available', () => {
    render(
      <WithInternetConnection>
        <p>test text</p>
      </WithInternetConnection>,
    );

    expect(screen.getByText(/test text/)).toMatchSnapshot();
  });

  it('snapshot when the internet is not available', async () => {
    const onLineSpy = jest.spyOn(global.navigator, 'onLine', 'get');
    onLineSpy.mockReturnValue(true);

    await act(() => {
      const onlineEvent = new Event('online');

      onLineSpy.mockReturnValue(false);
      window.dispatchEvent(onlineEvent);

      render(
        <WithInternetConnection>
          <p>test text</p>
        </WithInternetConnection>,
      );

      expect(screen.queryByText(/test text/)).toMatchSnapshot();
    });
  });
});
