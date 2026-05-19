import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { 
  ArrowLeft, 
  Syringe,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Trash2,
  X,
  User,
  Baby,
  FileText,
  Bell
} from 'lucide-react';

interface VaccineTrackerProps {
  onBack?: () => void;
}

interface UserDetails {
  name: string;
  age: number;
  gender: 'female' | 'male' | 'other';
  pregnancyWeek?: number;
  babyAge?: string;
  notes: string;
}

interface Vaccine {
  id: number;
  name: string;
  dueDate: string;
  dose: string;
  completionDate?: string;
  doctorNotes: string;
  status: 'upcoming' | 'completed' | 'overdue';
  category: 'prenatal' | 'postnatal' | 'baby';
}

export function VaccineTracker({ onBack }: VaccineTrackerProps) {
  const [showAddVaccineModal, setShowAddVaccineModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState<Vaccine | null>(null);

  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: 'Sarah Johnson',
    age: 28,
    gender: 'female',
    pregnancyWeek: 24,
    notes: 'First pregnancy, no complications'
  });

  const [vaccines, setVaccines] = useState<Vaccine[]>([
    {
      id: 1,
      name: 'Tdap (Tetanus, Diphtheria, Pertussis)',
      dueDate: '2025-12-15',
      dose: 'Single dose',
      completionDate: '2025-12-01',
      doctorNotes: 'Administered during second trimester as recommended',
      status: 'completed',
      category: 'prenatal'
    },
    {
      id: 2,
      name: 'Influenza (Flu Shot)',
      dueDate: '2025-12-20',
      dose: 'Annual',
      doctorNotes: 'Recommended for all pregnant women',
      status: 'upcoming',
      category: 'prenatal'
    },
    {
      id: 3,
      name: 'COVID-19 Booster',
      dueDate: '2025-12-10',
      dose: 'Booster',
      doctorNotes: 'Safe during pregnancy, consult with doctor',
      status: 'overdue',
      category: 'prenatal'
    },
    {
      id: 4,
      name: 'Hepatitis B',
      dueDate: '2026-01-15',
      dose: 'Series 1/3',
      doctorNotes: 'If at risk or not previously vaccinated',
      status: 'upcoming',
      category: 'prenatal'
    }
  ]);

  const [newVaccine, setNewVaccine] = useState({
    name: '',
    dueDate: '',
    dose: '',
    doctorNotes: '',
    category: 'prenatal' as const
  });

  // Calculate vaccine statistics
  const upcomingCount = vaccines.filter(v => v.status === 'upcoming').length;
  const completedCount = vaccines.filter(v => v.status === 'completed').length;
  const overdueCount = vaccines.filter(v => v.status === 'overdue').length;

  const handleAddVaccine = () => {
    if (newVaccine.name && newVaccine.dueDate) {
      const today = new Date();
      const dueDate = new Date(newVaccine.dueDate);
      
      let status: 'upcoming' | 'completed' | 'overdue' = 'upcoming';
      if (dueDate < today) {
        status = 'overdue';
      }

      const vaccine: Vaccine = {
        id: Date.now(),
        name: newVaccine.name,
        dueDate: newVaccine.dueDate,
        dose: newVaccine.dose || 'Single dose',
        doctorNotes: newVaccine.doctorNotes,
        status,
        category: newVaccine.category
      };

      setVaccines([...vaccines, vaccine]);
      setNewVaccine({ name: '', dueDate: '', dose: '', doctorNotes: '', category: 'prenatal' });
      setShowAddVaccineModal(false);
    }
  };

  const handleEditVaccine = (vaccine: Vaccine) => {
    setEditingVaccine(vaccine);
    setNewVaccine({
      name: vaccine.name,
      dueDate: vaccine.dueDate,
      dose: vaccine.dose,
      doctorNotes: vaccine.doctorNotes,
      category: vaccine.category
    });
    setShowAddVaccineModal(true);
  };

  const handleUpdateVaccine = () => {
    if (editingVaccine && newVaccine.name && newVaccine.dueDate) {
      const today = new Date();
      const dueDate = new Date(newVaccine.dueDate);
      
      let status: 'upcoming' | 'completed' | 'overdue' = editingVaccine.status;
      if (!editingVaccine.completionDate) {
        status = dueDate < today ? 'overdue' : 'upcoming';
      }

      setVaccines(vaccines.map(v => 
        v.id === editingVaccine.id 
          ? {
              ...v,
              name: newVaccine.name,
              dueDate: newVaccine.dueDate,
              dose: newVaccine.dose,
              doctorNotes: newVaccine.doctorNotes,
              category: newVaccine.category,
              status
            }
          : v
      ));
      
      setEditingVaccine(null);
      setNewVaccine({ name: '', dueDate: '', dose: '', doctorNotes: '', category: 'prenatal' });
      setShowAddVaccineModal(false);
    }
  };

  const handleCompleteVaccine = (id: number) => {
    const today = new Date().toISOString().split('T')[0];
    setVaccines(vaccines.map(v => 
      v.id === id 
        ? { ...v, completionDate: today, status: 'completed' as const }
        : v
    ));
  };

  const handleDeleteVaccine = (id: number) => {
    setVaccines(vaccines.filter(v => v.id !== id));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'overdue':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-blue-600" />;
    }
  };

  // Auto-reminders based on pregnancy week
  const getAutoReminders = () => {
    const reminders = [];
    if (userDetails.pregnancyWeek) {
      if (userDetails.pregnancyWeek >= 20 && userDetails.pregnancyWeek <= 36) {
        reminders.push({
          title: 'Tdap Vaccine Due',
          description: 'Recommended between weeks 27-36',
          icon: Syringe,
          color: 'bg-purple-50'
        });
      }
      if (userDetails.pregnancyWeek >= 12) {
        reminders.push({
          title: 'Flu Shot Recommended',
          description: 'Safe during any trimester',
          icon: Syringe,
          color: 'bg-blue-50'
        });
      }
    }
    return reminders;
  };

  const autoReminders = getAutoReminders();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50">
      {/* HEADER SECTION - Sticky Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Back Button */}
            {onBack && (
              <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center gap-2 text-foreground/70 hover:text-foreground shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            )}
            
            {/* Title - Flexible */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl flex-1 text-center">
              Vaccine Tracker
            </h1>
            
            {/* Spacer for alignment */}
            <div className="w-16 sm:w-20 lg:w-24 shrink-0" />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        
        {/* USER PROFILE SECTION */}
        <section className="mb-6 sm:mb-8">
          <Card className="w-full bg-white border-0 shadow-lg p-4 sm:p-6 lg:p-8 rounded-3xl">
            {/* Section Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 shrink-0" />
                <h2 className="text-base sm:text-lg lg:text-xl">Your Profile</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEditUserModal(true)}
                className="text-purple-600 flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4 shrink-0" />
                <span>Edit</span>
              </Button>
            </div>

            {/* User Details Grid - Auto Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-purple-50 rounded-2xl p-3 sm:p-4 flex flex-col">
                <p className="text-xs sm:text-sm text-foreground/60 mb-1">Name</p>
                <p className="text-sm sm:text-base break-words">{userDetails.name}</p>
              </div>
              <div className="bg-pink-50 rounded-2xl p-3 sm:p-4 flex flex-col">
                <p className="text-xs sm:text-sm text-foreground/60 mb-1">Age</p>
                <p className="text-sm sm:text-base">{userDetails.age} years</p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-3 sm:p-4 flex flex-col">
                <p className="text-xs sm:text-sm text-foreground/60 mb-1">Gender</p>
                <p className="text-sm sm:text-base capitalize">{userDetails.gender}</p>
              </div>
              <div className="bg-green-50 rounded-2xl p-3 sm:p-4 flex flex-col">
                <p className="text-xs sm:text-sm text-foreground/60 mb-1">
                  {userDetails.pregnancyWeek ? 'Pregnancy Week' : 'Baby Age'}
                </p>
                <p className="text-sm sm:text-base">
                  {userDetails.pregnancyWeek ? `Week ${userDetails.pregnancyWeek}` : userDetails.babyAge || 'N/A'}
                </p>
              </div>
            </div>

            {/* Notes Section - Full Width */}
            {userDetails.notes && (
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-start gap-2 sm:gap-3">
                  <FileText className="w-4 h-4 text-foreground/60 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-foreground/60 mb-1">Notes</p>
                    <p className="text-xs sm:text-sm break-words">{userDetails.notes}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </section>

        {/* PROGRESS STATISTICS SECTION */}
        <section className="mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Upcoming Card */}
            <Card className="w-full bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-md p-4 sm:p-6 rounded-3xl">
              <div className="flex items-center gap-3 sm:gap-4 mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-200 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-foreground/60">Upcoming</p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl">{upcomingCount}</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-foreground/60">Vaccines scheduled</p>
            </Card>

            {/* Completed Card */}
            <Card className="w-full bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-md p-4 sm:p-6 rounded-3xl">
              <div className="flex items-center gap-3 sm:gap-4 mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-200 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-foreground/60">Completed</p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl">{completedCount}</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-foreground/60">Vaccines received</p>
            </Card>

            {/* Overdue Card */}
            <Card className="w-full bg-gradient-to-br from-red-50 to-orange-50 border-0 shadow-md p-4 sm:p-6 rounded-3xl sm:col-span-1">
              <div className="flex items-center gap-3 sm:gap-4 mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-200 rounded-full flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-foreground/60">Overdue</p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl">{overdueCount}</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-foreground/60">Action needed</p>
            </Card>
          </div>
        </section>

        {/* AUTO REMINDERS SECTION */}
        {autoReminders.length > 0 && (
          <section className="mb-6 sm:mb-8">
            <Card className="w-full bg-gradient-to-br from-yellow-50 to-orange-50 border-0 shadow-lg p-4 sm:p-6 lg:p-8 rounded-3xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 shrink-0" />
                <h2 className="text-base sm:text-lg lg:text-xl break-words">
                  Auto Reminders Based on Your Profile
                </h2>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                {autoReminders.map((reminder, index) => (
                  <div key={index} className={`${reminder.color} p-3 sm:p-4 rounded-2xl`}>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                        <reminder.icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base mb-1 break-words">{reminder.title}</h3>
                        <p className="text-xs sm:text-sm text-foreground/60 break-words">
                          {reminder.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        )}

        {/* VACCINE LIST SECTION */}
        <section className="mb-6 sm:mb-8">
          <Card className="w-full bg-white border-0 shadow-lg p-4 sm:p-6 lg:p-8 rounded-3xl">
            {/* Section Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <Syringe className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 shrink-0" />
                <h2 className="text-base sm:text-lg lg:text-xl">Your Vaccines</h2>
              </div>
              <Button
                onClick={() => {
                  setEditingVaccine(null);
                  setNewVaccine({ name: '', dueDate: '', dose: '', doctorNotes: '', category: 'prenatal' });
                  setShowAddVaccineModal(true);
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full flex items-center gap-2"
                size="sm"
              >
                <Plus className="w-4 h-4 shrink-0" />
                <span>Add Vaccine</span>
              </Button>
            </div>

            {/* Vaccine Cards - Auto Layout */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {vaccines.map((vaccine) => (
                <div
                  key={vaccine.id}
                  className={`${getStatusColor(vaccine.status)} border-2 p-4 sm:p-5 lg:p-6 rounded-2xl transition-all hover:shadow-md`}
                >
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {/* Status Icon */}
                    <div className="shrink-0">
                      {getStatusIcon(vaccine.status)}
                    </div>

                    {/* Vaccine Info - Flexible */}
                    <div className="flex-1 min-w-0">
                      {/* Vaccine Header */}
                      <div className="flex flex-col gap-2 mb-3">
                        <h3 className="text-sm sm:text-base break-words">{vaccine.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-foreground/60">
                          <span className="flex items-center gap-1 shrink-0">
                            <Calendar className="w-3 h-3" />
                            Due: {formatDate(vaccine.dueDate)}
                          </span>
                          <span className="px-2 py-0.5 bg-white rounded-full shrink-0">
                            {vaccine.dose}
                          </span>
                        </div>
                      </div>

                      {/* Completion Badge */}
                      {vaccine.completionDate && (
                        <div className="mb-3 p-2 sm:p-3 bg-white/50 rounded-xl">
                          <p className="text-xs sm:text-sm text-green-600 break-words">
                            ✓ Completed on {formatDate(vaccine.completionDate)}
                          </p>
                        </div>
                      )}

                      {/* Doctor Notes */}
                      {vaccine.doctorNotes && (
                        <div className="mb-3 p-3 sm:p-4 bg-white/70 rounded-xl">
                          <div className="flex items-start gap-2">
                            <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-foreground/60 mt-0.5 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-foreground/60 mb-1">Doctor&apos;s Notes</p>
                              <p className="text-xs sm:text-sm text-foreground/80 break-words">
                                {vaccine.doctorNotes}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="mb-3">
                        <span className={`inline-block text-xs px-3 py-1 rounded-full ${
                          vaccine.category === 'prenatal' 
                            ? 'bg-purple-100 text-purple-700' 
                            : vaccine.category === 'postnatal'
                            ? 'bg-pink-100 text-pink-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {vaccine.category === 'prenatal' ? '🤰 Prenatal' : vaccine.category === 'postnatal' ? '👶 Postnatal' : '🍼 Baby'}
                        </span>
                      </div>

                      {/* Action Buttons - Responsive Layout */}
                      <div className="flex flex-wrap items-center gap-2">
                        {vaccine.status !== 'completed' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCompleteVaccine(vaccine.id)}
                            className="text-green-600 hover:bg-green-100 flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>Complete</span>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditVaccine(vaccine)}
                          className="text-blue-600 hover:bg-blue-100 flex items-center gap-2"
                        >
                          <Edit2 className="w-4 h-4 shrink-0" />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteVaccine(vaccine.id)}
                          className="text-red-600 hover:bg-red-100 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4 shrink-0" />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {vaccines.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20">
                  <Syringe className="w-12 h-12 sm:w-16 sm:h-16 text-foreground/20 mb-4" />
                  <p className="text-foreground/60 mb-4 text-sm sm:text-base text-center">
                    No vaccines added yet
                  </p>
                  <Button
                    onClick={() => setShowAddVaccineModal(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4 shrink-0" />
                    Add Your First Vaccine
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </section>
      </main>

      {/* Add/Edit Vaccine Modal */}
      {showAddVaccineModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl">
                {editingVaccine ? 'Edit Vaccine' : 'Add New Vaccine'}
              </h3>
              <button
                onClick={() => {
                  setShowAddVaccineModal(false);
                  setEditingVaccine(null);
                  setNewVaccine({ name: '', dueDate: '', dose: '', doctorNotes: '', category: 'prenatal' });
                }}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm">Vaccine Name *</label>
                <input
                  type="text"
                  value={newVaccine.name}
                  onChange={(e) => setNewVaccine({ ...newVaccine, name: e.target.value })}
                  placeholder="e.g., Tdap, Flu Shot, COVID-19"
                  className="w-full px-4 py-3 rounded-2xl border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Category *</label>
                <select
                  value={newVaccine.category}
                  onChange={(e) => setNewVaccine({ ...newVaccine, category: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-2xl border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  <option value="prenatal">🤰 Prenatal (During Pregnancy)</option>
                  <option value="postnatal">👶 Postnatal (After Birth)</option>
                  <option value="baby">🍼 Baby Vaccines</option>
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm">Due Date *</label>
                  <input
                    type="date"
                    value={newVaccine.dueDate}
                    onChange={(e) => setNewVaccine({ ...newVaccine, dueDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Dose</label>
                  <input
                    type="text"
                    value={newVaccine.dose}
                    onChange={(e) => setNewVaccine({ ...newVaccine, dose: e.target.value })}
                    placeholder="e.g., Single dose, 1/3"
                    className="w-full px-4 py-3 rounded-2xl border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm">Doctor&apos;s Notes</label>
                <textarea
                  value={newVaccine.doctorNotes}
                  onChange={(e) => setNewVaccine({ ...newVaccine, doctorNotes: e.target.value })}
                  placeholder="Add notes from your doctor..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <Button
                onClick={editingVaccine ? handleUpdateVaccine : handleAddVaccine}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-2xl"
              >
                {editingVaccine ? 'Update Vaccine' : 'Add Vaccine'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Details Modal */}
      {showEditUserModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl">Edit Profile</h3>
              <button
                onClick={() => setShowEditUserModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm">Name</label>
                <input
                  type="text"
                  value={userDetails.name}
                  onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm">Age</label>
                  <input
                    type="number"
                    value={userDetails.age || ''}
                    onChange={(e) => setUserDetails({ ...userDetails, age: e.target.value ? parseInt(e.target.value) : 0 })}
                    className="w-full px-4 py-3 rounded-2xl border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Gender</label>
                  <select
                    value={userDetails.gender}
                    onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-2xl border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm">Pregnancy Week (Optional)</label>
                  <input
                    type="number"
                    value={userDetails.pregnancyWeek || ''}
                    onChange={(e) => setUserDetails({ 
                      ...userDetails, 
                      pregnancyWeek: e.target.value ? parseInt(e.target.value) : undefined,
                      babyAge: undefined
                    })}
                    placeholder="e.g., 24"
                    min="1"
                    max="42"
                    className="w-full px-4 py-3 rounded-2xl border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Baby Age (Optional)</label>
                  <input
                    type="text"
                    value={userDetails.babyAge || ''}
                    onChange={(e) => setUserDetails({ 
                      ...userDetails, 
                      babyAge: e.target.value,
                      pregnancyWeek: undefined
                    })}
                    placeholder="e.g., 3 months"
                    className="w-full px-4 py-3 rounded-2xl border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm">Notes</label>
                <textarea
                  value={userDetails.notes}
                  onChange={(e) => setUserDetails({ ...userDetails, notes: e.target.value })}
                  placeholder="Add any important notes..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <Button
                onClick={() => setShowEditUserModal(false)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-2xl"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}