import { useState } from 'react';

import { FirstStep, SecondStep, ThirdStep, FourthStep } from './components';

type Step = 'first' | 'second' | 'third' | 'fourth';

function App() {
  const [data, setData] = useState({});
  const [step, setStep] = useState<Step>('first');

  const handleNext = (stepData: any, nextStep: Step) => {
    setData((prev) => ({ ...prev, ...stepData }));
    setStep(nextStep);
  };

  const handleSubmit = async (finalData: any) => {
    const allData = { ...data, ...finalData };

    try {
      await sendDataToAPI(allData);
      setStep('fourth');
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };

  return (
    <div>
      {step === 'first' && (
        <FirstStep onNext={(data) => handleNext(data, 'second')} />
      )}
      {step === 'second' && (
        <SecondStep onNext={(data) => handleNext(data, 'third')} />
      )}
      {step === 'third' && <ThirdStep onSubmit={handleSubmit} />}
      {step === 'fourth' && <FourthStep />}
    </div>
  );
}

export default App;

async function sendDataToAPI(data: any) {
  console.log('Sending data to API:', data);
}
