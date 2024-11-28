const SearchButton = () => {

    return(

        <button className="relative px-4 py-2 bg-green-500 text-white rounded-r hover:bg-green-600 group">
            <div className="relative inline-block">
                <img 
                    src="./src/assets/img/magnifying.svg"
                    className="relative z-10 w-10 h-10 p-2 border border-black bg-primary rounded"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-secondary rounded border border-black -z-10 translate-x-[5px] translate-y-[5px] transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0">
                    
                </div>
                </div>
        </button>
    )
}

export default SearchButton;