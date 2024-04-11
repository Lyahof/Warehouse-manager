import { HiOutlineBanknotes } from "react-icons/hi2";
import { TfiPrinter } from "react-icons/tfi";
import { GiLargePaintBrush, GiRolledCloth } from "react-icons/gi";

import Stat from "./Stat";
import { formatCurrency } from "../../utils/DateHelpers";

function Stats({
  materialPayments,
  othersPayments,
  paintPayments,
  indigoPayments,
}) {
  function getTotalPayments(payments) {
    return payments?.reduce((acc, curr) => {
      return acc + curr.totalPrice;
    }, 0);
  }

  const materials = getTotalPayments(materialPayments) || 0;
  const indigo = getTotalPayments(indigoPayments) || 0;
  const paints = getTotalPayments(paintPayments) || 0;
  const others = getTotalPayments(othersPayments) || 0;

  return (
    <>
      <Stat
        title="Затраты на материалы"
        color="yellow"
        icon={<GiRolledCloth />}
        value={formatCurrency(materials)}
      />
      <Stat
        title="Затраты на HP Indigo"
        color="indigo"
        icon={<TfiPrinter />}
        value={formatCurrency(indigo)}
      />
      <Stat
        title="Затраты на краски и лаки"
        color="blue"
        icon={<GiLargePaintBrush />}
        value={formatCurrency(paints)}
      />
      <Stat
        title="Прочие затраты"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(others)}
      />
    </>
  );
}

export default Stats;
