export const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    registerCattle: "Register Cattle",
    cattleManagement: "Cattle Management",
    ownersManagement: "Owners Management",
    verificationCenter: "Verification Center",
    reports: "Reports",
    analytics: "Analytics",
    verificationLogs: "Verification Logs",
    settings: "Settings",
    systemTools: "System Tools",
    logout: "Logout",

    // Dashboard
    dashboardOverview: "Dashboard Overview",
    welcomeMessage: "Welcome to South Sudan Cattle Management System",
    totalCowsRegistered: "Total Cows Registered",
    totalOwners: "Total Owners",
    dailyVerifications: "Daily Verifications",
    pendingReports: "Pending Reports",
    recentActivity: "Recent Activity",
    systemStatus: "System Status",

    // Common
    search: "Search",
    filter: "Filter",
    export: "Export",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    loading: "Loading...",
    noData: "No data available",

    // Cattle Registration
    registerNewCattle: "Register New Cattle",
    ownerInformation: "Owner Information",
    cattleDetails: "Cattle Details",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    address: "Physical Address",
    nationalId: "National ID",
    breed: "Breed",
    color: "Color",
    age: "Age",
    nosePrintImages: "Nose Print Images",

    // Location
    juba: "Juba",
    wau: "Wau",
    malakal: "Malakal",
    bentiu: "Bentiu",
    bor: "Bor",
    yei: "Yei",
    torit: "Torit",
    rumbek: "Rumbek",
  },
  ar: {
    // Navigation
    dashboard: "لوحة التحكم",
    registerCattle: "تسجيل الماشية",
    cattleManagement: "إدارة الماشية",
    ownersManagement: "إدارة المالكين",
    verificationCenter: "مركز التحقق",
    reports: "التقارير",
    analytics: "التحليلات",
    verificationLogs: "سجلات التحقق",
    settings: "الإعدادات",
    systemTools: "أدوات النظام",
    logout: "تسجيل الخروج",

    // Dashboard
    dashboardOverview: "نظرة عامة على لوحة التحكم",
    welcomeMessage: "مرحباً بك في نظام إدارة الماشية لجنوب السودان",
    totalCowsRegistered: "إجمالي الأبقار المسجلة",
    totalOwners: "إجمالي المالكين",
    dailyVerifications: "التحققات اليومية",
    pendingReports: "التقارير المعلقة",
    recentActivity: "النشاط الأخير",
    systemStatus: "حالة النظام",

    // Common
    search: "بحث",
    filter: "تصفية",
    export: "تصدير",
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    edit: "تعديل",
    view: "عرض",
    loading: "جاري التحميل...",
    noData: "لا توجد بيانات متاحة",

    // Cattle Registration
    registerNewCattle: "تسجيل ماشية جديدة",
    ownerInformation: "معلومات المالك",
    cattleDetails: "تفاصيل الماشية",
    fullName: "الاسم الكامل",
    email: "عنوان البريد الإلكتروني",
    phone: "رقم الهاتف",
    address: "العنوان الفعلي",
    nationalId: "الرقم الوطني",
    breed: "السلالة",
    color: "اللون",
    age: "العمر",
    nosePrintImages: "صور بصمة الأنف",

    // Location
    juba: "جوبا",
    wau: "واو",
    malakal: "ملكال",
    bentiu: "بانتيو",
    bor: "بور",
    yei: "يي",
    torit: "توريت",
    rumbek: "رومبيك",
  }
};

export const useTranslation = () => {
  const currentLang = localStorage.getItem('language') || 'en';
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLang as keyof typeof translations];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return { t, currentLang };
};