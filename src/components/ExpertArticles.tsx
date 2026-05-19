import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { 
  ArrowLeft, 
  Search,
  Bookmark,
  BookOpen,
  Heart,
  Baby,
  Brain,
  Utensils,
  Sparkles,
  Clock,
  User
} from 'lucide-react';
import { ArticleDetails } from './ArticleDetails';

interface ExpertArticlesProps {
  onBack?: () => void;
}

interface Article {
  id: number;
  title: string;
  summary: string;
  author: string;
  authorTitle: string;
  readTime: string;
  category: string;
  image: string;
  week?: number | null;
}

export function ExpertArticles({ onBack }: ExpertArticlesProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedArticles, setBookmarkedArticles] = useState<number[]>([1, 3]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = [
    { id: 'all', name: 'All Articles', icon: BookOpen, color: 'bg-purple-100' },
    { id: 'nutrition', name: 'Nutrition', icon: Utensils, color: 'bg-green-100' },
    { id: 'care', name: 'Pregnancy Care', icon: Heart, color: 'bg-pink-100' },
    { id: 'mental', name: 'Mental Wellness', icon: Brain, color: 'bg-blue-100' },
    { id: 'development', name: 'Baby Development', icon: Baby, color: 'bg-yellow-100' },
    { id: 'labor', name: 'Labor & Delivery', icon: Sparkles, color: 'bg-purple-100' },
    { id: 'stories', name: "Moms' Stories", icon: Heart, color: 'bg-pink-100' }
  ];

  const featuredArticle = {
    id: 0,
    title: 'Top Prenatal Nutrition Tips for a Healthy Pregnancy',
    summary: 'Essential vitamins, minerals, and eating habits that support your baby\'s development',
    author: 'Dr. Sarah Johnson',
    authorTitle: 'Certified Obstetrician',
    readTime: '8 min read',
    category: 'nutrition',
    image: '🥗'
  };

  const articles: Article[] = [
    {
      id: 1,
      title: 'Managing Morning Sickness: What Really Works',
      summary: 'Evidence-based strategies to ease nausea and vomiting during pregnancy',
      author: 'Dr. Emily Chen',
      authorTitle: 'Gynecologist',
      readTime: '6 min read',
      category: 'care',
      image: '🤰',
      week: 8
    },
    {
      id: 2,
      title: 'Your Second Trimester: What to Expect',
      summary: 'Changes in your body and baby\'s growth during weeks 14-27',
      author: 'Dr. Michael Roberts',
      authorTitle: 'Obstetrician',
      readTime: '10 min read',
      category: 'development',
      image: '👶',
      week: 14
    },
    {
      id: 3,
      title: 'Safe Exercises for Each Trimester',
      summary: 'Stay active and healthy with pregnancy-safe workouts',
      author: 'Lisa Martinez',
      authorTitle: 'Prenatal Fitness Expert',
      readTime: '7 min read',
      category: 'care',
      image: '🧘',
      week: 12
    },
    {
      id: 4,
      title: 'Understanding Your Baby\'s Kicks and Movements',
      summary: 'When to expect them and what they mean for development',
      author: 'Dr. Sarah Johnson',
      authorTitle: 'Certified Obstetrician',
      readTime: '5 min read',
      category: 'development',
      image: '💕',
      week: 18
    },
    {
      id: 5,
      title: 'Preparing for Labor: A Complete Guide',
      summary: 'Everything you need to know about labor stages and pain management',
      author: 'Dr. Amanda Foster',
      authorTitle: 'Midwife',
      readTime: '12 min read',
      category: 'labor',
      image: '🏥',
      week: 35
    },
    {
      id: 6,
      title: 'My Journey: First Time Mom at 35',
      summary: 'One mother\'s honest story about pregnancy, fears, and joy',
      author: 'Jennifer Williams',
      authorTitle: 'Experienced Mom',
      readTime: '8 min read',
      category: 'stories',
      image: '💝',
      week: null
    },
    {
      id: 7,
      title: 'Managing Stress and Anxiety During Pregnancy',
      summary: 'Mental health tips and relaxation techniques for expectant mothers',
      author: 'Dr. Lisa Anderson',
      authorTitle: 'Psychologist',
      readTime: '9 min read',
      category: 'mental',
      image: '🧠',
      week: 16
    },
    {
      id: 8,
      title: 'Iron-Rich Foods for Pregnancy',
      summary: 'Prevent anemia with these delicious and nutritious meal ideas',
      author: 'Rachel Green',
      authorTitle: 'Nutritionist',
      readTime: '6 min read',
      category: 'nutrition',
      image: '🍽️',
      week: 20
    }
  ];

  const toggleBookmark = (articleId: number) => {
    setBookmarkedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleArticleClick = (article: Article) => {
    // Scroll to top smoothly before showing article
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setSelectedArticle(article);
    }, 300);
  };

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const personalizedArticles = articles.filter(article => 
    article.week && article.week >= 12 && article.week <= 20
  );

  // If article is selected, show article details
  if (selectedArticle) {
    return (
      <div className="article-detail-transition" style={{ animation: 'slideUp 0.5s ease-out' }}>
        <ArticleDetails 
          article={selectedArticle} 
          onBack={() => setSelectedArticle(null)} 
        />
      </div>
    );
  }

  const NB = { black: '#0A0A0A', yellow: '#FEF300', white: '#fff', bg: '#FFFBF0', blue: '#00C2FF', green: '#00E676', pink: '#FFD6EC' };
  const nbCard: React.CSSProperties = { border: `3px solid ${NB.black}`, boxShadow: `5px 5px 0 ${NB.black}`, borderRadius: 0, background: NB.white, padding: 24, marginBottom: 20 };

  return (
    <div style={{ background: NB.bg, minHeight: '100vh', fontFamily: "'Space Grotesk','Inter',sans-serif" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl">
        
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          {onBack && (
            <button onClick={onBack} style={{ background: '#FEF300', border: '3px solid #0A0A0A', boxShadow: '3px 3px 0 #0A0A0A', padding: '8px 16px', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, borderRadius: 0 }}>
              <ArrowLeft size={16} /> Back
            </button>
          )}
          <div style={{ display: 'inline-block', background: '#00C2FF', border: '3px solid #0A0A0A', boxShadow: '3px 3px 0 #0A0A0A', padding: '3px 14px', marginBottom: 8 }}>
            <span style={{ fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Expert Articles</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0A0A0A', margin: 0 }}>Learn & Grow</h1>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: 20, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
          <input type="text" placeholder="Search articles, topics, or experts..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '12px 14px 12px 42px', border: '3px solid #0A0A0A', boxShadow: '3px 3px 0 #0A0A0A', borderRadius: 0, fontWeight: 600, fontSize: '0.95rem', background: '#fff', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        {/* Featured Article */}
        <div style={{ background: '#0A0A0A', border: '3px solid #0A0A0A', boxShadow: '7px 7px 0 #FEF300', padding: 28, marginBottom: 20, display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '5rem' }}>{featuredArticle.image}</div>
          <div style={{ flex: 1 }}>
            <div style={{ background: '#FEF300', border: '2px solid #FEF300', display: 'inline-block', padding: '2px 12px', marginBottom: 10, fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase' }}>⭐ Featured</div>
            <h2 style={{ fontWeight: 900, fontSize: '1.4rem', color: '#FEF300', margin: '0 0 8px' }}>{featuredArticle.title}</h2>
            <p style={{ fontWeight: 600, color: '#aaa', margin: '0 0 16px', fontSize: '0.9rem' }}>{featuredArticle.summary}</p>
            <div style={{ display: 'flex', gap: 16, color: '#888', fontSize: '0.8rem', fontWeight: 700, marginBottom: 16, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><User size={14} />{featuredArticle.author}</span>
              <span>{featuredArticle.authorTitle}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={14} />{featuredArticle.readTime}</span>
            </div>
            <button onClick={() => handleArticleClick(featuredArticle)} style={{ background: '#FEF300', color: '#0A0A0A', border: '3px solid #FEF300', boxShadow: '4px 4px 0 #FEF300', padding: '10px 24px', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 0 }}>Read Article →</button>
          </div>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: 10 }}>Browse by Category</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{ background: selectedCategory === cat.id ? '#0A0A0A' : '#fff', color: selectedCategory === cat.id ? '#FEF300' : '#0A0A0A', border: '3px solid #0A0A0A', boxShadow: selectedCategory === cat.id ? '3px 3px 0 #FEF300' : '3px 3px 0 #0A0A0A', padding: '8px 14px', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 0, transition: 'all 0.1s' }}>
                <cat.icon size={14} />{cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Personalized Suggestions */}
        {selectedCategory === 'all' && personalizedArticles.length > 0 && (
          <div style={{ background: '#FEF300', border: '3px solid #0A0A0A', boxShadow: '5px 5px 0 #0A0A0A', padding: 20, marginBottom: 20 }}>
            <h3 style={{ fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 8 }}><Sparkles size={18} /> From Your Week</h3>
            <p style={{ fontWeight: 600, color: '#555', fontSize: '0.85rem', margin: '0 0 14px' }}>Recommended for your current stage</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
              {personalizedArticles.slice(0, 4).map(article => (
                <div key={article.id} style={{ background: '#fff', border: '3px solid #0A0A0A', padding: '12px 14px' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '2.2rem' }}>{article.image}</span>
                    <div>
                      <span style={{ background: '#0A0A0A', color: '#FEF300', padding: '1px 8px', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase' }}>Week {article.week}</span>
                      <p style={{ fontWeight: 800, fontSize: '0.82rem', margin: '6px 0 2px' }}>{article.title}</p>
                      <p style={{ fontWeight: 600, fontSize: '0.72rem', color: '#555', margin: 0 }}>{article.readTime}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div>
          <p style={{ fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', margin: '0 0 16px', borderBottom: '3px solid #0A0A0A', paddingBottom: 8 }}>
            {selectedCategory === 'all' ? 'All Articles' : `${categories.find(c => c.id === selectedCategory)?.name}`}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {filteredArticles.map(article => (
              <div key={article.id} style={{ background: '#fff', border: '3px solid #0A0A0A', boxShadow: '5px 5px 0 #0A0A0A', padding: 20, transition: 'transform 0.1s, box-shadow 0.1s', cursor: 'pointer' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(-2px,-2px)'; el.style.boxShadow = '7px 7px 0 #0A0A0A'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(0,0)'; el.style.boxShadow = '5px 5px 0 #0A0A0A'; }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span style={{ fontSize: '3rem' }}>{article.image}</span>
                  <button onClick={() => toggleBookmark(article.id)} style={{ background: 'transparent', border: '2px solid #0A0A0A', padding: '4px 8px', cursor: 'pointer', color: bookmarkedArticles.includes(article.id) ? '#FF4FA3' : '#0A0A0A' }}>
                    <Bookmark size={16} fill={bookmarkedArticles.includes(article.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <h4 style={{ fontWeight: 900, fontSize: '0.95rem', margin: '0 0 8px' }}>{article.title}</h4>
                <p style={{ fontWeight: 600, fontSize: '0.82rem', color: '#555', margin: '0 0 12px' }}>{article.summary}</p>
                <div style={{ display: 'flex', gap: 12, fontSize: '0.72rem', fontWeight: 700, color: '#555', marginBottom: 14, flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><User size={12} />{article.author}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} />{article.readTime}</span>
                </div>
                <button onClick={() => handleArticleClick(article)} style={{ width: '100%', background: '#0A0A0A', color: '#FEF300', border: '3px solid #0A0A0A', boxShadow: '3px 3px 0 #555', padding: '10px', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 0 }}>Read More →</button>
              </div>
            ))}
          </div>
          {filteredArticles.length === 0 && (
            <div style={{ border: '3px dashed #0A0A0A', padding: 40, textAlign: 'center', fontWeight: 700, color: '#777' }}>
              <BookOpen size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
              No articles found
            </div>
          )}
        </div>
        <div style={{ height: 48 }} />
      </div>
    </div>
  );
}