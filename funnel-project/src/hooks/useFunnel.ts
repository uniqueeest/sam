import { useState, useEffect, useCallback } from 'react';

export type NonEmptyArray<T> = [T, ...T[]];
export type StepsType = Readonly<NonEmptyArray<string>>;

export const useFunnel = () => {
  const [step, setStep] = useState();

  const nextStep = useCallback(() => {}, []);
};
