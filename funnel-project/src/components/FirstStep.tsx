export const FirstStep = ({ onNext }: { onNext: (data: any) => void }) => {
  const handleClick = () => {
    onNext({ firstStepData: 'some data' });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2>First Step</h2>
      <button onClick={handleClick}>Next</button>
    </div>
  );
};
