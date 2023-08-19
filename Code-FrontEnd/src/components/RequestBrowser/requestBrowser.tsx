import { ButtonComponent } from 'components/Button/button';
import { RequestModal } from 'components/MyRequests/myRequests';
import { PaginationComponent } from 'components/PaginationComponent/paginationComponent';
import { RequestFilter } from 'components/RequestFilter/requestFilter';
import { RequestTable } from 'components/RequestsTable/requestTable';
import { Pagination, Request } from 'models';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes/constants';
import { requestService } from 'services';
import { RequestFilters } from 'services/requestService';
import './requestBrowser.scss';

export interface RequestBrowserProps {
  showCreateButton?: boolean;
  fetchRequests: (filter: RequestFilters) => Promise<Pagination<Request>>;
}

export const RequestBrowser = ({
  showCreateButton,
  fetchRequests,
}: RequestBrowserProps) => {
  const navigate = useNavigate();
  const [requests, setRequest] = useState<Request[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [requestFilter, setRequestFilter] = useState<RequestFilters>({
    status: 'active',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requestToDisplay, setRequestToDisplay] = useState<Request | undefined>(
    undefined
  );
  const [tableStatus, setTableStatus] = useState(requestFilter.status);

  const handleOpenCreateRequest = () =>
    navigate(ROUTES.INSTITUTION_CREATE_REQUEST());

  const handleClick = async (requestId: number) => {
    setIsLoading(true);
    try {
      const request = await requestService.getById(requestId);
      if (request.data) {
        setRequestToDisplay(request.data as any);
        setIsModalOpen(true);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  function handleChange(filterValues: RequestFilters) {
    setRequestFilter(filterValues);
    setPage(0);
  }

  const handleGetRequests = async () => {
    const data = await fetchRequests({
      page,
      pageSize,
      ...requestFilter,
    });
    setRequest(data.items);
    setTableStatus(requestFilter.status);
    setTotalCount(data.totalCount);
    return data;
  };

  useEffect(() => {
    handleGetRequests();
  }, [page, pageSize, requestFilter]);

  return (
    <div className="request-browser-container">
      {isLoading && (
        <div className="loading-container">
          <div>
            <img src="/assets/loading-animation.svg" alt="loading" />
            <p>Carregando... aguarde</p>
          </div>
        </div>
      )}
      <div className="top">
        <RequestFilter
          onChange={handleChange}
          value={requestFilter}
        ></RequestFilter>
        {showCreateButton && (
          <ButtonComponent
            type="primary"
            id="button-new-request"
            onClick={handleOpenCreateRequest}
            size={2}
            icon="+ "
          >
            Requisição
          </ButtonComponent>
        )}
      </div>
      <RequestTable
        rows={requests}
        status={tableStatus}
        onItemClick={handleClick}
      ></RequestTable>
      <PaginationComponent
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      ></PaginationComponent>
      {isModalOpen && requestToDisplay && (
        <RequestModal
          request={requestToDisplay}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onTransportRegister={handleGetRequests}
          onReject={handleGetRequests}
          onAccept={handleGetRequests}
          onDone={handleGetRequests}
        ></RequestModal>
      )}
    </div>
  );
};
