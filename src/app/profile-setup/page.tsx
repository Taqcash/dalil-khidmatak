 'use client';
import { useState } from 'react';
import { NEIGHBORHOODS, PROFESSIONS } from '@/constants';
import { supabase } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';

export default function ProfileSetup() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-6 text-right" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border-t-8 border-[#800020]">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">إكمال ملفك الشخصي</h2>
        <p className="text-gray-500 mb-8">أهلاً بك في دليل بورتسودان، فضلاً اختر مهنتك وحيك</p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">المهنة</label>
            <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#800020] outline-none">
              {PROFESSIONS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">الحي</label>
            <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#800020] outline-none">
              {NEIGHBORHOODS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <button className="w-full py-4 bg-[#800020] text-white font-bold rounded-xl hover:bg-[#600018] transition-all shadow-lg">
            حفظ والانطلاق 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
