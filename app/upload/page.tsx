'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { uploadPaper } from '@/lib/api';

const BOARDS = ['CBSE', 'ICSE', 'IIT-JEE', 'NEET', 'State Board'];
const CLASSES = ['9', '10', '11', '12'];
const YEARS = Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() - i));
const SUBJECTS = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Economics', 'Biology', 'Physics', 'Chemistry'];

export default function UploadPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAppStore();
  const [formData, setFormData] = useState({
    title: '',
    board: '',
    class: '',
    subject: '',
    year: new Date().getFullYear().toString(),
    description: '',
    file: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Please login to upload papers</p>
          <a href="/login" className="text-gold hover:text-gold-dim">
            Go to login
          </a>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.file) {
      setError('Please select a file');
      return;
    }

    if (!formData.title || !formData.board || !formData.class || !formData.subject) {
      setError('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      await uploadPaper(
        {
          title: formData.title,
          board: formData.board,
          class: formData.class,
          subject: formData.subject,
          year: parseInt(formData.year),
          description: formData.description,
          file: formData.file,
        },
        user.id
      );

      setSuccess('Paper uploaded successfully!');
      setFormData({
        title: '',
        board: '',
        class: '',
        subject: '',
        year: new Date().getFullYear().toString(),
        description: '',
        file: null,
      });

      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload paper');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Upload Exam Paper</h1>

        <div className="bg-surface border border-border rounded-lg p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/50 rounded text-green-400">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Paper Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-input border border-border rounded focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder="e.g., CBSE Class 12 Mathematics Board Exam 2024"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Board *</label>
                <select
                  name="board"
                  value={formData.board}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-input border border-border rounded focus:outline-none focus:ring-1 focus:ring-gold"
                  required
                >
                  <option value="">Select Board</option>
                  {BOARDS.map(board => (
                    <option key={board} value={board}>{board}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Class *</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-input border border-border rounded focus:outline-none focus:ring-1 focus:ring-gold"
                  required
                >
                  <option value="">Select Class</option>
                  {CLASSES.map(cls => (
                    <option key={cls} value={cls}>Class {cls}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-input border border-border rounded focus:outline-none focus:ring-1 focus:ring-gold"
                  required
                >
                  <option value="">Select Subject</option>
                  {SUBJECTS.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Year *</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-input border border-border rounded focus:outline-none focus:ring-1 focus:ring-gold"
                  required
                >
                  {YEARS.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-input border border-border rounded focus:outline-none focus:ring-1 focus:ring-gold resize-none"
                placeholder="Add any additional details about this paper..."
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">PDF File *</label>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf"
                className="w-full px-4 py-2 bg-input border border-border rounded"
                required
              />
              {formData.file && (
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {formData.file.name}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gold text-ink font-bold rounded hover:bg-gold-dim disabled:opacity-50 transition-colors"
            >
              {loading ? 'Uploading...' : 'Upload Paper'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
