import { Button } from './ui/button';
import { ArrowLeft, Clock, User, Bookmark, Share2 } from 'lucide-react';
import { useState } from 'react';

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

interface ArticleDetailsProps {
  article: Article;
  onBack: () => void;
}

export function ArticleDetails({ article, onBack }: ArticleDetailsProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Full article content based on article ID
  const getArticleContent = () => {
    switch (article.id) {
      case 0: // Featured Article
        return {
          sections: [
            {
              heading: 'Why Prenatal Nutrition Matters',
              content: 'During pregnancy, your nutritional needs increase significantly. You\'re not just eating for yourself anymore – you\'re providing all the essential nutrients your growing baby needs for healthy development. Proper nutrition during pregnancy can help prevent birth defects, support healthy growth, and even influence your baby\'s long-term health.'
            },
            {
              heading: 'Essential Vitamins and Minerals',
              content: 'Folic acid is crucial during the first trimester to prevent neural tube defects. You need 400-800 mcg daily, found in leafy greens, citrus fruits, and fortified cereals. Iron supports increased blood volume – aim for 27mg daily through lean meats, beans, and fortified grains. Calcium (1000mg daily) builds strong bones and teeth, available in dairy products, fortified plant milks, and leafy greens. Don\'t forget Vitamin D, which helps calcium absorption and supports immune function.'
            },
            {
              heading: 'What to Eat Each Trimester',
              content: 'First Trimester: Focus on foods that combat nausea like ginger, crackers, and small frequent meals. Prioritize folate-rich foods. Second Trimester: Your appetite returns! Increase protein intake with lean meats, eggs, and legumes. Add healthy fats from avocados and nuts. Third Trimester: Baby\'s brain is developing rapidly – include omega-3 fatty acids from fish (low mercury), walnuts, and chia seeds. Increase fiber to prevent constipation.'
            },
            {
              heading: 'Foods to Avoid',
              content: 'Raw or undercooked meats, eggs, and seafood pose infection risks. High-mercury fish like shark, swordfish, and king mackerel should be avoided. Unpasteurized dairy products and soft cheeses may contain harmful bacteria. Limit caffeine to 200mg daily (about one 12oz coffee). Avoid alcohol completely during pregnancy.'
            },
            {
              heading: 'Practical Tips',
              content: 'Keep healthy snacks readily available: nuts, fresh fruit, yogurt, and whole grain crackers. Stay hydrated with 8-10 glasses of water daily. Take your prenatal vitamin consistently. Listen to your body – eat when hungry, rest when tired. Meal prep on good days to help during difficult ones. Remember, some days are harder than others, and that\'s okay.'
            }
          ]
        };
      
      case 1:
        return {
          sections: [
            {
              heading: 'Understanding Morning Sickness',
              content: 'Morning sickness affects up to 80% of pregnant women, typically starting around week 6 and improving by week 12-14. Despite its name, nausea and vomiting can occur at any time of day. While unpleasant, it\'s usually a sign of a healthy pregnancy with rising hormone levels.'
            },
            {
              heading: 'What Really Works',
              content: 'Eat small, frequent meals every 2-3 hours to keep blood sugar stable. Keep crackers by your bedside and eat a few before getting up. Ginger in various forms (tea, candies, supplements) has proven anti-nausea properties. Vitamin B6 (25mg, 3 times daily) is safe and effective for many women. Acupressure wristbands can provide relief. Stay hydrated with small sips throughout the day.'
            },
            {
              heading: 'When to Seek Help',
              content: 'Contact your healthcare provider if you can\'t keep any food or liquids down for 24 hours, lose more than 2 pounds, notice signs of dehydration (dark urine, dizziness), or vomit blood. Hyperemesis gravidarum is severe morning sickness requiring medical treatment.'
            }
          ]
        };

      case 2:
        return {
          sections: [
            {
              heading: 'Welcome to the Second Trimester',
              content: 'Weeks 14-27 are often called the "golden period" of pregnancy. Morning sickness typically subsides, energy returns, and your baby bump becomes visible. This is an exciting time of rapid development and noticeable changes.'
            },
            {
              heading: 'Your Baby\'s Development',
              content: 'By week 16, baby can hear your voice. Around week 18-20, you\'ll feel first movements (quickening). Facial features become distinct, and baby practices breathing movements. The skeleton hardens, and baby develops sleep-wake cycles. By week 24, baby\'s lungs begin developing surfactant needed for breathing.'
            },
            {
              heading: 'Changes in Your Body',
              content: 'Your uterus grows from pelvis to above belly button. Breasts continue enlarging and may leak colostrum. Skin changes include linea nigra (dark line down abdomen) and possible stretch marks. Increased blood volume may cause nasal congestion and occasional nosebleeds. Round ligament pain is common as your uterus expands.'
            },
            {
              heading: 'Making the Most of This Trimester',
              content: 'This is the ideal time for babymoon travel (if desired), preparing the nursery, and attending prenatal classes. Schedule your anatomy scan around week 20. Start or continue safe exercise routines. Research childcare options and create your birth plan.'
            }
          ]
        };

      case 3:
        return {
          sections: [
            {
              heading: 'Benefits of Prenatal Exercise',
              content: 'Regular exercise during pregnancy reduces back pain, improves sleep, boosts mood, helps manage weight gain, and may shorten labor. It also reduces risk of gestational diabetes and preeclampsia. Most importantly, staying active helps you feel strong and capable.'
            },
            {
              heading: 'First Trimester (Weeks 1-13)',
              content: 'If you exercised before pregnancy, you can usually continue your routine with modifications. Focus on maintaining fitness rather than improvement. Low-impact activities like walking, swimming, and prenatal yoga are excellent choices. Listen to your body – fatigue is common, so rest when needed. Stay well-hydrated and avoid overheating.'
            },
            {
              heading: 'Second Trimester (Weeks 14-27)',
              content: 'Energy often returns! Continue low-impact cardio, add prenatal strength training with light weights. Modify exercises as your center of gravity shifts. Avoid lying flat on your back after 20 weeks. Swimming provides excellent full-body workout with no impact. Prenatal yoga improves flexibility and teaches breathing techniques for labor.'
            },
            {
              heading: 'Third Trimester (Weeks 28-40)',
              content: 'Focus on maintaining mobility and strength. Walking, swimming, and gentle yoga remain safe. Pelvic floor exercises (Kegels) prepare for delivery and recovery. Avoid high-risk activities, contact sports, and exercises with fall risk. Stay active but reduce intensity as needed.'
            }
          ]
        };

      case 4:
        return {
          sections: [
            {
              heading: 'When Will I Feel Movement?',
              content: 'First-time mothers typically feel movement between 18-25 weeks. Second-time mothers often notice it earlier, around 16-18 weeks. Initial movements feel like flutters, bubbles, or butterflies. As baby grows, movements become more distinct kicks, rolls, and stretches.'
            },
            {
              heading: 'What\'s Normal?',
              content: 'Movement patterns vary by baby and time of day. Many babies are more active in the evening when you\'re resting. Activity increases after you eat (especially sweet foods) or drink cold beverages. As baby grows, space becomes limited – movements may feel different but shouldn\'t decrease in frequency.'
            },
            {
              heading: 'Kick Counts',
              content: 'Starting around 28 weeks, monitor baby\'s movements daily. Choose a time when baby is usually active. You should feel at least 10 movements within 2 hours. Movements include kicks, rolls, and swishes. If you don\'t reach 10 in 2 hours, have a snack and try again. Contact your provider if movements seem reduced.'
            },
            {
              heading: 'When to Call Your Doctor',
              content: 'Always call if you notice a sudden decrease in movement, no movement for several hours despite trying to stimulate baby, or any concerns about movement patterns. Trust your instincts – you know your baby\'s normal pattern best.'
            }
          ]
        };

      default:
        return {
          sections: [
            {
              heading: 'Introduction',
              content: article.summary
            },
            {
              heading: 'Main Content',
              content: 'This article provides valuable information about ' + article.title.toLowerCase() + '. Our experts have compiled the most important information to help you navigate this aspect of your pregnancy journey with confidence.'
            },
            {
              heading: 'Key Takeaways',
              content: 'Remember to always consult with your healthcare provider about any concerns or questions specific to your pregnancy. Every pregnancy is unique, and personalized medical advice is important for you and your baby\'s health.'
            }
          ]
        };
    }
  };

  const content = getArticleContent();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50 pb-12">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm shadow-sm z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Articles</span>
              <span className="sm:hidden">Back</span>
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={isBookmarked ? 'text-pink-500' : 'text-foreground/40'}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-6 sm:p-8 md:p-12 mb-8 sm:mb-12">
          <div className="flex flex-col items-center text-center">
            <div className="text-6xl sm:text-7xl md:text-8xl mb-6">{article.image}</div>
            
            <div className="inline-block bg-white/80 px-3 py-1 rounded-full text-sm mb-4">
              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base text-foreground/70 mb-6">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{article.author}</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span>{article.authorTitle}</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg">
            {/* Introduction */}
            <p className="text-base sm:text-lg leading-relaxed text-foreground/80 mb-8 sm:mb-10">
              {article.summary}
            </p>

            {/* Content Sections */}
            {content.sections.map((section, index) => (
              <div key={index} className="mb-8 sm:mb-10">
                <h2 className="text-xl sm:text-2xl mb-4 sm:mb-5 text-foreground">
                  {section.heading}
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-foreground/80 whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}

            {/* Author Bio */}
            <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-foreground/10">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center text-2xl sm:text-3xl shrink-0">
                    👩‍⚕️
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl mb-1">About the Author</h3>
                    <p className="text-foreground/70 mb-2">
                      <span className="font-medium">{article.author}</span>, {article.authorTitle}
                    </p>
                    <p className="text-sm sm:text-base text-foreground/60">
                      Dedicated to providing evidence-based information to support your pregnancy journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}