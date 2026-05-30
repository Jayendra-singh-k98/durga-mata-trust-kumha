"use client";
import React, { useState } from 'react';
import { Shield, FileText, Target, Eye, Scale, Users, CheckCircle, BookOpen, Heart, ChevronDown, ChevronUp } from 'lucide-react';

const TrusteeCard = ({ name, role, index }) => (
  <div className="bg-white rounded-xl p-5 border border-amber-100 shadow-sm flex items-center gap-4">
    <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
      {index}
    </div>
    <div>
      <p className="font-bold text-gray-800">{name}</p>
      <p className="text-sm text-amber-700">{role}</p>
    </div>
  </div>
);

const ObjectiveGroup = ({ title, items, color }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border-l-4 ${color} bg-white shadow-sm overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <span className="font-bold text-gray-800 text-base">{title}</span>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {open && (
        <ul className="px-6 pb-5 space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AboutTrust = () => {
  const [lang, setLang] = useState('hi');
  const trustees = {
    hi: [
      { name: 'डॉ. स्वरूप सिंह', role: 'अध्यक्ष / मुख्य ट्रस्टी (आजीवन)' },
      { name: 'श्री सत्येन्द्र सिंह', role: 'उपाध्यक्ष' },
      { name: 'श्री परमेन्द्र सिंह', role: 'सचिव' },
      { name: 'श्री नरेन्द्र सिंह', role: 'कोषाध्यक्ष' },
      { name: 'श्री अरवेन्द्र सिंह', role: 'सदस्य' },
      { name: 'श्री जीतेन्द्र सिंह', role: 'सदस्य' },
    ],
    en: [
      { name: 'Dr. Swaroop Singh', role: 'President / Chief Trustee (Lifetime)' },
      { name: 'Shri Sat endra Singh', role: 'Vice President' },
      { name: 'Shri Parmendra Singh', role: 'Secretary' },
      { name: 'Shri Narendra Singh', role: 'Treasurer' },
      { name: 'Shri Arvendra Singh', role: 'Member' },
      { name: 'Shri Jeetendra Singh', role: 'Member' },
    ],
  };

  const objectiveGroups = {
    hi: [
      {
        title: 'धार्मिक उद्देश्य',
        color: 'border-orange-500',
        items: [
          'पूर्ण धार्मिक आस्था से देवस्थान (मन्दिर) भवन निर्माण, मूर्ति स्थापना, प्राण प्रतिष्ठा के उपरान्त जनकल्याण के लिए समर्पित करना।',
          'विधि विधान से पूजा–अर्चना, वन्दना, यज्ञ, अनुष्ठान इत्यादि करना व करवाना।',
          'पर्व, उत्सव, त्यौहार मनाना।',
          'संत समागम कथा, जागरण, सत्संग, भजन, संकीर्तन आयोजित करना।',
          'धार्मिक सम्मेलन, संगोष्ठी, सेमीनार आयोजित करना।',
          'उत्सवों पर शोभा यात्रा, भण्डारा (अन्न क्षेत्र) संत सम्मेलन करना।',
          'सनातन हिन्दू धर्म एवं अन्य धार्मिक संस्थाओं के धर्माचार्यों का सम्मान, सत्कार, अभिनन्दन करना।',
        ],
      },
      {
        title: 'स्वास्थ्य एवं चिकित्सा',
        color: 'border-red-500',
        items: [
          'आरोग्य एवं चिकित्सा प्रदान के लिए अस्पताल, औषधालय, प्रयोगशाला, लेब, नर्सिंग होम, स्वास्थ्य केन्द्र, मैटरनिटी होम, सेनीटोरियम, ब्लड बैंक, ऑख बैंक, ऑख रोग, हड्डी रोग, मधुमय, कैंसर, एड्स, रक्तचाप, हृदय रोग निदान के चेकअप कैम्प लगाना।',
          'विकलांग, अन्धे, मानसिक रोगी, प्राकृतिक आपदाओं (बाढ़, सूखा, आग, भूकम्प आदि) से पीड़ित लोगों की सहायता करना।',
          'स्वास्थ्य सेवा लाभ दिलाने सम्बंधी किसी उद्देश्य कार्य पूर्ण करने की दिशा में किसी भी अन्य संस्था के सहयोग से कार्य करना।',
        ],
      },
      {
        title: 'शिक्षा एवं विकास',
        color: 'border-blue-500',
        items: [
          'शिक्षा–ज्ञान, विज्ञान, तकनीकी, प्रशिक्षण, प्रचार–प्रसार के लिए स्कूल, कॉलेज, विश्वविद्यालय, तकनीकी शिक्षा केन्द्र, कम्प्यूटर साईन्स, प्रबंधन, आई.टी. प्रशिक्षण संस्थाओं, इंजीनियरिंग केन्द्र, मेडिकल आदि स्थापना, संचालन प्रबंध करना।',
          'बहुमुखी प्रशिक्षण, शारीरिक विकास की उत्तम व्यवस्था करना। गरीब और जरूरतमंद विद्यार्थियों के लिए आर्थिक सहायता, छात्रवृत्ति, आवास, पुस्तक इत्यादि की सहायता करना।',
          'पुस्तकालय, वाचनालय, प्रयोगशाला, कोचिंग क्लास की व्यवस्था करना।',
          'विद्यार्थियों के लिए हॉस्टल, खेलकूद स्थल, संस्कृति केन्द्र स्थापित करना।',
          'महिलाओं की शिक्षा के लिए विशेष प्रबंध करना।',
        ],
      },
      {
        title: 'सामाजिक एवं आर्थिक उत्थान',
        color: 'border-green-500',
        items: [
          'जीविका पार्जन के लिए ग्रामीण, लघु, कुटीर उद्योगों की स्थापना में मदद करना।',
          'वृद्धजनों के लिए वृद्ध सदन निर्मित करना और उनकी यथासंभव शारीरिक, आर्थिक सेवा करना।',
          'निर्धन, विकलांग, शारीरिक, मानसिक भय से कमजोर नर–नारियों की आर्थिक सहायता करना।',
          'विधवा एवं तलाकशुदा महिलाओं की हर संभव सहायता करना।',
          'गरीब कन्याओं के विवाहों में आर्थिक सहयोग देना।',
        ],
      },
      {
        title: 'पर्यावरण एवं अन्य',
        color: 'border-teal-500',
        items: [
          'गौ–संवर्धन, गौ–पालन के लिए गौशाला खोलना।',
          'वन सम्पदा के संरक्षण के लिए जागरण पैदा करना।',
          'आसपास के गाँवों में विकास कार्यों में सहयोग करना।',
          'पर्यावरण संरक्षण जानकारी के लिए समय–समय पर शिविर आयोजित करना।',
          'जल सरोवर का निर्माण करना। पेयजल प्रदान करने के लिए कुंआ, प्याऊ आदि की व्यवस्था करना।',
          'धर्मशाला, अतिथिगृह, भोजनालय आदि का निर्माण करना।',
        ],
      },
    ],
    en: [
      {
        title: 'Religious Objectives',
        color: 'border-orange-500',
        items: [
          'Construction of temple (Devsthan), installation of deity, Pran Pratishtha and dedicating it to public welfare with full religious faith.',
          'Conducting Pooja, Archana, Vandana, Yagna and Anushthan as per Vedic traditions.',
          'Celebrating festivals, occasions and religious events.',
          'Organising Katha, Jagran, Satsang, Bhajan and Kirtan programs.',
          'Organising religious conferences, seminars and symposiums.',
          'Conducting Shobha Yatra, Bhandara and Sant Sammelans on festivals.',
          'Honouring religious leaders and saints of Sanatan Hindu Dharma and other faiths.',
        ],
      },
      {
        title: 'Health & Medical',
        color: 'border-red-500',
        items: [
          'Establishing hospitals, dispensaries, laboratories, nursing homes, health centres, blood banks, eye banks and conducting medical camps for eye, bone, diabetes, cancer, AIDS, blood pressure and heart diseases.',
          'Helping disabled, blind, mentally ill persons and victims of natural disasters like floods, drought, fire and earthquakes.',
          'Collaborating with other organisations to provide healthcare services.',
        ],
      },
      {
        title: 'Education & Development',
        color: 'border-blue-500',
        items: [
          'Establishing and managing schools, colleges, universities, IT training centres, engineering colleges and medical institutions.',
          'Providing scholarships, financial assistance, accommodation and books to poor and needy students.',
          'Setting up libraries, reading rooms, laboratories and coaching classes.',
          'Establishing hostels, sports facilities and cultural centres for students.',
          'Making special arrangements for women\'s education and conducting awareness programs on women\'s rights.',
        ],
      },
      {
        title: 'Social & Economic Upliftment',
        color: 'border-green-500',
        items: [
          'Helping establish rural, small and cottage industries for livelihood.',
          'Building old age homes and providing physical and financial support to elderly.',
          'Providing financial assistance to poor, disabled and mentally weak individuals.',
          'Providing all possible help to widows and divorced women.',
          'Providing financial support for marriages of poor girls.',
        ],
      },
      {
        title: 'Environment & Others',
        color: 'border-teal-500',
        items: [
          'Opening Gaushala for cow protection and rearing.',
          'Creating awareness for forest and natural resource conservation.',
          'Cooperating in development works in nearby villages.',
          'Organising camps for environmental conservation awareness.',
          'Constructing water bodies and providing drinking water facilities.',
          'Building Dharamshala, guest houses and dining halls.',
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-amber-50">

      {/* Header */}
      <section className="bg-linear-to-br from-amber-700 via-orange-700 to-red-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div className="max-w-5xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-5 backdrop-blur">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
            माँ दुर्गा चैरिटेबल ट्रस्ट
          </h1>
          <p className="text-xl font-semibold opacity-90 mb-1">Maa Durga Charitable Trust, Kumha, Jaipur</p>
          <p className="text-sm opacity-75">राजस्थान सार्वजनिक प्रन्यास अधिनियम 1959 के अन्तर्गत पंजीकृत</p>

          {/* Language Toggle */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setLang('hi')}
              className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${lang === 'hi'
                ? 'bg-white text-amber-700 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
                }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${lang === 'en'
                ? 'bg-white text-amber-700 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
                }`}
            >
              English
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">

        {/* Registration Details */}
        <section className="bg-white rounded-2xl shadow-md p-8 border-t-4 border-amber-600">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-amber-600" />
            <h2 className="text-2xl font-bold text-gray-800">Trust Registration Details</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: lang === 'hi' ? 'पंजीकृत नाम' : 'REGISTERED NAME', value: lang === 'hi' ? 'माँ दुर्गा चैरिटेबल ट्रस्ट कूम्हाँ, जयपुर' : 'Maa Durga Charitable Trust Kumha, Jaipur', sub: lang === 'hi' ? 'Maa Durga Charitable Trust Kumha, Jaipur' : 'माँ दुर्गा चैरिटेबल ट्रस्ट कूम्हाँ, जयपुर' },
              { label: lang === 'hi' ? 'पंजीयन संख्या' : 'REGISTRATION NUMBER', value: '310 जयपुर 2025', sub: 'Register No. 310, Jaipur' },
              { label: lang === 'hi' ? 'पंजीकृत अधिनियम' : 'REGISTERED UNDER', value: lang === 'hi' ? 'राजस्थान सार्वजनिक प्रन्यास अधिनियम 1959' : 'Rajasthan Public Trusts Act, 1959 (Act 42 of 1959)', sub: lang === 'hi' ? 'Rajasthan Public Trusts Act, 1959' : 'राजस्थान सार्वजनिक प्रन्यास अधिनियम 1959' },
              { label: lang === 'hi' ? 'ट्रस्ट डीड दिनांक' : 'TRUST DEED DATE', value: lang === 'hi' ? '26 मार्च 2025' : '26th March 2025', sub: '' },
              { label: lang === 'hi' ? 'पंजीयन दिनांक' : 'REGISTRATION DATE', value: lang === 'hi' ? '03 अक्टूबर 2025' : '3rd October 2025', sub: '' },
              { label: lang === 'hi' ? 'पंजीकृत कार्यालय' : 'REGISTERED OFFICE', value: lang === 'hi' ? 'प्लॉट नं ए-975, सिद्धार्थ नगर, ब्लॉक-ए' : 'Plot No. A-975, Siddharth Nagar, Block-A', sub: lang === 'hi' ? 'जवाहर सर्किल के पास, जयपुर, राजस्थान' : 'Near Jawahar Circle, Jaipur, Rajasthan' },
            ].map(({ label, value, sub }) => (
              <div key={label} className="bg-amber-50 p-5 rounded-xl border-l-4 border-amber-500">
                <p className="text-xs font-semibold text-amber-800 mb-1 tracking-wide">{label}</p>
                <p className="text-base font-bold text-gray-800">{value}</p>
                {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
              </div>
            ))}
          </div>

          <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-5 rounded-lg flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-gray-800 mb-1">Legal Status</p>
              <p className="text-sm text-gray-700">
                यह ट्रस्ट राजस्थान सार्वजनिक प्रन्यास अधिनियम 1959 की धारा 18(1) के अन्तर्गत एक सार्वजनिक प्रन्यास है। इसे सहायक देवस्थान आयुक्त (प्रथम), देवस्थान विभाग, जयपुर खण्ड, जयपुर के कार्यालय में पंजीकृत किया गया है।
              </p>
            </div>
          </div>
        </section>


        {/* Trustees */}
        <section className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">{lang === 'hi' ? 'ट्रस्टीगण (Board of Trustees)' : 'Board of Trustees'}</h2>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            वर्तमान में इस ट्रस्ट में कुल 6 ट्रस्टी नियुक्त हैं। डॉ. स्वरूप सिंह इस ट्रस्ट के आजीवन मुख्य ट्रस्टी हैं।
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {trustees[lang].map((t, i) => (
              <TrusteeCard key={i} name={t.name} role={t.role} index={i + 1} />
            ))}
          </div>
          <div className="mt-5 bg-indigo-50 rounded-lg p-4 text-sm text-indigo-800">
            <strong>उत्तराधिकार:</strong> डॉ. स्वरूप सिंह का मुख्य ट्रस्टी का पद स्थायी एवं अपरिवर्तनीय तथा अवैतनिक रहेगा। संस्थापक मुख्य ट्रस्टी द्वारा प्रस्ताव पारित कर ट्रस्टियों की संख्या बढ़ा कर अन्य ट्रस्टी नियुक्त किये जा सकते हैं।
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-7 border-t-4 border-orange-500">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-7 h-7 text-orange-600" />
              <h2 className="text-xl font-bold text-gray-800">{lang === 'hi' ? 'हमारा मिशन' : 'Our Mission'}</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {lang === 'hi'
                ? 'पूर्ण धार्मिक आस्था से देवस्थान (मन्दिर) भवन निर्माण, मूर्ति स्थापना, प्राण प्रतिष्ठा के उपरान्त जनकल्याण के लिए समर्पित होना। धार्मिक, शैक्षणिक, स्वास्थ्य एवं सामाजिक क्षेत्रों में निःस्वार्थ भाव से समाज की सेवा करना।'
                : 'To construct a temple (Devsthan), install the deity, perform Pran Pratishtha and dedicate it to public welfare with complete religious faith. To selflessly serve society in religious, educational, health and social domains.'}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-7 border-t-4 border-purple-500">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-7 h-7 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-800">{lang === 'hi' ? 'हमारा विज़न' : 'Our Vision'}</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {lang === 'hi'
                ? 'ट्रस्ट सर्वधर्म समभाव की भावना से कार्य करेगा तथा किसी धर्म, जाति, विश्वासमत, सिद्धान्त और सम्प्रदाय के विरुद्ध कोई कार्य नहीं करेगा। समाज के प्रत्येक वर्ग की सेवा कर एक समृद्ध और समरस समाज का निर्माण करना।'
                : 'The trust will work with the feeling of universal religion and will not perform any work against any religion, caste, belief, doctrine or community. To serve every section of society and build a prosperous and harmonious society.'}
            </p>
          </div>
        </section>

        {/* Trust Objectives */}
        <section className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-emerald-600" />
            <h2 className="text-2xl font-bold text-gray-800">{lang === 'hi' ? 'ट्रस्ट के मुख्य उद्देश्य' : 'Trust Objectives'}</h2>
          </div>
          <p className="text-sm text-gray-500 mb-6">ट्रस्ट डीड (प्रदर्श-2) के बिन्दु संख्या 6 के अनुसार। क्लिक करके देखें।</p>
          <div className="space-y-3">
            {objectiveGroups[lang].map((g, i) => (
              <ObjectiveGroup key={i} title={g.title} items={g.items} color={g.color} />
            ))}
          </div>
        </section>

        {/* Trust Governance */}
        <section className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-amber-600" />
            <h2 className="text-2xl font-bold text-gray-800">{lang === 'hi' ? 'शासन एवं पारदर्शिता' : 'Governance & Transparency'}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <CheckCircle className="w-5 h-5 text-amber-600" />,
                title: lang === 'hi' ? 'बैठकें (Meetings)' : 'Meetings',
                points: lang === 'hi' ? [
                  'वर्ष में कम से कम 2 बैठकें अवश्य होनी चाहिए।',
                  'गणपूर्ति कुल सदस्यों की एक तिहाई होगी।',
                  'बैठकों की कार्यवाही का विवरण कार्यवाही रजिस्टर में रखा जाएगा।',
                ] : [
                  'At least 2 meetings must be held per year.',
                  'Quorum shall be one-third of total members.',
                  'Minutes of meetings shall be recorded in the proceedings register.',
                ],
              },
              {
                icon: <Scale className="w-5 h-5 text-blue-600" />,
                title: lang === 'hi' ? 'वित्तीय प्रबंधन' : 'Financial Management',
                points: lang === 'hi' ? [
                  'किसी सरकारी या गैरसरकारी बैंक में ट्रस्ट का खाता रखा जाएगा।',
                  'ट्रस्ट की आय व्यय का अंकेक्षण प्रतिवर्ष इस कार्यालय को प्रस्तुत की जावे।',
                  'न्यासधारी ट्रस्ट की सम्पत्ति का पूर्ण लेखा–जोखा रखने के लिए सम्मुख प्रस्तुत करेगा।',
                ] : [
                  'Trust account shall be maintained in a government or private bank.',
                  'Annual audit of income and expenditure shall be submitted to the office every year.',
                  'Trustees shall maintain complete accounts of trust property.',
                ],
              },
              {
                icon: <Heart className="w-5 h-5 text-red-500" />,
                title: lang === 'hi' ? 'विशेष प्रावधान' : 'Special Provisions',
                points: lang === 'hi' ? [
                  'न्यासधारी ट्रस्ट की सम्पत्ति का उपयोग केवल ट्रस्ट के उद्देश्यों की पूर्ति के लिए ही करेगा।',
                  'ट्रस्ट आयकर अधिनियम 1961 की विभिन्न धाराओं के अंतर्गत छूट लेने की आवश्यक अनुमति प्राप्त कर सकेगा।',
                ] : [
                  'Trust property shall be used only for fulfilling the objectives of the trust.',
                  'The trust may obtain necessary exemptions under various provisions of the Income Tax Act 1961.',
                ],
              },
              {
                icon: <Users className="w-5 h-5 text-green-600" />,
                title: lang === 'hi' ? 'समापन प्रावधान' : 'Dissolution Provisions',
                points: lang === 'hi' ? [
                  'यह ट्रस्ट अखण्डनीय होगा।',
                  'समापन की दशा में चल व अचल सम्पति का बटवारा ट्रस्टीगणों में नही किया जावेगा।',
                  'किसी समान उद्देश्यों वाली सार्वजनिक संस्था/ट्रस्ट को हस्तान्तरित किया जायेगा।',
                ] : [
                  'This trust shall be irrevocable.',
                  'In case of dissolution, movable and immovable property shall not be divided among trustees.',
                  'Assets shall be transferred to a public institution or trust with similar objectives.',
                ],
              },
            ].map(({ icon, title, points }, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  {icon}
                  <h3 className="font-bold text-gray-800">{title}</h3>
                </div>
                <ul className="space-y-1.5">
                  {points.map((p, j) => (
                    <li key={j} className="text-xs text-gray-600 flex gap-2">
                      <span className="mt-1 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-linear-to-br from-amber-700 to-orange-800 rounded-2xl shadow-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">
            {lang === 'hi' ? 'ट्रस्ट कार्यालय सम्पर्क' : 'Trust Office Contact'}
          </h3>
          <p className="opacity-80 text-sm mb-5">
            {lang === 'hi'
              ? 'ट्रस्ट से सम्बंधित जानकारी, दान या सहयोग के लिए सम्पर्क करें।'
              : 'Contact us for information, donations or collaboration.'}
          </p>
          <div className="inline-block bg-white/15 backdrop-blur rounded-xl px-8 py-5 text-left space-y-1">
            <p>
              <span className="font-semibold">{lang === 'hi' ? 'पता:' : 'Address:'}</span>{' '}
              {lang === 'hi' ? 'प्लॉट नं ए-975, सिद्धार्थ नगर, ब्लॉक-ए' : 'Plot No. A-975, Siddharth Nagar, Block-A'}
            </p>
            <p>
              {lang === 'hi' ? 'जवाहर सर्किल के पास, जयपुर, राजस्थान' : 'Near Jawahar Circle, Jaipur, Rajasthan'}
            </p>
          </div>
          <p className="mt-6 text-sm opacity-75 italic">
            {lang === 'hi' ? '"सेवा परमो धर्मः"' : '"Service is the highest religion"'}
          </p>
        </section>

      </div>
    </div>
  );
};

export default AboutTrust;