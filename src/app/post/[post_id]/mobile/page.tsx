'use client';

import { useState } from 'react';

import EditNotReadyModal from './components/EditNotReadyModal/EditNotReadyModal';
import ExperimentPostMobileContainer from './components/ExperimentPostMobileContainer/ExperimentPostMobileContainer';
import ExperimentPostMobileHeader from './components/ExperimentPostMobileHeader/ExperimentPostMobileHeader';

const ExperimentPostMobilePage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <EditNotReadyModal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen} />
      <div>
        <ExperimentPostMobileHeader onEditClick={() => setIsEditModalOpen(true)} />
        <ExperimentPostMobileContainer />
      </div>
    </>
  );
};

export default ExperimentPostMobilePage;
