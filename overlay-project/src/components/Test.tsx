import { useToast } from '../contexts/ToastContext';

export const Test = () => {
  const { showToast } = useToast();

  const handleClick = () => {
    showToast('성공', '테스트 성공');
  };

  return <button onClick={handleClick}>버튼 클릭</button>;
};
