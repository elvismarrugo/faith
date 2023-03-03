import Form from "../components/Form";

const New = () => {
  const formData = {
    title: "",
    plot: "",
  };

  return (
    <div className="container mx-auto">
        <h1 className="font-light text-4xl py-4">Agregar+ Movie</h1>
      <Form formData={formData} />
    </div>
  );
};

export default New;
