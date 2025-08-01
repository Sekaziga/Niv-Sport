import { useState, useEffect } from 'react';

const PlayerForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState({
    name: '',
    position: '',
    number: '',
    nationality: '',
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
  e.preventDefault();
  onSubmit({
    ...form,
    number: parseInt(form.number, 10), // 🔧 ensure it's an integer
  });
  setForm({ name: '', position: '', number: '', nationality: '' });
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {['name', 'position', 'number', 'nationality'].map((field) => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field}
          className="w-full p-2 border border-gray-300 rounded"
        />
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {initialData ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default PlayerForm;
