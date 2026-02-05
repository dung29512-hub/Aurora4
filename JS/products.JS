const PRODUCTS = [
  // 🧸 Plush
  { id: 1, category: "plush", price: 189000, img:"assets/img/teddy-1.jpg",
    name:{vi:"Gấu bông Aurora Bear", ko:"Aurora Bear 봉제인형", fr:"Peluche Aurora Bear", ja:"Aurora Bear ぬいぐるみ"},
    desc:{vi:"Mềm mịn, quà tặng dễ thương.", ko:"부드러운 선물용 인형.", fr:"Douce, parfaite en cadeau.", ja:"ふわふわでギフトに最適。"},
    badge:"hot"
  },
  { id: 2, category: "plush", price: 129000, img:"assets/img/teddy-2.jpg",
    name:{vi:"Gấu bông mini (12cm)", ko:"미니 인형(12cm)", fr:"Mini peluche (12cm)", ja:"ミニぬいぐるみ(12cm)"},
    desc:{vi:"Nhỏ gọn, treo balo.", ko:"가방에 달기 좋아요.", fr:"Idéal pour sac.", ja:"バッグに付けられる。"},
    badge:"new"
  },
  { id: 3, category: "plush", price: 259000, img:"assets/img/teddy-3.jpg",
    name:{vi:"Gấu ôm size lớn", ko:"대형 베어", fr:"Grande peluche", ja:"大きいぬいぐるみ"},
    desc:{vi:"Ôm siêu đã, mềm.", ko:"포근한 대형.", fr:"Très doux.", ja:"抱き心地最高。"},
    badge:""
  },

  // 🖊 Pen
  { id: 4, category: "pen", price: 59000, img:"assets/img/pen-1.jpg",
    name:{vi:"Bút bi gel 0.5 (set 5 màu)", ko:"젤펜 0.5 (5색)", fr:"Stylo gel 0.5 (x5)", ja:"ジェルペン0.5（5色）"},
    desc:{vi:"Mượt tay, học tập.", ko:"필기감 좋아요.", fr:"Écriture fluide.", ja:"書きやすい。"},
    badge:"new"
  },
  { id: 5, category: "pen", price: 29000, img:"assets/img/pen-2.jpg",
    name:{vi:"Bút bi 0.7 đen", ko:"볼펜 0.7 검정", fr:"Stylo 0.7 noir", ja:"ボールペン0.7黒"},
    desc:{vi:"Bền, rẻ, dùng hằng ngày.", ko:"데일리용.", fr:"Pour tous les jours.", ja:"普段使い。"},
    badge:""
  },
  { id: 6, category: "pen", price: 45000, img:"assets/img/pen-3.jpg",
    name:{vi:"Bút highlight pastel", ko:"파스텔 형광펜", fr:"Surligneur pastel", ja:"パステル蛍光ペン"},
    desc:{vi:"Màu nhẹ, đẹp.", ko:"색감 예쁨.", fr:"Couleurs douces.", ja:"優しい色。"},
    badge:"hot"
  },

  // 📒 Notebook
  { id: 7, category: "notebook", price: 79000, img:"assets/img/notebook-1.jpg",
    name:{vi:"Sổ tay Aurora (A5, 120 trang)", ko:"A5 노트(120p)", fr:"Cahier A5 (120p)", ja:"A5ノート(120p)"},
    desc:{vi:"Giấy dày, viết không lem.", ko:"번짐 적음.", fr:"Papier épais.", ja:"裏写りしにくい。"},
    badge:"sale"
  },
  { id: 8, category: "notebook", price: 39000, img:"assets/img/notebook-2.jpg",
    name:{vi:"Sổ kẻ ngang A6", ko:"A6 줄노트", fr:"Carnet A6 ligné", ja:"A6罫線ノート"},
    desc:{vi:"Nhỏ gọn, tiện mang.", ko:"휴대용.", fr:"Compact.", ja:"持ち運び便利。"},
    badge:""
  },

  // 🎀 Sticker / Decor
  { id: 9, category: "sticker", price: 25000, img:"assets/img/sticker-1.jpg",
    name:{vi:"Sticker cute (50 miếng)", ko:"스티커(50장)", fr:"Stickers (x50)", ja:"ステッカー50枚"},
    desc:{vi:"Trang trí sổ, laptop.", ko:"꾸미기 좋아요.", fr:"Décoration.", ja:"デコ用。"},
    badge:"new"
  },
  { id: 10, category: "sticker", price: 19000, img:"assets/img/sticker-2.jpg",
    name:{vi:"Washi tape Aurora", ko:"마스킹테이프", fr:"Washi tape", ja:"マスキングテープ"},
    desc:{vi:"Dán decor, dễ gỡ.", ko:"깔끔하게 제거.", fr:"Facile à retirer.", ja:"剥がしやすい。"},
    badge:""
  },

  // 📎 Accessories
  { id: 11, category: "accessory", price: 15000, img:"assets/img/clip-1.jpg",
    name:{vi:"Kẹp giấy (set 20)", ko:"클립(20개)", fr:"Trombones (x20)", ja:"クリップ20個"},
    desc:{vi:"Gọn gàng, chắc.", ko:"튼튼해요.", fr:"Solide.", ja:"しっかり。"},
    badge:""
  },
  { id: 12, category: "accessory", price: 22000, img:"assets/img/eraser-1.jpg",
    name:{vi:"Gôm tẩy mềm", ko:"지우개", fr:"Gomme", ja:"消しゴム"},
    desc:{vi:"Tẩy sạch, ít vụn.", ko:"깨끗이 지움.", fr:"Efface bien.", ja:"よく消える。"},
    badge:""
  },

  // 🎁 Combo
  { id: 13, category: "combo", price: 129000, img:"assets/img/stationery-1.jpg",
    name:{vi:"Combo “Study Kit”", ko:"스터디 키트", fr:"Kit d'étude", ja:"学習セット"},
    desc:{vi:"Bút + sổ + sticker (tiết kiệm).", ko:"펜+노트+스티커.", fr:"Stylo+cahier+stickers.", ja:"ペン+ノート+ステッカー。"},
    badge:"combo"
  },
  { id: 14, category: "combo", price: 99000, img:"assets/img/combo-2.jpg",
    name:{vi:"Combo “Desk Cute”", ko:"데스크 세트", fr:"Set bureau", ja:"デスクセット"},
    desc:{vi:"Trang trí bàn học xinh.", ko:"책상 꾸미기.", fr:"Décorer le bureau.", ja:"机を可愛く。"},
    badge:"sale"
  }
];
