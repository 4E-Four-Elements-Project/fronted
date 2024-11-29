import Order from "./Order";

export default function ActiveOrders() {
  return (
    <section className="w-80 md:w-full h-72 overflow-y-scroll rounded-md scroll-smooth no-scrollbar flex flex-col gap-4 font-Roboto p-2 py-4 bg-white border border-black">
      {/* <p>Order ID</p> */}
      <Order />
      <Order />
      <Order />
      <Order />
      {/* <p>Additional Info</p>
      <p>INFO</p>
      <div className="w-full flex items-center justify-around text-xl font-medium">
        <p>Mark as ready</p>
        <p>Delete Order</p>
      </div> */}
    </section>
  );
}
