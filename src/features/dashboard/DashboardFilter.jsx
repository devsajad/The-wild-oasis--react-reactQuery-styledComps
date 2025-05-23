import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { param: "7", name: "Last 7 days" },
        { param: "30", name: "Last 30 days" },
        { param: "90", name: "Last 90 days" },
      ]}
    />
  );
}

export default DashboardFilter;
