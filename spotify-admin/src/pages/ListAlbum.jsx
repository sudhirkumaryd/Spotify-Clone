import  React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../App';
import { toast } from 'react-toastify';

const ListAlbum = () => {
  const [data, setData] = useState([]);
  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success)
      {
        setData(response.data.albums)
      }
      
    } catch (error) {
      toast.error("Error occour");
      
    }
  }
  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/remove`, {id});

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      }
    } catch (error) {
      toast.error("error occur");

    }
  }
  useEffect(() => {
    fetchSongs();

  },[])
  return (
    <div>
      <p>All Albums List</p>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-grey-300 text-sm mr-5 bg-grey-100'>
          <b>Images</b>
          <b>Name</b>
         <b>Description</b>
          <b>colour</b>
          <b>section</b>
          
        </div>
        {
          data.map((item,index) => {
            return (
              <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-grey-300 text-sm mr-5'>
                <img className='w-12' src={item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.desc}</p>
               <input type="color"  value={item.bgColour} />
                <p className='cursor-pointer' onClick={()=>removeSong(item._id)}>X</p>

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ListAlbum;