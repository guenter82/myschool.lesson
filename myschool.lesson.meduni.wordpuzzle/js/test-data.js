function QuestionData() {
	this.text;
	this.identifyingfields=new Array();
	this.answerfield;
}

QuestionData.questioncount = 15;

/* mögliche Frage- und Anwort-Felder:
 * 
   name
	birthday
	medicin
	bloodgroup
	passnumber;
	country
	picturenumber
	allergies
 * 
 */
function TestData() {
	this.questions=new Array();
	
	/*Frage: Bild -> Geburtstag */
	var newquestion=new QuestionData();
	newquestion.text="Wann hat diese Person Geburtstag?";
	newquestion.identifyingfields.push("picturenumber");
	newquestion.answerfield="birthday";
	this.questions.push(newquestion);
	
	/*Frage: Name -> Allergien */
	newquestion=new QuestionData();
	newquestion.text="Welche Allergien hat die Person $value1?";
	newquestion.identifyingfields.push("name");
	newquestion.answerfield="allergies";
	this.questions.push(newquestion);
	
	
	/*Frage: Ausweisnummer -> Land */
	newquestion=new QuestionData();
	newquestion.text="In welchem Land wurde der Ausweis der Person mit der Ausweisnummer $value1 ausgestellt?";
	newquestion.identifyingfields.push("passnumber");
	newquestion.answerfield="country";
	this.questions.push(newquestion);
	
	
	/*Frage: Allergie -> Name */
	newquestion=new QuestionData();
	newquestion.text="Welche Personen haben unter anderem eine Allergie gegen $value1?";
	newquestion.identifyingfields.push("allergies");
	newquestion.answerfield="name";
	this.questions.push(newquestion);
	
	/*Frage: Blutgruppe + Medikamente -> Name */
	newquestion=new QuestionData();
	newquestion.text="Wer hat die Blutgruppe $value1 und nimmt zudem $value2 Medikamente?";
	newquestion.identifyingfields.push("bloodgroup");
	newquestion.identifyingfields.push("medicin");
	newquestion.answerfield="name";
	this.questions.push(newquestion);
	
};







/** (Pro Datensatz 1 Name, pro Gruppe keine 2 gleichen Namen) **/
TestData.names = new Array(
"KHAN",
"GANGAI",
"LEE",
"CHAN",
"REYES",
"SIN",
"MIURA",
"GUO",
"SARMA",
"LEVIN",
"VARGAS",
"SAHIN",
"BALLA",
"AIGNER",
"DUMONT",
"HADZIC",
"FIALA",
"POULSEN",
"MÄGI",
"MÄDELÄ",
"EKLUND",
"AVRAMIDIS",
"LAKATOS",
"MARINO",
"VELLA",
"HAUGEN",
"SANCHEZ",
"WILSON",
"MACDONALD",
"RODRIGUEZ",
"SMITH",
"JOHNSON",
"OLIVIERA",
"ROJAS",
"BACHINGER",
"PAIRHUBER",
"MALLINGER",
"POMALIS",
"NOWAK",
"MÜHLBERGER",
"KRONLACHNER",
"EIGL",
"DOPPLMAIR",
"DÖRFLER",
"STUMPTNER",
"REICHL",
"ROCK",
"ROTT",
"SOIBER",
"LEINER",
"LEITNER",
"PÜHRINGER",
"NOVOTNY",
"ILSMAR",
"MEDIZI",
"TOZZI",
"TESTA",
"FELICE",
"DEMONICO",
"PELLICANO",
"TREMANTO",
"DONNA",
"ANGELOSANTO",
"SCIUTO",
"BORGOGNO",
"ROMOLO",
"BERTANI"
); //end of array names


/* Blutgruppe: (Pro Datensatz 1 Blutgruppe, pr Gruppe mehrmals die unterschiedlichen Blutgruppen) */
TestData.bloodgroup = new Array(
"A",
"B",
"AB",
"0"
); //end of array blood group

/** Bekannte Allergien: (Pro Datensatz max. 3, natürlich kann "Keine" nur allein vorkommen, innerhalb der Gruppen können Personen gleiche Allergien haben ) */
TestData.allergies = new Array(
"Tomaten",
"Hunde",
"Hausstaub",
"Katzen",
"Gräser",
"Heuschnupfen",
"Chlor",
"Orangen",
"Zitronen",
"Pollen",
"Bienen",
"Getreide",
"Nässe",
"Schimmelpilz"
); // end of array allergies

/* Ausweisnummern: (Pro Datensatz 1 Nummer, innerhalb der Gruppe keine Nummer 2 mal) */
TestData.numbers = new Array(
56951,
84593,
56982,
54723,
15698,
25647,
93241,
65789,
15478,
65896,
32051,
20351,
20013,
56932,
47152,
63985,
89547,
65841,
65998,
12504,
12658,
68425,
32014,
69584,
94863,
22658,
56985,
41526,
32015,
41587,
25967,
14520,
36521,
32569,
69547,
78542,
12548,
74859,
54789,
23698,
65897,
41256,
10235,
78569,
45792,
31547,
64775,
98547,
54125,
78965,
15447,
45871,
54788,
11541,
78112,
32156,
25413,
14584,
59874,
65123,
32514,
15563,
14523,
51421,
25145,
15871,
25446,
15478,
54781,
34781,
34122
); // end of array numbers

/* Ausstellungsland: (Pro Datensatz 1 Land, innerhalb der Gruppe können Ausstellungsländer beliebig oft vorkommen) */
TestData.countries=new Array(
"Österreich",
"Frankreich",
"Spanien",
"Tschechien",
"Italien",
"Kroatien",
"Deutschland",
"Albanien",
"Bulgarien",
"Dänemark",
"Estland",
"Finnland",
"Schweden",
"Norwegen",
"Monaco",
"Montenegro",
"Polen",
"Portugal",
"Litauen",
"Malta",
"Niederlande",
"Island",
"Griechenland",
"Belgien",
"Türkei",
"Tschechien",
"Ungarn",
"Ukraine",
"Schweiz",
"Slowenien",
"Rumänien",
"Mazedonien",
"Afghanistan",
"Albanien",
"Andorra",
"Bahamas",
"Barbados",
"Belgien",
"Brasilien",
"Chile",
"China",
"Dänemark",
"Ecuador",
"Großbritannien",
"Haitia",
"Indien",
"Iran",
"Irland",
"Jamaika",
"Japan",
"Kamerun", 
"Laos"
); // end array countries












