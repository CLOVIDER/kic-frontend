import { render } from '@testing-library/react';
import { useIsSSR } from '@/hooks';
import SSRSafeSuspense from '..';

jest.mock('@/hooks/useIsSSR', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('SSRSafeSuspense', () => {
  it('SSR인 경우 fallback을 렌더링한다', () => {
    (useIsSSR as jest.Mock).mockReturnValue(true);
    const fallbackText = 'Loading...';

    const { getByText } = render(
      <SSRSafeSuspense fallback={<div>{fallbackText}</div>}>
        <div>Loaded Content</div>
      </SSRSafeSuspense>,
    );

    expect(getByText(fallbackText)).toBeInTheDocument();
  });

  it('SSR이 아닌 경우 children을 렌더링한다', () => {
    (useIsSSR as jest.Mock).mockReturnValue(false);
    const loadedText = 'Loaded Content';

    const { getByText } = render(
      <SSRSafeSuspense fallback={<div>Loading...</div>}>
        <div>{loadedText}</div>
      </SSRSafeSuspense>,
    );

    expect(getByText(loadedText)).toBeInTheDocument();
  });
});
