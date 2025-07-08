import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Search, Wifi, WifiOff } from 'lucide-react';

const quotesData = {
    love: [
    {
        text: "محبت میں نہیں ہے فرق جینے اور مرنے کا، اُسی کو دیکھ کر جیتے ہیں جس کافر پہ دم نکلے۔",
        author: "مرزا غالب"
    },
    {
        text: "محبت ایک خوشبو ہے، جو انسان کو مہکا دیتی ہے۔",
        author: "پروین شاکر"
    },
    {
        text: "عشق وہ آتش ہے غالب، جو لگائے نہ لگے اور بجھائے نہ بجھے۔",
        author: "مرزا غالب"
    }
    ],
    freedom: [
    {
        text: "نہیں ہے ناامید اقبال اپنی کشت ویراں سے، ذرا نم ہو تو یہ مٹی بڑی زرخیز ہے ساقی۔",
        author: "علامہ اقبال"
    },
    {
        text: "چلے چلو کہ وہ منزل ابھی نہیں آئی۔",
        author: "فیض احمد فیض"
    },
    {
        text: "بول کہ لب آزاد ہیں تیرے، بول زباں اب تک تیری ہے۔",
        author: "فیض احمد فیض"
    }
    ],
    
    faith: [
    {
        text: "اگر ہو عشق تو ہے کفر بھی مسلمانی، نہ ہو تو مردِ مسلماں بھی کافر و زندیق۔",
        author: "علامہ اقبال"
    },
    {
        text: "دل سے جو بات نکلتی ہے اثر رکھتی ہے، پر نہیں طاقت پرواز مگر رکھتی ہے۔",
        author: "علامہ اقبال"
    },
    {
        text: "یہی عبادت کا وقت ہے، دل کی سچائی کا۔",
        author: "واسع شاہ"
    }
    ],
    identity: [
    {
        text: "خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے، خدا بندے سے خود پوچھے بتا تیری رضا کیا ہے؟",
        author: "علامہ اقبال"
    },
    {
        text: "یہ کون لوگ ہیں جو خود سے بھی چھپے ہوئے ہیں؟",
        author: "جون ایلیا"
    },
    {
        text: "میں خود کو تلاش کرتا رہا، دنیا کو پانے کی کوشش میں۔",
        author: "احمد فراز"
    }
    ],
    life: [
    {
        text: "زندگی ایک کتاب کی مانند ہے، ہر صفحہ نیا سبق دیتا ہے۔",
        author: "احمد ندیم قاسمی"
    },
    {
        text: "کچھ اس طرح سے وقت نے مجھ کو بدل دیا، کہ اب کوئی بات پرانی نہیں لگتی۔",
        author: "منیر نیازی"
    },
    {
        text: "وقت کے ساتھ ساتھ سب کچھ بدل جاتا ہے، یہاں تک کہ ہم خود بھی۔",
        author: "جون ایلیا"
    }
    ],
    success: [
    {
        text: "سعی کن آن‌قدر بلند شو که تقدیر شرمنده شود.",
        author: "مولانا جلال‌الدین رومی"
    },
    {
        text: "آغاز هر پیروزی، یک گام کوچک و با ایمان است.",
        author: "علامه اقبال لاهوری"
    },
    {
        text: "کسی که ایستاده شکست می‌خورد، شایسته‌تر از کسی‌ست که نشسته تسلیم می‌شود.",
        author: "سعدی شیرازی"
    }
    ],
    happiness: [
    {
        text: "شاد بودن هنر است، آموختنش نیز.",
        author: "سهراب سپهری"
    },
    {
        text: "دلی را شاد کن، شاید دل تو هم شاد شود.",
        author: "مولوی"
    },
    {
        text: "زندگی خالی نیست، مهربانی هست، شعر هست، شادی هست.",
        author: "سهراب سپهری"
    }
    ],
    change: [
    {
        text: "جهان هر لحظه در تغییر است، تو نیز در سکون نمان.",
        author: "سعدی"
    },
    {
        text: "بهترین زمان برای شروع، همین حالاست.",
        author: "علامه اقبال"
    },
    {
        text: "تغییر از درون آغاز می‌شود، نه از بیرون.",
        author: "سهراب سپهری"
    }
    ],
    
    sad: [
    {
      "text": "غم زندگی کا حصہ ہیں، ان سے گھبرانا نہیں چاہیے۔",
      "author": "اشفاق احمد"
    },
    {
      "text": "ہم وہ نہیں رہے جو کبھی ہوا کرتے تھے، وقت نے سب کچھ بدل دیا۔",
      "author": "نامعلوم"
    },
    {
      "text": "دل ٹوٹنے کی آواز نہیں آتی، مگر اثر گہرا ہوتا ہے۔",
      "author": "جون ایلیا"
    },
    {
      "text": "یادیں بہت تکلیف دیتی ہیں، خاص طور پر جب وہ خوشگوار ہوں۔",
      "author": "نامعلوم"
    },
    {
      "text": "کچھ خواب ادھورے رہ جاتے ہیں، اور عمر بھر دکھ دیتے ہیں۔",
      "author": "فیض احمد فیض"
    },
    {
      "text": "محبت کرنے والے ہمیشہ تنہا رہ جاتے ہیں۔",
      "author": "میر تقی میر"
    },
    {
      "text": "خاموشی بھی ایک درد ہوتی ہے، جو صرف دل والے سمجھتے ہیں۔",
      "author": "نامعلوم"
    }
  ]
};

export default function QuoteGenerator() {
  const [topic, setTopic] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isUsingAPI, setIsUsingAPI] = useState(false);
  const [apiStatus, setApiStatus] = useState('unknown'); // 'success', 'failed', 'unknown'

  // Updated to use your Next.js API route
  const fetchQuotesFromAPI = async (searchTopic) => {
    try {
      console.log('Fetching quotes for topic:', searchTopic);
      
      // Call your Next.js API route instead of external API directly
      const response = await fetch(`/api/quotes?category=${encodeURIComponent(searchTopic)}&limit=3`);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const result = await response.json();
      console.log('API Response:', result);
      
      if (result.success && result.data && result.data.length > 0) {
        setApiStatus('success');
        setIsUsingAPI(true);
        return result.data.map(quote => ({
          text: quote.quote,
          author: quote.author
        }));
      } else {
        // Try without category filter
        const generalResponse = await fetch(`/api/quotes?limit=3`);
        if (generalResponse.ok) {
          const generalResult = await generalResponse.json();
          if (generalResult.success && generalResult.data && generalResult.data.length > 0) {
            setApiStatus('success');
            setIsUsingAPI(true);
            return generalResult.data.map(quote => ({
              text: quote.quote,
              author: quote.author
            }));
          }
        }
        
        throw new Error('No quotes found from API');
      }
    } catch (error) {
      console.error('API Error:', error);
      setApiStatus('failed');
      setIsUsingAPI(false);
      throw error;
    }
  };

  const getFallbackQuotes = (searchTopic) => {
    const topicKey = searchTopic.toLowerCase().trim();
    const availableQuotes = quotesData[topicKey];
    
    if (availableQuotes && availableQuotes.length > 0) {
      const shuffled = [...availableQuotes].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 3);
    }
    
    return [];
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    setApiStatus('unknown');

    try {
      // First try to get quotes from API
      const apiQuotes = await fetchQuotesFromAPI(topic);
      setQuotes(apiQuotes);
    } catch (error) {
      // If API fails, use fallback hardcoded quotes
      console.log('API failed, using fallback quotes');
      const fallbackQuotes = getFallbackQuotes(topic);
      setQuotes(fallbackQuotes);
      setIsUsingAPI(false);
    } finally {
      setIsLoading(false);
    }
  };

  const availableTopics = Object.keys(quotesData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-emerald-400 to-blue-800 p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-40">
        <div className="text-left sm:text-center mt-10">
          <h1 className="text-4xl font-bold text-indigo-700 italic underline tracking-tight animate-slide-in-top">
            AI Enhanced Quote Generator
          </h1>
          <div className="mt-4 flex justify-center items-center gap-2">
            <div className="flex items-center gap-2 text-sm">
              {apiStatus === 'success' ? (
                <><Wifi className="w-4 h-4 text-green-600" /><span className="text-green-600">API Connected</span></>
              ) : apiStatus === 'failed' ? (
                <><WifiOff className="w-4 h-4 text-red-600" /><span className="text-red-600">API Failed - Using Local Quotes</span></>
              ) : (
                <><div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div><span className="text-gray-600">Checking API...</span></>
              )}
            </div>
          </div>
        </div>

        {/*input card*/}
        <div className="grid md:grid-cols-2 gap-10 animate-slide-in-left">
          {/*section for input*/}
          <Card className="shadow-md bg-white/80 border border-indigo-200">
            <CardHeader>
              <CardDescription>
                Enter a topic to get three motivational quotes
                {isUsingAPI && <span className="text-green-600 ml-2">(AI Enhanced)</span>}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="topic" className="text-cyan-700">Topic</Label>
                  <Input
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter a topic (e.g., success, motivation, happiness)"
                    className="border-rose-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-cyan-700 font-medium">Example topics:</span>
                  {availableTopics.map((topicName) => (
                    <button
                      key={topicName}
                      type="button"
                      onClick={() => setTopic(topicName)}
                      className="px-3 py-1 text-xs bg-slate-300 text-fuchsia-500 rounded-full hover:bg-indigo-200 capitalize"
                    >
                      {topicName}
                    </button>
                  ))}
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={!topic.trim() || isLoading}
                  className="w-full bg-emerald-200 hover:bg-emerald-400 text-black shadow"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {apiStatus === 'unknown' ? 'Fetching from API...' : 'Finding Quotes...'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      Get Quotes
                    </span>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/*section of quotes*/}
          <div className="space-y-7 animate-slide-in-right">
            {hasSearched && !isLoading && (
              quotes.length > 0 ? (
                <div className="space-x-12 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-indigo-700">Quotes about "{topic}"</h2>
                    <p className="text-indigo-500">
                      Here You Go: 
                      {isUsingAPI ? (
                        <span className="text-green-600 ml-2 text-sm">(Powered by AI API)</span>
                      ) : (
                        <span className="text-orange-600 ml-2 text-sm">(From Local Database)</span>
                      )}
                    </p>
                  </div>
                  {quotes.map((quote, index) => (
                    <Card key={index} className="bg-white/90 shadow-sm border border-indigo-100">
                      <CardContent className="p-5">
                        <blockquote className="text-lg text-gray-700 italic leading-relaxed">
                          "{quote.text}"
                        </blockquote>
                        <p className="text-right text-teal-600 mt-2 font-medium">
                          — {quote.author}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-white/90 border border-indigo-100">
                  <CardContent className="p-5 text-center">
                    <h2 className="text-xl text-cyan-700 font-semibold mb-2">
                      {apiStatus === 'failed' ? 
                        'API connection failed - No local quotes found for this topic' : 
                        'Sorry but No quotes found on the given topic'
                      }
                    </h2>
                    <p className="text-cyan-500">Try a different topic or select one below:</p>
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                      {availableTopics.map((topicName) => (
                        <button
                          key={topicName}
                          onClick={() => setTopic(topicName)}
                          className="px-3 py-1 text-sm bg-indigo-100 text-fuchsia-500 rounded-full hover:bg-indigo-200 capitalize"
                        >
                          {topicName}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>

        {/*footer*/}
        <div className="text-center text-2xl text-red-500 animate-bounce font-bold italic">
         <p>&copy; Ahmed-Ali_Assignment-1 - AI Enhanced</p>
        </div>
      </div>
    </div>
  );
}