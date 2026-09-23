// ============================================================
// TREK VISA — Global Country & City Database
// ============================================================
// International country metadata: name, ISO codes, dialing code,
// region/continent, flag emoji, and major cities.
// Cities are a best-effort set of major urban centres; the
// CityAutocomplete component ALWAYS allows manual entry when a
// city is not listed, so no applicant is ever blocked.
// ============================================================

export const COUNTRIES_DATA = [
  { name: "Afghanistan", iso2: "AF", dialCode: "+93", region: "Asia", flag: "🇦🇫", cities: ["Kabul", "Kandahar", "Herat", "Mazar-i-Sharif", "Jalalabad"] },
  { name: "Albania", iso2: "AL", dialCode: "+355", region: "Europe", flag: "🇦🇱", cities: ["Tirana", "Durrës", "Vlorë", "Shkodër", "Elbasan"] },
  { name: "Algeria", iso2: "DZ", dialCode: "+213", region: "Africa", flag: "🇩🇿", cities: ["Algiers", "Oran", "Constantine", "Annaba", "Blida"] },
  { name: "Andorra", iso2: "AD", dialCode: "+376", region: "Europe", flag: "🇦🇩", cities: ["Andorra la Vella", "Escaldes-Engordany", "Encamp"] },
  { name: "Angola", iso2: "AO", dialCode: "+244", region: "Africa", flag: "🇦🇴", cities: ["Luanda", "Huambo", "Benguela", "Lobito", "Lubango"] },
  { name: "Antigua and Barbuda", iso2: "AG", dialCode: "+1", region: "Caribbean", flag: "🇦🇬", cities: ["St. John's", "All Saints", "Liberta"] },
  { name: "Argentina", iso2: "AR", dialCode: "+54", region: "South America", flag: "🇦🇷", cities: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata", "Mar del Plata", "Tucumán"] },
  { name: "Armenia", iso2: "AM", dialCode: "+374", region: "Asia", flag: "🇦🇲", cities: ["Yerevan", "Gyumri", "Vanadzor", "Vagharshapat"] },
  { name: "Australia", iso2: "AU", dialCode: "+61", region: "Oceania", flag: "🇦🇺", cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Newcastle"] },
  { name: "Austria", iso2: "AT", dialCode: "+43", region: "Europe", flag: "🇦🇹", cities: ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt"] },
  { name: "Azerbaijan", iso2: "AZ", dialCode: "+994", region: "Asia", flag: "🇦🇿", cities: ["Baku", "Ganja", "Sumqayit", "Mingachevir", "Lankaran"] },
  { name: "Bahamas", iso2: "BS", dialCode: "+1", region: "Caribbean", flag: "🇧🇸", cities: ["Nassau", "Freeport", "West End"] },
  { name: "Bahrain", iso2: "BH", dialCode: "+973", region: "Asia", flag: "🇧🇭", cities: ["Manama", "Riffa", "Muharraq", "Hamad Town"] },
  { name: "Bangladesh", iso2: "BD", dialCode: "+880", region: "Asia", flag: "🇧🇩", cities: ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet", "Comilla"] },
  { name: "Barbados", iso2: "BB", dialCode: "+1", region: "Caribbean", flag: "🇧🇧", cities: ["Bridgetown", "Speightstown", "Oistins"] },
  { name: "Belarus", iso2: "BY", dialCode: "+375", region: "Europe", flag: "🇧🇾", cities: ["Minsk", "Gomel", "Mogilev", "Vitebsk", "Grodno", "Brest"] },
  { name: "Belgium", iso2: "BE", dialCode: "+32", region: "Europe", flag: "🇧🇪", cities: ["Brussels", "Antwerp", "Ghent", "Charleroi", "Liège", "Bruges", "Leuven"] },
  { name: "Belize", iso2: "BZ", dialCode: "+501", region: "Central America", flag: "🇧🇿", cities: ["Belize City", "Belmopan", "San Ignacio", "Orange Walk"] },
  { name: "Benin", iso2: "BJ", dialCode: "+229", region: "Africa", flag: "🇧🇯", cities: ["Porto-Novo", "Cotonou", "Parakou", "Abomey"] },
  { name: "Bhutan", iso2: "BT", dialCode: "+975", region: "Asia", flag: "🇧🇹", cities: ["Thimphu", "Phuntsholing", "Punakha", "Paro"] },
  { name: "Bolivia", iso2: "BO", dialCode: "+591", region: "South America", flag: "🇧🇴", cities: ["La Paz", "Santa Cruz", "Cochabamba", "Sucre", "Oruro", "Potosí"] },
  { name: "Bosnia and Herzegovina", iso2: "BA", dialCode: "+387", region: "Europe", flag: "🇧🇦", cities: ["Sarajevo", "Banja Luka", "Mostar", "Tuzla", "Zenica"] },
  { name: "Botswana", iso2: "BW", dialCode: "+267", region: "Africa", flag: "🇧🇼", cities: ["Gaborone", "Francistown", "Molepolole", "Maun"] },
  { name: "Brazil", iso2: "BR", dialCode: "+55", region: "South America", flag: "🇧🇷", cities: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre"] },
  { name: "Brunei", iso2: "BN", dialCode: "+673", region: "Asia", flag: "🇧🇳", cities: ["Bandar Seri Begawan", "Kuala Belait", "Seria"] },
  { name: "Bulgaria", iso2: "BG", dialCode: "+359", region: "Europe", flag: "🇧🇬", cities: ["Sofia", "Plovdiv", "Varna", "Burgas", "Ruse", "Stara Zagora"] },
  { name: "Burkina Faso", iso2: "BF", dialCode: "+226", region: "Africa", flag: "🇧🇫", cities: ["Ouagadougou", "Bobo-Dioulasso", "Koudougou", "Banfora"] },
  { name: "Burundi", iso2: "BI", dialCode: "+257", region: "Africa", flag: "🇧🇮", cities: ["Bujumbura", "Gitega", "Muyinga", "Rumonge"] },
  { name: "Cambodia", iso2: "KH", dialCode: "+855", region: "Asia", flag: "🇰🇭", cities: ["Phnom Penh", "Battambang", "Siem Reap", "Sihanoukville", "Kampong Cham"] },
  { name: "Cameroon", iso2: "CM", dialCode: "+237", region: "Africa", flag: "🇨🇲", cities: ["Douala", "Yaoundé", "Bamenda", "Bafoussam", "Garoua"] },
  { name: "Canada", iso2: "CA", dialCode: "+1", region: "North America", flag: "🇨🇦", cities: ["Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "Halifax", "Victoria"] },
  { name: "Cape Verde", iso2: "CV", dialCode: "+238", region: "Africa", flag: "🇨🇻", cities: ["Praia", "Mindelo", "Santa Maria", "Assomada"] },
  { name: "Central African Republic", iso2: "CF", dialCode: "+236", region: "Africa", flag: "🇨🇫", cities: ["Bangui", "Bimbo", "Carnot", "Berbérati"] },
  { name: "Chad", iso2: "TD", dialCode: "+235", region: "Africa", flag: "🇹🇩", cities: ["N'Djamena", "Moundou", "Sarh", "Abéché"] },
  { name: "Chile", iso2: "CL", dialCode: "+56", region: "South America", flag: "🇨🇱", cities: ["Santiago", "Valparaíso", "Concepción", "Antofagasta", "Viña del Mar", "Temuco"] },
  { name: "China", iso2: "CN", dialCode: "+86", region: "Asia", flag: "🇨🇳", cities: ["Shanghai", "Beijing", "Guangzhou", "Shenzhen", "Chengdu", "Chongqing", "Tianjin", "Wuhan", "Xi'an", "Hangzhou", "Nanjing"] },
  { name: "Colombia", iso2: "CO", dialCode: "+57", region: "South America", flag: "🇨🇴", cities: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Cúcuta", "Bucaramanga"] },
  { name: "Comoros", iso2: "KM", dialCode: "+269", region: "Africa", flag: "🇰🇲", cities: ["Moroni", "Mutsamudu", "Fomboni"] },
  { name: "Congo (Brazzaville)", iso2: "CG", dialCode: "+242", region: "Africa", flag: "🇨🇬", cities: ["Brazzaville", "Pointe-Noire", "Dolisie", "Nkayi"] },
  { name: "Congo (Kinshasa)", iso2: "CD", dialCode: "+243", region: "Africa", flag: "🇨🇩", cities: ["Kinshasa", "Lubumbashi", "Mbuji-Mayi", "Goma", "Bukavu"] },
  { name: "Costa Rica", iso2: "CR", dialCode: "+506", region: "Central America", flag: "🇨🇷", cities: ["San José", "Alajuela", "Cartago", "Heredia", "Liberia"] },
  { name: "Croatia", iso2: "HR", dialCode: "+385", region: "Europe", flag: "🇭🇷", cities: ["Zagreb", "Split", "Rijeka", "Osijek", "Zadar", "Dubrovnik"] },
  { name: "Cuba", iso2: "CU", dialCode: "+53", region: "Caribbean", flag: "🇨🇺", cities: ["Havana", "Santiago de Cuba", "Camagüey", "Holguín", "Santa Clara"] },
  { name: "Cyprus", iso2: "CY", dialCode: "+357", region: "Europe", flag: "🇨🇾", cities: ["Nicosia", "Limassol", "Larnaca", "Paphos", "Famagusta"] },
  { name: "Czech Republic", iso2: "CZ", dialCode: "+420", region: "Europe", flag: "🇨🇿", cities: ["Prague", "Brno", "Ostrava", "Plzeň", "Liberec", "Olomouc"] },
  { name: "Denmark", iso2: "DK", dialCode: "+45", region: "Europe", flag: "🇩🇰", cities: ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg", "Roskilde"] },
  { name: "Djibouti", iso2: "DJ", dialCode: "+253", region: "Africa", flag: "🇩🇯", cities: ["Djibouti", "Ali Sabieh", "Dikhil", "Tadjoura"] },
  { name: "Dominica", iso2: "DM", dialCode: "+1", region: "Caribbean", flag: "🇩🇲", cities: ["Roseau", "Portsmouth", "Marigot"] },
  { name: "Dominican Republic", iso2: "DO", dialCode: "+1", region: "Caribbean", flag: "🇩🇴", cities: ["Santo Domingo", "Santiago", "La Romana", "San Pedro de Macorís", "Puerto Plata"] },
  { name: "Ecuador", iso2: "EC", dialCode: "+593", region: "South America", flag: "🇪🇨", cities: ["Quito", "Guayaquil", "Cuenca", "Santo Domingo", "Machala"] },
  { name: "Egypt", iso2: "EG", dialCode: "+20", region: "Africa", flag: "🇪🇬", cities: ["Cairo", "Alexandria", "Giza", "Luxor", "Aswan", "Port Said", "Suez"] },
  { name: "El Salvador", iso2: "SV", dialCode: "+503", region: "Central America", flag: "🇸🇻", cities: ["San Salvador", "Santa Ana", "San Miguel", "Soyapango"] },
  { name: "Equatorial Guinea", iso2: "GQ", dialCode: "+240", region: "Africa", flag: "🇬🇶", cities: ["Malabo", "Bata", "Ebebiyin", "Mongomo"] },
  { name: "Eritrea", iso2: "ER", dialCode: "+291", region: "Africa", flag: "🇪🇷", cities: ["Asmara", "Keren", "Massawa", "Assab"] },
  { name: "Estonia", iso2: "EE", dialCode: "+372", region: "Europe", flag: "🇪🇪", cities: ["Tallinn", "Tartu", "Narva", "Pärnu", "Kohtla-Järve"] },
  { name: "Eswatini", iso2: "SZ", dialCode: "+268", region: "Africa", flag: "🇸🇿", cities: ["Mbabane", "Manzini", "Big Bend", "Siteki"] },
  { name: "Ethiopia", iso2: "ET", dialCode: "+251", region: "Africa", flag: "🇪🇹", cities: ["Addis Ababa", "Dire Dawa", "Gondar", "Mekelle", "Adama", "Hawassa"] },
  { name: "Fiji", iso2: "FJ", dialCode: "+679", region: "Oceania", flag: "🇫🇯", cities: ["Suva", "Nadi", "Lautoka", "Labasa"] },
  { name: "Finland", iso2: "FI", dialCode: "+358", region: "Europe", flag: "🇫🇮", cities: ["Helsinki", "Espoo", "Tampere", "Vantaa", "Turku", "Oulu"] },
  { name: "France", iso2: "FR", dialCode: "+33", region: "Europe", flag: "🇫🇷", cities: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Bordeaux", "Lille", "Montpellier"] },
  { name: "Gabon", iso2: "GA", dialCode: "+241", region: "Africa", flag: "🇬🇦", cities: ["Libreville", "Port-Gentil", "Franceville", "Oyem"] },
  { name: "Gambia", iso2: "GM", dialCode: "+220", region: "Africa", flag: "🇬🇲", cities: ["Banjul", "Serekunda", "Brikama", "Bakau"] },
  { name: "Georgia", iso2: "GE", dialCode: "+995", region: "Asia", flag: "🇬🇪", cities: ["Tbilisi", "Batumi", "Kutaisi", "Rustavi", "Zugdidi"] },
  { name: "Germany", iso2: "DE", dialCode: "+49", region: "Europe", flag: "🇩🇪", cities: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Düsseldorf", "Leipzig", "Dortmund", "Bremen"] },
  { name: "Ghana", iso2: "GH", dialCode: "+233", region: "Africa", flag: "🇬🇭", cities: ["Accra", "Kumasi", "Tamale", "Takoradi", "Cape Coast", "Tema"] },
  { name: "Greece", iso2: "GR", dialCode: "+30", region: "Europe", flag: "🇬🇷", cities: ["Athens", "Thessaloniki", "Patras", "Heraklion", "Larissa", "Volos"] },
  { name: "Grenada", iso2: "GD", dialCode: "+1", region: "Caribbean", flag: "🇬🇩", cities: ["St. George's", "Gouyave", "Sauteurs"] },
  { name: "Guatemala", iso2: "GT", dialCode: "+502", region: "Central America", flag: "🇬🇹", cities: ["Guatemala City", "Mixco", "Villa Nueva", "Quetzaltenango", "Escuintla"] },
  { name: "Guinea", iso2: "GN", dialCode: "+224", region: "Africa", flag: "🇬🇳", cities: ["Conakry", "Kankan", "Kindia", "Labé", "Siguiri"] },
  { name: "Guinea-Bissau", iso2: "GW", dialCode: "+245", region: "Africa", flag: "🇬🇼", cities: ["Bissau", "Bafatá", "Gabú", "Cacheu"] },
  { name: "Guyana", iso2: "GY", dialCode: "+592", region: "South America", flag: "🇬🇾", cities: ["Georgetown", "Linden", "New Amsterdam", "Anna Regina"] },
  { name: "Haiti", iso2: "HT", dialCode: "+509", region: "Caribbean", flag: "🇭🇹", cities: ["Port-au-Prince", "Cap-Haïtien", "Gonaïves", "Les Cayes"] },
  { name: "Honduras", iso2: "HN", dialCode: "+504", region: "Central America", flag: "🇭🇳", cities: ["Tegucigalpa", "San Pedro Sula", "Choloma", "La Ceiba", "El Progreso"] },
  { name: "Hungary", iso2: "HU", dialCode: "+36", region: "Europe", flag: "🇭🇺", cities: ["Budapest", "Debrecen", "Szeged", "Miskolc", "Pécs", "Győr"] },
  { name: "Iceland", iso2: "IS", dialCode: "+354", region: "Europe", flag: "🇮🇸", cities: ["Reykjavik", "Kópavogur", "Hafnarfjörður", "Akureyri"] },
  { name: "India", iso2: "IN", dialCode: "+91", region: "Asia", flag: "🇮🇳", cities: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Pune", "Jaipur", "Surat", "Lucknow", "Kochi"] },
  { name: "Indonesia", iso2: "ID", dialCode: "+62", region: "Asia", flag: "🇮🇩", cities: ["Jakarta", "Surabaya", "Bandung", "Medan", "Semarang", "Makassar", "Palembang", "Denpasar", "Yogyakarta"] },
  { name: "Iran", iso2: "IR", dialCode: "+98", region: "Asia", flag: "🇮🇷", cities: ["Tehran", "Mashhad", "Isfahan", "Karaj", "Shiraz", "Tabriz", "Ahvaz"] },
  { name: "Iraq", iso2: "IQ", dialCode: "+964", region: "Asia", flag: "🇮🇶", cities: ["Baghdad", "Basra", "Mosul", "Erbil", "Najaf", "Karbala"] },
  { name: "Ireland", iso2: "IE", dialCode: "+353", region: "Europe", flag: "🇮🇪", cities: ["Dublin", "Cork", "Limerick", "Galway", "Waterford", "Drogheda"] },
  { name: "Israel", iso2: "IL", dialCode: "+972", region: "Asia", flag: "🇮🇱", cities: ["Jerusalem", "Tel Aviv", "Haifa", "Rishon LeZion", "Petah Tikva", "Be'er Sheva", "Netanya"] },
  { name: "Italy", iso2: "IT", dialCode: "+39", region: "Europe", flag: "🇮🇹", cities: ["Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Florence", "Bologna", "Venice", "Bari"] },
  { name: "Ivory Coast", iso2: "CI", dialCode: "+225", region: "Africa", flag: "🇨🇮", cities: ["Abidjan", "Bouaké", "Yamoussoukro", "Daloa", "San-Pédro"] },
  { name: "Jamaica", iso2: "JM", dialCode: "+1", region: "Caribbean", flag: "🇯🇲", cities: ["Kingston", "Montego Bay", "Spanish Town", "Portmore", "Mandeville"] },
  { name: "Japan", iso2: "JP", dialCode: "+81", region: "Asia", flag: "🇯🇵", cities: ["Tokyo", "Yokohama", "Osaka", "Nagoya", "Sapporo", "Fukuoka", "Kobe", "Kyoto", "Kawasaki", "Saitama"] },
  { name: "Jordan", iso2: "JO", dialCode: "+962", region: "Asia", flag: "🇯🇴", cities: ["Amman", "Zarqa", "Irbid", "Russeifa", "Aqaba"] },
  { name: "Kazakhstan", iso2: "KZ", dialCode: "+7", region: "Asia", flag: "🇰🇿", cities: ["Almaty", "Astana", "Shymkent", "Karaganda", "Aktobe", "Taraz"] },
  { name: "Kenya", iso2: "KE", dialCode: "+254", region: "Africa", flag: "🇰🇪", cities: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi"] },
  { name: "Kiribati", iso2: "KI", dialCode: "+686", region: "Oceania", flag: "🇰🇮", cities: ["Tarawa", "Bairiki", "Bikenibeu"] },
  { name: "Kuwait", iso2: "KW", dialCode: "+965", region: "Asia", flag: "🇰🇼", cities: ["Kuwait City", "Hawalli", "Salmiya", "Jahra", "Farwaniya"] },
  { name: "Kyrgyzstan", iso2: "KG", dialCode: "+996", region: "Asia", flag: "🇰🇬", cities: ["Bishkek", "Osh", "Jalal-Abad", "Karakol"] },
  { name: "Laos", iso2: "LA", dialCode: "+856", region: "Asia", flag: "🇱🇦", cities: ["Vientiane", "Pakse", "Savannakhet", "Luang Prabang"] },
  { name: "Latvia", iso2: "LV", dialCode: "+371", region: "Europe", flag: "🇱🇻", cities: ["Riga", "Daugavpils", "Liepāja", "Jelgava", "Jūrmala"] },
  { name: "Lebanon", iso2: "LB", dialCode: "+961", region: "Asia", flag: "🇱🇧", cities: ["Beirut", "Tripoli", "Sidon", "Zahle", "Tyre", "Jounieh"] },
  { name: "Lesotho", iso2: "LS", dialCode: "+266", region: "Africa", flag: "🇱🇸", cities: ["Maseru", "Teyateyaneng", "Mafeteng", "Maputsoe"] },
  { name: "Liberia", iso2: "LR", dialCode: "+231", region: "Africa", flag: "🇱🇷", cities: ["Monrovia", "Gbarnga", "Kakata", "Buchanan"] },
  { name: "Libya", iso2: "LY", dialCode: "+218", region: "Africa", flag: "🇱🇾", cities: ["Tripoli", "Benghazi", "Misrata", "Zawiya", "Zliten"] },
  { name: "Liechtenstein", iso2: "LI", dialCode: "+423", region: "Europe", flag: "🇱🇮", cities: ["Vaduz", "Schaan", "Triesen", "Balzers"] },
  { name: "Lithuania", iso2: "LT", dialCode: "+370", region: "Europe", flag: "🇱🇹", cities: ["Vilnius", "Kaunas", "Klaipėda", "Šiauliai", "Panevėžys"] },
  { name: "Luxembourg", iso2: "LU", dialCode: "+352", region: "Europe", flag: "🇱🇺", cities: ["Luxembourg City", "Esch-sur-Alzette", "Differdange", "Dudelange"] },
  { name: "Madagascar", iso2: "MG", dialCode: "+261", region: "Africa", flag: "🇲🇬", cities: ["Antananarivo", "Toamasina", "Antsirabe", "Fianarantsoa", "Mahajanga"] },
  { name: "Malawi", iso2: "MW", dialCode: "+265", region: "Africa", flag: "🇲🇼", cities: ["Lilongwe", "Blantyre", "Mzuzu", "Zomba"] },
  { name: "Malaysia", iso2: "MY", dialCode: "+60", region: "Asia", flag: "🇲🇾", cities: ["Kuala Lumpur", "George Town", "Johor Bahru", "Ipoh", "Kuching", "Kota Kinabalu", "Malacca"] },
  { name: "Maldives", iso2: "MV", dialCode: "+960", region: "Asia", flag: "🇲🇻", cities: ["Malé", "Addu City", "Fuvahmulah", "Kulhudhuffushi"] },
  { name: "Mali", iso2: "ML", dialCode: "+223", region: "Africa", flag: "🇲🇱", cities: ["Bamako", "Sikasso", "Ségou", "Mopti", "Kayes"] },
  { name: "Malta", iso2: "MT", dialCode: "+356", region: "Europe", flag: "🇲🇹", cities: ["Valletta", "Birkirkara", "Mosta", "Sliema", "Rabat"] },
  { name: "Marshall Islands", iso2: "MH", dialCode: "+692", region: "Oceania", flag: "🇲🇭", cities: ["Majuro", "Ebeye", "Jabor"] },
  { name: "Mauritania", iso2: "MR", dialCode: "+222", region: "Africa", flag: "🇲🇷", cities: ["Nouakchott", "Nouadhibou", "Rosso", "Kaédi"] },
  { name: "Mauritius", iso2: "MU", dialCode: "+230", region: "Africa", flag: "🇲🇺", cities: ["Port Louis", "Curepipe", "Vacoas", "Quatre Bornes", "Rose Hill"] },
  { name: "Mexico", iso2: "MX", dialCode: "+52", region: "North America", flag: "🇲🇽", cities: ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "León", "Cancún", "Mérida"] },
  { name: "Micronesia", iso2: "FM", dialCode: "+691", region: "Oceania", flag: "🇫🇲", cities: ["Palikir", "Weno", "Kolonia"] },
  { name: "Moldova", iso2: "MD", dialCode: "+373", region: "Europe", flag: "🇲🇩", cities: ["Chișinău", "Tiraspol", "Bălți", "Bender", "Cahul"] },
  { name: "Monaco", iso2: "MC", dialCode: "+377", region: "Europe", flag: "🇲🇨", cities: ["Monaco", "Monte Carlo", "La Condamine"] },
  { name: "Mongolia", iso2: "MN", dialCode: "+976", region: "Asia", flag: "🇲🇳", cities: ["Ulaanbaatar", "Erdenet", "Darkhan", "Choibalsan"] },
  { name: "Montenegro", iso2: "ME", dialCode: "+382", region: "Europe", flag: "🇲🇪", cities: ["Podgorica", "Nikšić", "Pljevlja", "Bijelo Polje", "Cetinje"] },
  { name: "Morocco", iso2: "MA", dialCode: "+212", region: "Africa", flag: "🇲🇦", cities: ["Casablanca", "Rabat", "Marrakesh", "Fes", "Tangier", "Agadir", "Meknes"] },
  { name: "Mozambique", iso2: "MZ", dialCode: "+258", region: "Africa", flag: "🇲🇿", cities: ["Maputo", "Matola", "Beira", "Nampula", "Chimoio"] },
  { name: "Myanmar", iso2: "MM", dialCode: "+95", region: "Asia", flag: "🇲🇲", cities: ["Yangon", "Mandalay", "Naypyidaw", "Bago", "Mawlamyine"] },
  { name: "Namibia", iso2: "NA", dialCode: "+264", region: "Africa", flag: "🇳🇦", cities: ["Windhoek", "Rundu", "Walvis Bay", "Swakopmund", "Oshakati"] },
  { name: "Nauru", iso2: "NR", dialCode: "+674", region: "Oceania", flag: "🇳🇷", cities: ["Yaren", "Aiwo", "Boe"] },
  { name: "Nepal", iso2: "NP", dialCode: "+977", region: "Asia", flag: "🇳🇵", cities: ["Kathmandu", "Pokhara", "Lalitpur", "Bharatpur", "Biratnagar"] },
  { name: "Netherlands", iso2: "NL", dialCode: "+31", region: "Europe", flag: "🇳🇱", cities: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Tilburg", "Groningen"] },
  { name: "New Zealand", iso2: "NZ", dialCode: "+64", region: "Oceania", flag: "🇳🇿", cities: ["Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga", "Dunedin", "Queenstown"] },
  { name: "Nicaragua", iso2: "NI", dialCode: "+505", region: "Central America", flag: "🇳🇮", cities: ["Managua", "León", "Granada", "Masaya", "Estelí"] },
  { name: "Niger", iso2: "NE", dialCode: "+227", region: "Africa", flag: "🇳🇪", cities: ["Niamey", "Zinder", "Maradi", "Agadez", "Tahoua"] },
  { name: "Nigeria", iso2: "NG", dialCode: "+234", region: "Africa", flag: "🇳🇬", cities: ["Lagos", "Kano", "Ibadan", "Abuja", "Port Harcourt", "Benin City", "Kaduna"] },
  { name: "North Korea", iso2: "KP", dialCode: "+850", region: "Asia", flag: "🇰🇵", cities: ["Pyongyang", "Hamhung", "Chongjin", "Wonsan"] },
  { name: "North Macedonia", iso2: "MK", dialCode: "+389", region: "Europe", flag: "🇲🇰", cities: ["Skopje", "Kumanovo", "Bitola", "Prilep", "Tetovo"] },
  { name: "Norway", iso2: "NO", dialCode: "+47", region: "Europe", flag: "🇳🇴", cities: ["Oslo", "Bergen", "Trondheim", "Stavanger", "Drammen", "Tromsø"] },
  { name: "Oman", iso2: "OM", dialCode: "+968", region: "Asia", flag: "🇴🇲", cities: ["Muscat", "Salalah", "Sohar", "Nizwa", "Sur"] },
  { name: "Pakistan", iso2: "PK", dialCode: "+92", region: "Asia", flag: "🇵🇰", cities: ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Rawalpindi", "Multan", "Peshawar"] },
  { name: "Palau", iso2: "PW", dialCode: "+680", region: "Oceania", flag: "🇵🇼", cities: ["Ngerulmud", "Koror", "Airai"] },
  { name: "Palestine", iso2: "PS", dialCode: "+970", region: "Asia", flag: "🇵🇸", cities: ["Gaza", "Ramallah", "Hebron", "Nablus", "Bethlehem"] },
  { name: "Panama", iso2: "PA", dialCode: "+507", region: "Central America", flag: "🇵🇦", cities: ["Panama City", "San Miguelito", "Colón", "David", "La Chorrera"] },
  { name: "Papua New Guinea", iso2: "PG", dialCode: "+675", region: "Oceania", flag: "🇵🇬", cities: ["Port Moresby", "Lae", "Mount Hagen", "Madang"] },
  { name: "Paraguay", iso2: "PY", dialCode: "+595", region: "South America", flag: "🇵🇾", cities: ["Asunción", "Ciudad del Este", "San Lorenzo", "Luque", "Encarnación"] },
  { name: "Peru", iso2: "PE", dialCode: "+51", region: "South America", flag: "🇵🇪", cities: ["Lima", "Arequipa", "Trujillo", "Chiclayo", "Cusco", "Piura"] },
  { name: "Philippines", iso2: "PH", dialCode: "+63", region: "Asia", flag: "🇵🇭", cities: ["Manila", "Quezon City", "Davao", "Cebu City", "Makati", "Cagayan de Oro", "Bacolod"] },
  { name: "Poland", iso2: "PL", dialCode: "+48", region: "Europe", flag: "🇵🇱", cities: ["Warsaw", "Kraków", "Łódź", "Wrocław", "Poznań", "Gdańsk", "Szczecin"] },
  { name: "Portugal", iso2: "PT", dialCode: "+351", region: "Europe", flag: "🇵🇹", cities: ["Lisbon", "Porto", "Braga", "Coimbra", "Faro", "Funchal"] },
  { name: "Qatar", iso2: "QA", dialCode: "+974", region: "Asia", flag: "🇶🇦", cities: ["Doha", "Al Rayyan", "Al Wakrah", "Al Khor", "Lusail"] },
  { name: "Romania", iso2: "RO", dialCode: "+40", region: "Europe", flag: "🇷🇴", cities: ["Bucharest", "Cluj-Napoca", "Timișoara", "Iași", "Constanța", "Brașov"] },
  { name: "Russia", iso2: "RU", dialCode: "+7", region: "Europe", flag: "🇷🇺", cities: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan", "Nizhny Novgorod", "Vladivostok"] },
  { name: "Rwanda", iso2: "RW", dialCode: "+250", region: "Africa", flag: "🇷🇼", cities: ["Kigali", "Gisenyi", "Ruhengeri", "Butare"] },
  { name: "Saint Kitts and Nevis", iso2: "KN", dialCode: "+1", region: "Caribbean", flag: "🇰🇳", cities: ["Basseterre", "Charlestown", "Sandy Point"] },
  { name: "Saint Lucia", iso2: "LC", dialCode: "+1", region: "Caribbean", flag: "🇱🇨", cities: ["Castries", "Gros Islet", "Vieux Fort", "Soufrière"] },
  { name: "Saint Vincent and the Grenadines", iso2: "VC", dialCode: "+1", region: "Caribbean", flag: "🇻🇨", cities: ["Kingstown", "Georgetown", "Barrouallie"] },
  { name: "Samoa", iso2: "WS", dialCode: "+685", region: "Oceania", flag: "🇼🇸", cities: ["Apia", "Vaitele", "Faleula"] },
  { name: "San Marino", iso2: "SM", dialCode: "+378", region: "Europe", flag: "🇸🇲", cities: ["San Marino", "Serravalle", "Borgo Maggiore"] },
  { name: "Sao Tome and Principe", iso2: "ST", dialCode: "+239", region: "Africa", flag: "🇸🇹", cities: ["São Tomé", "Santana", "Trindade"] },
  { name: "Saudi Arabia", iso2: "SA", dialCode: "+966", region: "Asia", flag: "🇸🇦", cities: ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Khobar"] },
  { name: "Senegal", iso2: "SN", dialCode: "+221", region: "Africa", flag: "🇸🇳", cities: ["Dakar", "Touba", "Thiès", "Saint-Louis", "Kaolack"] },
  { name: "Serbia", iso2: "RS", dialCode: "+381", region: "Europe", flag: "🇷🇸", cities: ["Belgrade", "Novi Sad", "Niš", "Kragujevac", "Subotica"] },
  { name: "Seychelles", iso2: "SC", dialCode: "+248", region: "Africa", flag: "🇸🇨", cities: ["Victoria", "Anse Boileau", "Beau Vallon"] },
  { name: "Sierra Leone", iso2: "SL", dialCode: "+232", region: "Africa", flag: "🇸🇱", cities: ["Freetown", "Bo", "Kenema", "Makeni", "Koidu"] },
  { name: "Singapore", iso2: "SG", dialCode: "+65", region: "Asia", flag: "🇸🇬", cities: ["Singapore", "Jurong", "Tampines", "Woodlands", "Bedok"] },
  { name: "Slovakia", iso2: "SK", dialCode: "+421", region: "Europe", flag: "🇸🇰", cities: ["Bratislava", "Košice", "Prešov", "Žilina", "Banská Bystrica"] },
  { name: "Slovenia", iso2: "SI", dialCode: "+386", region: "Europe", flag: "🇸🇮", cities: ["Ljubljana", "Maribor", "Celje", "Kranj", "Velenje"] },
  { name: "Solomon Islands", iso2: "SB", dialCode: "+677", region: "Oceania", flag: "🇸🇧", cities: ["Honiara", "Auki", "Gizo"] },
  { name: "Somalia", iso2: "SO", dialCode: "+252", region: "Africa", flag: "🇸🇴", cities: ["Mogadishu", "Hargeisa", "Bosaso", "Kismayo"] },
  { name: "South Africa", iso2: "ZA", dialCode: "+27", region: "Africa", flag: "🇿🇦", cities: ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth", "Bloemfontein"] },
  { name: "South Korea", iso2: "KR", dialCode: "+82", region: "Asia", flag: "🇰🇷", cities: ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju", "Jeju"] },
  { name: "South Sudan", iso2: "SS", dialCode: "+211", region: "Africa", flag: "🇸🇸", cities: ["Juba", "Wau", "Malakal", "Yei"] },
  { name: "Spain", iso2: "ES", dialCode: "+34", region: "Europe", flag: "🇪🇸", cities: ["Madrid", "Barcelona", "Valencia", "Seville", "Bilbao", "Málaga", "Zaragoza", "Granada"] },
  { name: "Sri Lanka", iso2: "LK", dialCode: "+94", region: "Asia", flag: "🇱🇰", cities: ["Colombo", "Kandy", "Galle", "Negombo", "Jaffna", "Nuwara Eliya"] },
  { name: "Sudan", iso2: "SD", dialCode: "+249", region: "Africa", flag: "🇸🇩", cities: ["Khartoum", "Omdurman", "Port Sudan", "Kassala", "El Obeid"] },
  { name: "Suriname", iso2: "SR", dialCode: "+597", region: "South America", flag: "🇸🇷", cities: ["Paramaribo", "Lelydorp", "Nieuw Nickerie"] },
  { name: "Sweden", iso2: "SE", dialCode: "+46", region: "Europe", flag: "🇸🇪", cities: ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Linköping", "Lund"] },
  { name: "Switzerland", iso2: "CH", dialCode: "+41", region: "Europe", flag: "🇨🇭", cities: ["Zurich", "Geneva", "Basel", "Bern", "Lausanne", "Lugano", "Lucerne"] },
  { name: "Syria", iso2: "SY", dialCode: "+963", region: "Asia", flag: "🇸🇾", cities: ["Damascus", "Aleppo", "Homs", "Latakia", "Hama"] },
  { name: "Taiwan", iso2: "TW", dialCode: "+886", region: "Asia", flag: "🇹🇼", cities: ["Taipei", "Kaohsiung", "Taichung", "Tainan", "Hsinchu"] },
  { name: "Tajikistan", iso2: "TJ", dialCode: "+992", region: "Asia", flag: "🇹🇯", cities: ["Dushanbe", "Khujand", "Bokhtar", "Khorugh"] },
  { name: "Tanzania", iso2: "TZ", dialCode: "+255", region: "Africa", flag: "🇹🇿", cities: ["Dar es Salaam", "Dodoma", "Mwanza", "Arusha", "Zanzibar City", "Mbeya"] },
  { name: "Thailand", iso2: "TH", dialCode: "+66", region: "Asia", flag: "🇹🇭", cities: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Nonthaburi", "Hat Yai", "Krabi"] },
  { name: "Timor-Leste", iso2: "TL", dialCode: "+670", region: "Asia", flag: "🇹🇱", cities: ["Dili", "Baucau", "Maliana"] },
  { name: "Togo", iso2: "TG", dialCode: "+228", region: "Africa", flag: "🇹🇬", cities: ["Lomé", "Sokodé", "Kara", "Atakpamé"] },
  { name: "Tonga", iso2: "TO", dialCode: "+676", region: "Oceania", flag: "🇹🇴", cities: ["Nuku'alofa", "Neiafu", "Haveluloto"] },
  { name: "Trinidad and Tobago", iso2: "TT", dialCode: "+1", region: "Caribbean", flag: "🇹🇹", cities: ["Port of Spain", "San Fernando", "Chaguanas", "Arima"] },
  { name: "Tunisia", iso2: "TN", dialCode: "+216", region: "Africa", flag: "🇹🇳", cities: ["Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte", "Gabès"] },
  { name: "Turkey", iso2: "TR", dialCode: "+90", region: "Asia", flag: "🇹🇷", cities: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya", "Adana", "Konya"] },
  { name: "Turkmenistan", iso2: "TM", dialCode: "+993", region: "Asia", flag: "🇹🇲", cities: ["Ashgabat", "Türkmenabat", "Daşoguz", "Mary"] },
  { name: "Tuvalu", iso2: "TV", dialCode: "+688", region: "Oceania", flag: "🇹🇻", cities: ["Funafuti", "Vaiaku", "Asau"] },
  { name: "Uganda", iso2: "UG", dialCode: "+256", region: "Africa", flag: "🇺🇬", cities: ["Kampala", "Gulu", "Lira", "Mbarara", "Jinja", "Entebbe"] },
  { name: "Ukraine", iso2: "UA", dialCode: "+380", region: "Europe", flag: "🇺🇦", cities: ["Kyiv", "Kharkiv", "Odesa", "Dnipro", "Lviv", "Zaporizhzhia"] },
  { name: "United Arab Emirates", iso2: "AE", dialCode: "+971", region: "Asia", flag: "🇦🇪", cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Al Ain"] },
  { name: "United Kingdom", iso2: "GB", dialCode: "+44", region: "Europe", flag: "🇬🇧", cities: ["London", "Birmingham", "Manchester", "Glasgow", "Edinburgh", "Liverpool", "Bristol", "Leeds", "Cardiff", "Belfast"] },
  { name: "United States", iso2: "US", dialCode: "+1", region: "North America", flag: "🇺🇸", cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Francisco", "Seattle", "Miami", "Boston", "Atlanta", "Washington D.C."] },
  { name: "Uruguay", iso2: "UY", dialCode: "+598", region: "South America", flag: "🇺🇾", cities: ["Montevideo", "Salto", "Paysandú", "Maldonado", "Rivera"] },
  { name: "Uzbekistan", iso2: "UZ", dialCode: "+998", region: "Asia", flag: "🇺🇿", cities: ["Tashkent", "Samarkand", "Namangan", "Bukhara", "Andijan"] },
  { name: "Vanuatu", iso2: "VU", dialCode: "+678", region: "Oceania", flag: "🇻🇺", cities: ["Port Vila", "Luganville", "Norsup"] },
  { name: "Vatican City", iso2: "VA", dialCode: "+379", region: "Europe", flag: "🇻🇦", cities: ["Vatican City"] },
  { name: "Venezuela", iso2: "VE", dialCode: "+58", region: "South America", flag: "🇻🇪", cities: ["Caracas", "Maracaibo", "Valencia", "Barquisimeto", "Maracay"] },
  { name: "Vietnam", iso2: "VN", dialCode: "+84", region: "Asia", flag: "🇻🇳", cities: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Hai Phong", "Hue", "Nha Trang"] },
  { name: "Yemen", iso2: "YE", dialCode: "+967", region: "Asia", flag: "🇾🇪", cities: ["Sanaa", "Aden", "Taiz", "Hodeidah", "Mukalla"] },
  { name: "Zambia", iso2: "ZM", dialCode: "+260", region: "Africa", flag: "🇿🇲", cities: ["Lusaka", "Ndola", "Kitwe", "Kabwe", "Livingstone"] },
  { name: "Zimbabwe", iso2: "ZW", dialCode: "+263", region: "Africa", flag: "🇿🇼", cities: ["Harare", "Bulawayo", "Mutare", "Gweru", "Masvingo"] },
];

// Backwards-compatible sorted name list (drop-in replacement for the old COUNTRIES array)
export const COUNTRIES = COUNTRIES_DATA.map((c) => c.name).sort((a, b) => a.localeCompare(b));

const BY_NAME = new Map(COUNTRIES_DATA.map((c) => [c.name, c]));
const BY_ISO = new Map(COUNTRIES_DATA.map((c) => [c.iso2, c]));

export function getCountry(name) {
  return BY_NAME.get(name) || null;
}

export function getCountryByIso(iso2) {
  return BY_ISO.get(iso2) || null;
}

export function getDialCode(name) {
  return BY_NAME.get(name)?.dialCode || "";
}

export function getRegion(name) {
  return BY_NAME.get(name)?.region || "";
}

export function getCountryFlag(name) {
  return BY_NAME.get(name)?.flag || "🏳️";
}

export function getCities(name) {
  return BY_NAME.get(name)?.cities || [];
}

export function searchCountries(query) {
  if (!query) return COUNTRIES;
  const q = query.toLowerCase();
  return COUNTRIES_DATA.filter(
    (c) => c.name.toLowerCase().includes(q) || c.iso2.toLowerCase() === q || c.region.toLowerCase().includes(q)
  ).map((c) => c.name);
}

export const REGIONS = ["Africa", "Asia", "Caribbean", "Central America", "Europe", "North America", "Oceania", "South America"];

export function countriesByRegion(region) {
  return COUNTRIES_DATA.filter((c) => c.region === region).map((c) => c.name).sort((a, b) => a.localeCompare(b));
}