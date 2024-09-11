import { Route, Routes } from 'react-router-dom';

import { MapPractice } from './MapPractice';
import { AnchorPractice } from './AchorPractice';
import { useAnchors } from './hooks/useAnchor';

export default function Router() {
  useAnchors(750);

  return (
    <Routes>
      <Route path="/" element={<MapPractice />} />
      <Route path="/anchor" element={<AnchorPractice />} />
    </Routes>
  );
}
