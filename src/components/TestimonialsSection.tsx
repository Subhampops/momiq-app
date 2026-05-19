import { Star, Quote } from 'lucide-react';
import { useState } from 'react';

export function TestimonialsSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            name: 'Jessica Martinez',
            role: 'First-time Mom',
            rating: 5,
            text: 'MomiQ has been my constant companion throughout my pregnancy. The AI doctor chat feature gave me peace of mind during those late-night worries. Absolutely love this app!',
            location: 'San Francisco, CA',
            weeks: '32 weeks pregnant',
        },
        {
            name: 'Aisha Patel',
            role: 'Expecting Mom of Twins',
            rating: 5,
            text: 'Managing a twin pregnancy was overwhelming until I found MomiQ. The personalized tracking and community support have been invaluable. Best pregnancy app out there!',
            location: 'London, UK',
            weeks: '28 weeks pregnant',
        },
        {
            name: 'Rachel Thompson',
            role: 'Second-time Mom',
            rating: 5,
            text: 'Even with my second pregnancy, MomiQ taught me so much. The expert articles and health monitoring features are top-notch. Highly recommend to all expecting mothers!',
            location: 'Toronto, Canada',
            weeks: '24 weeks pregnant',
        },
        {
            name: 'Maria Garcia',
            role: 'New Mom',
            rating: 5,
            text: 'The postpartum support features helped me navigate those challenging first months. MomiQ isn\'t just for pregnancy - it\'s for the entire journey into motherhood.',
            location: 'Madrid, Spain',
            weeks: 'New mom',
        },
        {
            name: 'Sophia Lee',
            role: 'Expecting Mom',
            rating: 5,
            text: 'The community feature connected me with other moms going through the same experiences. I\'ve made lifelong friends and got amazing advice. Thank you, MomiQ!',
            location: 'Singapore',
            weeks: '20 weeks pregnant',
        },
        {
            name: 'Emma Wilson',
            role: 'First-time Mom',
            rating: 5,
            text: 'The personalized music therapy feature helped me bond with my baby and manage stress. Every feature is thoughtfully designed with moms in mind.',
            location: 'Sydney, Australia',
            weeks: '36 weeks pregnant',
        },
    ];

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const getVisibleTestimonials = () => {
        const visible = [];
        for (let i = 0; i < 3; i++) {
            visible.push(testimonials[(activeIndex + i) % testimonials.length]);
        }
        return visible;
    };

    return (
        <section id="testimonials" className="py-20 px-4 bg-gradient-to-b from-white to-purple-50 overflow-hidden">
            <div className="container mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                        Loved by Mothers Worldwide
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Join thousands of happy mothers who trust MomiQ for their pregnancy journey.
                    </p>
                </div>

                {/* Testimonials Carousel */}
                <div className="relative">
                    {/* Desktop View - 3 cards */}
                    <div className="hidden md:grid md:grid-cols-3 gap-8 mb-8">
                        {getVisibleTestimonials().map((testimonial, index) => (
                            <div
                                key={`${testimonial.name}-${index}`}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                            >
                                {/* Quote Icon */}
                                <div className="mb-4">
                                    <Quote className="w-10 h-10 text-pink-300" />
                                </div>

                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.text}</p>

                                {/* User Info */}
                                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                                        <p className="text-sm text-pink-500">{testimonial.weeks}</p>
                                        <p className="text-xs text-gray-500">{testimonial.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile View - 1 card */}
                    <div className="md:hidden mb-8">
                        <div className="bg-white rounded-2xl p-8 shadow-lg animate-fade-in">
                            <div className="mb-4">
                                <Quote className="w-10 h-10 text-pink-300" />
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            <p className="text-gray-700 mb-6 leading-relaxed">{testimonials[activeIndex].text}</p>

                            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                    {testimonials[activeIndex].name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">{testimonials[activeIndex].name}</h4>
                                    <p className="text-sm text-pink-500">{testimonials[activeIndex].weeks}</p>
                                    <p className="text-xs text-gray-500">{testimonials[activeIndex].location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={prevTestimonial}
                            className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-pink-200 hover:border-pink-400"
                            aria-label="Previous testimonial"
                        >
                            <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                            aria-label="Next testimonial"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 w-8'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
