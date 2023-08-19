import { Content } from 'components/Content/context';
import { Layout } from 'components/Layout/layout';
import { RequestBrowser } from 'components/RequestBrowser/requestBrowser';
import { requestService } from 'services/requestService';

export const AdminRequestsPage: React.FC = () => {
  return (
    <Layout>
      <Content>
        <RequestBrowser fetchRequests={requestService.getRequests} />
      </Content>
    </Layout>
  );
};
