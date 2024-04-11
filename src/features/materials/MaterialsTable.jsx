import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import MaterialItemRow from "./MaterialItemRow";
import { useMaterials } from "./useMaterials";
import { useSearchContext } from "../../contexts/SearhContext";
import { useSearchParams } from "react-router-dom";

function MaterialsTable() {
  const { materials, isLoading } = useMaterials(); //Получает материалы из таблицы materials
  const { searchQuery } = useSearchContext();

  // Filter
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("replenishment") || "all";

  let filteredMaterials;

  if (filterValue === "all") {
    filteredMaterials = materials;
  } else if (filterValue === "no-replenishment") {
    filteredMaterials = materials?.filter(
      (material) => material.minVal <= material.totalQuantity
    );
  } else if (filterValue === "need-replenishment") {
    filteredMaterials = materials?.filter(
      (material) => material.minVal > material.totalQuantity
    );
  }

  // Search
  if (searchQuery) {
    filteredMaterials = filteredMaterials?.filter((material) => {
      return material.materialName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }

  // Sort By
  const sortBy = searchParams.get("sortBy") || "totalQuantity-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedMaterials = filteredMaterials?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="3.2fr 0.7fr 0.6fr 0.7fr 0.6fr 0.45fr 0.45fr 0.2fr">
        <Table.Header>
          <div>Наименование</div>
          <div>Ширина пореза</div>
          <div>Количество</div>
          <div>Пополнение</div>
          <div>Артикул</div>
          <div></div>
          <div></div>
          <div></div>
        </Table.Header>

        <Table.Body
          render={(material) => (
            <MaterialItemRow material={material} key={material.id} />
          )}
          data={sortedMaterials}
        />
      </Table>
    </Menus>
  );
}

export default MaterialsTable;
