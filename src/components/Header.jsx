import { MdPostAdd } from "react-icons/md"
import { useDispatch } from "react-redux"
import { modalFunc } from "../redux/modalSlice"
import { searchDataFunc, sortingDataFunc } from "../redux/dataSlice"

const Header = () => {
    const dispatch = useDispatch()
    return (
        <header className="flex items-center justify-between bg-indigo-600 text-white px-3 py-4">
            <h1 className=" text-3xl"> REACT UYGULAMA </h1>

            <div className="flex items-center gap-5">
                <select onChange={e => dispatch(sortingDataFunc(e.target.value))} className="text-black h-10 rounded-lg">
                    <option value="asc">ARTAN</option>
                    <option value="desc">AZALAN</option>
                </select>
                <input onChange={e => dispatch(searchDataFunc
                    (e.target.value))} className="border border-gray-300 p-2 rounded text-black w-full"
                    type="text" placeholder="Arama Yapınız..." />

                <MdPostAdd onClick={() => dispatch(modalFunc())}
                    size={24}
                    className="bg-indigo-800 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:text-indigo-400"
                />


            </div>


        </header >
    )
}

export default Header




