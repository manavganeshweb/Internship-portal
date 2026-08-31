import {
  useEffect,
  useState
} from "react";


import {
  Plus,
  Trash2,
  Edit,
  BookOpen,
  Video
} from "lucide-react";


import {
  getAllCourses
} from "../../../api/adminCourseApi";


import {
  getLessonsByCourse,
  createLesson,
  deleteLesson
} from "../../../api/adminLessonApi";




const LessonManagement = () => {


  const [courses,setCourses] = useState([]);

  const [selectedCourse,setSelectedCourse] = useState("");

  const [lessons,setLessons] = useState([]);


  const [loading,setLoading] = useState(false);



  const [lesson,setLesson] = useState({

    title:"",
    description:"",
    videoUrl:"",
    duration:""

  });








  useEffect(()=>{


    const fetchCourses = async()=>{


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



    fetchCourses();


  },[]);








  const loadLessons = async(courseId)=>{


    setSelectedCourse(courseId);


    try{


      setLoading(true);



      const data =
        await getLessonsByCourse(courseId);



      setLessons(

        data.lessons || []

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


    setLesson({

      ...lesson,

      [e.target.name]:
      e.target.value

    });


  };








  const handleCreate = async(e)=>{


    e.preventDefault();



    try{


      const data =
      await createLesson({

        ...lesson,

        courseId:selectedCourse

      });



      setLessons([

        ...lessons,

        data.lesson

      ]);



      setLesson({

        title:"",
        description:"",
        videoUrl:"",
        duration:""

      });



    }
    catch(error){


      console.log(error);


    }


  };









  const handleDelete = async(id)=>{


    try{


      await deleteLesson(id);



      setLessons(

        lessons.filter(
          item=>item._id!==id
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

          Lesson Management

        </h1>


        <p className="mt-2 text-slate-500">

          Manage course learning content

        </p>







        {/* Course Selector */}


        <div className="mt-8 rounded-2xl bg-white p-6">


          <label className="font-medium">

            Select Course

          </label>


          <select


            value={selectedCourse}


            onChange={
              e=>loadLessons(e.target.value)
            }


            className="mt-3 w-full rounded-lg border px-4 py-3"


          >

            <option value="">

              Choose course

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










        {/* Add Lesson */}


        {
          selectedCourse && (

          <form

            onSubmit={handleCreate}

            className="mt-6 rounded-2xl bg-white p-6 space-y-4"

          >


            <h2 className="text-xl font-bold">

              Add Lesson

            </h2>




            <input

              name="title"

              value={lesson.title}

              onChange={handleChange}

              placeholder="Lesson title"

              className="w-full rounded-lg border px-4 py-3"

              required

            />



            <textarea

              name="description"

              value={lesson.description}

              onChange={handleChange}

              placeholder="Lesson description"

              className="w-full rounded-lg border px-4 py-3"

            />




            <input

              name="videoUrl"

              value={lesson.videoUrl}

              onChange={handleChange}

              placeholder="Video URL"

              className="w-full rounded-lg border px-4 py-3"

            />





            <input

              name="duration"

              value={lesson.duration}

              onChange={handleChange}

              placeholder="20 minutes"

              className="w-full rounded-lg border px-4 py-3"

            />





            <button

              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white"

            >

              <Plus size={18}/>

              Add Lesson

            </button>


          </form>

          )

        }









        {/* Lessons List */}


        <div className="mt-6 space-y-4">


        {
          loading ?


          (

            <div className="rounded-xl bg-white p-8 text-center">

              Loading lessons...

            </div>

          )

          :

          lessons.map((item)=>(


            <div

              key={item._id}

              className="flex items-center justify-between rounded-2xl bg-white p-6"

            >


              <div className="flex gap-4">


                <div className="rounded-xl bg-blue-50 p-3">


                  <BookOpen

                    className="text-blue-600"

                  />


                </div>



                <div>

                  <h3 className="font-bold">

                    {item.title}

                  </h3>


                  <p className="text-sm text-slate-500">

                    {item.duration}

                  </p>


                </div>


              </div>






              <div className="flex gap-3">


                {
                  item.videoUrl && (

                    <Video

                      className="text-green-600"

                    />

                  )
                }


                <button>

                  <Edit size={18}/>

                </button>



                <button

                  onClick={()=>
                    handleDelete(item._id)
                  }

                  className="text-red-600"

                >

                  <Trash2 size={18}/>

                </button>



              </div>



            </div>


          ))
        }


        </div>





      </div>


    </div>


  );


};


export default LessonManagement;