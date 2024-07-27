import groupBy from 'lodash.groupby';

import { useCheckList } from './hooks/useCheckList';
import { Checkbox } from './components/Checkbox';

const agreeTermsList: {
  id: string;
  label: string;
  group: 'required' | 'optional';
}[] = [
  { id: 'term1', label: '이용약관 동의', group: 'required' },
  { id: 'term2', label: '개인정보 처리방침 동의', group: 'required' },
  { id: 'term3', label: '마케팅 정보 수신 동의', group: 'optional' },
];

export function List() {
  const check = useCheckList(agreeTermsList);
  const checkBoxGroup = groupBy(check.list, (item) => item.group);
  const isOptionalChecked = check.isCheckedBy(
    ({ group }) => group === 'optional'
  );
  const isRequiredChecked = check.isCheckedBy(
    ({ group }) => group === 'required'
  );
  const isAllChecked = check.isAllChecked;

  const handleChange = (type: 'required' | 'optional') => {
    const checked = type === 'required' ? isRequiredChecked : isOptionalChecked;
    check.checkBy(!checked, ({ group }) => group === type);
  };

  return (
    <section>
      <article>
        <div>
          <div>모두 동의하기</div>
          <Checkbox
            id="all"
            checked={isAllChecked}
            onChange={check.toggleAll}
          />
        </div>
        <div></div>
        <div>
          <div>필수 선택만 모두 동의하기</div>
          <Checkbox
            id="requiredAll"
            checked={isRequiredChecked}
            onChange={() => handleChange('required')}
          />
        </div>
        <div>
          {checkBoxGroup.required.map((checkBox) => (
            <div key={checkBox.id}>
              <div>{checkBox.label}</div>
              <Checkbox
                id={checkBox.id}
                checked={checkBox.checked}
                onChange={() => check.toggle(checkBox.id)}
              />
            </div>
          ))}
        </div>
        <div>
          <div>선택 내용 모두 동의하기</div>
          <Checkbox
            id="optionalAll"
            checked={isOptionalChecked}
            onChange={() => handleChange('optional')}
          />
        </div>
        <div>
          {checkBoxGroup.optional.map((checkBox) => (
            <div key={checkBox.id}>
              <div>{checkBox.label}</div>
              <Checkbox
                id={checkBox.id}
                checked={checkBox.checked}
                onChange={() => check.toggle(checkBox.id)}
              />
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
