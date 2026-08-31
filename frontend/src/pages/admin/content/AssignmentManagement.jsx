import {
  useEffect,
  useState,
} from "react";


import {
  Plus,
  Trash2,
  ClipboardList,
} from "lucide-react";


import {
  getAllCourses
} from "../../../api/adminCourseApi";


import {
  getLessonsByCourse
} from "../../../api/adminLessonApi";


import {
  getAssignmentsByLesson,
  createAssignment,
  deleteAssignment,
} from "../../../api/adminAssignmentApi";





const AssignmentManagement = () => {


  const [courses,setCourses] = useState([]);

  const [lessons,setLessons] = useState([]);

  const [assignments,setAssignments] = useState([]);


  const [courseId,setCourseId] = useState("");

  const [lessonId,setLessonId] = useState("");



  const [formData,setFormData] = useState({

    title:"",
    description:"",
    deadline:""

  });




  const [loading,setLoading] = useState(false);







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










  const loadAssignments = async(id)=>{


    setLessonId(id);


    try{


      setLoading(true);



      const data =
      await getAssignmentsByLesson(id);



      setAssignments(

        data.assignments || []

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


      const data =
      await createAssignment({

        ...formData,

        lessonId

      });



      setAssignments([

        ...assignments,

        data.assignment

      ]);




      setFormData({

        title:"",
        description:"",
        deadline:""

      });


    }
    catch(error){


      console.log(error);


    }


  };











  const handleDelete=async(id)=>{


    try{


      await deleteAssignment(id);



      setAssignments(

        assignments.filter(

          item=>item._id !== id

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

Assignment Management

</h1>


<p className="mt-2 text-slate-500">

Create and manage student assignments

</p>







{/* Course Selection */}

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








{
lessons.length > 0 && (

<div>

<label className="font-medium">

Select Lesson

</label>


<select

value={lessonId}

onChange={
e=>loadAssignments(e.target.value)
}

className="mt-2 w-full rounded-lg border px-4 py-3"

>


<option value="">

Choose lesson

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

Create Assignment

</h2>





<input

name="title"

value={formData.title}

onChange={handleChange}

placeholder="Assignment title"

className="w-full rounded-lg border px-4 py-3"

required

/>






<textarea

name="description"

value={formData.description}

onChange={handleChange}

placeholder="Assignment description"

rows="5"

className="w-full rounded-lg border px-4 py-3"

/>







<input

type="date"

name="deadline"

value={formData.deadline}

onChange={handleChange}

className="w-full rounded-lg border px-4 py-3"

/>







<button

className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white"

>


<Plus size={18}/>

Create Assignment


</button>



</form>


)

}









{/* Assignment List */}



<div className="mt-6 space-y-4">


{

loading ?


(

<div className="rounded-xl bg-white p-8 text-center">

Loading assignments...

</div>

)


:

assignments.map(item=>(



<div

key={item._id}

className="flex items-center justify-between rounded-2xl bg-white p-6"

>


<div className="flex gap-4">


<div className="rounded-xl bg-blue-50 p-3">

<ClipboardList

className="text-blue-600"

/>

</div>



<div>

<h3 className="font-bold">

{item.title}

</h3>


<p className="text-sm text-slate-500">

Deadline:

{item.deadline || "No deadline"}

</p>


</div>


</div>







<button

onClick={()=>
handleDelete(item._id)
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


export default AssignmentManagement;