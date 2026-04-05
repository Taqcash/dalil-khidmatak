'use client';
import { useState } from 'react';
import { NEIGHBORHOODS, PROFESSIONS } from '@/constants';
import { supabase } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function ProfileSetup() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [neighborhood, setNeighborhood] = useState(NEIGHBORHOODS[0]);
  const [profession, setProfession] = useState(PROFESSIONS[0]);
  const [phone, setPhone] = useState('');
  const [idPublicId, setIdPublicId] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: user.fullName || 'مستخدم جديد',
      phone_number: phone,
      neighborhood: neighborhood,
      profession: profession,
      identity_verified: isVerified,
      id_card_url: idPublicId,
      subscription_type: 'Free'
    });

    setLoading(false);
    if (!error) {
      alert('تم حفظ بياناتك بنجاح! 🎉');
      router.push('/');
    } else {
      alert('خطأ: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-6 text-right" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border-t-8 border-[#800020]">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">إكمال الملف الشخصي</h2>
        <p className="text-gray-500 mb-8">أهلاً بك يا حذوفي، أكمل بياناتك لتنطلق</p>

        <div className="space-y-5">
          <CldUploadWidget
            uploadPreset="dalil_preset"
            onSuccess={(result: any) => {
              setIdPublicId(result.info.public_id);
              setIsVerified(true); // سنفترض التحقق مؤقتاً عند الرفع الناجح
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="w-full p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-[#800020] font-bold"
              >
                {idPublicId ? '✅ تم رفع الهوية' : '📷 تصوير بطاقة الهوية'}
              </button>
            )}
          </CldUploadWidget>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">رقم التواصل</label>
            <input type="tel" placeholder="0xxxxxxxxx" onChange={(e) => setPhone(e.target.value)} className="w-full p-3 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-[#800020]" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">المهنة</label>
            <select onChange={(e) => setProfession(e.target.value)} className="w-full p-3 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-[#800020]">
              {PROFESSIONS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">الحي</label>
            <select onChange={(e) => setNeighborhood(e.target.value)} className="w-full p-3 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-[#800020]">
              {NEIGHBORHOODS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <button onClick={handleSave} disabled={loading} className="w-full py-4 bg-[#800020] text-white font-bold rounded-xl shadow-lg hover:bg-[#600018] transition-all disabled:bg-gray-400">
            {loading ? 'جاري الحفظ...' : 'حفظ البيانات والانطلاق 🚀'}
          </button>
        </div>
      </div>
    </div>
  );
}
