export const subjects = [
  {
    name: "Matematika",
    description: "Sonlar, miqdorlar va shakllar haqidagi fan",
  },
  {
    name: "Fizika",
    description: "Materiya, energiya va ularning o'zaro ta'siri haqidagi fan",
  },
  {
    name: "Kimyo",
    description:
      "Moddalar, ularning xususiyatlari va reaksiyalari haqidagi fan",
  },
  {
    name: "Biologiya",
    description: "Tirik organizmlar va ularning jarayonlari haqidagi fan",
  },
  {
    name: "Informatika",
    description: "Kompyuterlar va hisoblash tizimlari haqidagi fan",
  },
  {
    name: "Tarix",
    description: "O'tmish voqealari va jamiyat rivojlanishi haqidagi fan",
  },
  {
    name: "Geografiya",
    description: "Yer va uning xususiyatlari haqidagi fan",
  },
  {
    name: "Adabiyot",
    description: "Badiiy asarlar va ularning tahlili haqidagi fan",
  },
];

export const commands = [
  {
    name: "tushuntir",
    description: "Mavzuni batafsil tushuntirish",
    example: "Logarifm nima va u qanday ishlaydi?",
  },
  {
    name: "yech",
    description: "Masala yoki misolni yechish",
    example: "x² + 5x + 6 = 0 tenglamani yeching",
  },
  {
    name: "tahlil",
    description: "Mavzuni chuqur tahlil qilish",
    example: "Fotosintez jarayonini tahlil qiling",
  },
  {
    name: "solishtir",
    description: "Ikki yoki undan ortiq narsalarni solishtirish",
    example: "Prokariot va eukariot hujayralarni solishtiring",
  },
  {
    name: "qisqacha",
    description: "Mavzuni qisqacha tushuntirish",
    example: "Nyuton qonunlarini qisqacha tushuntiring",
  },
];

export const topics = {
  Matematika: [
    {
      name: "Algebra",
      description: "Matematik belgilar va ularni o'zgartirish qoidalari",
      commands: commands,
    },
    {
      name: "Geometriya",
      description: "Shakllar va ularning xususiyatlari",
      commands: commands,
    },
    {
      name: "Trigonometriya",
      description: "Burchaklar va trigonometrik funksiyalar",
      commands: commands,
    },
  ],
  Fizika: [
    {
      name: "Mexanika",
      description: "Jismlarning harakati va kuchlar",
      commands: commands,
    },
    {
      name: "Elektr",
      description: "Elektr toki va magnit maydonlari",
      commands: commands,
    },
    {
      name: "Optika",
      description: "Yorug'lik va uning xususiyatlari",
      commands: commands,
    },
  ],
  Kimyo: [
    {
      name: "Organik kimyo",
      description: "Uglerod birikmalari",
      commands: commands,
    },
    {
      name: "Anorganik kimyo",
      description: "Noorganik moddalar",
      commands: commands,
    },
    {
      name: "Analitik kimyo",
      description: "Moddalarning tarkibi va tuzilishi",
      commands: commands,
    },
  ],
  Biologiya: [
    {
      name: "Genetika",
      description: "Irsiyat va o'zgaruvchanlik",
      commands: commands,
    },
    {
      name: "Botanika",
      description: "O'simliklar haqidagi fan",
      commands: commands,
    },
    {
      name: "Zoologiya",
      description: "Hayvonlar haqidagi fan",
      commands: commands,
    },
  ],
  Informatika: [
    {
      name: "Dasturlash",
      description: "Kompyuter dasturlarini yaratish",
    },
    {
      name: "Ma'lumotlar tuzilmasi",
      description: "Ma'lumotlarni saqlash va boshqarish",
    },
    {
      name: "Algoritmlar",
      description: "Masalalarni yechish usullari",
    },
  ],
};

export const promptTemplates = {
  tushuntir:
    "O'qituvchi sifatida, ushbu {subject} mavzusini tushuntiring: {question}. Batafsil tushuntirish va tushunchalarni sodda tilda yoritib bering.",
  yech: "O'qituvchi sifatida, ushbu {subject} masalasini yeching: {question}. Yechimni qadam-baqadam tushuntirib bering.",
  tahlil:
    "Iltimos, ushbu {subject} mavzusini tahlil qiling: {question}. Batafsil tahlil va asosiy xulosalarni keltiring.",
  solishtir:
    "Ushbu {subject} mavzusidagi turli jihatlarni solishtiring: {question}. O'xshashlik va farqlarni batafsil ko'rsating.",
  qisqacha:
    "Ushbu {subject} mavzusi bo'yicha qisqacha ma'lumot bering: {question}. Asosiy tushunchalar va xulosalarni keltiring.",
};
