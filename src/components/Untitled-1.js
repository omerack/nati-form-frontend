const onSubmit = (data) => {
  setLoading(true);
  const formData = new FormData();
  for (const key of Object.keys(multipleImages)) {
    formData.append("file1", data.file[key]);
  }
  fetch("http://localhost:3001/files", { method: "POST", body: formData }).then(
    (res) => console.log(res)
  );
  setMultipleImages([]);
  setLoading(false);
};
