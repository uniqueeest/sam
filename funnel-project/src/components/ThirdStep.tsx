export const ThirdStep = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const handleClick = () => {
    onSubmit({ thirdStepData: 'final data' });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2>Third Step</h2>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
};
