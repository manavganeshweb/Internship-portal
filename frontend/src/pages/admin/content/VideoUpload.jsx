import { useEffect, useState } from "react";

import {
  Plus,
  Trash2,
  PlayCircle,
  Video,
} from "lucide-react";


import {
  getLessonsByCourse
} from "../../../api/adminLessonApi";


import {
  getAllCourses
} from "../../../api/adminCourseApi";


import {
  getVideosByLesson,
  createVideo,
  deleteVideo,
} from "../../../api/adminVideoApi";




const VideoUpload = () => {


  const [courses,setCourses] = useState([]);

  const [lessons,setLessons] = useState([]);

  const [videos,setVideos] = useState([]);


  const [courseId,setCourseId] = useState("");

  const [lessonId,setLessonId] = useState("");


  const [loading,setLoading] = useState(false);




  const [formData,setFormData] = useState({

    title:"",

    videoUrl:"",

    duration:""

  });







  useEffect(()=>{


    const loadCourses = async()=>{


      try{


        const data = await getAllCourses();


        setCourses(

          data.courses || []

        );


      }
      catch(error){

        console.log(error);

      }


    };


    loadCourses();


  },[]);









  const loadLessons = async(id)=>{


    setCourseId(id);


    setLessonId("");



    try{


      const data =
      await getLessonsByCourse(id);



      setLessons(

        data.lessons || []

      );


    }
    catch(error){


      console.log(error);


    }


  };









  const loadVideos = async(id)=>{


    setLessonId(id);



    try{


      setLoading(true);



      const data =
      await getVideosByLesson(id);



      setVideos(

        data.videos || []

      );



    }
    catch(error){


      console.log(error);


    }
    finally{


      setLoading(false);


    }


  };








  const handleChange=(e)=>{


    setFormData({

      ...formData,

      [e.target.name]:

      e.target.value

    });


  };









  const handleSubmit=async(e)=>{


    e.preventDefault();



    try{


      const data = await createVideo({

        ...formData,

        lessonId

      });



      setVideos([

        ...videos,

        data.video

      ]);



      setFormData({

        title:"",

        videoUrl:"",

        duration:""

      });



    }
    catch(error){


      console.log(error);


    }


  };









  const handleDelete=async(id)=>{


    try{


      await deleteVideo(id);



      setVideos(

        videos.filter(

          video=>video._id!==id

        )

      );


    }
    catch(error){

      console.log(error);

    }


  };









  return (

    <div className="min-h-screen bg-slate-100 p-6">


      <div className="mx-auto max-w-6xl">



        <h1 className="text-3xl font-bold">

          Video Management

        </h1>


        <p className="mt-2 text-slate-500">

          Upload and manage course videos

        </p>









        <div className="mt-8 rounded-2xl bg-white p-6 space-y-5">



          <div>


            <label className="font-medium">

              Select Course

            </label>


            <select

              value={courseId}

              onChange={
                e=>loadLessons(e.target.value)
              }

              className="mt-2 w-full rounded-lg border px-4 py-3"

            >


              <option value="">

                Select Course

              </option>



              {
                courses.map(course=>(


                  <option

                    key={course._id}

                    value={course._id}

                  >

                    {course.title}

                  </option>


                ))
              }


            </select>


          </div>









          {
            lessons.length > 0 && (


              <div>


                <label className="font-medium">

                  Select Lesson

                </label>



                <select


                  value={lessonId}


                  onChange={
                    e=>loadVideos(e.target.value)
                  }


                  className="mt-2 w-full rounded-lg border px-4 py-3"


                >

                  <option value="">

                    Select Lesson

                  </option>



                  {
                    lessons.map(
                      lesson=>(

                      <option

                        key={lesson._id}

                        value={lesson._id}

                      >

                        {lesson.title}

                      </option>

                    ))
                  }


                </select>



              </div>


            )
          }



        </div>









        {
          lessonId && (


          <form

            onSubmit={handleSubmit}

            className="mt-6 rounded-2xl bg-white p-6 space-y-4"

          >


            <h2 className="text-xl font-bold">

              Add Video

            </h2>





            <input

              name="title"

              value={formData.title}

              onChange={handleChange}

              placeholder="Video title"

              className="w-full rounded-lg border px-4 py-3"

              required

            />




            <input

              name="videoUrl"

              value={formData.videoUrl}

              onChange={handleChange}

              placeholder="YouTube / Video URL"

              className="w-full rounded-lg border px-4 py-3"

              required

            />




            <input

              name="duration"

              value={formData.duration}

              onChange={handleChange}

              placeholder="15:30"

              className="w-full rounded-lg border px-4 py-3"

            />






            <button

              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white"

            >

              <Plus size={18}/>

              Add Video

            </button>



          </form>


          )
        }









        <div className="mt-6 space-y-4">


          {
            loading ?


            <div className="rounded-xl bg-white p-8">

              Loading videos...

            </div>


            :


            videos.map(video=>(



              <div

                key={video._id}

                className="flex items-center justify-between rounded-2xl bg-white p-6"

              >


                <div className="flex items-center gap-4">


                  <PlayCircle

                    className="text-blue-600"

                  />


                  <div>


                    <h3 className="font-bold">

                      {video.title}

                    </h3>


                    <p className="text-sm text-slate-500">

                      {video.duration}

                    </p>


                  </div>


                </div>





                <button

                  onClick={()=>
                    handleDelete(video._id)
                  }

                  className="text-red-600"

                >

                  <Trash2 size={18}/>

                </button>



              </div>



            ))
          }



        </div>





      </div>


    </div>

  );


};


export default VideoUpload;