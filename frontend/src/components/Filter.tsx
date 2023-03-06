import React from "react";

type Props = {
    filters: {
        name: string;
        brand: string;
        price: string;
        year: string;
    };
    setSearchFilter: React.Dispatch<
        React.SetStateAction<{
            name: string;
            brand: string;
            price: string;
            year: string;
        }>
    >;
};

function Filter({ filters, setSearchFilter }: Props) {
    return (
        <div className="flex gap-4 flex-wrap py-8 justify-center">
            <div>
                <label className="block text-gray-700 font-bold mb-2">
                    Name
                </label>
                <input
                    type="text"
                    placeholder="Enter name"
                    value={filters.name}
                    onChange={(e) =>
                        setSearchFilter({
                            ...filters,
                            name: e.target.value,
                        })
                    }
                    className="shadow appearance-none border rounded w-36 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-bold mb-2">
                    Brand
                </label>
                <input
                    type="text"
                    placeholder="Brand"
                    value={filters.brand}
                    onChange={(e) =>
                        setSearchFilter({
                            ...filters,
                            brand: e.target.value,
                        })
                    }
                    className="shadow appearance-none border rounded w-36 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-bold mb-2">
                    Max Price
                </label>
                <input
                    type="number"
                    placeholder="Price"
                    value={filters.price}
                    onChange={(e) =>
                        setSearchFilter({
                            ...filters,
                            price: e.target.value,
                        })
                    }
                    className="shadow appearance-none border rounded w-36 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-bold mb-2">
                    Year
                </label>
                <input
                    type="number"
                    placeholder="Year"
                    value={filters.year}
                    onChange={(e) =>
                        setSearchFilter({
                            ...filters,
                            year: e.target.value,
                        })
                    }
                    className="shadow appearance-none border rounded w-36 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
        </div>
    );
}

export default Filter;
