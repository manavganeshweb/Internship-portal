import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getCourseById,
  updateCourseContent,
} from "../../api/adminCourseApi";


const CourseContent = () => {

  const { courseId } = useParams();
  const navigate = useNavigate();


  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  useEffect(() => {

    const loadCourse = async () => {

      const data = await getCourseById(courseId);

      if(data.success){
        setModules(
          data.course.modules || []
        );
      }

      setLoading(false);
    };


    loadCourse();

  }, [courseId]);



  const addModule = () => {

    setModules([
      ...modules,
      {
        title:"",
        order: modules.length + 1,
        lessons:[]
      }
    ]);

  };



  const updateModule = (
    index,
    value
  ) => {

    const updated = [...modules];

    updated[index].title = value;

    setModules(updated);

  };



  const addLesson = (
    moduleIndex
  ) => {

    const updated = [...modules];


    updated[moduleIndex].lessons.push({

      title:"",
      type:"video",
      content:"",
      duration:0,
      order:
        updated[moduleIndex]
        .lessons.length + 1

    });


    setModules(updated);

  };



  const updateLesson = (
    moduleIndex,
    lessonIndex,
    key,
    value
  ) => {

    const updated=[...modules];


    updated[moduleIndex]
    .lessons[lessonIndex][key]=value;


    setModules(updated);

  };



  const deleteModule = (index)=>{

    setModules(
      modules.filter(
        (_,i)=>i!==index
      )
    );

  };



  const deleteLesson = (
    moduleIndex,
    lessonIndex
  )=>{

    const updated=[...modules];


    updated[moduleIndex]
    .lessons.splice(
      lessonIndex,
      1
    );


    setModules(updated);

  };



  const saveContent = async()=>{

    try{

      setSaving(true);


      await updateCourseContent(
        courseId,
        modules
      );


      navigate(
        "/admin/courses"
      );


    }
    finally{

      setSaving(false);

    }

  };



  if(loading){

    return (
      <div className="p-10">
        Loading...
      </div>
    );

  }



  return (

<div className="min-h-screen bg-slate-50">

<main className="mx-auto max-w-5xl px-4 py-8">


<Link
to="/admin/courses"
className="flex items-center gap-2 text-sm"
>
<ArrowLeft size={18}/>
Back
</Link>



<div className="mt-6 rounded-2xl bg-white p-8 shadow">


<div className="flex justify-between">

<h1 className="text-3xl font-bold">
Course Content
</h1>


<button
onClick={addModule}
className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
>
<Plus size={18}/>
Add Module
</button>

</div>



<div className="mt-8 space-y-6">


{
modules.map(
(module,moduleIndex)=>(

<div
key={moduleIndex}
className="rounded-xl border p-5"
>


<div className="flex gap-3">

<input
value={module.title}
onChange={(e)=>
updateModule(
moduleIndex,
e.target.value
)
}
placeholder="Module title"
className="flex-1 rounded border px-3 py-2"
/>


<button
onClick={()=>
deleteModule(moduleIndex)
}
className="text-red-500"
>
<Trash2 size={18}/>
</button>

</div>



<div className="mt-5 space-y-3">


{
module.lessons.map(
(lesson,lessonIndex)=>(

<div
key={lessonIndex}
className="rounded-lg bg-slate-50 p-4"
>


<input
value={lesson.title}
onChange={(e)=>
updateLesson(
moduleIndex,
lessonIndex,
"title",
e.target.value
)
}
placeholder="Lesson title"
className="w-full rounded border px-3 py-2"
/>



<select
value={lesson.type}
onChange={(e)=>
updateLesson(
moduleIndex,
lessonIndex,
"type",
e.target.value
)
}
className="mt-3 rounded border px-3 py-2"
>

<option value="video">
Video
</option>

<option value="pdf">
PDF
</option>

<option value="quiz">
Quiz
</option>

</select>



<input
value={lesson.content}
onChange={(e)=>
updateLesson(
moduleIndex,
lessonIndex,
"content",
e.target.value
)
}
placeholder="Video URL / PDF URL / Content"
className="mt-3 w-full rounded border px-3 py-2"
/>



<button
onClick={()=>
deleteLesson(
moduleIndex,
lessonIndex
)
}
className="mt-3 text-sm text-red-500"
>
Remove Lesson
</button>


</div>

)

)
}



<button
onClick={()=>
addLesson(moduleIndex)
}
className="mt-3 flex items-center gap-2 text-blue-600"
>

<Plus size={16}/>
Add Lesson

</button>


</div>

</div>

)

)
}



</div>



<button
onClick={saveContent}
disabled={saving}
className="mt-8 flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white"
>

<Save size={18}/>

{
saving
?"Saving..."
:"Save Content"
}

</button>



</div>


</main>

</div>

  );

};


export default CourseContent;