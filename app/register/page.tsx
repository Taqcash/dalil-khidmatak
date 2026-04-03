"use client";
import React, { useState } from 'react';
import { aiModel, supabase, sendWA } from '@/lib/core';
import { neighborhoods, professions } from '@/lib/data';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: رفع هوية، 2: تأكيد بيانات، 3: OTP

  const handleAIAnalysis = async (file: File) => {
    setLoading(true);
    // منطق تحويل الصورة لـ Base64 وإرسالها لـ Gemini حيكون هنا
    await sendWA("ي حذيفة، في زول هسي بيرفع في هويته للتحليل!");
    setLoading(false);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] p-6 font-['Cairo'] text-right" dir="rtl">
      <div className="max-w-md mx-auto bg-white rounded-[30px] p-8 shadow-xl">
        <h1 className="text-3xl font-black text-[#800000] mb-2">تسجيل جديد</h1>
        {step === 1 && (
          <div className="mt-8">
            <p className="font-bold text-gray-500 mb-6">ارفع إثبات الهوية عشان Gemini يملأ بياناتك</p>
            <div className="border-4 border-dashed border-red-50 p-10 rounded-[30px] text-center relative">
              <input type="file" onChange={(e) => e.target.files && handleAIAnalysis(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
              {loading ? "جاري التحليل..." : "📸 اضغط هنا لرفع الصورة"}
            </div>
          </div>
        )}
        {/* خطوات الـ OTP وكلمة السر حتكمل هنا بناءً على الـ Flow حقك */}
      </div>
    </div>
  );
}
