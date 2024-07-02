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
    <article className="flex flex-col gap-6 p-4">
      <button className="p-4 bg-blue-200" onClick={handleClick}>
        컴포넌트 내부 토스트
      </button>
      <form
        className="flex flex-col items-center gap-2 p-4 border border-blue-200"
        onSubmit={handleSubmit}
      >
        <input
          className="p-2 border border-gray-600"
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="데이터 입력"
        />
        <button className="p-2 bg-blue-700 text-white" type="submit">
          저장
        </button>
      </form>
    </article>
  );
};
