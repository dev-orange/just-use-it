import { useEventListener } from './index';
import { render, fireEvent, screen, renderHook } from '@testing-library/react';
import { useRef, useState } from 'react';

describe('useEventListener', () => {
  it('import { useEventListener } from "use-it"', () => {
    expect(typeof useEventListener).toBe('function');
  });

  it('should add events to ref object', () => {
    const Component = () => {
      const ref = useRef<HTMLDivElement>(null);
      const [foo, setFoo] = useState('');
      useEventListener(ref, 'click', () => setFoo('bar'));
      return (
        <div data-testid="foo" ref={ref}>
          {foo}
        </div>
      );
    };

    const { unmount } = render(<Component />);
    expect(screen.getByTestId('foo').innerHTML).toBe('');
    fireEvent.click(screen.getByTestId('foo'));
    expect(screen.getByTestId('foo').innerHTML).toBe('bar');
    unmount();
  });

  it('should add event to document', () => {
    const Component = () => {
      const [foo, setFoo] = useState('');
      useEventListener(document, 'click', () => setFoo('bar'));
      return <div data-testid="foo">{foo}</div>;
    };

    const { unmount } = render(<Component />);
    expect(screen.getByTestId('foo').innerHTML).toBe('');
    fireEvent.click(document);
    expect(screen.getByTestId('foo').innerHTML).toBe('bar');
    unmount();
  });

  it('should add events to window', () => {
    const Component = () => {
      const [foo, setFoo] = useState('');
      useEventListener(window, 'click', () => setFoo('bar'));
      return <div data-testid="foo">{foo}</div>;
    };

    const { unmount } = render(<Component />);
    expect(screen.getByTestId('foo').innerHTML).toBe('');
    fireEvent.click(window);
    expect(screen.getByTestId('foo').innerHTML).toBe('bar');
    unmount();
  });

  it('test on click listener', () => {
    let count = 0;
    let onClick = () => {
      count++;
    };
    const Component = () => {
      return <div data-testid="foo"></div>;
    };
    const { unmount } = render(<Component />);
    const { unmount: unmountHook, rerender: rerenderHook } = renderHook(() =>
      useEventListener(screen.getByTestId('foo'), 'click', onClick)
    );

    rerenderHook();

    fireEvent.click(window);
    expect(count).toBe(0);
    rerenderHook();
    fireEvent.click(screen.getByTestId('foo'));
    expect(count).toEqual(1);
    unmountHook();
    fireEvent.click(screen.getByTestId('foo'));
    expect(count).toEqual(1);
    unmount();
  });
});
