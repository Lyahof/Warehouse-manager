import { useEffect, useRef } from "react";
import styled from "styled-components";
import Chart from "chart.js/auto";
import Heading from "../../ui/Heading";

const StyledPaymentChart = styled.div`
  padding-top: 2.5rem;
`;

function PaymentChart({
  materialPayments,
  othersPayments,
  paintPayments,
  indigoPayments,
}) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const totalPayments = materialPayments?.concat(
    othersPayments,
    paintPayments,
    indigoPayments
  );

  function getMonthFromDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth();
    return month;
  }

  const monthlyData = {
    0: 0, // Январь
    1: 0, // Февраль
    2: 0, // Март
    3: 0, // Апрель
    4: 0, // Май
    5: 0, // Июнь
    6: 0, // Июль
    7: 0, // Август
    8: 0, // Сентябрь
    9: 0, // Октябрь
    10: 0, // Ноябрь
    11: 0, // Декабрь
  };

  totalPayments?.forEach((payment) => {
    const month = getMonthFromDate(payment?.dateOfPayment);
    monthlyData[month] += payment?.totalPrice;
  });

  const totalPrices = Object.values(monthlyData);

  useEffect(() => {
    const months = [
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
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: months.map((month) => `${month}`),
        datasets: [
          {
            label: "Общие расходы на закупку",
            data: totalPrices,
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [totalPrices]);

  return (
    <StyledPaymentChart>
      <Heading as="h4">
        Совокупные ежемесячные расходы на закупку материалов за 2024 год
      </Heading>
      <div>
        <canvas ref={chartRef} width="140rem" height="30rem"></canvas>
      </div>
    </StyledPaymentChart>
  );
}

export default PaymentChart;
