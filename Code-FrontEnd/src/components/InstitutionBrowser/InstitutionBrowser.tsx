import { ButtonComponent } from 'components/Button/button';
import { PaginationComponent } from 'components/PaginationComponent/paginationComponent';
import { Pagination, User } from 'models';
import { useEffect, useState } from 'react';
import { InstitutionFilters } from 'services';
import './InstitutionBrowser.scss';
import { InstitutionTable } from 'components/InstitutionTable/institutionTable';
import { TextFilterComponent } from 'components/RequestFilter/Components/TextFilter/textFilter';
import { RegisterInstitutionForm } from 'components/RegisterInstitutionForm/registerInstitutionForm';

export interface InstitutionBrowserProps {
  showCreateButton?: boolean;
  fetchInstitutions: (filter: InstitutionFilters) => Promise<Pagination<User>>;
}

export const InstitutionBrowser = ({
  showCreateButton,
  fetchInstitutions,
}: InstitutionBrowserProps) => {
  const [institutionFilter, setInstitutionFilter] =
    useState<InstitutionFilters>();
  const [institutions, setInstitutions] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  function handleChange(filterName: string) {
    setInstitutionFilter({ name: filterName });
    setPage(0);
  }

  const handleGetInstitutions = async () => {
    const data = await fetchInstitutions({
      page,
      pageSize,
      ...institutionFilter,
    });

    setInstitutions(data.items);
    setTotalCount(data.totalCount);
    return data;
  };

  const handleCloseInstitutionForm = () => {
    setIsRegisterModalOpen(false);
    handleGetInstitutions();
  };

  useEffect(() => {
    handleGetInstitutions();
  }, [page, pageSize, institutionFilter]);

  return (
    <div className="institution-browser-container">
      <div className="top">
        {showCreateButton && (
          <div>
            <TextFilterComponent
              value={institutionFilter?.name || ''}
              placeholder={'Nome'}
              onChange={handleChange}
            />
            <ButtonComponent
              type="primary"
              id="button-new-institution"
              onClick={() => setIsRegisterModalOpen(!isRegisterModalOpen)}
              size={2}
              icon="+ "
            >
              Instituição
            </ButtonComponent>
          </div>
        )}
      </div>
      <InstitutionTable
        rows={institutions}
        onItemClick={() => undefined}
      ></InstitutionTable>
      <PaginationComponent
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      ></PaginationComponent>
      <RegisterInstitutionForm
        open={isRegisterModalOpen}
        onClose={handleCloseInstitutionForm}
      />
    </div>
  );
};
