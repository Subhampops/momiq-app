import { useState } from 'react';
import { Card } from './ui/card';
import { 
  Home, 
  Calendar, 
  User, 
  Activity,
  Apple,
  Heart,
  TrendingUp,
  Bell,
  Lightbulb,
  Baby,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { Button } from './ui/button';

interface PregnancyTrackerProps {
  onBack?: () => void;
}

interface PregnancyData {
  isPregnant: boolean;
  lmpDate: string;
  dueDate: string;
  weight: string;
  height: string;
  isFirstPregnancy: boolean | null;
}

export function PregnancyTracker({ onBack }: PregnancyTrackerProps) {
  const [activeTab, setActiveTab] = useState('tracker');
  const [currentView, setCurrentView] = useState<'setup' | 'summary' | 'dashboard'>('setup');
  const [pregnancyData, setPregnancyData] = useState<PregnancyData>({
    isPregnant: true,
    lmpDate: '',
    dueDate: '',
    weight: '',
    height: '',
    isFirstPregnancy: null
  });

  // Calculate due date from LMP (280 days from LMP)
  const calculateDueDate = (lmpDate: string) => {
    if (!lmpDate) return '';
    const lmp = new Date(lmpDate);
    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280);
    return dueDate.toISOString().split('T')[0];
  };

  // Calculate pregnancy week from LMP
  const calculatePregnancyWeek = (lmpDate: string) => {
    if (!lmpDate) return { week: 0, day: 0 };
    const lmp = new Date(lmpDate);
    const today = new Date();
    const diffTime = today.getTime() - lmp.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const week = Math.floor(diffDays / 7);
    const day = diffDays % 7;
    return { week, day };
  };

  const handleLmpChange = (date: string) => {
    setPregnancyData({
      ...pregnancyData,
      lmpDate: date,
      dueDate: calculateDueDate(date)
    });
  };

  const handleStartTracking = () => {
    if (pregnancyData.lmpDate && pregnancyData.dueDate) {
      setCurrentView('summary');
    }
  };

  const handleContinueToDashboard = () => {
    setCurrentView('dashboard');
  };

  // Setup Screen
  if (currentView === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-6 sm:py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          {onBack && (
            <div className="mb-4 sm:mb-6">
              <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center gap-2 text-foreground/70 hover:text-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Button>
            </div>
          )}

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-sm mb-4">
              <Baby className="w-5 h-5 text-pink-500" />
              <span className="text-foreground/60">Let&apos;s Get Started</span>
            </div>
            <h1 className="text-3xl md:text-4xl mb-2">Set Up Your Pregnancy Tracker</h1>
            <p className="text-foreground/60">Tell us a bit about your journey</p>
          </div>

          <Card className="bg-white border-0 shadow-xl p-8 rounded-3xl">
            <div className="space-y-6">
              
              {/* Are you pregnant toggle */}
              <div>
                <label className="block mb-3">Are you pregnant?</label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => setPregnancyData({ ...pregnancyData, isPregnant: true })}
                    className={`flex-1 ${
                      pregnancyData.isPregnant
                        ? 'bg-pink-500 text-white hover:bg-pink-600'
                        : 'bg-gray-100 text-foreground/60 hover:bg-gray-200'
                    }`}
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setPregnancyData({ ...pregnancyData, isPregnant: false })}
                    className={`flex-1 ${
                      !pregnancyData.isPregnant
                        ? 'bg-pink-500 text-white hover:bg-pink-600'
                        : 'bg-gray-100 text-foreground/60 hover:bg-gray-200'
                    }`}
                  >
                    No
                  </Button>
                </div>
              </div>

              {/* Last Menstrual Period */}
              <div>
                <label htmlFor="lmp" className="block mb-3">
                  Last Menstrual Period (LMP) <span className="text-pink-500">*</span>
                </label>
                <input
                  id="lmp"
                  type="date"
                  value={pregnancyData.lmpDate}
                  onChange={(e) => handleLmpChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-pink-50/30"
                  required
                />
              </div>

              {/* Expected Due Date */}
              <div>
                <label htmlFor="dueDate" className="block mb-3">
                  Expected Due Date <span className="text-pink-500">*</span>
                </label>
                <input
                  id="dueDate"
                  type="date"
                  value={pregnancyData.dueDate}
                  onChange={(e) => setPregnancyData({ ...pregnancyData, dueDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-purple-50/30"
                />
                {pregnancyData.dueDate && (
                  <p className="text-xs text-foreground/60 mt-2">
                    Auto-calculated from LMP (editable)
                  </p>
                )}
              </div>

              {/* Current Weight */}
              <div>
                <label htmlFor="weight" className="block mb-3">
                  Current Weight <span className="text-foreground/40">(optional)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    id="weight"
                    type="number"
                    placeholder="e.g., 145"
                    value={pregnancyData.weight}
                    onChange={(e) => setPregnancyData({ ...pregnancyData, weight: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-2xl border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-blue-50/30"
                  />
                  <select className="px-4 py-3 rounded-2xl border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-blue-50/30">
                    <option>lbs</option>
                    <option>kg</option>
                  </select>
                </div>
              </div>

              {/* Height */}
              <div>
                <label htmlFor="height" className="block mb-3">
                  Height <span className="text-foreground/40">(optional)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    id="height"
                    type="number"
                    placeholder="e.g., 5"
                    value={pregnancyData.height}
                    onChange={(e) => setPregnancyData({ ...pregnancyData, height: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-2xl border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-green-50/30"
                  />
                  <select className="px-4 py-3 rounded-2xl border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-green-50/30">
                    <option>ft</option>
                    <option>cm</option>
                  </select>
                </div>
              </div>

              {/* First Pregnancy */}
              <div>
                <label className="block mb-3">Is this your first pregnancy?</label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => setPregnancyData({ ...pregnancyData, isFirstPregnancy: true })}
                    className={`flex-1 ${
                      pregnancyData.isFirstPregnancy === true
                        ? 'bg-purple-500 text-white hover:bg-purple-600'
                        : 'bg-gray-100 text-foreground/60 hover:bg-gray-200'
                    }`}
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setPregnancyData({ ...pregnancyData, isFirstPregnancy: false })}
                    className={`flex-1 ${
                      pregnancyData.isFirstPregnancy === false
                        ? 'bg-purple-500 text-white hover:bg-purple-600'
                        : 'bg-gray-100 text-foreground/60 hover:bg-gray-200'
                    }`}
                  >
                    No
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleStartTracking}
                disabled={!pregnancyData.lmpDate || !pregnancyData.dueDate}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-6 rounded-2xl"
              >
                Start Tracking
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Summary Screen
  if (currentView === 'summary') {
    const { week, day } = calculatePregnancyWeek(pregnancyData.lmpDate);
    const dueDate = new Date(pregnancyData.dueDate);
    const formattedDueDate = dueDate.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });

    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-6 sm:py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full mb-6 shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl mb-2">All Set!</h1>
            <p className="text-foreground/60">Here&apos;s your pregnancy overview</p>
          </div>

          <Card className="bg-white border-0 shadow-xl p-8 rounded-3xl mb-6">
            <div className="space-y-6">
              
              {/* Current Week */}
              <div className="text-center pb-6 border-b border-foreground/10">
                <p className="text-foreground/60 mb-2">You are currently in</p>
                <h2 className="text-4xl text-pink-500 mb-1">Week {week}, Day {day}</h2>
                <p className="text-foreground/60">of your pregnancy journey</p>
              </div>

              {/* Due Date */}
              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl">
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground/60">Estimated Due Date</p>
                  <p className="text-lg">{formattedDueDate}</p>
                </div>
              </div>

              {/* Trimester Info */}
              <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-2xl">
                <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground/60">Current Trimester</p>
                  <p className="text-lg">
                    {week <= 13 ? 'First Trimester' : week <= 26 ? 'Second Trimester' : 'Third Trimester'}
                  </p>
                </div>
              </div>

              {/* Next Steps */}
              <div className="mt-6 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl">
                <h3 className="text-lg mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-orange-500" />
                  Next Recommended Steps
                </h3>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Schedule your next prenatal appointment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Start taking prenatal vitamins daily</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Join our community to connect with other moms</span>
                  </li>
                </ul>
              </div>

              {/* Continue Button */}
              <Button
                onClick={handleContinueToDashboard}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-6 rounded-2xl mt-4"
              >
                Continue to Dashboard
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Dashboard View
  const { week: pregnancyWeek, day: pregnancyDay } = pregnancyData.lmpDate 
    ? calculatePregnancyWeek(pregnancyData.lmpDate)
    : { week: 18, day: 3 };
  
  const totalWeeks = 40;
  const percentageComplete = Math.round((pregnancyWeek / totalWeeks) * 100);
  
  const symptoms = [
    { name: 'Fatigue', severity: 'Moderate' },
    { name: 'Back Pain', severity: 'Mild' },
    { name: 'Mood Swings', severity: 'Mild' }
  ];

  const appointments = [
    { date: 'Dec 10', time: '10:00 AM', type: 'Ultrasound' },
    { date: 'Dec 20', time: '2:30 PM', type: 'Check-up' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl">
        
        {/* Back Button */}
        {onBack && (
          <div className="mb-4 sm:mb-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </div>
        )}

        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-sm mb-3 sm:mb-4">
            <Baby className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
            <span className="text-sm sm:text-base text-foreground/60">Your Pregnancy Journey</span>
          </div>
          <h1 className="text-3xl sm:text-4xl mb-2">Week {pregnancyWeek}, Day {pregnancyDay}</h1>
          <p className="text-foreground/60">You&apos;re doing amazing!</p>
        </div>

        {/* Progress Ring */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48">
            <svg className="transform -rotate-90 w-40 h-40 sm:w-48 sm:h-48">
              <circle
                cx="80"
                cy="80"
                r="72"
                stroke="#fce7f3"
                strokeWidth="10"
                fill="none"
                className="sm:hidden"
              />
              <circle
                cx="80"
                cy="80"
                r="72"
                stroke="#f9a8d4"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 72}`}
                strokeDashoffset={`${2 * Math.PI * 72 * (1 - percentageComplete / 100)}`}
                strokeLinecap="round"
                className="sm:hidden"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#fce7f3"
                strokeWidth="12"
                fill="none"
                className="hidden sm:block"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#f9a8d4"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - percentageComplete / 100)}`}
                strokeLinecap="round"
                className="hidden sm:block"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl sm:text-3xl text-pink-500">{percentageComplete}%</span>
              <span className="text-xs sm:text-sm text-foreground/60">Complete</span>
            </div>
          </div>
        </div>

        {/* Baby Size Comparison */}
        <Card className="bg-gradient-to-br from-pink-100 to-purple-100 border-0 shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 rounded-2xl sm:rounded-3xl">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl mb-2">Baby&apos;s Size</h3>
              <p className="text-foreground/70 mb-1">About the size of a bell pepper</p>
              <p className="text-sm text-foreground/60">Length: 5.6 inches • Weight: 6.7 oz</p>
            </div>
            <div className="text-5xl sm:text-6xl">🫑</div>
          </div>
        </Card>

        {/* Tracking Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
          
          {/* Mother's Symptoms */}
          <Card className="bg-white border-0 shadow-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-500" />
              </div>
              <h3 className="text-base sm:text-lg">Your Symptoms</h3>
            </div>
            <div className="space-y-3">
              {symptoms.map((symptom, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-foreground/80">{symptom.name}</span>
                  <span className="text-xs bg-pink-50 text-pink-600 px-3 py-1 rounded-full">
                    {symptom.severity}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Baby Development */}
          <Card className="bg-white border-0 shadow-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="text-base sm:text-lg">Baby Development</h3>
            </div>
            <ul className="space-y-2 text-sm sm:text-base text-foreground/70">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Developing unique fingerprints</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Ears are in final position</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Can yawn and hiccup</span>
              </li>
            </ul>
          </Card>

          {/* Weight Tracking */}
          <Card className="bg-white border-0 shadow-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-base sm:text-lg">Weight Tracking</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base text-foreground/60">Current Weight</span>
                <span className="text-base sm:text-lg">148 lbs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base text-foreground/60">Gained</span>
                <span className="text-base sm:text-lg text-blue-500">+12 lbs</span>
              </div>
              <div className="w-full bg-blue-50 rounded-full h-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full" 
                  style={{ width: '60%' }}
                ></div>
              </div>
              <p className="text-xs text-foreground/60 text-center">
                Within healthy range
              </p>
            </div>
          </Card>

          {/* Appointment Reminders */}
          <Card className="bg-white border-0 shadow-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="text-base sm:text-lg">Upcoming</h3>
            </div>
            <div className="space-y-3">
              {appointments.map((apt, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 rounded-2xl">
                  <Calendar className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm">{apt.type}</p>
                    <p className="text-xs text-foreground/60">{apt.date} at {apt.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Daily Tips */}
        <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-0 shadow-lg p-4 sm:p-6 rounded-2xl sm:rounded-3xl">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg mb-2">Daily Tip</h3>
              <p className="text-sm sm:text-base text-foreground/70">
                Stay hydrated! Aim for 8-10 glasses of water daily. It helps reduce swelling and keeps you energized throughout the day.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-foreground/10 shadow-lg">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex justify-around items-center h-16 sm:h-20">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 px-3 sm:px-6 py-2 rounded-2xl transition-colors ${
                activeTab === 'home' 
                  ? 'text-pink-500 bg-pink-50' 
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              <Home className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-xs">Home</span>
            </button>

            <button
              onClick={() => setActiveTab('tracker')}
              className={`flex flex-col items-center gap-1 px-3 sm:px-6 py-2 rounded-2xl transition-colors ${
                activeTab === 'tracker' 
                  ? 'text-pink-500 bg-pink-50' 
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-xs">Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex flex-col items-center gap-1 px-3 sm:px-6 py-2 rounded-2xl transition-colors ${
                activeTab === 'appointments' 
                  ? 'text-pink-500 bg-pink-50' 
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-xs hidden sm:inline">Appointments</span>
              <span className="text-xs sm:hidden">Appts</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 px-3 sm:px-6 py-2 rounded-2xl transition-colors ${
                activeTab === 'profile' 
                  ? 'text-pink-500 bg-pink-50' 
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}