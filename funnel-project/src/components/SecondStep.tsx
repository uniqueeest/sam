export const SecondStep = ({ onNext }: { onNext: (data: any) => void }) => {
  const handleClick = () => {
    onNext({ secondStepData: 'some more data' });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2>Second Step</h2>
      <button onClick={handleClick}>Next</button>
    </div>
  );
};
