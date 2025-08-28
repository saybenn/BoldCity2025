import { useState } from 'react';

export default function ModalContactForm({ onClose }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(form)),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        {submitted ? (
          <p className="text-green-600">Submitted! We'll be in touch.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" placeholder="Name" className="w-full p-2 border rounded" required />
            <input name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" required />
            <textarea name="message" placeholder="Message" className="w-full p-2 border rounded" required />
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-navy text-white rounded">Send</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}