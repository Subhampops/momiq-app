import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  ArrowLeft, 
  Calendar,
  Droplet,
  Heart,
  Moon,
  Zap,
  AlertCircle,
  Bell,
  TrendingUp,
  Info,
  Save,
  Plus,
  X
} from 'lucide-react';

interface MenstrualCycleTrackerProps {
  onBack?: () => void;
}

interface PeriodLog {
  date: string;
  flowLevel: 'light' | 'medium' | 'heavy' | 'spotting' | '';
  crampLevel: 'none' | 'mild' | 'moderate' | 'severe' | '';
  dischargeType: string;
  dischargeColor: string;
  mood: string;
  energyLevel: 'low' | 'medium' | 'high' | '';
  spotting: boolean;
  symptoms: string[];
  notes: string;
}

interface Reminder {
  id: string;
  type: string;
  message: string;
  enabled: boolean;
}

export function MenstrualCycleTracker({ onBack }: MenstrualCycleTrackerProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [periodLogs, setPeriodLogs] = useState<PeriodLog[]>([]);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showRemindersModal, setShowRemindersModal] = useState(false);
  
  // Form states
  const [flowLevel, setFlowLevel] = useState<'light' | 'medium' | 'heavy' | 'spotting' | ''>('');
  const [crampLevel, setCrampLevel] = useState<'none' | 'mild' | 'moderate' | 'severe' | ''>('');
  const [dischargeType, setDischargeType] = useState('');
  const [dischargeColor, setDischargeColor] = useState('');
  const [mood, setMood] = useState('');
  const [energyLevel, setEnergyLevel] = useState<'low' | 'medium' | 'high' | ''>('');
  const [spotting, setSpotting] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', type: 'Hydration', message: 'Remember to drink 8 glasses of water daily', enabled: true },
    { id: '2', type: 'Rest', message: 'Get at least 7-8 hours of sleep', enabled: true },
    { id: '3', type: 'Medication', message: 'Take your supplements/medication', enabled: false },
    { id: '4', type: 'Self-Care', message: 'Take 10 minutes for relaxation or meditation', enabled: true },
  ]);

  const flowOptions = [
    { value: 'spotting', label: 'Spotting', color: 'bg-pink-100', icon: '•' },
    { value: 'light', label: 'Light', color: 'bg-pink-200', icon: '••' },
    { value: 'medium', label: 'Medium', color: 'bg-pink-400', icon: '•••' },
    { value: 'heavy', label: 'Heavy', color: 'bg-pink-600', icon: '••••' },
  ];

  const crampOptions = [
    { value: 'none', label: 'No Cramps', emoji: '😊' },
    { value: 'mild', label: 'Mild', emoji: '😐' },
    { value: 'moderate', label: 'Moderate', emoji: '😣' },
    { value: 'severe', label: 'Severe', emoji: '😰' },
  ];

  const dischargeTypes = [
    { value: 'none', label: 'None' },
    { value: 'creamy', label: 'Creamy' },
    { value: 'watery', label: 'Watery' },
    { value: 'sticky', label: 'Sticky' },
    { value: 'egg-white', label: 'Egg White' },
  ];

  const dischargeColors = [
    { value: 'clear', label: 'Clear', color: 'bg-gray-100' },
    { value: 'white', label: 'White', color: 'bg-gray-200' },
    { value: 'yellow', label: 'Yellow', color: 'bg-yellow-200' },
    { value: 'green', label: 'Green', color: 'bg-green-200' },
    { value: 'brown', label: 'Brown', color: 'bg-amber-700' },
  ];

  const moodOptions = [
    { value: 'happy', label: 'Happy', emoji: '😊' },
    { value: 'calm', label: 'Calm', emoji: '😌' },
    { value: 'anxious', label: 'Anxious', emoji: '😰' },
    { value: 'irritable', label: 'Irritable', emoji: '😤' },
    { value: 'sad', label: 'Sad', emoji: '😢' },
    { value: 'energetic', label: 'Energetic', emoji: '🤩' },
  ];

  const energyOptions = [
    { value: 'low', label: 'Low Energy', emoji: '🔋', color: 'bg-red-50' },
    { value: 'medium', label: 'Medium', emoji: '⚡', color: 'bg-yellow-50' },
    { value: 'high', label: 'High Energy', emoji: '✨', color: 'bg-green-50' },
  ];

  const symptomOptions = [
    'Bloating', 'Headache', 'Back Pain', 'Breast Tenderness',
    'Acne', 'Food Cravings', 'Nausea', 'Diarrhea',
    'Constipation', 'Fatigue', 'Insomnia', 'Hot Flashes'
  ];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSaveLog = () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }

    const newLog: PeriodLog = {
      date: selectedDate,
      flowLevel,
      crampLevel,
      dischargeType,
      dischargeColor,
      mood,
      energyLevel,
      spotting,
      symptoms: selectedSymptoms,
      notes,
    };

    setPeriodLogs(prev => {
      const filtered = prev.filter(log => log.date !== selectedDate);
      return [...filtered, newLog].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });

    // Reset form
    setFlowLevel('');
    setCrampLevel('');
    setDischargeType('');
    setDischargeColor('');
    setMood('');
    setEnergyLevel('');
    setSpotting(false);
    setSelectedSymptoms([]);
    setNotes('');
    setShowLogModal(false);
    
    alert('Cycle data saved successfully!');
  };

  const openLogModal = (date: string) => {
    setSelectedDate(date);
    const existingLog = periodLogs.find(log => log.date === date);
    if (existingLog) {
      setFlowLevel(existingLog.flowLevel);
      setCrampLevel(existingLog.crampLevel);
      setDischargeType(existingLog.dischargeType);
      setDischargeColor(existingLog.dischargeColor);
      setMood(existingLog.mood);
      setEnergyLevel(existingLog.energyLevel);
      setSpotting(existingLog.spotting);
      setSelectedSymptoms(existingLog.symptoms);
      setNotes(existingLog.notes);
    }
    setShowLogModal(true);
  };

  const calculateCycleInsights = () => {
    const periodDays = periodLogs.filter(log => 
      log.flowLevel && log.flowLevel !== 'spotting'
    ).map(log => new Date(log.date));

    if (periodDays.length < 2) {
      return {
        averageCycleLength: 'Not enough data',
        nextPeriodDate: 'Track at least 2 periods',
        currentCycleDay: 'N/A',
        trends: []
      };
    }

    periodDays.sort((a, b) => a.getTime() - b.getTime());

    const cycles: number[] = [];
    for (let i = 1; i < periodDays.length; i++) {
      const diff = Math.floor((periodDays[i].getTime() - periodDays[i - 1].getTime()) / (1000 * 60 * 60 * 24));
      if (diff > 10 && diff < 60) {
        cycles.push(diff);
      }
    }

    const averageCycle = cycles.length > 0 
      ? Math.round(cycles.reduce((a, b) => a + b, 0) / cycles.length)
      : 28;

    const lastPeriod = periodDays[periodDays.length - 1];
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(nextPeriod.getDate() + averageCycle);

    const today = new Date();
    const daysSinceLastPeriod = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));

    const trends: string[] = [];
    const crampsData = periodLogs.filter(log => log.crampLevel && log.crampLevel !== 'none');
    if (crampsData.length > 0) {
      const severeCramps = crampsData.filter(log => log.crampLevel === 'severe').length;
      if (severeCramps > crampsData.length / 2) {
        trends.push('Frequent severe cramps detected');
      }
    }

    const moodLogs = periodLogs.filter(log => log.mood);
    if (moodLogs.length > 0) {
      const negativeModds = moodLogs.filter(log => 
        ['anxious', 'irritable', 'sad'].includes(log.mood)
      ).length;
      if (negativeModds > moodLogs.length / 2) {
        trends.push('Mood fluctuations noted');
      }
    }

    return {
      averageCycleLength: `${averageCycle} days`,
      nextPeriodDate: nextPeriod.toLocaleDateString(),
      currentCycleDay: `Day ${daysSinceLastPeriod + 1}`,
      trends
    };
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentYear, currentMonth, i));
    }

    return days;
  };

  const getDayStatus = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const log = periodLogs.find(l => l.date === dateStr);
    
    if (log?.flowLevel && log.flowLevel !== 'spotting') {
      return { type: 'period', color: 'bg-pink-500 text-white' };
    }
    if (log?.spotting) {
      return { type: 'spotting', color: 'bg-pink-200 text-pink-800' };
    }
    if (log) {
      return { type: 'logged', color: 'bg-purple-100 text-purple-800' };
    }

    // Predict next period (simple prediction)
    const insights = calculateCycleInsights();
    if (insights.nextPeriodDate !== 'Track at least 2 periods') {
      const nextDate = new Date(insights.nextPeriodDate);
      const predictedStart = new Date(nextDate);
      predictedStart.setDate(nextDate.getDate() - 2);
      const predictedEnd = new Date(nextDate);
      predictedEnd.setDate(nextDate.getDate() + 2);
      
      if (date >= predictedStart && date <= predictedEnd) {
        return { type: 'predicted', color: 'bg-pink-100 text-pink-600 border-2 border-dashed border-pink-400' };
      }
    }

    return { type: 'normal', color: 'bg-white hover:bg-gray-50' };
  };

  const insights = calculateCycleInsights();
  const calendarDays = generateCalendarDays();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const today = new Date();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 mb-6 sm:mb-8 shadow-sm">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            {onBack && (
              <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center gap-2 text-foreground/70 hover:text-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            )}
            <h1 className="text-2xl sm:text-3xl flex-1 text-center">Menstrual Cycle Tracker</h1>
            <div className="w-16 sm:w-24"></div>
          </div>
        </div>

        {/* Hero Section with Image */}
        <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-0 shadow-lg p-6 sm:p-8 rounded-3xl mb-6 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl mb-4">Track Your Cycle, Know Your Body</h2>
              <p className="text-foreground/70 mb-6">
                Monitor your menstrual cycle, symptoms, and overall wellness. Get insights based on your personal data.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => setShowEducationModal(true)}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <Info className="w-4 h-4 mr-2" />
                  Learn More
                </Button>
                <Button
                  onClick={() => setShowRemindersModal(true)}
                  variant="outline"
                  className="border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Reminders
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1535007829477-d13662ffb714?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWxmJTIwY2FyZSUyMHdlbGxuZXNzfGVufDF8fHx8MTc2NTUyMTU0OXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Self care wellness"
                className="rounded-2xl shadow-lg object-cover w-full h-64"
              />
            </div>
          </div>
        </Card>

        {/* Cycle Insights */}
        <Card className="bg-white border-0 shadow-lg p-4 sm:p-6 rounded-3xl mb-6">
          <h2 className="text-xl sm:text-2xl mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-pink-500" />
            Your Cycle Insights
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-4 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-pink-600" />
              <p className="text-sm text-foreground/60 mb-1">Avg Cycle</p>
              <p className="text-xl text-pink-600">{insights.averageCycleLength}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 text-center">
              <Moon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-sm text-foreground/60 mb-1">Next Period</p>
              <p className="text-sm text-purple-600">{insights.nextPeriodDate}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 text-center">
              <Droplet className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-foreground/60 mb-1">Current Cycle</p>
              <p className="text-xl text-blue-600">{insights.currentCycleDay}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 text-center">
              <Heart className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-foreground/60 mb-1">Logs</p>
              <p className="text-xl text-green-600">{periodLogs.length}</p>
            </div>
          </div>

          {insights.trends.length > 0 && (
            <div className="bg-orange-50 rounded-2xl p-4">
              <h3 className="text-base mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Trends Noticed
              </h3>
              <ul className="space-y-2">
                {insights.trends.map((trend, index) => (
                  <li key={index} className="text-sm text-foreground/70 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    {trend}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>

        {/* Calendar */}
        <Card className="bg-white border-0 shadow-lg p-4 sm:p-6 rounded-3xl mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl flex items-center gap-2">
              <Calendar className="w-6 h-6 text-pink-500" />
              {monthNames[today.getMonth()]} {today.getFullYear()}
            </h2>
          </div>

          {/* Calendar Legend */}
          <div className="flex flex-wrap gap-3 mb-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-pink-500 rounded"></div>
              <span>Period Day</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-pink-200 rounded"></div>
              <span>Spotting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-100 rounded"></div>
              <span>Logged</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-pink-100 border-2 border-dashed border-pink-400 rounded"></div>
              <span>Predicted</span>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs sm:text-sm text-foreground/60 py-2">
                {day}
              </div>
            ))}
            
            {calendarDays.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="aspect-square"></div>;
              }

              const status = getDayStatus(date);
              const isToday = date.toDateString() === today.toDateString();
              const dateStr = date.toISOString().split('T')[0];

              return (
                <button
                  key={index}
                  onClick={() => openLogModal(dateStr)}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all ${status.color} ${
                    isToday ? 'ring-2 ring-blue-500' : ''
                  } hover:scale-105`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Recent Logs */}
        {periodLogs.length > 0 && (
          <Card className="bg-white border-0 shadow-lg p-4 sm:p-6 rounded-3xl mb-6">
            <h2 className="text-xl sm:text-2xl mb-6">Recent Logs</h2>
            <div className="space-y-4">
              {periodLogs.slice(0, 5).map((log, index) => (
                <div key={index} className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm text-foreground/70">
                      {new Date(log.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    {log.flowLevel && (
                      <span className="text-xs bg-pink-200 text-pink-800 px-3 py-1 rounded-full capitalize">
                        {log.flowLevel} Flow
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                    {log.crampLevel && (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="capitalize">{log.crampLevel} Cramps</span>
                      </div>
                    )}
                    {log.mood && (
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-pink-500" />
                        <span className="capitalize">{log.mood}</span>
                      </div>
                    )}
                    {log.energyLevel && (
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="capitalize">{log.energyLevel} Energy</span>
                      </div>
                    )}
                  </div>
                  
                  {log.symptoms.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-foreground/60 mb-1">Symptoms:</p>
                      <div className="flex flex-wrap gap-1">
                        {log.symptoms.map((symptom, i) => (
                          <span key={i} className="text-xs bg-white px-2 py-1 rounded-full">
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {log.notes && (
                    <p className="text-xs text-foreground/60 mt-2 italic">
                      Note: {log.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Active Reminders */}
        {reminders.filter(r => r.enabled).length > 0 && (
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg p-4 sm:p-6 rounded-3xl">
            <h2 className="text-xl sm:text-2xl mb-4 flex items-center gap-2">
              <Bell className="w-6 h-6 text-blue-500" />
              Active Reminders
            </h2>
            <div className="space-y-3">
              {reminders.filter(r => r.enabled).map((reminder) => (
                <div key={reminder.id} className="bg-white rounded-xl p-4 flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">{reminder.message}</p>
                    <p className="text-xs text-foreground/60 mt-1">{reminder.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Log Entry Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl">
                Log for {new Date(selectedDate).toLocaleDateString()}
              </h3>
              <button
                onClick={() => setShowLogModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Flow Level */}
              <div>
                <Label className="text-base mb-3 block">Flow Level</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {flowOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFlowLevel(option.value as any)}
                      className={`p-4 rounded-2xl border-2 transition-all text-center ${
                        flowLevel === option.value
                          ? `${option.color} border-pink-400`
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-2xl mb-1">{option.icon}</div>
                      <p className="text-xs">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cramp Severity */}
              <div>
                <Label className="text-base mb-3 block">Cramp Severity</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {crampOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setCrampLevel(option.value as any)}
                      className={`p-4 rounded-2xl border-2 transition-all text-center ${
                        crampLevel === option.value
                          ? 'border-red-400 bg-red-50'
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-2xl mb-1">{option.emoji}</div>
                      <p className="text-xs">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Discharge Type */}
              <div>
                <Label className="text-base mb-3 block">Discharge Type</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {dischargeTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setDischargeType(type.value)}
                      className={`p-3 rounded-xl border-2 text-sm transition-all ${
                        dischargeType === type.value
                          ? 'border-purple-400 bg-purple-50'
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discharge Color */}
              <div>
                <Label className="text-base mb-3 block">Discharge Color</Label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {dischargeColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setDischargeColor(color.value)}
                      className={`p-3 rounded-xl border-2 text-sm transition-all ${
                        dischargeColor === color.value
                          ? 'border-purple-400 ring-2 ring-purple-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-full h-8 ${color.color} rounded-lg mb-1`}></div>
                      <p className="text-xs">{color.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mood */}
              <div>
                <Label className="text-base mb-3 block">Mood</Label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {moodOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setMood(option.value)}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        mood === option.value
                          ? 'border-pink-400 bg-pink-50'
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-2xl mb-1">{option.emoji}</div>
                      <p className="text-xs">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Energy Level */}
              <div>
                <Label className="text-base mb-3 block">Energy Level</Label>
                <div className="grid grid-cols-3 gap-3">
                  {energyOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setEnergyLevel(option.value as any)}
                      className={`p-4 rounded-2xl border-2 transition-all text-center ${
                        energyLevel === option.value
                          ? `${option.color} border-green-400`
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-2xl mb-1">{option.emoji}</div>
                      <p className="text-xs">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Spotting */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="spotting"
                  checked={spotting}
                  onChange={(e) => setSpotting(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                />
                <Label htmlFor="spotting" className="text-base cursor-pointer">
                  Spotting occurred
                </Label>
              </div>

              {/* Symptoms */}
              <div>
                <Label className="text-base mb-3 block">Other Symptoms</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {symptomOptions.map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className={`p-3 rounded-xl border-2 text-sm transition-all ${
                        selectedSymptoms.includes(symptom)
                          ? 'border-blue-400 bg-blue-50'
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="modal-notes" className="text-base mb-2 block">Notes (Optional)</Label>
                <Textarea
                  id="modal-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes..."
                  rows={3}
                  className="rounded-2xl resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSaveLog}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-6 rounded-2xl"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Log
                </Button>
                <Button
                  onClick={() => setShowLogModal(false)}
                  variant="outline"
                  className="px-8 py-6 rounded-2xl"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Education Modal */}
      {showEducationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl">Understanding Your Body</h3>
              <button
                onClick={() => setShowEducationModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Discharge Information */}
              <div className="bg-purple-50 rounded-2xl p-6">
                <h4 className="text-lg mb-4 flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-purple-600" />
                  Vaginal Discharge Guide
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-6 h-6 bg-gray-100 rounded-full"></div>
                      <div>
                        <p className="text-sm"><strong>Clear/White - Normal</strong></p>
                        <p className="text-xs text-foreground/70 mt-1">
                          Clear or milky white discharge is normal throughout your cycle. It may be thin and stretchy (like egg white) during ovulation.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-6 h-6 bg-yellow-200 rounded-full"></div>
                      <div>
                        <p className="text-sm"><strong>Yellow - May Need Attention</strong></p>
                        <p className="text-xs text-foreground/70 mt-1">
                          Pale yellow may be normal, but bright yellow with odor could indicate an infection. Consult your healthcare provider if accompanied by itching or odor.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-6 h-6 bg-green-200 rounded-full"></div>
                      <div>
                        <p className="text-sm"><strong>Green - Seek Medical Advice</strong></p>
                        <p className="text-xs text-foreground/70 mt-1">
                          Green discharge, especially with a strong odor, often indicates an infection. Contact your healthcare provider.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-6 h-6 bg-amber-700 rounded-full"></div>
                      <div>
                        <p className="text-sm"><strong>Brown - Usually Normal</strong></p>
                        <p className="text-xs text-foreground/70 mt-1">
                          Brown discharge is typically old blood leaving the body. Common at the end of periods or during early pregnancy. If persistent, consult your doctor.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-6 h-6 bg-red-200 rounded-full"></div>
                      <div>
                        <p className="text-sm"><strong>Red/Pink - Period or Spotting</strong></p>
                        <p className="text-xs text-foreground/70 mt-1">
                          Red or pink discharge usually indicates menstrual bleeding or light spotting. Can occur during ovulation or early pregnancy.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Texture Information */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <h4 className="text-lg mb-4">Discharge Texture Guide</h4>
                <div className="space-y-3">
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-sm"><strong>Creamy:</strong> Thick, lotion-like. Common before and after period.</p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-sm"><strong>Watery:</strong> Clear and thin. Can occur anytime, often after exercise.</p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-sm"><strong>Sticky:</strong> Thick and slightly tacky. Common in early cycle.</p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-sm"><strong>Egg White:</strong> Clear, stretchy, slippery. Indicates ovulation (fertile window).</p>
                  </div>
                </div>
              </div>

              {/* When to See a Doctor */}
              <div className="bg-red-50 rounded-2xl p-6">
                <h4 className="text-lg mb-4 flex items-center gap-2 text-red-900">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  When to Consult Your Healthcare Provider
                </h4>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    Strong, foul odor
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    Bright yellow, green, or gray discharge
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    Cottage cheese-like texture (may indicate yeast infection)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    Accompanied by itching, burning, or pain
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    Heavy bleeding between periods
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-4 text-sm text-center">
                <p className="text-foreground/70">
                  <strong>Note:</strong> This information is educational only and not a substitute for professional medical advice. Always consult your healthcare provider for concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reminders Modal */}
      {showRemindersModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl">Manage Reminders</h3>
              <button
                onClick={() => setShowRemindersModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {reminders.map((reminder) => (
                <div key={reminder.id} className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl">
                  <input
                    type="checkbox"
                    checked={reminder.enabled}
                    onChange={() => {
                      setReminders(prev => prev.map(r => 
                        r.id === reminder.id ? { ...r, enabled: !r.enabled } : r
                      ));
                    }}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <p className="text-sm">{reminder.message}</p>
                    <p className="text-xs text-foreground/60 mt-1">{reminder.type}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setShowRemindersModal(false)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-2xl"
            >
              Save Preferences
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
