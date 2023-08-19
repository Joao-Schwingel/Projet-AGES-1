import { Content } from 'components/Content/context';
import { InstitutionBrowser } from 'components/InstitutionBrowser/InstitutionBrowser';
import { Layout } from 'components/Layout/layout';
import { institutionService } from 'services';

export const AdminInstitutionsPage: React.FC = () => {
  return (
    <Layout>
      <Content>
        <InstitutionBrowser
          fetchInstitutions={institutionService.getInstitutions}
          showCreateButton={true}
        />
      </Content>
    </Layout>
  );
};
