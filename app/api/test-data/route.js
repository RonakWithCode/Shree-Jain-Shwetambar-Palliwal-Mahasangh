import { connectDB } from '@/lib/mongodb';
import News from '@/app/models/News';
import { NextResponse } from 'next/server';

const testNews = [
  {
    type: "TEXT_ONLY",
    title: "जैन समाज की महत्वपूर्ण बैठक",
    content: "आगामी 25 दिसंबर को जैन समाज की एक महत्वपूर्ण बैठक का आयोजन किया जा रहा है। सभी सदस्यों से अनुरोध है कि वे समय पर उपस्थित हों।",
    active: true,
  },
  {
    type: "IMAGE_ONLY",
    image: "https://placehold.co/800x600?text=Temple+Ceremony",
    alt: "जैन मंदिर समारोह की झलक",
    active: true,
  },
  {
    type: "IMAGE_TITLE",
    title: "Say No to Crackers - दीपावली विशेष",
    image: "https://placehold.co/800x600?text=No+Crackers+Campaign",
    alt: "Say No to Crackers Campaign",
    active: true,
  },
  {
    type: "IMAGE_TITLE_TEXT",
    title: "साधर्मिक सहायता कार्यक्रम",
    image: "https://placehold.co/800x600?text=Charity+Event",
    content: "समाज के गरीब परिवारों की मदद के लिए एक विशेष कार्यक्रम का आयोजन किया गया। इस कार्यक्रम में 100 से अधिक परिवारों को सहायता प्रदान की गई।",
    active: true,
  },
  {
    type: "TEXT_ONLY",
    title: "धार्मिक प्रवचन कार्यक्रम",
    content: "आगामी रविवार को प्रातः 9 बजे से धार्मिक प्रवचन का आयोजन किया जाएगा। सभी धर्मप्रेमियों से पधारने का निवेदन है।",
    active: true,
  },
  {
    type: "IMAGE_TITLE_TEXT",
    title: "युवा संगोष्ठी सम्पन्न",
    image: "https://placehold.co/800x600?text=Youth+Event",
    content: "जैन युवाओं के लिए आयोजित संगोष्ठी में 200 से अधिक युवाओं ने भाग लिया और धार्मिक विषयों पर चर्चा की।",
    active: true,
  },
  {
    type: "IMAGE_TITLE",
    title: "नूतन जिनालय प्राण प्रतिष्ठा",
    image: "https://placehold.co/800x600?text=Temple+Inauguration",
    alt: "नए मंदिर का उद्घाटन समारोह",
    active: true,
  },
  {
    type: "TEXT_ONLY",
    title: "शैक्षणिक सहायता घोषणा",
    content: "समाज के मेधावी छात्रों के लिए शैक्षणिक सहायता योजना की घोषणा की गई है। आवेदन की अंतिम तिथि 30 जून है।",
    active: true,
  },
  {
    type: "IMAGE_ONLY",
    image: "https://placehold.co/800x600?text=Community+Gathering",
    alt: "समाज का वार्षिक मिलन समारोह",
    active: true,
  },
  {
    type: "IMAGE_TITLE_TEXT",
    title: "स्वास्थ्य शिविर का आयोजन",
    image: "https://placehold.co/800x600?text=Health+Camp",
    content: "आगामी 15 जुलाई को निःशुल्क स्वास्थ्य जांच शिविर का आयोजन किया जाएगा। सभी समाज बंधुओं से लाभ लेने का आग्रह है।",
    active: true,
  }
];

export async function GET() {
  try {
    await connectDB();
    const count = await News.countDocuments();
    return NextResponse.json({ 
      success: true, 
      message: `Database contains ${count} news items.` 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    await connectDB();
    
    // Clear existing news
    await News.deleteMany({});
    
    // Insert all test news items
    const result = await News.insertMany(testNews);
    
    return NextResponse.json({ 
      success: true, 
      count: result.length,
      message: `Successfully inserted ${result.length} news items.`
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
