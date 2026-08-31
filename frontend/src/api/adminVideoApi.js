import api from "./axios";



export const getVideosByLesson = async(lessonId)=>{

  const response = await api.get(
    `/admin/lessons/${lessonId}/videos`
  );

  return response.data;

};





export const createVideo = async(data)=>{


  const response = await api.post(

    "/admin/videos",

    data

  );


  return response.data;

};






export const deleteVideo = async(id)=>{


  const response = await api.delete(

    `/admin/videos/${id}`

  );


  return response.data;

};