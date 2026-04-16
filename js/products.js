const PRODUCTS = [
  // 🧸 Plush
  { id: 1, category: "plush", price: 189000, img:"assets/img/gau-bong-aurora-bear.jpg",
    name:{vi:"Gấu bông Aurora Bear", ko:"Aurora Bear 봉제인형", fr:"Peluche Aurora Bear", ja:"Aurora Bear ぬいぐるみ"},
    desc:{vi:"Mềm mịn, quà tặng dễ thương.", ko:"부드러운 선물용 인형.", fr:"Douce, parfaite en cadeau.", ja:"ふわふわでギフトに最適。"},
    badge:"hot"
  },
  { id: 2, category: "plush", price: 129000, img:"assets/img/gau-bong-mini-12cm.jpg",
    name:{vi:"Gấu bông mini (12cm)", ko:"미니 인형(12cm)", fr:"Mini peluche (12cm)", ja:"ミニぬいぐるみ(12cm)"},
    desc:{vi:"Nhỏ gọn, treo balo.", ko:"가방에 달기 좋아요.", fr:"Idéal pour sac.", ja:"バッグに付けられる。"},
    badge:"new"
  },
  { id: 3, category: "plush", price: 259000, img:"assets/img/gau-om-size-lon.jpg",
    name:{vi:"Gấu ôm size lớn", ko:"대형 베어", fr:"Grande peluche", ja:"大きいぬいぐるみ"},
    desc:{vi:"Ôm siêu đã, mềm.", ko:"포근한 대형.", fr:"Très doux.", ja:"抱き心地最高。"},
    badge:""
  },
  
  // 🖊 Pen
  { id: 4, category: "pen", price: 59000, img:"assets/img/but-bi-gel-05.jpg",
    name:{vi:"Bút bi gel 0.5 (set 5 màu)", ko:"젤펜 0.5 (5색)", fr:"Stylo gel 0.5 (x5)", ja:"ジェルペン0.5（5色）"},
    desc:{vi:"Mượt tay, học tập.", ko:"필기감 좋아요.", fr:"Écriture fluide.", ja:"書きやすい。"},
    badge:"new"
  },
  { id: 5, category: "pen", price: 29000, img:"assets/img/but-bi-07-den.jpg",
    name:{vi:"Bút bi 0.7 đen", ko:"볼펜 0.7 검정", fr:"Stylo 0.7 noir", ja:"ボールペン0.7黒"},
    desc:{vi:"Bền, rẻ, dùng hằng ngày.", ko:"데일리용.", fr:"Pour tous les jours.", ja:"普段使い。"},
    badge:""
  },
  { id: 6, category: "pen", price: 45000, img:"assets/img/but-highlight-pastel.jpg",
    name:{vi:"Bút highlight pastel", ko:"파스텔 형광펜", fr:"Surligneur pastel", ja:"パステル蛍光ペン"},
    desc:{vi:"Màu nhẹ, đẹp.", ko:"색감 예쁨.", fr:"Couleurs douces.", ja:"優しい色。"},
    badge:"hot"
  },
  
  // 📒 Notebook
  { id: 7, category: "notebook", price: 79000, img:"assets/img/chiikawa-A5.jpg",
    name:{vi:"Sổ tay Aurora (A5, 120 trang)", ko:"A5 노트(120p)", fr:"Cahier A5 (120p)", ja:"A5ノート(120p)"},
    desc:{vi:"Giấy dày, viết không lem.", ko:"번짐 적음.", fr:"Papier épais.", ja:"裏写りしにくい。"},
    badge:"sale"
  },
  { id: 8, category: "notebook", price: 39000, img:"assets/img/chiikawa-A6.jpg",
    name:{vi:"Sổ kẻ ngang A6", ko:"A6 줄노트", fr:"Carnet A6 ligné", ja:"A6罫線ノート"},
    desc:{vi:"Nhỏ gọn, tiện mang.", ko:"휴대용.", fr:"Compact.", ja:"持ち運び便利。"},
    badge:""
  },
  { id: 55, category: "notebook", price: 95000, img:"assets/img/nb-spiral.jpg", name:{vi:"Sổ lò xo kép B5", ko:"B5 스프링 노트", fr:"Cahier à spirale B5", ja:"B5スプリングノート"}, desc:{vi:"Lật mở 360 độ.", ko:"360도 펼침.", fr:"Ouverture 360.", ja:"360度開く。"}, badge:"hot" },
  { id: 56, category: "notebook", price: 120000, img:"assets/img/nb-leather.jpg", name:{vi:"Sổ bìa da cao cấp", ko:"가죽 커버 노트", fr:"Carnet en cuir", ja:"革表紙ノート"}, desc:{vi:"Sang trọng, bền bỉ.", ko:"내구성 좋음.", fr:"Durable, chic.", ja:"高級感、耐久性。"}, badge:"hot" },
  { id: 57, category: "notebook", price: 45000, img:"assets/img/nb-grid.jpg", name:{vi:"Sổ tay Caro (Grid)", ko:"모눈 종이 노트", fr:"Carnet à carreaux", ja:"方眼ノート"}, desc:{vi:"Vẽ biểu đồ dễ dàng.", ko:"차트 그리기용.", fr:"Pour graphiques.", ja:"グラフ作成用。"}, badge:"" },
  { id: 58, category: "notebook", price: 55000, img:"assets/img/nb-dotted.jpg", name:{vi:"Sổ Bullet Journal", ko:"불렛 저널", fr:"Bullet Journal", ja:"バレットジャーナル"}, desc:{vi:"Giấy chấm Dot grid.", ko:"도트 그리드.", fr:"Pointillé.", ja:"ドット。"}, badge:"new" },
  { id: 59, category: "notebook", price: 35000, img:"assets/img/nb-mini.jpg", name:{vi:"Sổ tay mini bỏ túi", ko:"포켓 노트", fr:"Carnet de poche", ja:"ポケットノート"}, desc:{vi:"Ghi chú nhanh.", ko:"빠른 메모.", fr:"Notes rapides.", ja:"速記用。"}, badge:"" },
  { id: 60, category: "notebook", price: 180000, img:"assets/img/nb-planner.jpg", name:{vi:"Sổ kế hoạch Planner", ko:"플래너", fr:"Agenda Planner", ja:"プランナー"}, desc:{vi:"Quản lý thời gian.", ko:"시간 관리.", fr:"Gestion temps.", ja:"時間管理。"}, badge:"hot" },
  { id: 61, category: "notebook", price: 65000, img:"assets/img/nb-kraft.jpg", name:{vi:"Sổ bìa Kraft cổ điển", ko:"크라프트 노트", fr:"Carnet Kraft", ja:"クラフトノート"}, desc:{vi:"Giấy nâu thân thiện.", ko:"친환경 종이.", fr:"Papier éco.", ja:"エコ。"}, badge:"" },
  { id: 62, category: "notebook", price: 89000, img:"assets/img/nb-black.jpg", name:{vi:"Sổ giấy đen thần bí", ko:"검은 종이 노트", fr:"Carnet papier noir", ja:"黒い紙のノート"}, desc:{vi:"Dùng với bút nhũ.", ko:"메탈릭펜용.", fr:"Pour stylo gel.", ja:"ペン用。"}, badge:"" },
  { id: 63, category: "notebook", price: 42000, img:"assets/img/nb-blank.jpg", name:{vi:"Sổ tay giấy trơn", ko:"무지 노트", fr:"Carnet pages blanches", ja:"無地ノート"}, desc:{vi:"Tự do vẽ vời.", ko:"드로잉용.", fr:"Pour le dessin.", ja:"描画用。"}, badge:"" },
  { id: 64, category: "notebook", price: 75000, img:"assets/img/nb-fabric.jpg", name:{vi:"Sổ bìa vải Canvas", ko:"캔버스 커버 노트", fr:"Cahier en toile", ja:"キャンバスノート"}, desc:{vi:"Cảm giác mộc mạc.", ko:"소박한 느낌.", fr:"Toucher tissu.", ja:"布の質感。"}, badge:"" },
  { id: 65, category: "notebook", price: 110000, img:"assets/img/nb-ring.jpg", name:{vi:"Sổ còng Binder", ko:"바인더 노트", fr:"Classeur Binder", ja:"バインダーノート"}, desc:{vi:"Thay được ruột giấy.", ko:"속지 교체 가능.", fr:"Rechargeable.", ja:"詰め替え可能。"}, badge:"new" },
  { id: 66, category: "notebook", price: 28000, img:"assets/img/nb-vocab.jpg", name:{vi:"Sổ học từ vựng", ko:"단어장", fr:"Carnet vocabulaire", ja:"単語帳"}, desc:{vi:"Thiết kế chia cột.", ko:"열 분할.", fr:"Divisé en colonnes.", ja:"列分割。"}, badge:"" },
  { id: 67, category: "notebook", price: 58000, img:"assets/img/nb-water.jpg", name:{vi:"Sổ vẽ màu nước", ko:"수채화 패드", fr:"Bloc aquarelle", ja:"水彩パッド"}, desc:{vi:"Giấy dày 300gsm.", ko:"300gsm 두꺼움.", fr:"Papier 300gsm.", ja:"300gsm厚。"}, badge:"" },
  { id: 68, category: "notebook", price: 48000, img:"assets/img/nb-refill.jpg", name:{vi:"Giấy refill A5", ko:"A5 속지", fr:"Recharges A5", ja:"A5リフィル"}, desc:{vi:"Set 50 tờ kẻ ngang.", ko:"50장 세트.", fr:"Set 50 feuilles.", ja:"50枚セット。"}, badge:"" },
  { id: 69, category: "notebook", price: 135000, img:"assets/img/nb-travel.jpg", name:{vi:"Sổ tay du lịch", ko:"트래블러스 노트", fr:"Traveler's Notebook", ja:"トラベラーズノート"}, desc:{vi:"Kèm ngăn đựng thẻ.", ko:"카드 수납.", fr:"Avec porte-cartes.", ja:"カード収納付き。"}, badge:"hot" },
  { id: 70, category: "notebook", price: 39000, img:"assets/img/nb-pastel.jpg", name:{vi:"Sổ pastel mộng mơ", ko:"파스텔 노트", fr:"Cahier Pastel", ja:"パステルノート"}, desc:{vi:"Màu sắc nhẹ nhàng.", ko:"부드러운 색상.", fr:"Couleurs douces.", ja:"優しい色。"}, badge:"" },
  { id: 71, category: "notebook", price: 155000, img:"assets/img/nb-hard.jpg", name:{vi:"Sổ bìa cứng Aurora", ko:"하드커버 노트", fr:"Carnet rigide", ja:"ハードカバー"}, desc:{vi:"In họa tiết nhũ vàng.", ko:"금박 패턴.", fr:"Motif doré.", ja:"金色の模様。"}, badge:"hot" },
  { id: 72, category: "notebook", price: 25000, img:"assets/img/nb-sticky.jpg", name:{vi:"Tập giấy ghi chú", ko:"포스트잇", fr:"Bloc notes adhésif", ja:"付箋"}, desc:{vi:"Có keo dán sẵn.", ko:"접착식.", fr:"Adhésif.", ja:"接着剤付き。"}, badge:"" },
  { id: 73, category: "notebook", price: 72000, img:"assets/img/nb-zen.jpg", name:{vi:"Sổ tay thiền định", ko:"명상 노트", fr:"Carnet de méditation", ja:"瞑想ノート"}, desc:{vi:"Giấy thơm nhẹ.", ko:"은은한 향기.", fr:"Léger parfum.", ja:"ほのかな香り。"}, badge:"" },
  { id: 74, category: "notebook", price: 52000, img:"assets/img/nb-music.jpg", name:{vi:"Sổ chép nhạc", ko:"음악 공책", fr:"Cahier de musique", ja:"五線譜"}, desc:{vi:"In sẵn dòng kẻ nhạc.", ko:"오선지.", fr:"Portées musicales.", ja:"五線譜。"}, badge:""
  },

  // 🎀 Sticker / Decor
  { id: 9, category: "sticker", price: 25000, img:"assets/img/sticker-chiikawa.jpg",
    name:{vi:"Sticker cute (50 miếng)", ko:"스티커(50장)", fr:"Stickers (x50)", ja:"ステッカー50枚"},
    desc:{vi:"Trang trí sổ, laptop.", ko:"꾸미기 좋아요.", fr:"Décoration.", ja:"デコ用。"},
    badge:"new"
  },
  { id: 10, category: "sticker", price: 19000, img:"assets/img/chiikawa-washitape.jpg",
    name:{vi:"Washi tape Aurora", ko:"마스킹테이프", fr:"Washi tape", ja:"マスキングテープ"},
    desc:{vi:"Dán decor, dễ gỡ.", ko:"깔끔하게 제거.", fr:"Facile à retirer.", ja:"剥がしやすい。"},
    badge:""
  },
  
  // 📎 Accessories
  { id: 11, category: "accessory", price: 15000, img:"assets/img/kepgiay-chiikawa.jpg",
    name:{vi:"Kẹp giấy (set 20)", ko:"클립(20개)", fr:"Trombones (x20)", ja:"クリップ20個"},
    desc:{vi:"Gọn gàng, chắc.", ko:"튼튼해요.", fr:"Solide.", ja:"しっかり。"},
    badge:""
  },
  { id: 12, category: "accessory", price: 22000, img:"assets/img/chiikawa-eraser.jpg",
    name:{vi:"Gôm tẩy mềm", ko:"지우개", fr:"Gomme", ja:"消しゴム"},
    desc:{vi:"Tẩy sạch, ít vụn.", ko:"깨끗이 지움.", fr:"Efface bien.", ja:"よく消える。"},
    badge:""
  },
  

  // 🎁 Combo
  { id: 13, category: "combo", price: 129000, img:"assets/img/Study-kid-chiikawa 1.jpg",
    name:{vi:"Combo “Study Kit”", ko:"스터디 키트", fr:"Kit d'étude", ja:"学習セット"},
    desc:{vi:"Bút + sổ + sticker (tiết kiệm).", ko:"펜+노트+스티커.", fr:"Stylo+cahier+stickers.", ja:"ペン+ノート+ステッカー。"},
    badge:"combo"
  },
  { id: 14, category: "combo", price: 99000, img:"assets/img/Study-kid-chiikawa.jpg",
    name:{vi:"Combo “Desk Cute”", ko:"데스크 세트", fr:"Set bureau", ja:"デスクセット"},
    desc:{vi:"Trang trí bàn học xinh.", ko:"책상 꾸미기.", fr:"Décorer le bureau.", ja:"机を可愛く。"},
    badge:"sale"
  }
];  