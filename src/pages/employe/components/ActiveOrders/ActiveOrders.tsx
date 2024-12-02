import Order from "../Order/Order";

export default function ActiveOrders() {
  return (
    <section className="w-72 md:w-full h-80 overflow-y-scroll rounded-md scroll-smooth no-scrollbar flex flex-col gap-4 font-Roboto p-2 py-4 bg-white border border-black col-span-2">
      <Order />
      <Order />
      <Order />
      <Order />
    </section>
  );
}
