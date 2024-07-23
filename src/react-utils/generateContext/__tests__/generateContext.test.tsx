import { render } from '@testing-library/react';
import generateContext from '..';

interface TestContextType {
  value: string;
}

const [TestProvider, useTestContext] = generateContext<TestContextType>({
  name: 'Test',
  defaultContextValue: { value: 'default' },
});

function TestComponent() {
  const context = useTestContext();
  return <div>{context.value}</div>;
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('generateContext', () => {
  it('기본 컨텍스트 값을 제공한다', () => {
    const { getByText } = render(
      <TestProvider>
        <TestComponent />
      </TestProvider>,
    );
    expect(getByText('default')).toBeInTheDocument();
  });

  it('커스텀 컨텍스트 값을 제공한다', () => {
    const { getByText } = render(
      <TestProvider value="custom">
        <TestComponent />
      </TestProvider>,
    );

    expect(getByText('custom')).toBeInTheDocument();
  });

  it('strict가 true이고 provider가 사용되지 않았을 때 에러를 발생한다', () => {
    // eslint-disable-next-line
    const [_, useNonStrictContext] = generateContext<TestContextType>({
      name: 'NonStrict',
    });

    function TestErrorComponent() {
      const context = useNonStrictContext();
      return <div>{context.value}</div>;
    }

    expect(() => render(<TestErrorComponent />)).toThrow();
  });

  it('strict가 false이고 provider가 사용되지 않았을 때 에러를 발생하지 않는다', () => {
    // eslint-disable-next-line
    const [_, useNonStrictContext] = generateContext<TestContextType>({
      name: 'NonStrict',
      strict: false,
    });

    function NonStrictComponent() {
      const context = useNonStrictContext();
      return <div>{context?.value || 'no context'}</div>;
    }

    expect(() => render(<NonStrictComponent />)).not.toThrow();
  });
});
