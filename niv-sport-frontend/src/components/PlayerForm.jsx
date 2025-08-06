import { useState, useEffect } from 'react';

const PlayerForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState({
    name: '',
    position: '',
    number: '',
    nationality: '',
    image: '',
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        position: initialData.position || '',
        number: initialData.number?.toString() || '',
        nationality: initialData.nationality || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('position', form.position);
    formData.append('number', parseInt(form.number, 10));
    formData.append('nationality', form.nationality);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    onSubmit(formData);

    // Reset form
    setForm({ name: '', position: '', number: '', nationality: '', image: '' });
    setImageFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
      {['name', 'position', 'number', 'nationality','image',].map((field) => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field}
          className="w-full p-2 border border-gray-300 rounded"
        />
      ))}

      {/* 🔽 File input for image */}
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {initialData ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default PlayerForm;
