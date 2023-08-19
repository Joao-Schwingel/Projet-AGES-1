import { Content } from 'components/Content/context';
import { Layout } from 'components/Layout/layout';
import { requestService } from 'services/requestService';
import { RequestBrowser } from 'components/RequestBrowser/requestBrowser';

export const InstitutionRequestsReceivedPage: React.FC = () => {
  return (
    <Layout>
      <Content>
        <RequestBrowser
          showCreateButton
          fetchRequests={requestService.getReceivedRequests}
        />
      </Content>
    </Layout>
  );
};
