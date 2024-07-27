import { useState } from 'react';

type User = {
  id: number;
  name: string;
  age: number;
};

type UserMap = Map<number, User>;

export function MapPractice() {
  const [users, setUsers] = useState<UserMap>(
    new Map([
      [1, { id: 1, name: '김철수', age: 25 }],
      [2, { id: 2, name: '이영희', age: 28 }],
      [3, { id: 3, name: '박민준', age: 22 }],
    ])
  );

  const addUser = () => {
    const newId = users.size + 1;
    setUsers(
      new Map(users.set(newId, { id: newId, name: '새 사용자', age: 30 }))
    );
  };

  const updateUser = (id: number, newName: string) => {
    const user = users.get(id);

    if (user && typeof user.id === 'number' && typeof user.age === 'number') {
      setUsers(new Map(users.set(id, { ...user, name: newName })));
    }
  };

  const deleteUser = (id: number) => {
    const newUsers = new Map(users);
    newUsers.delete(id);
    setUsers(newUsers);
  };

  return (
    <div>
      <button onClick={addUser}>새 사용자 추가</button>
      <ul>
        {Array.from(users.values()).map((user) => (
          <li key={user.id}>
            {user.name} (나이: {user.age})
            <button onClick={() => updateUser(user.id, '수정된 이름')}>
              이름 수정
            </button>
            <button onClick={() => deleteUser(user.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
