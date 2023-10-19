import { FaEye, FaPen, FaTrash } from "react-icons/fa";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ShopCard = ({ produts }) => {
    
    const { img, brand, name, type, price, description, rating, _id } = produts;
    
  
  const handleDelete = _id => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/product/${_id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        })
      }
    });
    }
  
    return (
      <div className="flex flex-col justify-center  gap-6 rounded-xl bg-[#DEE2E7]">
        <img src={img} className="rounded-lg w-52 h-52 mx-auto my-4" alt="" />
        <div className="my-auto md:w-[80%] mx-auto leading-8">
          <div className="flex gap-4 items-center">
            <h2 className="text-xl font-bold">
              $<span className="text-[#1C1C1C]">{price}</span>
            </h2>
            <div className="flex gap-1">
              <img src="./star.svg" className="w-4 mx-auto" alt="" />
              <p className="text-[#ED8A19] font-semibold">{rating}</p>
            </div>
          </div>
          <h2 className="text-xl font-semibold">
            <span className="text-[#606060]">{name}</span>
          </h2>
          <h2 className="text-xl font-semibold">
            <span className="text-[#606060]">{brand}</span>
          </h2>
        </div>
        <div className="flex justify-center mb-3 gap-3">
          <div className="bg-[#FE497C] mb-2 h-10 w-10 flex items-center rounded-md text-white">
            <FaEye className="m-auto"></FaEye>
          </div>

          <Link to={`/updateproduct/${_id}`}>
            <div className="bg-[#3577F0] mb-2 h-10 w-10 flex items-center rounded-md text-white">
              <FaPen className="m-auto"></FaPen>
            </div>
          </Link>
          <Link to={`updateCoffee/${_id}`}>
            <div className="bg-[#3C393B] mb-2 h-10 w-10 flex items-center rounded-md">
              <img src="./favorite_border.svg" className="w-6 mx-auto" alt="" />
            </div>
          </Link>
          <div
            onClick={() => handleDelete(_id)}
            className="bg-[#4c49fe] h-10 w-10 flex items-center rounded-md text-white"
          >
            <FaTrash className="m-auto"></FaTrash>
          </div>
        </div>
      </div>
    );
};

export default ShopCard;