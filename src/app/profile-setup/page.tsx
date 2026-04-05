 'use client';
import { useState } from 'react';
import { NEIGHBORHOODS, PROFESSIONS } from '@/constants';
import { supabase } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function ProfileSetup() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [neighborhood, setNeighborhood] = useState(NEIGHBORHOODS[0]);
  const [profession, setProfession] = useState(PROFESSIONS[0]);
  const [phone, setPhone] = useState('');

  const handleSave = async () => {
    setLoading(true);
    
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: user.fullName || 'مستخدم جديد',
      phone_number: phone,
      neighborhood: neighborhood,
      profession: profession,
      subscription_type: 'Free'
    });

    setLoading(false);
      alert('تم حفظ بياناتك بنجاح في دليل بورتسودان! 🎉');
      router.push('/'); // التوجه للصفحة الرئيسية
    } else {
      alert('عذراً، حدث خطأ: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-6 text-right" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border-t-8 border-[#800020]">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">إكمال ملفك الشخصي</h2>
        <p className="text-gray-500 mb-8">أهلاً بك يا {user?.firstName}، فضلاً أكمل بياناتك</p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">رقم الهاتف</label>
            <input 
              type="tel" 
              placeholder="0xxxxxxxxx"
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#800020]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">المهنة</label>
            <select 
              onChange={(e) => setProfession(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#800020]">
              {PROFESSIONS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">الحي</label>
            <select 
              onChange={(e) => setNeighborhood(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#800020]">
              {NEIGHBORHOODS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <button 
            onClick={handleSave}
            disabled={loading}
            className="w-full py-4 bg-[#800020] text-white font-bold rounded-xl hover:bg-[#600018] transition-all shadow-lg disabled:bg-gray-400">
            {loading ? 'جاري الحفظ...' : 'حفظ والانطلاق 🚀'}
          </button>
        </div>
      </div>
    </div>
  );
}
