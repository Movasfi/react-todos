import { PlusIcon } from "lucide-react";
import AppText from "../components/AppText";
import Swal from "sweetalert2";
import { useContext, useEffect } from "react";
import { setAssignee } from "../localstorage";
import { AssigneeContext } from "../customHooks/DataContext";


const UsersPage = () => {
  const assigneeContext = useContext(AssigneeContext);

  const { newAssignee, setNewAssignee } = assigneeContext


  useEffect(() => {
    setAssignee("newAssignee", newAssignee!)
  }, [newAssignee])

  const input = async () => {
    const { value: name } = await Swal.fire({
      title: "Add a new name",
      input: "text",
      inputLabel: "Add a new name",
      inputPlaceholder: "Add a new name"
    });

    if (name) {

      setNewAssignee((data) => {
        console.log(data);
        return {
          ...data,
          [name]: name
        }
      })


      Swal.fire(`the name is added`)
    };

  }


  const renderNames = Object.entries(newAssignee).map(([key]) => {
    return (
      <p>{key}</p>
    );
  })

  return (
    <>
      <div className="flex justify-between w-full items-center">
        <AppText className="text-4xl" text="Users"></AppText>
        <PlusIcon onClick={() => {
          input()
        }}></PlusIcon>
      </div>
      {renderNames}
    </>
  )

}

export default UsersPage