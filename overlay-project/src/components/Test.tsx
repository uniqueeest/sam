import { useState } from 'react';

import { useToast } from '../contexts/ToastContext';
import { saveData } from '../apis/dataApi';

export const Test = () => {
  const { showToast } = useToast();

  const [data, setData] = useState('');

  const handleClick = () => {
    showToast('성공', '테스트 성공');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await saveData({ data });
    if (success) {
      setData('');
    }
  };

  return (
    <article className="flex flex-col gap-6">
      <button onClick={handleClick}>컴포넌트 내부 토스트</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="데이터 입력"
        />
        <button type="submit">저장</button>
      </form>
    </article>
  );
};
