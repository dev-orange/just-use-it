/* This implementation is originally ported from https://github.com/streamich/react-use, but made some minor changes */
import { useReducer } from 'react';

const updateReducer = (num: number): number => (num + 1) % 100000;

export default function useUpdate(): () => void {
  const [, update] = useReducer(updateReducer, 0);

  return update;
}
