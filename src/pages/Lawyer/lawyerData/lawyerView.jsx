// LawyerView.js

// ... (existing imports)

// Import the LawyerData component
import { useState } from 'react';
import LawyerData from './lawyerData';
import { useRouter } from 'next/router';

const LawyerView = () => {
  // ** States
  const router = useRouter()

  const [openEdit, setOpenEdit] = useState(false)
  const [areas, setAreas] = useState([]); // Add areas state

  // ... (existing code)

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY1YTM1NjNhMjE2N2Q3NDUxNTRhZGEiLCJ0eXBlIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNzAxMTYwNDI1fQ.JruvwV_Xqa1-jTXFk1osKrpzNzMMUVKnAdyC4H5Ei_M';

  // ... (existing code)

  return (
    <>
      {/* Existing code for displaying LawyerView */}
      {/* Render LawyerData component and pass token and router props */}
      <LawyerData token={token} router={router} />
    </>
  );
}

export default LawyerView;
