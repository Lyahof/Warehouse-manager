import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import PaymentChart from "./PaymentChart";
import Heading from "../../ui/Heading";
import { getAllMaterialPayments } from "../../services/APIMaterials";
import { getAllOtherPayments } from "../../services/APIOthers";
import { getAllPaintPayments } from "../../services/APIPaints";
import { getAllIndigoPayments } from "../../services/APIIndigo";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2.4rem;
`;
const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.5rem;
`;
const StyledSelect = styled.select`
  border: 1px solid var(--color-grey-300);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem 1.2rem;
`;

function DashboardLayout() {
  const [selectedMonth, setSelectedMonth] = useState("Январь");
  const [materialData, setMaterialData] = useState([]);
  const [othersData, setOthersData] = useState([]);
  const [paintData, setPaintData] = useState([]);
  const [indigoData, setIndigoData] = useState([]);

  const { isLoading: isLoading1, data: materialPayments } = useQuery({
    queryFn: getAllMaterialPayments,
    queryKey: ["materialsReceipts"],
  });
  const { isLoading: isLoading2, data: othersPayments } = useQuery({
    queryFn: getAllOtherPayments,
    queryKey: ["othersReceipts"],
  });
  const { isLoading: isLoading3, data: paintPayments } = useQuery({
    queryFn: getAllPaintPayments,
    queryKey: ["paintReceipts"],
  });
  const { isLoading: isLoading4, data: indigoPayments } = useQuery({
    queryFn: getAllIndigoPayments,
    queryKey: ["indigoReceipts"],
  });

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const getMonthFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.getMonth();
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    const monthIndex = monthNames.indexOf(e.target.value); //находит в массиве индекс выбранного в селекте месяца

    const filterByMonth = (payments) => {
      return payments?.filter((payment) => {
        const paymentMonth = getMonthFromDate(payment.dateOfPayment);
        return paymentMonth === monthIndex;
      });
    };

    const monthMaterialData = filterByMonth(materialPayments);
    const monthOthersData = filterByMonth(othersPayments);
    const monthPaintData = filterByMonth(paintPayments);
    const monthIndigoData = filterByMonth(indigoPayments);

    setMaterialData(monthMaterialData);
    setOthersData(monthOthersData);
    setPaintData(monthPaintData);
    setIndigoData(monthIndigoData);
  };

  useEffect(() => {
    if (materialPayments && othersPayments && paintPayments && indigoPayments) {
      handleMonthChange({ target: { value: selectedMonth } });
    }
  }, [
    selectedMonth,
    materialPayments,
    othersPayments,
    paintPayments,
    indigoPayments,
  ]);

  if (isLoading1 || isLoading2 || isLoading3 || isLoading4) return <Spinner />;

  return (
    <>
      <Heading as="h4">
        Ежемесячные расходы на закупку материалов по категориям за 2024 год
      </Heading>
      <StyledContainer>
        <StyledSelect value={selectedMonth} onChange={handleMonthChange}>
          {monthNames.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </StyledSelect>
      </StyledContainer>
      <StyledDashboardLayout>
        <Stats
          materialPayments={materialData}
          othersPayments={othersData}
          paintPayments={paintData}
          indigoPayments={indigoData}
        />
      </StyledDashboardLayout>

      <PaymentChart
        materialPayments={materialPayments}
        othersPayments={othersPayments}
        paintPayments={paintPayments}
        indigoPayments={indigoPayments}
      />
    </>
  );
}

export default DashboardLayout;
