import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';
import Button from './ui/Button';
import Create from './ui/Create';
import Update from './ui/Update';

function App() {
  const [details, setDetails] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState("");
  const [createDetail, setCreateDetail] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://crud-assign-1.onrender.com/all");
        console.log(JSON.stringify(response))
        setDetails(response.data.user || []);
      } catch (e) {
        console.log("Error fetching Details: ", e);
      }
    };
    fetchData();
  }, [showCreate, createDetail, showUpdate]);

  const handleDelete = async (id) => {
    try {
        await axios.delete(`https://crud-assign-1.onrender.com/delete?id=${id}`);
        setDetails(details.filter((det) => det._id !== id));
    } catch(e) {
        alert("Something went wrong");
        console.error("Delete error:", e);
    }
}

  return (
    <div className='p-10 bg-black text-white w-full z-0 h-screen overflow-hidden relative'>
      <div className='text-5xl'>Rent Shop</div>
      <div className='flex mt-10 w-full justify-center items-center gap-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-32'>
            <div>
              <p className='text-neutral-400 text-3xl'>Cars</p>
              {details.length > 0 ? (
                details.map((det, index) => (
                  <div className='py-'>
                    <div key={index} className="flex flex-col justify-center py-7 gap-2">
                      {det.carName}
                    </div>
                  </div>
                ))
              ) : (
                <div>No cars available</div>
              )}
            </div>
            <div>
              <div>
                <p className='text-neutral-400 text-3xl'>Price</p>
                {details.length > 0 ? (
                  details.map((det, index) => (
                    <div className='flex justify-between py-5'>
                      <div key={index} className="flex flex-col justify-center items-center">
                        {det.price}
                      </div>
                      <div>
                        <div className='flex justify-center items-center ml-34'>
                          <Button
                            text={"Create"}
                            onCreateClick={() => setShowCreate(true)}
                          />
                          <Button text={"Update"}
                            onUpdateClick={() => setShowUpdate(det._id)}
                          />
                          <Button text={"Delete"}
                            onDeleteClick={() => handleDelete(det._id)}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>-</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-neutral-800 p-6 rounded-lg">
            <Create setCreateDetail={setCreateDetail} />
            <button
              className="absolute cursor-pointer top-2 right-2 text-white hover:text-gray-300"
              onClick={() => setShowCreate(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {showUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-neutral-800 p-6 rounded-lg">
            <Update setShowUpdate={setShowUpdate} showUpdate={showUpdate}/>
            <button
              className="absolute cursor-pointer top-2 right-2 text-white hover:text-gray-300"
              onClick={() => setShowUpdate(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;