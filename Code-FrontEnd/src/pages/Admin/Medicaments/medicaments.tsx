import { Content } from 'components/Content/context';
import { Layout } from 'components/Layout/layout';
import { useState } from 'react';
import { MedicationBrowser } from 'components/MedicationBrowser/medicationBrowser';
import { medicamentService } from 'services';

export const AdminMedicamentsPage: React.FC = () => {
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const handleOpenRegistration = () => setRegistrationOpen(true);
  const handleCloseRegistration = () => setRegistrationOpen(false);

  return (
    <Layout>
      <Content>
        <MedicationBrowser
          fetchMedicaments={medicamentService.getMedicaments}
          showCreateButton={true}
        />
      </Content>
    </Layout>
  );
};
