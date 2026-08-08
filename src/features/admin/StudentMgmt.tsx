import React, { useState } from 'react';
import { useSupabase } from '../../hooks/useSupabase';
import { useToastContext } from '../../context/ToastContext';
import { CLASSES_LIST } from '../../config/constants';
import { Plus, Search, Filter, Trash2, Edit2, User, Phone, Mail, GraduationCap } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Student } from '../../types';

export const StudentMgmt: React.FC = () => {
  const { students, store } = useSupabase();
  const { showToast } = useToastContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    roll_number: '',
    first_name: '',
    last_name: '',
    class_name: 'Grade 10-A',
    parent_name: '',
    parent_phone: '',
    parent_email: '',
    address: 'Jaipur, Rajasthan',
    dob: '2010-01-01',
    gender: 'male' as 'male' | 'female' | 'other',
    blood_group: 'O+',
  });

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      `${s.first_name} ${s.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.roll_number.includes(searchQuery) ||
      s.parent_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === 'all' || s.class_name === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name || !formData.roll_number) {
      showToast('Please fill in required fields (Name & Roll No)', 'warning');
      return;
    }

    if (editingStudent) {
      store.updateStudent(editingStudent.id, {
        ...formData,
        grade: formData.class_name.split('-')[0].replace('Grade ', ''),
        section: formData.class_name.split('-')[1] || 'A',
      });
      showToast('Student updated successfully!', 'success');
      setEditingStudent(null);
    } else {
      store.addStudent({
        ...formData,
        grade: formData.class_name.split('-')[0].replace('Grade ', ''),
        section: formData.class_name.split('-')[1] || 'A',
        admission_date: new Date().toISOString().split('T')[0],
        status: 'active',
        avatar_url: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250`,
      });
      showToast('New student added to directory!', 'success');
      setShowAddModal(false);
    }

    // Reset Form
    setFormData({
      roll_number: '',
      first_name: '',
      last_name: '',
      class_name: 'Grade 10-A',
      parent_name: '',
      parent_phone: '',
      parent_email: '',
      address: 'Jaipur, Rajasthan',
      dob: '2010-01-01',
      gender: 'male',
      blood_group: 'O+',
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name} from the student directory?`)) {
      store.deleteStudent(id);
      showToast(`${name} deleted`, 'info');
    }
  };

  const openEdit = (s: Student) => {
    setEditingStudent(s);
    setFormData({
      roll_number: s.roll_number,
      first_name: s.first_name,
      last_name: s.last_name,
      class_name: s.class_name,
      parent_name: s.parent_name,
      parent_phone: s.parent_phone,
      parent_email: s.parent_email,
      address: s.address,
      dob: s.dob,
      gender: s.gender,
      blood_group: s.blood_group || 'O+',
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Banner Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#2D2F31] p-4 rounded-2xl border border-[#E0E0E0] dark:border-[#3C4043]">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#0494F4]" />
            Student Management & Allocation
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Total Enrolled: {students.length} Students across Grades 1-12
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingStudent(null);
            setShowAddModal(true);
          }}
          icon={<Plus className="w-4 h-4" />}
        >
          Add New Student
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Input
            placeholder="Search by student name, roll number, or parent..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-white dark:bg-[#202124] text-gray-900 dark:text-gray-100 border border-[#E0E0E0] dark:border-[#3C4043] rounded-xl px-3 py-2 text-xs font-semibold focus:border-[#0494F4]"
          >
            <option value="all">All Classes & Grades</option>
            {CLASSES_LIST.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Student List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredStudents.map((st) => (
          <Card key={st.id} className="relative group">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={st.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                  alt={st.first_name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#0494F4]/30 shrink-0"
                />
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                    {st.first_name} {st.last_name}
                  </h3>
                  <p className="text-xs font-semibold text-[#0494F4]">{st.class_name} • Roll #{st.roll_number}</p>
                </div>
              </div>
              <Badge status={st.status}>{st.status}</Badge>
            </div>

            <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300 pt-2 border-t border-[#E0E0E0] dark:border-[#3C4043]">
              <p className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-gray-400" />
                <span>Parent: {st.parent_name}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span>{st.parent_phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                <span className="truncate">{st.parent_email}</span>
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-dashed border-[#E0E0E0] dark:border-[#3C4043]">
              <Button size="sm" variant="outline" onClick={() => openEdit(st)} icon={<Edit2 className="w-3.5 h-3.5" />}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleDelete(st.id, `${st.first_name} ${st.last_name}`)}
                icon={<Trash2 className="w-3.5 h-3.5" />}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add / Edit Student Modal */}
      <Modal
        isOpen={showAddModal || !!editingStudent}
        onClose={() => {
          setShowAddModal(false);
          setEditingStudent(null);
        }}
        title={editingStudent ? 'Edit Student Details' : 'Enroll New Student'}
      >
        <form onSubmit={handleSaveStudent} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="First Name"
              required
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            />
            <Input
              label="Last Name"
              required
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Roll Number"
              required
              value={formData.roll_number}
              onChange={(e) => setFormData({ ...formData, roll_number: e.target.value })}
            />
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                Class / Grade
              </label>
              <select
                value={formData.class_name}
                onChange={(e) => setFormData({ ...formData, class_name: e.target.value })}
                className="w-full bg-gray-50 dark:bg-[#202124] text-gray-900 dark:text-gray-100 border border-[#E0E0E0] dark:border-[#3C4043] rounded-xl px-3 py-2 text-sm focus:border-[#0494F4]"
              >
                {CLASSES_LIST.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Parent / Guardian Name"
            value={formData.parent_name}
            onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Parent Phone"
              value={formData.parent_phone}
              onChange={(e) => setFormData({ ...formData, parent_phone: e.target.value })}
            />
            <Input
              label="Parent Email"
              type="email"
              value={formData.parent_email}
              onChange={(e) => setFormData({ ...formData, parent_email: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E0E0E0] dark:border-[#3C4043]">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowAddModal(false);
                setEditingStudent(null);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">{editingStudent ? 'Save Changes' : 'Confirm Enrollment'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
