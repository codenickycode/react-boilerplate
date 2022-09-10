import { render, screen } from '@testing-library/react';
import { App } from './App';

test('should render the test copy from props', () => {
  render(<App testCopy='test!' />);
  expect(screen.getByText('test!')).toBeInTheDocument();
});
