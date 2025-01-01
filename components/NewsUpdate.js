"use client";
import React , { useEffect, useState } from 'react'
import { newUpdateService } from '@/services/newUpdateService';

function NewsUpdate() {
//   const { newUpdate } = newUpdateService();

const [newUpdate, setNewUpdate] = useState(null);

useEffect(() => {
    const fetchNewUpdate = async () => {
      try {
        const data = await newUpdateService.getNewUpdate();
        console.log(data);
        setNewUpdate(data);
        // setLoading(false);
      } catch (err) {
        // setError(err.message);
        // setLoading(false);
      }
    };

    fetchNewUpdate();
  }, []);

//   कायदा/समीक्षा केवल लिखित में ही मान्य होगी। मौखिक सूचना/शिकायत एवं समीक्षा की प्रति उत्तर की जवाबदेही नहीं होगी। कृपया भविष्य में मौखिक के बजाय लिखित रूप में WhatsApp 9602026899 अथवा ईमेल आईडी- helpdesk@sadhumargi.com अथवा Post से।
  return (
    <>
      {newUpdate && newUpdate.Activate && (
        <div className="bg-[#f8d100] text-jain-black p-2 top-[64px] md:top-[172px] z-30 shadow-md overflow-hidden">
          <div className="animate-slide-left">
            <p className="font-hindi text-xs sm:text-lg whitespace-nowrap">
              {newUpdate?.text}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default NewsUpdate
