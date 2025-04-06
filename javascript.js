const { motion, AnimatePresence } = window.Motion;

function App() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };
    
    // State for modals
    const [selectedService, setSelectedService] = React.useState(null);
    const [selectedProject, setSelectedProject] = React.useState(null);
    const [showMoreProjects, setShowMoreProjects] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    
    // Handle form input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };
    
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };
    
    // Handle service request
    const handleServiceRequest = (serviceName) => {
        alert(`تم طلب خدمة ${serviceName}. سنتواصل معك لتأكيد التفاصيل.`);
        setSelectedService(null);
    };
    
    // Sample projects data
    const projects = [
        {
            id: 1,
            title: "هوية بصرية لمطعم",
            category: "هوية بصرية",
            description: "تصميم هوية متكاملة لمطعم راقٍ يشمل الشعار والألوان والطباعة وكل العناصر البصرية",
            images: [
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
                "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            ],
            client: "مطعم اللذة الشرقية",
            date: "يناير 2023"
        },
        {
            id: 2,
            title: "موقع إلكتروني لتجارة إلكترونية",
            category: "تصميم مواقع",
            description: "تصميم وتطوير موقع متكامل لبيع المنتجات الإلكترونية مع واجهة مستخدم سهلة وسريعة",
            images: [
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
                "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
                "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80"
            ],
            client: "متجر التقنية",
            date: "مارس 2023"
        },
        {
            id: 3,
            title: "حملة إعلانية لعلامة تجارية",
            category: "إعلانات",
            description: "تصميم حملة إعلانية متكاملة لعلامة تجارية جديدة في السوق المحلي",
            images: [
                "https://images.unsplash.com/photo-1567443024551-f3e3a7b9d41e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1567443024551-f3e3a7b9d41e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            ],
            client: "شركة النخبة",
            date: "مايو 2023"
        },
        {
            id: 4,
            title: "تصميم تطبيق جوال",
            category: "تطبيقات",
            description: "تصميم واجهة مستخدم لتطبيق جوال يقدم خدمات توصيل الطعام",
            images: [
                "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            ],
            client: "تطبيق وجبتي",
            date: "يوليو 2023"
        },
        {
            id: 5,
            title: "تصميم غلاف كتاب",
            category: "جرافيك",
            description: "تصميم غلاف كتاب أدبي معاصر يجذب القراء ويعكس محتوى الكتاب",
            images: [
                "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80",
                "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            ],
            client: "دار النشر العربية",
            date: "سبتمبر 2023"
        },
        {
            id: 6,
            title: "فيديو موشن جرافيك",
            category: "موشن جرافيك",
            description: "إنتاج فيديو موشن جرافيك لشركة تكنولوجيا يشرح منتجاتها بطريقة جذابة",
            images: [
                "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            ],
            client: "شركة تك للتقنية",
            date: "نوفمبر 2023"
        },
        // Additional projects
        {
            id: 7,
            title: "تصميم لوجو لمؤسسة تعليمية",
            category: "هوية بصرية",
            description: "تصميم شعار عصري لمؤسسة تعليمية تعكس قيمها الأكاديمية والتربوية",
            images: [
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            ],
            client: "أكاديمية المستقبل",
            date: "فبراير 2023"
        },
        {
            id: 8,
            title: "تصميم بوستات لوسائل التواصل",
            category: "جرافيك",
            description: "تصميم سلسلة منشورات لوسائل التواصل الاجتماعي لشركة عقارية",
            images: [
                "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
                "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
                "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
            ],
            client: "الدار العقارية",
            date: "أبريل 2023"
        },
        {
            id: 9,
            title: "تصميم كتالوج منتجات",
            category: "جرافيك",
            description: "تصميم كتالوج إلكتروني ومطبوع لعرض منتجات شركة تجارية",
            images: [
                "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
                "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
                "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
            ],
            client: "شركة المنتجات المتميزة",
            date: "يونيو 2023"
        }
    ];
    
    // Sample services data with Moroccan Dirham prices
    const services = [
        {
            id: 1,
            title: "تصميم الهوية البصرية",
            icon: "🖌️",
            color: "bg-red-500",
            description: "نقدم خدمة تصميم الهوية البصرية المتكاملة التي تعكس شخصية علامتك التجارية وقيمها",
            details: [
                "تصميم شعار احترافي يعبر عن هويتك",
                "تحديد نظام ألوان متكامل للعلامة",
                "تصميم بطاقات عمل وورقيات رسمية",
                "دليل استخدام العلامة التجارية",
                "تصميم ملف تعريف العلامة التجارية"
            ],
            priceRange: "تبدأ من 5,000 درهم"
        },
        {
            id: 2,
            title: "تصميم المواقع والتطبيقات",
            icon: "💻",
            color: "bg-blue-500",
            description: "تصميم واجهات مستخدم جذابة وسهلة الاستخدام لمواقع الويب والتطبيقات",
            details: [
                "تصميم واجهة المستخدم (UI)",
                "تجربة المستخدم (UX)",
                "تصميم متجاوب لجميع الأجهزة",
                "تصميم نظام التنقل في الموقع",
                "تصميم صفحات المنتجات والخدمات"
            ],
            priceRange: "تبدأ من 8,000 درهم"
        },
        {
            id: 3,
            title: "تصميم الجرافيك",
            icon: "🎨",
            color: "bg-yellow-500",
            description: "تصميم مواد دعائية وإعلانية بجودة عالية لتعزيز حضورك في السوق",
            details: [
                "تصميم بوستات وسائل التواصل الاجتماعي",
                "تصميم إعلانات مطبوعة",
                "تصميم بروشورات وكتالوجات",
                "تصميم العبوات والتغليف",
                "تصميم اللوحات الإعلانية"
            ],
            priceRange: "تبدأ من 2,000 درهم"
        },
        {
            id: 4,
            title: "الموشن جرافيك",
            icon: "🎬",
            color: "bg-purple-500",
            description: "إنتاج فيديوهات إعلانية متحركة تشرح منتجاتك بطريقة مبتكرة وجذابة",
            details: [
                "كتابة السيناريو والإبداع",
                "تصميم الشخصيات والعناصر",
                "تحريك الرسومات والمؤثرات",
                "إضافة الصوت والمؤثرات الصوتية",
                "تصدير الفيديو بجودة عالية"
            ],
            priceRange: "تبدأ من 10,000 درهم"
        },
        {
            id: 5,
            title: "تصميم التغليف",
            icon: "📦",
            color: "bg-green-500",
            description: "تصميم عبوات جذابة للمنتجات تعزز قيمتها في السوق وتجذب العملاء",
            details: [
                "دراسة السوق والمنافسين",
                "تصميم شكل العبوة الخارجي",
                "اختيار المواد المناسبة",
                "تصميم الملصقات والعلامات",
                "التنفيذ الطباعي النهائي"
            ],
            priceRange: "تبدأ من 4,000 درهم"
        },
        {
            id: 6,
            title: "الاستشارات التصميمية",
            icon: "💡",
            color: "bg-indigo-500",
            description: "تقديم استشارات متخصصة لتطوير هويتك البصرية وتحسين حضورك في السوق",
            details: [
                "تحليل الهوية البصرية الحالية",
                "تقييم نقاط القوة والضعف",
                "تقديم حلول إبداعية للتطوير",
                "وضع استراتيجية بصرية متكاملة",
                "متابعة التنفيذ والتطوير"
            ],
            priceRange: "تبدأ من 3,000 درهم"
        }
    ];

    return (
        <main className="min-h-screen bg-white text-gray-800 font-sans antialiased">
            {/* Navbar */}
            <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 py-3 px-6 md:px-12 flex justify-between items-center">
                <div className="flex items-center">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="text-2xl font-bold flex items-center"
                    >
                        <span className="text-red-500">B</span>
                        <span className="text-yellow-500">O</span>
                        <span className="text-blue-600">L</span>
                        <span className="text-black">D</span>
                    </motion.div>
                    <span className="ml-2 text-sm font-medium hidden md:block">للتصميم الإبداعي</span>
                </div>
                
                <nav className="hidden lg:flex gap-6 font-medium">
                    {[
                        { name: 'الرئيسية', href: '#home' },
                        { name: 'من نحن', href: '#about' },
                        { name: 'خدماتنا', href: '#services' },
                        { name: 'أعمالنا', href: '#portfolio' },
                        { name: 'عملاؤنا', href: '#testimonials' },
                        { name: 'اتصل بنا', href: '#contact' }
                    ].map((item, index) => (
                        <motion.a
                            key={index}
                            href={item.href}
                            className="relative px-2 py-1 text-gray-700 hover:text-red-500 transition-colors duration-300"
                            whileHover={{ y: -2 }}
                        >
                            {item.name}
                            {index === 0 && (
                                <motion.span 
                                    layoutId="navIndicator"
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </motion.a>
                    ))}
                </nav>
                
                <div className="flex items-center gap-4">
                    <button 
                        className="hidden md:flex bg-black text-white rounded-full px-6 py-2 hover:bg-gray-800 transition-colors duration-300 text-sm"
                        onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                    >
                        اطلب خدمة
                    </button>
                    <button className="lg:hidden text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 px-6">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight hero-title">
                            <span className="text-red-500">B</span>
                            <span className="text-yellow-500">O</span>
                            <span className="text-blue-400">L</span>
                            <span className="text-white">D</span> graphic
                        </h1>
                        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                            نبتكر حلولاً تصميمية جريدة تعكس هوية علامتك التجارية وتواكب متطلبات العصر الرقمي
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <button 
                                    className="bg-white text-black rounded-full px-8 py-3 hover:bg-gray-100 transition-all duration-300 font-medium shadow-md btn-primary"
                                    onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
                                >
                                    تصفح أعمالنا
                                </button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <button 
                                    className="border border-white text-white rounded-full px-8 py-3 hover:bg-white/10 transition-all duration-300 font-medium btn-primary"
                                    onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                                >
                                    تواصل معنا
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
                
                <motion.a 
                    href="#about"
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </motion.a>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial="hidden"
                        whileInView="visible"
                        variants={fadeIn}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-4 section-title"
                    >
                        من نحن
                    </motion.h2>
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-24 h-1 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto mb-8"
                    />
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        variants={fadeIn}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto text-lg"
                    >
                        فريق من المصممين المحترفين والمبدعين الذين يجمعون بين الفن والتقنية لإنشاء تجارب بصرية فريدة
                    </motion.p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={fadeIn}
                        viewport={{ once: true }}
                        className="bg-gray-50 p-8 rounded-xl"
                    >
                        <h3 className="text-xl font-bold mb-4 text-blue-600">رؤيتنا</h3>
                        <p className="text-gray-600 mb-6">
                            أن نكون الوجهة الأولى للعلامات التجارية الطموحة التي تبحث عن تميز بصري يحقق أهدافها التجارية.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <span className="text-gray-400 text-sm">نحن نؤمن بأن</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>
                        <p className="text-gray-800 mt-6 font-medium">
                            "التصميم الجيد ليس مجرد شكل جميل، بل هو حل فعال لمشكلة حقيقية"
                        </p>
                    </motion.div>
                    
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={fadeIn}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {[
                            {
                                title: "5+ سنوات",
                                desc: "خبرة في مجال التصميم",
                                color: "bg-red-50 text-red-500"
                            },
                            {
                                title: "120+ مشروع",
                                desc: "تم إنجازهم بنجاح",
                                color: "bg-yellow-50 text-yellow-500"
                            },
                            {
                                title: "95% رضا",
                                desc: "عملاء راضون عن خدماتنا",
                                color: "bg-blue-50 text-blue-500"
                            },
                            {
                                title: "24/7 دعم",
                                desc: "خدمة عملاء على مدار الساعة",
                                color: "bg-gray-100 text-gray-600"
                            }
                        ].map((item, index) => (
                            <div key={index} className={`p-4 rounded-lg ${item.color} flex flex-col items-center justify-center text-center`}>
                                <span className="text-xl font-bold mb-1">{item.title}</span>
                                <span className="text-sm">{item.desc}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <motion.h2 
                            initial="hidden"
                            whileInView="visible"
                            variants={fadeIn}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold mb-4 section-title"
                        >
                            خدماتنا
                        </motion.h2>
                        <motion.div 
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-blue-500 mx-auto mb-8"
                        />
                        <motion.p
                            initial="hidden"
                            whileInView="visible"
                            variants={fadeIn}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-600 max-w-2xl mx-auto text-lg"
                        >
                            نقدم مجموعة متكاملة من الحلول التصميمية التي تلبي كافة احتياجاتك
                        </motion.p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial="hidden"
                                whileInView="visible"
                                variants={fadeIn}
                                viewport={{ once: true }}
                                transition={{ delay: Math.floor(index/3) * 0.2 }}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 cursor-pointer service-card"
                                onClick={() => setSelectedService(service)}
                            >
                                <div className={`${service.color} h-2 w-full`}></div>
                                <div className="p-6">
                                    <div className="text-4xl mb-4">{service.icon}</div>
                                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                    <p className="text-gray-600 mb-4">{service.description}</p>
                                    <button className="text-red-500 p-0 hover:text-red-600 text-sm font-medium">
                                        المزيد من التفاصيل →
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.h2 
                            initial="hidden"
                            whileInView="visible"
                            variants={fadeIn}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold mb-4 section-title"
                        >
                            أعمالنا
                        </motion.h2>
                        <motion.div 
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-red-500 mx-auto mb-8"
                        />
                        <motion.p
                            initial="hidden"
                            whileInView="visible"
                            variants={fadeIn}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-600 max-w-2xl mx-auto text-lg"
                        >
                            مجموعة من أحدث أعمالنا التي نفخر بها
                        </motion.p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {projects.slice(0, showMoreProjects ? projects.length : 6).map((project) => (
                            <motion.div
                                key={project.id}
                                initial="hidden"
                                whileInView="visible"
                                variants={fadeIn}
                                viewport={{ once: true }}
                                transition={{ delay: Math.floor((project.id-1)/3) * 0.2 }}
                                className="group relative overflow-hidden rounded-xl cursor-pointer project-card"
                                onClick={() => setSelectedProject(project)}
                            >
                                <img 
                                    src={project.images[0]} 
                                    alt={project.title} 
                                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 project-overlay">
                                    <div>
                                        <h3 className="text-white text-xl font-bold mb-1">{project.title}</h3>
                                        <p className="text-gray-200 text-sm">{project.category}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="text-center">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <button 
                                className="bg-black text-white rounded-full px-8 py-3 hover:bg-gray-800 transition-colors duration-300 font-medium shadow btn-primary"
                                onClick={() => setShowMoreProjects(!showMoreProjects)}
                            >
                                {showMoreProjects ? 'عرض أقل' : 'عرض المزيد'}
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <motion.h2 
                            initial="hidden"
                            whileInView="visible"
                            variants={fadeIn}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold mb-4 section-title"
                        >
                            آراء عملائنا
                        </motion.h2>
                        <motion.div 
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-white mx-auto mb-8"
                        />
                        <motion.p
                            initial="hidden"
                            whileInView="visible"
                            variants={fadeIn}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-300 max-w-2xl mx-auto text-lg"
                        >
                            ثقة عملائنا هي شهادتنا الحقيقية
                        </motion.p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: "سارة محمد",
                                position: "مديرة تسويق",
                                text: "التصميمات تجاوزت توقعاتنا تماماً، فريق محترف يعرف ما يفعله. لقد ساعدونا في إنشاء هوية بصرية مميزة لعلامتنا التجارية.",
                                rating: 5,
                                image: "https://randomuser.me/api/portraits/women/43.jpg"
                            },
                            {
                                name: "أحمد الخالد",
                                position: "رائد أعمال",
                                text: "أفضل تجربة تصميم مررت بها، أنصح بهم بشدة لكل من يبحث عن الجودة والاحترافية في التصميم.",
                                rating: 5,
                                image: "https://randomuser.me/api/portraits/men/32.jpg"
                            },
                            {
                                name: "ليلى عبدالله",
                                position: "مالكة متجر",
                                text: "ساعدوني في إنشاء هوية مميزة لمتجري زادت من مبيعاتي بشكل ملحوظ. التصميمات كانت مبتكرة وجذابة.",
                                rating: 4,
                                image: "https://randomuser.me/api/portraits/women/65.jpg"
                            },
                            // Additional testimonials
                            {
                                name: "خالد الزهراني",
                                position: "مدير العلامة التجارية",
                                text: "تعاملنا مع العديد من استوديوهات التصميم، ولكن BOLD Design كان الأفضل من حيث الإبداع والالتزام بالمواعيد.",
                                rating: 5,
                                image: "https://randomuser.me/api/portraits/men/45.jpg"
                            },
                            {
                                name: "نورا الفهد",
                                position: "مسؤولة التسويق الرقمي",
                                text: "تصميم الموقع الذي قدموه لنا ساعد في زيادة التحويلات بنسبة 40%. فريق مبدع ومحترف.",
                                rating: 5,
                                image: "https://randomuser.me/api/portraits/women/68.jpg"
                            },
                            {
                                name: "يوسف القحطاني",
                                position: "مالك مطعم",
                                text: "تصميم الهوية البصرية لمطعمي كان مميزاً ويعكس تماماً شخصية المطعم. العملاء يعجبون بالتصميم كثيراً.",
                                rating: 4,
                                image: "https://randomuser.me/api/portraits/men/52.jpg"
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial="hidden"
                                whileInView="visible"
                                variants={fadeIn}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300 testimonial-card"
                            >
                                <div className="flex items-center mb-4">
                                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                                    <div>
                                        <h4 className="font-bold">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-400">{testimonial.position}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className={`fas fa-star ${i < testimonial.rating ? "text-yellow-400" : "text-gray-600"}`}></i>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.h2 
                            initial="hidden"
                            whileInView="visible"
                            variants={fadeIn}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold mb-4 section-title"
                        >
                            تواصل معنا
                        </motion.h2>
                        <motion.div 
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mb-8"
                        />
                        <motion.p
                            initial="hidden"
                            whileInView="visible"
                            variants={fadeIn}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-600 max-w-2xl mx-auto text-lg"
                        >
                            لديك استفسار أو ترغب في بدء مشروعك معنا؟ سنكون سعداء بمساعدتك
                        </motion.p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.form
                            initial="hidden"
                            whileInView="visible"
                            variants={fadeIn}
                            viewport={{ once: true }}
                            className="space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block mb-2 font-medium text-gray-700">الاسم الكامل</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 form-input"
                                        placeholder="أدخل اسمك"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 font-medium text-gray-700">البريد الإلكتروني</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 form-input"
                                        placeholder="أدخل بريدك الإلكتروني"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="subject" className="block mb-2 font-medium text-gray-700">الموضوع</label>
                                <input 
                                    type="text" 
                                    id="subject" 
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 form-input"
                                    placeholder="موضوع الرسالة"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block mb-2 font-medium text-gray-700">الرسالة</label>
                                <textarea 
                                    id="message" 
                                    rows="5" 
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 form-input"
                                    placeholder="أدخل رسالتك هنا..."
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <button 
                                    type="submit"
                                    className="w-full bg-black text-white rounded-lg py-3 hover:bg-gray-800 transition-colors duration-300 font-medium shadow btn-primary"
                                >
                                    إرسال الرسالة
                                </button>
                            </motion.div>
                        </motion.form>
                        
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            variants={fadeIn}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h3 className="text-xl font-bold mb-6 text-gray-800">معلومات التواصل</h3>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                                            <i className="fas fa-map-marker-alt"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-800 mb-1">العنوان</h4>
                                            <p className="text-gray-600">شارع محمد السادس، الدار البيضاء، المغرب</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                        <div className="bg-red-100 p-3 rounded-full text-red-600">
                                            <i className="fas fa-phone"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-800 mb-1">الهاتف</h4>
                                            <p className="text-gray-600">+212 619 129 015</p>
                                            <p className="text-gray-600">+212 693 884 422</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                        <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                                            <i className="fas fa-envelope"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-800 mb-1">البريد الإلكتروني</h4>
                                            <p className="text-gray-600">boldgraphic@gmail.ma</p>
                                            <p className="text-gray-600">support@boldgraphic.ma</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h3 className="text-xl font-bold mb-4 text-gray-800">ساعات العمل</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="text-gray-600">الأحد - الخميس</span>
                                        <span className="font-medium text-gray-800">9:00 ص - 5:00 م</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-gray-600">الجمعة - السبت</span>
                                        <span className="font-medium text-gray-800">إجازة</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-center gap-4 text-xl">
                                <a href="https://web.facebook.com/profile.php?id=100045154711491" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="https://x.com/younes4681?t=tROZLYwHRgdgvpaOGizZtA&s=09" className="text-gray-600 hover:text-blue-400 transition-colors duration-300">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="https://www.instagram.com/bold_4681?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-gray-600 hover:text-pink-500 transition-colors duration-300">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/graphico-127429310?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-600 hover:text-blue-700 transition-colors duration-300">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="text-2xl font-bold mb-4 flex items-center">
                                <span className="text-red-500">B</span>
                                <span className="text-yellow-500">O</span>
                                <span className="text-blue-400">L</span>
                                <span className="text-white">D</span>
                            </div>
                            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                                استوديو متخصص في التصميم الجرافيكي والعلامات التجارية، نقدم حلولاً إبداعية تلبي احتياجات العصر الرقمي.
                            </p>
                            <div className="flex gap-4 text-lg">
                                <a href="https://web.facebook.com/profile.php?id=100045154711491" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="https://x.com/younes4681?t=tROZLYwHRgdgvpaOGizZtA&s=09" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="https://www.instagram.com/bold_4681?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/graphico-127429310?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-bold mb-4">روابط سريعة</h4>
                            <ul className="space-y-2">
                                {['الرئيسية', 'من نحن', 'خدماتنا', 'أعمالنا', 'عملاؤنا', 'اتصل بنا'].map((item, index) => (
                                    <li key={index}>
                                        <a href={`#${item.replace(' ', '')}`} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-bold mb-4">خدماتنا</h4>
                            <ul className="space-y-2">
                                {services.slice(0, 6).map((service, index) => (
                                    <li key={index}>
                                        <a href="#services" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">{service.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-bold mb-4">النشرة البريدية</h4>
                            <p className="text-gray-400 mb-4 text-sm">
                                اشترك ليصلك كل جديد عن خدماتنا وعروضنا الخاصة.
                            </p>
                            <div className="flex">
                                <input 
                                    type="email" 
                                    placeholder="بريدك الإلكتروني" 
                                    className="bg-gray-800 text-white px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm"
                                />
                                <button className="bg-blue-600 hover:bg-blue-700 rounded-l-none rounded-r-lg px-4 text-sm text-white">
                                    اشترك
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
                        <p>© {new Date().getFullYear()} BOLD graphic. جميع الحقوق محفوظة.</p>
                    </div>
                </div>
            </footer>

            {/* Service Modal */}
            <AnimatePresence>
                {selectedService && (
                    <motion.div 
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedService(null)}
                    >
                        <motion.div 
                            className="modal-content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">{selectedService.title}</h3>
                                    <p className="text-gray-600 mt-2">{selectedService.description}</p>
                                </div>
                                <button 
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => setSelectedService(null)}
                                >
                                    <i className="fas fa-times text-xl"></i>
                                </button>
                            </div>
                            
                            <div className={`${selectedService.color} h-2 w-full mb-6 rounded-full`}></div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-lg font-semibold mb-4 text-gray-800">تفاصيل الخدمة</h4>
                                    <ul className="space-y-3">
                                        {selectedService.details.map((detail, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-green-500 mr-2">✓</span>
                                                <span className="text-gray-700">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h4 className="text-lg font-semibold mb-4 text-gray-800">معلومات إضافية</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <span className="block text-sm text-gray-500">نطاق الأسعار</span>
                                            <span className="font-medium">{selectedService.priceRange}</span>
                                        </div>
                                        <div>
                                            <span className="block text-sm text-gray-500">مدة التنفيذ</span>
                                            <span className="font-medium">2-4 أسابيع حسب التعقيد</span>
                                        </div>
                                        <div>
                                            <span className="block text-sm text-gray-500">عدد المراجعات</span>
                                            <span className="font-medium">3 مراجعات مجانية</span>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 btn-primary"
                                        onClick={() => handleServiceRequest(selectedService.title)}
                                    >
                                        طلب هذه الخدمة
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div 
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div 
                            className="modal-content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">{selectedProject.title}</h3>
                                    <p className="text-gray-600 mt-2">{selectedProject.description}</p>
                                </div>
                                <button 
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => setSelectedProject(null)}
                                >
                                    <i className="fas fa-times text-xl"></i>
                                </button>
                            </div>
                            
                            <div className="mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    {selectedProject.images.map((image, index) => (
                                        <img 
                                            key={index}
                                            src={image}
                                            alt={`${selectedProject.title} ${index + 1}`}
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                    ))}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-lg font-semibold mb-4 text-gray-800">تفاصيل المشروع</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <span className="block text-sm text-gray-500">العميل</span>
                                            <span className="font-medium">{selectedProject.client}</span>
                                        </div>
                                        <div>
                                            <span className="block text-sm text-gray-500">التصنيف</span>
                                            <span className="font-medium">{selectedProject.category}</span>
                                        </div>
                                        <div>
                                            <span className="block text-sm text-gray-500">تاريخ التسليم</span>
                                            <span className="font-medium">{selectedProject.date}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h4 className="text-lg font-semibold mb-4 text-gray-800">تقييم المشروع</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <span className="block text-sm text-gray-500">مدة التنفيذ</span>
                                            <span className="font-medium">3 أسابيع</span>
                                        </div>
                                        <div>
                                            <span className="block text-sm text-gray-500">رضا العميل</span>
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <i key={i} className="fas fa-star"></i>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="block text-sm text-gray-500">ملاحظات العميل</span>
                                            <span className="font-medium">"التصميمات تجاوزت توقعاتنا تماماً"</span>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 btn-primary"
                                        onClick={() => {
                                            setSelectedProject(null);
                                            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        طلب خدمة مماثلة
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);