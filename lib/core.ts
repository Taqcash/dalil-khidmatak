import { createClient } from '@supabase/supabase-js'
import { GoogleGenerativeAI } from "@google/generative-ai"

// ربط Supabase باستخدام الـ URL والـ Key حقك
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ربط Gemini بالـ API Key اللي ظهر في الصورة
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
export const aiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

// وظيفة إرسال إشعار الواتساب (CallMeBot)
export const sendWA = async (msg: string) => {
  const url = `https://api.callmebot.com/whatsapp.php?phone=249907627406&text=${encodeURIComponent(msg)}&apikey=6450740`;
  return fetch(url);
}
