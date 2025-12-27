import usePageTitle from "@/hooks/usePageTitle";

export default function AboutPage() {
    const spices = [
        { name: "Haldi Powder", emoji: "🟡", desc: "Natural color aur immunity ke liye faydemand" },
        { name: "Lal Mirch Powder", emoji: "🌶", desc: "Teekha swad aur perfect rang" },
        { name: "Dhaniya Powder", emoji: "🌿", desc: "Khushboo jo khane ko special banaye" },
        { name: "Garam Masala", emoji: "🥘", desc: "Desi recipes ka asli magic" },
        { name: "Jeera", emoji: "🌱", desc: "Pure, aromatic aur flavorful" },
        { name: "Meat Masala", emoji: "🍗", desc: "Mutton & chicken ke liye perfect blend" },
        { name: "Fish Masala", emoji: "🐟", desc: "Seafood ka authentic taste" },
        { name: "Chicken Masala", emoji: "🥩", desc: "Juicy aur flavorful chicken dishes" },
        { name: "Sabzi Masala", emoji: "🥘", desc: "Daily sabzi ko banaye special" },
        { name: "Chhole Masala", emoji: "🍛", desc: "Punjabi style chhole ka swaad" },
        { name: "Pav Bhaji Masala", emoji: "🌾", desc: "Mumbai street style flavour" },
        { name: "Chat Masala", emoji: "🥗", desc: "Chatpata taste snacks ke liye" },
        { name: "Sambar Masala", emoji: "🥣", desc: "South Indian recipes ke liye perfect" },
        { name: "Kitchen King Masala", emoji: "🍲", desc: "All-rounder spice mix" },
        { name: "Kasturi Methi", emoji: "🌿", desc: "Aroma aur health ka combination" },
        { name: "Garlic Powder", emoji: "🧄", desc: "Strong & aromatic garlic flavour" },
        { name: "Onion Powder", emoji: "🧅", desc: "Convenient aur long-lasting flavour" },
    ];

    const teamMembers = [
        { name: "Mr. Shusant Srivastava", role: "Sales Manager", note: "25+ years industry experience" },
        { name: "Mr. Himanshu Kumar", role: "Head of Manufacturing Department" },
        { name: "Ms. Tripti Priya", role: "Director & Head of Finance (Electrical Engineer)" },
        { name: "Mr. Kundan Kumar", role: "Director & Co-Founder (Software Engineer)" },
    ];

    const companyDetails = [
        { label: "Company Name", value: "Zugaly Crops Private Limited" },

        { label: "CIN (Corporate Identity Number)", value: "U10610BR2025PTC076713" },

        { label: "Date of Incorporation", value: "9 June 2025" },

        {
            label: "Registered Under",
            value: "Companies Act, 2013 (Government of India)",
        },

        { label: "PAN (Company)", value: "AACCZ6618C" },

        { label: "TAN", value: "PTNZ00619D" },

        {
            label: "Registrar of Companies",
            value: "ROC Patna – Central Registration Centre (MCA)",
        },

        { label: "Registered Office", value: "Muzaffarpur, Bihar, India" },

        {
            label: "Nature of Business",
            value: "Food Processing, Spices, Grocery & FMCG",
        },

        // Compliance
        { label: "FSSAI License No.", value: "20425062000273" },
        { label: "ISO Certification", value: "ISO 9001:2015 (QMS Certified)" },
        { label: "Trademark", value: "ZUGALY™ (Registered Brand)" },
    ];


    const distributorDistricts = [
        "Muzaffarpur",
        "Betiya",
        "Ara",
        "Motihari",
        "Katra",
        "Sivahar",
        "Chapra",
    ];
 usePageTitle("About Us | Zugaly");
    return (
        <div className="w-full min-h-screen bg-green-50 text-gray-800">
            {/* Hero Section */}
            <section className="w-full bg-white py-14 px-6">
                <div className="w-full max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
                        About Zugaly Crops Pvt. Ltd.
                    </h1>
                    <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
                        <strong>Zugaly Crops Private Limited</strong> is a fast-growing
                        Indian agri-food company based in Muzaffarpur, Bihar.
                        Founded with the vision of delivering <strong>pure, hygienic
                            and affordable grocery & spice products</strong>, Zugaly bridges
                        the gap between farmers and consumers using a modern supply chain
                        approach.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="w-full py-12 px-6 bg-green-100">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-green-700 mb-3">
                            🌱 Our Mission
                        </h2>
                        <p className="text-lg">
                            Hamara mission hai ki har Indian kitchen tak
                            <strong> safe, authentic aur high-quality food products</strong>
                            pahunchaye jaayein, jisse farmers ko fair price mile aur
                            customers ko asli swaad.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-green-700 mb-3">
                            👁 Our Vision
                        </h2>
                        <p className="text-lg">
                            Zugaly ka vision hai ek <strong>trusted national FMCG brand</strong>
                            banana jo purity, transparency aur sustainability ke liye
                            jaana jaaye.
                        </p>
                    </div>
                </div>
            </section>

            {/* Spices */}
            <section className="w-full py-14 px-6 bg-yellow-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-semibold text-yellow-700 mb-6">
                        🌶 Bihar ka Asli Swaad – Our Premium Spices
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {spices.map((s, i) => (
                            <div
                                key={i}
                                className="bg-white p-5 rounded-xl shadow-sm border border-yellow-200"
                            >
                                <h3 className="text-lg font-semibold">
                                    {s.emoji} {s.name}
                                </h3>
                                <p className="text-gray-600 mt-1">{s.desc}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-lg mt-6 max-w-4xl">
                        Zugaly ke masale <strong>direct sourcing</strong>,
                        <strong> modern grinding</strong> aur
                        <strong> hygienic packaging</strong> ke saath tayaar kiye jaate hain,
                        taaki swad aur quality dono compromise na ho.
                    </p>
                </div>
            </section>

            {/* Team */}
            <section className="w-full py-14 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-semibold text-green-700 mb-6">
                        👨‍🌾 Leadership & Team
                    </h2>
                    <ul className="space-y-3 text-lg">
                        {teamMembers.map((t, i) => (
                            <li key={i}>
                                <strong>{t.name}</strong> — {t.role}
                                {t.note && <span className="text-gray-600"> ({t.note})</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Distributors */}
            <section className="w-full py-12 px-6 bg-green-100">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-semibold text-green-700 mb-4">
                        🏢 Our Distribution Network
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {distributorDistricts.map((d, i) => (
                            <span
                                key={i}
                                className="bg-white px-4 py-2 rounded-full shadow text-sm"
                            >
                                {d}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company Details */}
            <section className="w-full py-14 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-semibold text-green-700 mb-4">
                        📋 Company Details
                    </h2>
                    <ul className="space-y-2 text-lg">
                        {companyDetails.map((c, i) => (
                            <li key={i}>
                                <strong>{c.label}:</strong> {c.value}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            {/* Certifications & Trust */}
            <section className="w-full py-14 px-6 bg-green-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-semibold text-green-700 mb-6">
                        🛡 Certifications & Compliance
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* FSSAI */}
                        <div className="bg-white p-6 rounded-xl shadow border">
                            <h3 className="text-lg font-semibold text-green-700 mb-2">
                                🍽 FSSAI Registered
                            </h3>
                            <p className="text-gray-700">
                                Zugaly Crops Private Limited is registered with the
                                <strong> Food Safety and Standards Authority of India (FSSAI)</strong>.
                            </p>
                            <p className="mt-2 text-sm text-gray-600">
                                License No: <strong>20425062000273</strong>
                            </p>
                        </div>

                        {/* ISO */}
                        <div className="bg-white p-6 rounded-xl shadow border">
                            <h3 className="text-lg font-semibold text-green-700 mb-2">
                                📜 ISO 9001:2015 Certified
                            </h3>
                            <p className="text-gray-700">
                                Our quality management system has been assessed and certified
                                as per <strong>ISO 9001:2015</strong> standards for
                                supply of spices.
                            </p>
                        </div>

                        {/* Trademark */}
                        <div className="bg-white p-6 rounded-xl shadow border">
                            <h3 className="text-lg font-semibold text-green-700 mb-2">
                                ™ Trademark Registered
                            </h3>
                            <p className="text-gray-700">
                                <strong>ZUGALY™</strong> is a registered brand name,
                                legally protected under Indian trademark laws.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Legal & Incorporation */}
            <section className="w-full py-12 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-semibold text-green-700 mb-4">
                        🏛 Legal & Incorporation Details
                    </h2>

                    <p className="text-lg text-gray-700 max-w-4xl leading-relaxed">
                        Zugaly Crops Private Limited is a legally incorporated company
                        registered with the <strong>Ministry of Corporate Affairs (MCA),
                            Government of India</strong>.
                        The company was incorporated on <strong>9 June 2025</strong> under
                        the provisions of the Companies Act, 2013 and is limited by shares.
                    </p>

                    <p className="text-sm text-gray-600 mt-4 max-w-4xl">
                        This incorporation certificate confirms the legal existence of the
                        company and does not by itself grant any license to carry on
                        regulated activities, as per applicable Indian laws.
                    </p>
                </div>
            </section>

        </div>
    );
}
