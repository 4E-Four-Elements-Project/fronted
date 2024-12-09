import { useLocation } from "react-router-dom";
import Header from "../../components/layout/header/Header";
import MenuButton from "../../components/layout/menu-button/menu-button";
import { mockData } from "../../../mockData";

const EditOrder = () => {
    const location = useLocation();
    const id = location.state?.id;
    console.log("Received ID:", id);

    const itemToEdit = mockData.find((item) => item.id === id);

    if (!itemToEdit) {
        return <div>No item found for the given ID.</div>;
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <Header />
            <div className="w-1/2 h-full flex justify-center flex-col mt-5">
                <div className="flex items-end justify-between font-Londrina text-4xl lg:text-6xl lg:pl-5 pb-2 border-b-2 border-black w-full">
                    
                    <h1>
                        Edit Order
                    </h1>

                    <p className="font-Roboto text-lg">Editing: {itemToEdit.name}</p>

                </div>

                <ul className="flex flex-col gap-3 font-thin mt-4">
                    <li
                        key={itemToEdit.id}
                        className="border border-black rounded-xl p-3 flex flex-row gap-2 bg-[#f1f1f1] justify-between"
                    >
                        <div className="font-roboto flex flex-col gap-2">
                            {itemToEdit.name}
                            <p className="m-0 p-0">{itemToEdit.price} kr</p>
                        </div>
                    </li>
                </ul>
                <MenuButton type="button" to="/" className="before:bg-secondary-0 mt-14 w-full">
                    Checkout
                </MenuButton>
            </div>
        </div>
    );
};

export default EditOrder;