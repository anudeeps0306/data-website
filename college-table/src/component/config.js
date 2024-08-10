 // config.js
const configs = {
    "Andhra Pradesh": {
      phases: {
        "Phase 1": {
          dataSource: '../../public/ap-phase-1',
          columns: [
            { field: 'College', headerName: 'College' },
            { field: 'Category', headerName: 'Category' },
            { field: 'Local_Area', headerName: 'Local Area' },
            { field: 'Allotment_Details', headerName: 'Allotment Details' },
            { field: 'Min_NEET_Rank', headerName: 'Min Cutoff' },
            { field: 'Max_NEET_Rank', headerName: 'Max Cutoff' }
          ],
          filters: {
            dropdown: {
              Category: ["OC", "SC", "ST", "BC-A", "BC-B", "BC-C", "BC-D", "BC-E", "All"],
              Local_Area: ["AU", "SVU", "APNL", "NL", "OU", "OUAPNL", "All"],
              College: [
                "Siddhartha Medical College, Vijayawada",
                "Andhra Medical College, Visakhapatnam",
                "Guntur Medical College, Guntur",
                "Rangaraya Medical College, Kakinada",
                "Government Medical College,Srikakulam",
                "Government Medical College, Ongole",
                "Government Medical College, Vizianagaram",
                "Government Medical College, Rajamahendravaram",
                "Government Medical College, Eluru",
                "Government Medical College, Machilipatnam",
                "NRI Medical College, Chinnakakani",
                "Katuri Medical College and Hospital, Guntur",
                "Alluri Seetharama Raju Academy of Medical Sciences, Eluru",
                "Konaseema Institute of Medical Sciences and Research Foundation , Amalapuram",
                "Maharaja Institute of Medical Sciences, Vizianagaram",
                "GSL Medical College, Rajamahendravaram",
                "NRI Institute of Medical Sciences, Visakhapatnam",
                "Great Eastern Medical School and Hospital , Srikakulam",
                "Nimra Institute of Medical Sciences, Vijayawada",
                "Sri Venkateswara Medical College, Tirupati",
                "Kurnool Medical College, Kurnool",
                "Government Medical College, Kadapa",
                "Government Medical College, Anantapur",
                "ACSR Government Medical College, Nellore",
                "Government Medical College, Nandyal",
                "Sri Padmavathi Medical College for Women, Tirupati (under SVIMS)",
                "Narayana Medical College, Nellore",
                "Santhiram Medical College, Nandyal",
                "Viswabharathi Medical College, Kurnool",
                "Apollo Institute of Medical Sciences and Research, Chittoor",
                "Sri Balaji Medical College Hospital and Research Institute , Renigunta, Tirupati",
                "Fathima Institute of Medical Sciences, Kadapa",
                "All"
              ]
            },
            order: {
              Min_NEET_Rank: "increase",
              Max_NEET_Rank: "decrease"
            }
          }
        },
      }
    },
    "Karnataka": {
        phases: {
          "Phase 1": {
            dataSource: '../../public/ka-phase-1',
            columns: [
              { field: 'SL_NO', headerName: 'Sl.No' },
              { field: 'Rank', headerName: 'Rank' },
              { field: 'College_Type', headerName: 'College Type' },
              { field: 'College', headerName: 'College' },
              { field: 'Course_Name', headerName: 'Course Name' },
              { field: 'Allotted_Category', headerName: 'Category' },
              { field: 'Course_fees', headerName: 'Course fees' },
            ],
            filters: {
              dropdown: {
                Allotted_Category: ['GM' ,'OPN' ,'OTH' ,'NRI' ,'RC8' ,'GMP' ,'3BG' ,'3AG' ,'3BH' ,'2BG' ,'GMPH' ,'GMR','XD' ,'1G' ,'MM', 'MA', 'ME', '3BK', 'GMKH', 'STG', 'SCG', 'SCH', 'MMH', 'MU', 'PH',"All"],
                College: [
                    'Bangalore Medical College,NO-2, Fort , K R ROAD,Bangalore',
                    'Vydehi Institute of Medical Science and Research Centre,No. 82,EPIP Area, Nallurahalli,Mahadevpura, White Field Road,Bangalore',
                    'St John Medical College,Bangalore',
                    'Kempegowda Institute of Medical Sciences,B.S.K II Stage,Near B D A Complex,Bangalore',
                    'Mysore Medical College,Irwin Road,Mysore',
                    'Sri Madhusudan Sai Institute of Medical Sciences and Research,Muddenahalli,CHIKKABALLAPURA (5 year Bond ,Conditions Apply.)',
                    'Dr. B.R. Ambedkar Medical College,Kadugondanahalli,Bangalore',
                    'M.S.Ramaiah Medical College,MSR Nagar, MSRIT Post,Mathikere,Bangalore',
                    'Adichunchanagiri Institute of Medical Sciences,B.G Nagar,Nagamangal Tq,Bellur, Mandya Dist.',
                    'Father Muller Institute of Med. Education & Research,Father Muller Road,Kankanady,Mangalore',
                    'BGS Global Institute of Medical Sciences,# 67, BGS Health & Education,City, Uttarahalli Main Road,Kengeri, Bangalore',
                    'Akash Institute of Medical Sciences and Research Centre,DEVANAHALLI,NEAR BANGALORE INTERNATIONAL,BANGALORE',
                    'A.J.Institute of Medical Sciences,NH - 66, Kuntikana,Mangalore',
                    'Jaya Jagadguru Murugharajendra Medical College,Davangere,Davangere District',
                    'M.V.J.Medical College and Research Hospital,NH-4, Dandupalya, Kolathur -,Post, Hoskote,Channasandra, Bangalore',
                    'East Point College of Medical Sciences and Research Center,Bangalore',
                    'Shymanuru Shivashankarappa Institute Of Medical Sciences,Jnanashankara, NH-4,Bypass Road,Davangere',
                    'The Oxford Medical College Hospital and Research Center,Yadavanahalli, Attibele Hobli,Anekal Taluk,Bangalore',
                    'Mahadevappa Rampure Medical College,Mahadevappa Rampure Marg,Sedam Road,Kalaburgi',
                    'Yenepoya Medical College,University Road, Nithyanandar,Deralakatte,Mangalore',
                    'Sri Basaveshwara Medical College and Hospital,NH-4,\nS.J.M.I.T  Campus,Chitradurga',
                    'Kanachur Institute of Medical Sciences and Research Centre,UNIVERSITY ROAD,NATEKAL POST,MANGALORE',
                    'S. Nijalingappa Medical College and Research Centre,Navanagara,Bagalkot',
                    'ESI Medical College,Rajajinagar,Bangalore',
                    'K.Venkataramana Gowda Medical College and Hospital,Kurunjibag,Sullia,Dakshina Kannada',
                    'Navodaya Medical College,PB No.26, Navodaya Nagar,Mantralyam Road,Raichur',
                    'Shri Atal Bihari Vajpayee Institute of Medical Science,Bengaluru',
                    'Siddaganga Medical College and Research Institute,Tumakuru',
                    'SRI CHAMUNDESHWARI MEDICAL COLLEGE, HOSPITAL AND RESEARCH INST,CHANNAPATNA, RAMANAGARA',
                    'Shridevi Institute of Medical Sciences and Research Hospital,Sira Road,Tumkur',
                    'Srinivasa Institute of Medical Research Center,Srinivas Nagar,Mukka, Surathkal,Mangalore',
                    'Al-Ameen Medical College,ADMINISTRATIVE BLOCK,Athani Road,VIJAYAPUR',
                    'Karnataka Institute of Medical Sciences,Vidyanagar,Hubli',
                    'Chikkamagaluru Institute of Medical Sciences,Chikkamagaluru',
                    'Hassan Institute of Medical Sciences,Near Chamarajendra Hospital,Hassan',
                    'Belgaum Institute of Medical Sciences,Dr B R Ambedkar Road,Belgaum',
                    'Bidar Institute of Medical Sciences,Udgir Road,Bidar',
                    'Dr. Chandramma Dayananda Sagar Institute of Medical Education,Harohalli hobli, Kanakapura Rd',
                    'Jagadguru Gangadhar Mahaswamigalu Moorusavirmath Medical College,Dharwar',
                    'Khaja Bande Navaz Institute Of Medical Sciences,Rouza Buzurq,Gulbarga',
                    'Subbaiah Institute of Medical Science,NH-13, Purle,H.H Road,Shimoga',
                    'SDM College of Medical Sciences and Hospital,Manjushree Nagar, PB ROAD,Sattur,Dharwad',
                    'Sapthagiri Institute of Medical Sciences,No.15, chikkasandra,Hesaraghatta main,Bangalore',
                    'Mandya Institute of Medical Sciences,District Hospital,Mandya',
                    'Vijayanagar Institute of Medical Sciences,Cantonment,Bellary',
                    'Kodagu Institute of Medical Sciences,MADIKERI',
                    'Chamarajanagar Institute of Medical Science,SURVEY NO 124, YADAPURA,VILLEGE, KASABA HOBLI,CHAMARAJANAGAR',
                    'Chikkaballapura Institute of Medical Science,Chikkaballapura',
                    'Karwar Institute of Medical Science,M G ROAD,KARWAR,UTTARA KANNADA',
                    'Haveri Institute of Medical Sciences,Haveri',
                    "All",
                ]
              },
              order: {
                Rank: "increase",
                Course_fees: "decrease"
              }
            }
          },
        }
      },
    // Add other states and their phases here
  };
  
  export default configs;
  