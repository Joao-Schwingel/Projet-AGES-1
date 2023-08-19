import { ButtonComponent } from 'components/Button/button';
import { PaginationComponent } from 'components/PaginationComponent/paginationComponent';
import { Medicament, Pagination } from 'models';
import { useEffect, useState } from 'react';
import { MedicamentFilters } from 'services';
import './medicationBrowser.scss';
import { MedicationTable } from 'components/MedicationTable/medicationTable';
import { TextFilterComponent } from 'components/RequestFilter/Components/TextFilter/textFilter';
import { MedicationRegistration } from 'components/MedicationRegistration/medicationRegistration';

export interface MedicamentBrowserProps {
  showCreateButton?: boolean;
  fetchMedicaments: (
    filter: MedicamentFilters
  ) => Promise<Pagination<Medicament>>;
}

export const MedicationBrowser = ({
  showCreateButton,
  fetchMedicaments,
}: MedicamentBrowserProps) => {
  const [medicamentFilter, setMedicamentFilter] = useState<MedicamentFilters>();
  const [medicaments, setMedicaments] = useState<Medicament[]>([]);
  const [page, setPage] = useState(0);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  function handleChange(filterName: string) {
    setMedicamentFilter({ name: filterName });
    setPage(0);
  }

  const handleGetMedicaments = async () => {
    const data = await fetchMedicaments({
      page,
      pageSize,
      ...medicamentFilter,
    });

    setMedicaments(data.items);
    setTotalCount(data.totalCount);
    return data;
  };

  const handleCloseMedicamentForm = () => {
    setIsRegisterModalOpen(false);
    handleGetMedicaments();
  };

  useEffect(() => {
    handleGetMedicaments();
  }, [page, pageSize, medicamentFilter]);

  return (
    <div className="medicament-browser-container">
      <div className="top">
        {showCreateButton && (
          <div>
            <TextFilterComponent
              value={medicamentFilter?.name || ''}
              placeholder={'Nome'}
              onChange={handleChange}
            />
            <ButtonComponent
              type="primary"
              id="button-new-medicament"
              onClick={() => setIsRegisterModalOpen(!isRegisterModalOpen)}
              size={2}
              icon="+ "
            >
              Medicamento
            </ButtonComponent>
          </div>
        )}
      </div>
      <MedicationTable
        rows={medicaments}
        onItemClick={() => undefined}
      ></MedicationTable>
      <PaginationComponent
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      ></PaginationComponent>
      <MedicationRegistration
        open={isRegisterModalOpen}
        onClose={handleCloseMedicamentForm}
      ></MedicationRegistration>
    </div>
  );
};
