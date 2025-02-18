import Image from "next/image";
import Counter from "./components/Counter";
import RichTextEditor from "./components/RichTextEditor";
import UserDataForm from "./components/UserDataForm";

export default function Home() {
  return (
    <div className="h-full w-full" >
      <div className="grid grid-cols-1 md:grid-cols-2 md:hover:scale-105 min-h-max transition-all duration-500">
        <Counter />
        <UserDataForm />
      </div>
      <div className="w-full p-4">
        <RichTextEditor />
      </div>
    </div>
  );
}
