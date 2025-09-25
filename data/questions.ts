export interface Question {
  question: string
  answer: string
  explanation: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  questionEn?: string
  answerEn?: string
  explanationEn?: string
}

export const questions: Question[] = [
  {
    question: "What is the difference between alternate and repetitive instructions? Give the examples in C # or Java.",
    answer:
      "Instrucțiunile alternative (if-else, switch) execută căi diferite de cod bazate pe condiții. Instrucțiunile repetitive (for, while, do-while) repetă blocuri de cod. Exemplu: if(x>0) vs for(int i=0; i<10; i++). Alternativele aleg căi, repetitivele buclează execuția.",
    explanation:
      "Instrucțiunile alternative permit programului să ia decizii și să execute diferite căi de cod. Instrucțiunile repetitive permit executarea repetată a aceluiași bloc de cod până când o condiție este îndeplinită.",
    questionEn:
      "What is the difference between alternate and repetitive instructions? Give the examples in C# or Java.",
    answerEn:
      "Alternative instructions (if-else, switch) execute different code paths based on conditions. Repetitive instructions (for, while, do-while) repeat code blocks. Example: if(x>0) vs for(int i=0; i<10; i++). Alternatives choose paths, repetitive loop execution.",
    explanationEn:
      "Alternative instructions allow the program to make decisions and execute different code paths. Repetitive instructions allow repeated execution of the same code block until a condition is met.",
    category: "Programming",
    difficulty: "medium",
  },
  {
    question: "What is a relational SGBD? What types of relationships do you know?",
    answer:
      "Un SGBD relațional organizează datele în tabele cu rânduri și coloane. Tipuri de relații: Unu-la-Unu (1:1), Unu-la-Mulți (1:N), Mulți-la-Mulți (M:N). Exemple: Persoană-Pașaport (1:1), Client-Comenzi (1:N), Studenți-Cursuri (M:N).",
    explanation:
      "SGBD-ul relațional este bazat pe modelul relațional al lui Edgar Codd. Relațiile între tabele sunt stabilite prin chei străine și permit organizarea eficientă a datelor.",
    questionEn: "What is a relational DBMS? What types of relationships do you know?",
    answerEn:
      "A relational DBMS organizes data in tables with rows and columns. Relationship types: One-to-One (1:1), One-to-Many (1:N), Many-to-Many (M:N). Examples: Person-Passport (1:1), Customer-Orders (1:N), Students-Courses (M:N).",
    explanationEn:
      "Relational DBMS is based on Edgar Codd's relational model. Relationships between tables are established through foreign keys and allow efficient data organization.",
    category: "Database",
    difficulty: "easy",
  },
  {
    question: "Describe an algorithm for sorting values in a vector.",
    answer:
      "Bubble Sort: Compară elementele adiacente, schimbă dacă sunt în ordine greșită. Repetă până nu mai sunt schimbări. Complexitate O(n²). Exemplu: [3,1,4,2] → [1,2,3,4]. Simplu dar ineficient pentru seturi mari de date.",
    explanation:
      "Bubble Sort este unul dintre cei mai simpli algoritmi de sortare, dar nu cel mai eficient. Pentru seturi mari de date, algoritmi ca Quick Sort sau Merge Sort sunt preferați.",
    questionEn: "Describe an algorithm for sorting values in a vector.",
    answerEn:
      "Bubble Sort: Compares adjacent elements, swaps if in wrong order. Repeats until no more changes. Complexity O(n²). Example: [3,1,4,2] → [1,2,3,4]. Simple but inefficient for large datasets.",
    explanationEn:
      "Bubble Sort is one of the simplest sorting algorithms, but not the most efficient. For large datasets, algorithms like Quick Sort or Merge Sort are preferred.",
    category: "Algorithms",
    difficulty: "medium",
  },
  {
    question: "What is the measure unit for information?",
    answer:
      "Bitul (cifra binară) este cea mai mică unitate - 0 sau 1. Byte = 8 biți. Unități mai mari: KB (1024 bytes), MB (1024 KB), GB (1024 MB), TB (1024 GB). Teoria informației folosește biții pentru măsurarea cantității de date.",
    explanation:
      "Sistemul binar este fundamental în informatică. Toate datele sunt reprezentate în final ca secvențe de 0 și 1, iar unitățile de măsură cresc în puteri de 2.",
    questionEn: "What is the measure unit for information?",
    answerEn:
      "The bit (binary digit) is the smallest unit - 0 or 1. Byte = 8 bits. Larger units: KB (1024 bytes), MB (1024 KB), GB (1024 MB), TB (1024 GB). Information theory uses bits to measure data quantity.",
    explanationEn:
      "The binary system is fundamental in computer science. All data is ultimately represented as sequences of 0s and 1s, and measurement units grow in powers of 2.",
    category: "Computer Science",
    difficulty: "easy",
  },
  {
    question: "Describe the binary search algorithm for a value in a vector.",
    answer:
      "Căutarea binară funcționează pe vectori sortați. Compară ținta cu elementul din mijloc. Dacă sunt egale, găsit. Dacă ținta e mai mică, caută în jumătatea stângă. Dacă mai mare, în dreapta. Repetă până găsește sau intervalul e gol. Complexitate O(log n).",
    explanation:
      "Căutarea binară este foarte eficientă pentru vectori sortați, reducând spațiul de căutare la jumătate la fiecare pas. Este mult mai rapidă decât căutarea liniară.",
    questionEn: "Describe the binary search algorithm for a value in a vector.",
    answerEn:
      "Binary search works on sorted vectors. Compares target with middle element. If equal, found. If target is smaller, search left half. If larger, search right. Repeat until found or interval is empty. Complexity O(log n).",
    explanationEn:
      "Binary search is very efficient for sorted vectors, reducing the search space by half at each step. It's much faster than linear search.",
    category: "Algorithms",
    difficulty: "medium",
  },
  {
    question: "List at least 5 SQL commands and explain their role.",
    answer:
      "SELECT - extrage date din tabele. INSERT - adaugă înregistrări noi. UPDATE - modifică înregistrări existente. DELETE - șterge înregistrări. CREATE TABLE - creează tabele noi. DROP - șterge tabele/baze de date. WHERE - filtrează rezultatele.",
    explanation:
      "Aceste comenzi SQL formează baza operațiilor CRUD (Create, Read, Update, Delete) și sunt esențiale pentru gestionarea bazelor de date relaționale.",
    questionEn: "List at least 5 SQL commands and explain their role.",
    answerEn:
      "SELECT - extracts data from tables. INSERT - adds new records. UPDATE - modifies existing records. DELETE - removes records. CREATE TABLE - creates new tables. DROP - deletes tables/databases. WHERE - filters results.",
    explanationEn:
      "These SQL commands form the basis of CRUD operations (Create, Read, Update, Delete) and are essential for managing relational databases.",
    category: "Database",
    difficulty: "easy",
  },
  {
    question: "What is the role of constructors class? What other basic fields can find in a class?",
    answer:
      "Constructorii inițializează obiectele când sunt create, setează valori inițiale. Câmpuri de bază: atribute/proprietăți (date), metode (funcții), modificatori de acces (private/public), destructori (curățare), membri statici (partajați între instanțe).",
    explanation:
      "Constructorii sunt metode speciale care se execută automat la crearea unui obiect. Ei asigură că obiectul este într-o stare validă de la început.",
    questionEn: "What is the role of class constructors? What other basic fields can be found in a class?",
    answerEn:
      "Constructors initialize objects when created, set initial values. Basic fields: attributes/properties (data), methods (functions), access modifiers (private/public), destructors (cleanup), static members (shared between instances).",
    explanationEn:
      "Constructors are special methods that execute automatically when creating an object. They ensure the object is in a valid state from the beginning.",
    category: "OOP",
    difficulty: "medium",
  },
  {
    question:
      "What do you mean by information security on the Internet? Give examples of methods to ensure information security.",
    answer:
      "Securitatea pe Internet protejează datele de accesul neautorizat, modificarea sau distrugerea. Metode: criptarea HTTPS, firewall-uri, software antivirus, parole puternice, autentificare cu doi factori, VPN-uri, actualizări regulate, practici de codare sigură.",
    explanation:
      "Securitatea informației pe Internet este crucială în era digitală. Atacurile cibernetice sunt în creștere, iar protecția datelor necesită o abordare pe mai multe niveluri.",
    questionEn:
      "What do you mean by information security on the Internet? Give examples of methods to ensure information security.",
    answerEn:
      "Internet security protects data from unauthorized access, modification, or destruction. Methods: HTTPS encryption, firewalls, antivirus software, strong passwords, two-factor authentication, VPNs, regular updates, secure coding practices.",
    explanationEn:
      "Internet information security is crucial in the digital age. Cyber attacks are increasing, and data protection requires a multi-layered approach.",
    category: "Security",
    difficulty: "medium",
  },
  {
    question: "What is an object in OOP programming?",
    answer:
      "Un obiect este o instanță a unei clase care conține date (atribute) și metode (funcții). Reprezintă entități din lumea reală. Exemplu: obiectul Mașină are atribute (culoare, model) și metode (pornește(), oprește()). Obiectele încapsulează datele și comportamentul împreună.",
    explanation:
      "Obiectele sunt fundamentul programării orientate pe obiecte. Ele permit modelarea entităților din lumea reală în cod, făcând programele mai intuitive și ușor de înțeles.",
    questionEn: "What is an object in OOP programming?",
    answerEn:
      "An object is an instance of a class that contains data (attributes) and methods (functions). It represents real-world entities. Example: Car object has attributes (color, model) and methods (start(), stop()). Objects encapsulate data and behavior together.",
    explanationEn:
      "Objects are the foundation of object-oriented programming. They allow modeling real-world entities in code, making programs more intuitive and easy to understand.",
    category: "OOP",
    difficulty: "easy",
  },
  {
    question: "Describe the encryption principles using symmetric algorithms and asymmetric algorithms.",
    answer:
      "Simetrică: Aceeași cheie pentru criptare/decriptare. Rapidă, eficientă. Exemplu: AES. Problemă: distribuția cheii. Asimetrică: Perechi de chei publice-private. Cheia publică criptează, cea privată decriptează. Mai lentă dar rezolvă distribuția cheii. Exemplu: RSA.",
    explanation:
      "Criptografia simetrică este rapidă pentru volume mari de date, dar are problema distribuției sigure a cheilor. Criptografia asimetrică rezolvă această problemă dar este mai lentă.",
    questionEn: "Describe the encryption principles using symmetric and asymmetric algorithms.",
    answerEn:
      "Symmetric: Same key for encryption/decryption. Fast, efficient. Example: AES. Problem: key distribution. Asymmetric: Public-private key pairs. Public key encrypts, private key decrypts. Slower but solves key distribution. Example: RSA.",
    explanationEn:
      "Symmetric cryptography is fast for large data volumes but has the problem of secure key distribution. Asymmetric cryptography solves this problem but is slower.",
    category: "Security",
    difficulty: "hard",
  },
  {
    question:
      "Give some examples of advantages and disadvantages in the utilisation of dynamic allocation of vectors or lists for data storage.",
    answer:
      "Avantaje: Dimensiune flexibilă, eficiență de memorie, alocare la runtime. Dezavantaje: Risc de scurgeri de memorie, fragmentare, acces mai lent decât vectorii statici, complexitate în management, potențiale erori la runtime dacă nu sunt gestionate corect.",
    explanation:
      "Alocarea dinamică oferă flexibilitate dar vine cu responsabilitatea gestionării manuale a memoriei. În limbaje moderne, garbage collection-ul automatizează acest proces.",
    questionEn:
      "Give examples of advantages and disadvantages in using dynamic allocation of vectors or lists for data storage.",
    answerEn:
      "Advantages: Flexible size, memory efficiency, runtime allocation. Disadvantages: Risk of memory leaks, fragmentation, slower access than static vectors, management complexity, potential runtime errors if not handled correctly.",
    explanationEn:
      "Dynamic allocation offers flexibility but comes with the responsibility of manual memory management. In modern languages, garbage collection automates this process.",
    category: "Programming",
    difficulty: "medium",
  },
  {
    question: "What are the main MS Access objects? Explain their role.",
    answer:
      "Tabele - stochează date în rânduri/coloane. Interogări - extrag/manipulează date. Formulare - interfață utilizator pentru introducerea datelor. Rapoarte - ieșire formatată pentru tipărire. Macrocomenzi - automatizează sarcini. Module - cod VBA pentru funcționalitate personalizată.",
    explanation:
      "Aceste obiecte formează structura de bază a unei aplicații Access, fiecare având un rol specific în gestionarea și prezentarea datelor.",
    questionEn: "What are the main MS Access objects? Explain their role.",
    answerEn:
      "Tables - store data in rows/columns. Queries - extract/manipulate data. Forms - user interface for data entry. Reports - formatted output for printing. Macros - automate tasks. Modules - VBA code for custom functionality.",
    explanationEn:
      "These objects form the basic structure of an Access application, each having a specific role in data management and presentation.",
    category: "Database",
    difficulty: "easy",
  },
  {
    question:
      "Describe, briefly, the Divide et Impera programming technique and give an example of a problem that can be solved using this technique.",
    answer:
      "Divide et Impera împarte problemele în subprobleme mai mici, le rezolvă recursiv, apoi combină rezultatele. Exemplu: MergeSort împarte vectorul în jumătăți, sortează fiecare jumătate, apoi îmbină jumătățile sortate. Eficient pentru seturi mari de date.",
    explanation:
      "Această tehnică este eficientă pentru probleme care pot fi împărțite în subprobleme similare mai mici. Complexitatea se reduce semnificativ prin această abordare.",
    questionEn:
      "Describe briefly the Divide and Conquer programming technique and give an example of a problem that can be solved using this technique.",
    answerEn:
      "Divide and Conquer splits problems into smaller subproblems, solves them recursively, then combines results. Example: MergeSort divides vector in halves, sorts each half, then merges sorted halves. Efficient for large datasets.",
    explanationEn:
      "This technique is efficient for problems that can be divided into smaller similar subproblems. Complexity is significantly reduced through this approach.",
    category: "Algorithms",
    difficulty: "hard",
  },
  {
    question: "What is Electronic Signature? Give an example of use.",
    answer:
      "Semnătura electronică autentifică documentele digitale folosind metode criptografice. Asigură integritatea documentului și identitatea semnatarului. Exemple: semnarea PDF-urilor, certificate email, contracte online, tranzacții bancare, documente guvernamentale. Folosește criptografia cu cheie publică.",
    explanation:
      "Semnătura electronică oferă același nivel de securitate ca semnătura fizică, dar pentru mediul digital. Este recunoscută legal în majoritatea țărilor.",
    questionEn: "What is Electronic Signature? Give an example of use.",
    answerEn:
      "Electronic signature authenticates digital documents using cryptographic methods. Ensures document integrity and signer identity. Examples: PDF signing, email certificates, online contracts, banking transactions, government documents. Uses public key cryptography.",
    explanationEn:
      "Electronic signature provides the same security level as physical signature, but for the digital environment. It's legally recognized in most countries.",
    category: "Security",
    difficulty: "medium",
  },
  {
    question:
      "Describe, briefly, the Backtracking programming technique and give an example of a problem that can be solved using this technique.",
    answer:
      "Backtracking explorează spațiul soluțiilor sistematic, abandonând căile care nu pot duce la soluții. Exemplu: problema N-Regine - plasează N regine pe o tablă de șah astfel încât niciuna să nu se atace. Încearcă poziții, revine când apar conflicte.",
    explanation:
      "Backtracking este util pentru probleme de optimizare și căutare unde trebuie să explorezi toate posibilitățile, dar poți elimina rapid căile nepromițătoare.",
    questionEn:
      "Describe briefly the Backtracking programming technique and give an example of a problem that can be solved using this technique.",
    answerEn:
      "Backtracking systematically explores solution space, abandoning paths that cannot lead to solutions. Example: N-Queens problem - place N queens on chessboard so none attack each other. Tries positions, backtracks when conflicts arise.",
    explanationEn:
      "Backtracking is useful for optimization and search problems where you need to explore all possibilities, but can quickly eliminate unpromising paths.",
    category: "Algorithms",
    difficulty: "hard",
  },
  {
    question: "How to instantiate an object in C # or JAVA?",
    answer:
      "C#: ClassName objectName = new ClassName(); sau var obj = new ClassName(); Java: ClassName objectName = new ClassName(); Exemplu: Car myCar = new Car(); Folosește cuvântul cheie 'new' pentru a aloca memorie și apela constructorul.",
    explanation:
      "Instanțierea unui obiect implică alocarea memoriei și inițializarea acestuia prin apelarea constructorului. Cuvântul cheie 'new' este esențial în acest proces.",
    questionEn: "How to instantiate an object in C# or Java?",
    answerEn:
      "C#: ClassName objectName = new ClassName(); or var obj = new ClassName(); Java: ClassName objectName = new ClassName(); Example: Car myCar = new Car(); Uses 'new' keyword to allocate memory and call constructor.",
    explanationEn:
      "Object instantiation involves memory allocation and initialization by calling the constructor. The 'new' keyword is essential in this process.",
    category: "Programming",
    difficulty: "easy",
  },
  {
    question: "Describe briefly the concept of recursiveness.",
    answer:
      "Recursiunea este când o funcție se apelează pe sine pentru a rezolva instanțe mai mici ale aceleiași probleme. Trebuie să aibă caz de bază pentru a opri recursiunea. Exemplu: factorial(n) = n * factorial(n-1), cazul de bază factorial(0) = 1.",
    explanation:
      "Recursiunea este o tehnică puternică de programare care poate simplifica soluțiile pentru probleme complexe, dar trebuie folosită cu atenție pentru a evita stack overflow-ul.",
    questionEn: "Describe briefly the concept of recursiveness.",
    answerEn:
      "Recursion is when a function calls itself to solve smaller instances of the same problem. Must have base case to stop recursion. Example: factorial(n) = n * factorial(n-1), base case factorial(0) = 1.",
    explanationEn:
      "Recursion is a powerful programming technique that can simplify solutions for complex problems, but must be used carefully to avoid stack overflow.",
    category: "Programming",
    difficulty: "medium",
  },
  {
    question: "What are the Artificial Intelligence? Give the examples of their applications.",
    answer:
      "IA simulează inteligența umană în mașini. Aplicații: Învățare automată (recomandări), Procesarea limbajului natural (chatbot-uri), Viziunea computerizată (recunoașterea feței), Robotica (mașini autonome), Sisteme expert (diagnosticare medicală), Jocuri (IA șah).",
    explanation:
      "Inteligența artificială este un domeniu vast care încearcă să reproducă capacitățile cognitive umane în sisteme computerizate.",
    questionEn: "What is Artificial Intelligence? Give examples of their applications.",
    answerEn:
      "AI simulates human intelligence in machines. Applications: Machine learning (recommendations), Natural language processing (chatbots), Computer vision (face recognition), Robotics (autonomous cars), Expert systems (medical diagnosis), Games (chess AI).",
    explanationEn:
      "Artificial intelligence is a vast field that attempts to reproduce human cognitive capabilities in computerized systems.",
    category: "AI",
    difficulty: "medium",
  },
  {
    question: "Explain briefly the concept of inheritance from object-oriented programming.",
    answer:
      "Moștenirea permite claselor să moștenească proprietăți și metode de la clasele părinte. Promovează reutilizarea codului și ierarhia. Exemplu: Vehicul (părinte) → Mașină, Camion (copii). Copiii moștenesc caracteristici comune, adaugă unele specifice. Relația 'este-un'.",
    explanation:
      "Moștenirea este unul din pilonii fundamentali ai OOP, permițând crearea de ierarhii de clase și reutilizarea eficientă a codului.",
    questionEn: "Explain briefly the concept of inheritance from object-oriented programming.",
    answerEn:
      "Inheritance allows classes to inherit properties and methods from parent classes. Promotes code reuse and hierarchy. Example: Vehicle (parent) → Car, Truck (children). Children inherit common characteristics, add specific ones. 'Is-a' relationship.",
    explanationEn:
      "Inheritance is one of the fundamental pillars of OOP, allowing the creation of class hierarchies and efficient code reuse.",
    category: "OOP",
    difficulty: "medium",
  },
  {
    question: "What does it mean and what is following by optimizing a webpage?",
    answer:
      "Optimizarea web îmbunătățește performanța paginii, viteza de încărcare și experiența utilizatorului. Include: comprimarea imaginilor, minificarea codului, utilizarea cache-ului, folosirea CDN, reducerea cererilor HTTP, optimizarea CSS/JS, design responsiv, îmbunătățiri SEO.",
    explanation:
      "Optimizarea web este crucială pentru experiența utilizatorului și pentru clasamentul în motoarele de căutare. O pagină lentă poate pierde mulți vizitatori.",
    questionEn: "What does it mean and what follows from optimizing a webpage?",
    answerEn:
      "Web optimization improves page performance, loading speed and user experience. Includes: image compression, code minification, caching, CDN usage, reducing HTTP requests, CSS/JS optimization, responsive design, SEO improvements.",
    explanationEn:
      "Web optimization is crucial for user experience and search engine rankings. A slow page can lose many visitors.",
    category: "Web Development",
    difficulty: "medium",
  },
  {
    question: "Explain briefly the concepts of cryptology, cryptography and cryptanalysis.",
    answer:
      "Criptologia este știința comunicării secrete. Criptografia creează metode de comunicare sigură (criptare). Criptanaliza sparge sistemele criptografice (decriptare fără chei). Împreună formează domeniul securității informației și creării/spargerii codurilor.",
    explanation:
      "Aceste trei concepte sunt interconectate și formează baza securității informatice moderne. Criptologia este termenul general care le cuprinde pe celelalte două.",
    questionEn: "Explain briefly the concepts of cryptology, cryptography and cryptanalysis.",
    answerEn:
      "Cryptology is the science of secret communication. Cryptography creates secure communication methods (encryption). Cryptanalysis breaks cryptographic systems (decryption without keys). Together they form the field of information security and code making/breaking.",
    explanationEn:
      "These three concepts are interconnected and form the basis of modern computer security. Cryptology is the general term that encompasses the other two.",
    category: "Security",
    difficulty: "hard",
  },
  {
    question: "What is the polymorphism in C # or JAVA? Give the examples.",
    answer:
      "Polimorfismul permite obiectelor de tipuri diferite să fie tratate ca instanțe ale aceluiași tip. Suprascrierea metodelor (runtime) și supraîncărcarea (compile-time). Exemplu: Animal.makeSound() implementat diferit în Dog.bark() și Cat.meow().",
    explanation:
      "Polimorfismul este un concept fundamental în OOP care permite flexibilitatea și extensibilitatea codului prin tratarea uniformă a obiectelor diferite.",
    questionEn: "What is polymorphism in C# or Java? Give examples.",
    answerEn:
      "Polymorphism allows objects of different types to be treated as instances of the same type. Method overriding (runtime) and overloading (compile-time). Example: Animal.makeSound() implemented differently in Dog.bark() and Cat.meow().",
    explanationEn:
      "Polymorphism is a fundamental concept in OOP that allows code flexibility and extensibility through uniform treatment of different objects.",
    category: "OOP",
    difficulty: "hard",
  },
  {
    question: "What is the relational SGBD? What types of SGBD relationships do you know?",
    answer:
      "SGBD relațional stochează datele în tabele corelate. Tipuri de relații: Unu-la-Unu (persoană-pașaport), Unu-la-Mulți (client-comenzi), Mulți-la-Mulți (studenți-cursuri). Folosește chei străine pentru a stabili relații între tabele.",
    explanation:
      "Sistemele de gestiune a bazelor de date relaționale sunt fundamentul majorității aplicațiilor moderne de baze de date.",
    questionEn: "What is a relational DBMS? What types of DBMS relationships do you know?",
    answerEn:
      "Relational DBMS stores data in correlated tables. Relationship types: One-to-One (person-passport), One-to-Many (customer-orders), Many-to-Many (students-courses). Uses foreign keys to establish relationships between tables.",
    explanationEn: "Relational database management systems are the foundation of most modern database applications.",
    category: "Database",
    difficulty: "medium",
  },
  {
    question:
      "Describe briefly the Divide et Impera programming technique and give an example of a problem that can be solved using this technique.",
    answer:
      "Divide et Impera împarte recursiv problemele în subprobleme mai mici. Pași: Împarte, Cucerește (rezolvă subproblemele), Combină rezultatele. Exemple: MergeSort, QuickSort, Căutarea Binară. Eficient pentru probleme cu structură optimă de subprobleme.",
    explanation:
      "Această tehnică reduce complexitatea problemelor prin împărțirea lor în părți mai mici și mai ușor de gestionat.",
    questionEn:
      "Describe briefly the Divide and Conquer programming technique and give an example of a problem that can be solved using this technique.",
    answerEn:
      "Divide and Conquer recursively divides problems into smaller subproblems. Steps: Divide, Conquer (solve subproblems), Combine results. Examples: MergeSort, QuickSort, Binary Search. Efficient for problems with optimal subproblem structure.",
    explanationEn: "This technique reduces problem complexity by dividing them into smaller, more manageable parts.",
    category: "Algorithms",
    difficulty: "hard",
  },
  {
    question:
      "What do you mean by information security on the Internet? Give the examples of the methods to ensure information security.",
    answer:
      "Securitatea pe Internet protejează confidențialitatea, integritatea și disponibilitatea datelor. Metode: criptarea SSL/TLS, firewall-uri, detectarea intruziunilor, controlul accesului, autentificarea, certificate digitale, protocoale sigure, audituri regulate de securitate.",
    explanation:
      "Securitatea informației pe Internet necesită o abordare pe mai multe niveluri pentru a proteja împotriva diverselor tipuri de amenințări cibernetice.",
    questionEn:
      "What do you mean by information security on the Internet? Give examples of methods to ensure information security.",
    answerEn:
      "Internet security protects data confidentiality, integrity and availability. Methods: SSL/TLS encryption, firewalls, intrusion detection, access control, authentication, digital certificates, secure protocols, regular security audits.",
    explanationEn:
      "Internet information security requires a multi-layered approach to protect against various types of cyber threats.",
    category: "Security",
    difficulty: "medium",
  },
  {
    question: "Describe briefly the concept of recursivity.",
    answer:
      "Recursiunea rezolvă problemele împărțindu-le în probleme similare mai mici. Funcția se apelează pe sine cu parametri modificați. Necesită caz de bază pentru terminare. Exemple: factorial, Fibonacci, traversarea arborilor. Poate fi elegantă dar poate cauza stack overflow.",
    explanation:
      "Recursiunea este o tehnică puternică care poate simplifica codul pentru anumite tipuri de probleme, dar trebuie folosită cu prudență.",
    questionEn: "Describe briefly the concept of recursivity.",
    answerEn:
      "Recursion solves problems by dividing them into smaller similar problems. Function calls itself with modified parameters. Requires base case for termination. Examples: factorial, Fibonacci, tree traversal. Can be elegant but may cause stack overflow.",
    explanationEn:
      "Recursion is a powerful technique that can simplify code for certain types of problems, but must be used with caution.",
    category: "Programming",
    difficulty: "medium",
  },
  {
    question: "What does mean OOP inheritance? What kind of inheritance exists in C #?",
    answer:
      "Moștenirea OOP creează clase noi bazate pe cele existente. C# suportă: Moștenire simplă (o clasă de bază), Moștenire de interfață (interfețe multiple), Moștenire ierarhică. Folosește sintaxa 'class Child : Parent'. Nu există moștenire multiplă de clase.",
    explanation:
      "C# permite moștenirea de la o singură clasă de bază, dar poate implementa multiple interfețe, oferind flexibilitate fără complexitatea moștenirii multiple.",
    questionEn: "What does OOP inheritance mean? What kind of inheritance exists in C#?",
    answerEn:
      "OOP inheritance creates new classes based on existing ones. C# supports: Single inheritance (one base class), Interface inheritance (multiple interfaces), Hierarchical inheritance. Uses 'class Child : Parent' syntax. No multiple class inheritance exists.",
    explanationEn:
      "C# allows inheritance from a single base class but can implement multiple interfaces, providing flexibility without the complexity of multiple inheritance.",
    category: "OOP",
    difficulty: "medium",
  },
  {
    question: "What are the main technologies for making a web page?",
    answer:
      "Frontend: HTML (structură), CSS (stilizare), JavaScript (interactivitate). Backend: Limbaje server (PHP, Python, Java, C#), baze de date (MySQL, PostgreSQL). Framework-uri: React, Angular, Vue.js. Instrumente: Node.js, webpack, controlul versiunilor (Git).",
    explanation:
      "Dezvoltarea web modernă implică o combinație de tehnologii frontend și backend, plus diverse instrumente pentru dezvoltare și deployment.",
    questionEn: "What are the main technologies for making a web page?",
    answerEn:
      "Frontend: HTML (structure), CSS (styling), JavaScript (interactivity). Backend: Server languages (PHP, Python, Java, C#), databases (MySQL, PostgreSQL). Frameworks: React, Angular, Vue.js. Tools: Node.js, webpack, version control (Git).",
    explanationEn:
      "Modern web development involves a combination of frontend and backend technologies, plus various tools for development and deployment.",
    category: "Web Development",
    difficulty: "easy",
  },
  {
    question: "What is the relational SGBD? Explain the concept of normalization.",
    answer:
      "SGBD relațional organizează datele în tabele. Normalizarea elimină redundanța și dependența. Forme normale: 1NF (valori atomice), 2NF (fără dependențe parțiale), 3NF (fără dependențe tranzitive). Reduce spațiul de stocare și anomaliile de actualizare.",
    explanation:
      "Normalizarea este un proces crucial în designul bazelor de date pentru a asigura eficiența și consistența datelor.",
    questionEn: "What is a relational DBMS? Explain the concept of normalization.",
    answerEn:
      "Relational DBMS organizes data in tables. Normalization eliminates redundancy and dependency. Normal forms: 1NF (atomic values), 2NF (no partial dependencies), 3NF (no transitive dependencies). Reduces storage space and update anomalies.",
    explanationEn: "Normalization is a crucial process in database design to ensure data efficiency and consistency.",
    category: "Database",
    difficulty: "hard",
  },
  {
    question: "What is the difference between .NET Framework and .NET Core?",
    answer:
      ".NET Framework: Doar Windows, complet, aplicații legacy. .NET Core: Cross-platform (Windows, Linux, macOS), ușor, modern, open-source, performanță mai bună. .NET 5+ a unificat ambele într-o singură platformă.",
    explanation:
      "Evoluția de la .NET Framework la .NET Core și apoi la .NET 5+ reflectă trecerea Microsoft către o abordare mai modernă și cross-platform.",
    questionEn: "What is the difference between .NET Framework and .NET Core?",
    answerEn:
      ".NET Framework: Windows only, full-featured, legacy applications. .NET Core: Cross-platform (Windows, Linux, macOS), lightweight, modern, open-source, better performance. .NET 5+ unified both into single platform.",
    explanationEn:
      "The evolution from .NET Framework to .NET Core and then to .NET 5+ reflects Microsoft's move towards a more modern and cross-platform approach.",
    category: "Programming",
    difficulty: "medium",
  },
  {
    question: "How is implemented exception handling in C#?",
    answer:
      "C# folosește blocuri try-catch-finally. Try conține cod riscant, catch gestionează excepții specifice, finally execută cod de curățare. Poate arunca excepții personalizate. Exemplu: try { cod riscant } catch(Exception ex) { gestionează } finally { curățare }.",
    explanation:
      "Gestionarea excepțiilor în C# permite tratarea elegantă a erorilor și asigură că resursele sunt eliberate corespunzător.",
    questionEn: "How is exception handling implemented in C#?",
    answerEn:
      "C# uses try-catch-finally blocks. Try contains risky code, catch handles specific exceptions, finally executes cleanup code. Can throw custom exceptions. Example: try { risky code } catch(Exception ex) { handle } finally { cleanup }.",
    explanationEn:
      "Exception handling in C# allows elegant error treatment and ensures resources are properly released.",
    category: "Programming",
    difficulty: "medium",
  },
  {
    question: "What are value types and what are reference types in C#? Examples.",
    answer:
      "Tipurile valoare stochează datele direct (int, bool, struct, enum). Stocate pe stack. Tipurile referință stochează adrese de memorie (class, string, array, interface). Stocate pe heap. Tipurile valoare se copiază prin valoare, cele referință prin referință.",
    explanation:
      "Înțelegerea diferenței între tipurile valoare și referință este fundamentală pentru gestionarea eficientă a memoriei în C#.",
    questionEn: "What are value types and reference types in C#? Examples.",
    answerEn:
      "Value types store data directly (int, bool, struct, enum). Stored on stack. Reference types store memory addresses (class, string, array, interface). Stored on heap. Value types copy by value, reference types by reference.",
    explanationEn:
      "Understanding the difference between value and reference types is fundamental for efficient memory management in C#.",
    category: "Programming",
    difficulty: "hard",
  },
  {
    question: "What is ADO.NET?",
    answer:
      "ADO.NET este tehnologia de acces la date a Microsoft pentru aplicațiile .NET. Oferă clase pentru conectarea la baze de date, executarea comenzilor, extragerea datelor. Componente cheie: Connection, Command, DataReader, DataSet, DataAdapter. Suportă diverse baze de date.",
    explanation:
      "ADO.NET este fundamentul accesului la date în ecosistemul .NET, oferind o interfață consistentă pentru diverse surse de date.",
    questionEn: "What is ADO.NET?",
    answerEn:
      "ADO.NET is Microsoft's data access technology for .NET applications. Provides classes for connecting to databases, executing commands, retrieving data. Key components: Connection, Command, DataReader, DataSet, DataAdapter. Supports various databases.",
    explanationEn:
      "ADO.NET is the foundation of data access in the .NET ecosystem, providing a consistent interface for various data sources.",
    category: "Database",
    difficulty: "medium",
  },
  {
    question: "What is the difference between Waterfall and Agile methodologies?",
    answer:
      "Waterfall are etape fixe și documentație detaliată, iar testarea se face la final. Agile este flexibil, colaborează constant cu clientul și livrează rapid, fiind adaptabil la schimbări. Waterfall e ideal pentru cerințe clare, în timp ce Agile se potrivește cu cerințe care se schimbă frecvent.",
    explanation:
      "Alegerea între Waterfall și Agile depinde de natura proiectului, stabilitatea cerințelor și preferințele echipei de dezvoltare.",
    questionEn: "What is the difference between Waterfall and Agile methodologies?",
    answerEn:
      "Waterfall: Sequential phases, rigid structure, extensive documentation, late testing. Agile: Iterative development, flexible, customer collaboration, early delivery, adaptable to changes. Waterfall suits stable requirements, Agile suits changing requirements.",
    explanationEn:
      "The choice between Waterfall and Agile depends on project nature, requirement stability, and development team preferences.",
    category: "Software Engineering",
    difficulty: "medium",
  },
  {
    question: "What are the software project life cycles?",
    answer:
      "Fazele SDLC: Planificare, Analiză, Design, Implementare, Testare, Deployment, Mentenanță. Modele: Waterfall (secvențial), Agile (iterativ), Spiral (orientat pe risc), V-Model (focusat pe verificare), DevOps (integrare/deployment continuu).",
    explanation:
      "Ciclul de viață al dezvoltării software oferă un cadru structurat pentru gestionarea proiectelor de software de la concepție la mentenanță.",
    questionEn: "What are the software project life cycles?",
    answerEn:
      "SDLC phases: Planning, Analysis, Design, Implementation, Testing, Deployment, Maintenance. Models: Waterfall (sequential), Agile (iterative), Spiral (risk-oriented), V-Model (verification-focused), DevOps (continuous integration/deployment).",
    explanationEn:
      "Software development life cycle provides a structured framework for managing software projects from conception to maintenance.",
    category: "Software Engineering",
    difficulty: "medium",
  },
  {
    question: "Define Scrum in Agile methodology.",
    answer:
      "Scrum este un framework Agile cu roluri (Product Owner, Scrum Master, Echipa), evenimente (Sprint, Daily Standup, Sprint Review, Retrospectivă), artefacte (Product Backlog, Sprint Backlog, Increment). Se concentrează pe livrarea iterativă și îmbunătățirea continuă.",
    explanation:
      "Scrum oferă o structură clară pentru echipele Agile, cu roluri și procese bine definite pentru a asigura livrarea eficientă a produsului.",
    questionEn: "Define Scrum in Agile methodology.",
    answerEn:
      "Scrum is an Agile framework with roles (Product Owner, Scrum Master, Team), events (Sprint, Daily Standup, Sprint Review, Retrospective), artifacts (Product Backlog, Sprint Backlog, Increment). Focuses on iterative delivery and continuous improvement.",
    explanationEn:
      "Scrum provides a clear structure for Agile teams, with well-defined roles and processes to ensure efficient product delivery.",
    category: "Software Engineering",
    difficulty: "medium",
  },
  {
    question: "Define Estimation process in Agile methodology.",
    answer:
      "Estimarea Agile folosește dimensionarea relativă în loc de timp absolut. Tehnici: Story Points (secvența Fibonacci), Planning Poker, dimensionarea T-shirt. Bazată pe complexitate, efort și risc. Re-estimată regulat pe măsură ce înțelegerea se îmbunătățește.",
    explanation:
      "Estimarea în Agile este mai mult despre dimensionarea relativă și complexitate decât despre timp exact, permițând mai multă flexibilitate.",
    questionEn: "Define the Estimation process in Agile methodology.",
    answerEn:
      "Agile estimation uses relative sizing instead of absolute time. Techniques: Story Points (Fibonacci sequence), Planning Poker, T-shirt sizing. Based on complexity, effort and risk. Re-estimated regularly as understanding improves.",
    explanationEn:
      "Agile estimation is more about relative sizing and complexity than exact time, allowing for more flexibility.",
    category: "Software Engineering",
    difficulty: "hard",
  },
  {
    question: "Explain the Turing test",
    answer:
      "Testul Turing evaluează inteligența mașinii. Un judecător uman conversează cu un om și o mașină prin text. Dacă judecătorul nu poate distinge care este mașina, mașina trece testul. Propus de Alan Turing în 1950 ca criteriu pentru inteligența artificială.",
    explanation:
      "Testul Turing rămâne unul dintre cele mai cunoscute criterii pentru evaluarea inteligenței artificiale, deși este subiect de dezbateri.",
    questionEn: "Explain the Turing test.",
    answerEn:
      "The Turing test evaluates machine intelligence. A human judge converses with a human and machine through text. If the judge cannot distinguish which is the machine, the machine passes the test. Proposed by Alan Turing in 1950 as a criterion for artificial intelligence.",
    explanationEn:
      "The Turing test remains one of the most well-known criteria for evaluating artificial intelligence, though it is subject to debate.",
    category: "AI",
    difficulty: "medium",
  },
  {
    question: 'Are Siri (Apple) or Alexa (Amazon) "intelligent"? How about IBM Watson? Explain.',
    answer:
      "Siri/Alexa arată IA îngustă - sarcini specializate precum recunoașterea vocii, procesarea limbajului natural. Nu inteligență generală. IBM Watson demonstrează recunoașterea avansată de tipare și analiza datelor dar îi lipsește conștiința sau raționamentul general. Toate sunt IA sofisticate dar limitate.",
    explanation:
      "Aceste sisteme demonstrează IA îngustă foarte avansată, dar sunt departe de inteligența generală umană sau conștiința adevărată.",
    questionEn: 'Are Siri (Apple) or Alexa (Amazon) "intelligent"? How about IBM Watson? Explain.',
    answerEn:
      "Siri/Alexa show narrow AI - specialized tasks like voice recognition, natural language processing. Not general intelligence. IBM Watson demonstrates advanced pattern recognition and data analysis but lacks consciousness or general reasoning. All are sophisticated but limited AI.",
    explanationEn:
      "These systems demonstrate very advanced narrow AI, but are far from human general intelligence or true consciousness.",
    category: "AI",
    difficulty: "hard",
  },
  {
    question: "What is an expert system?",
    answer:
      "Sistemul expert imită luarea deciziilor unui expert uman în domenii specifice. Conține baza de cunoștințe (fapte, reguli) și motorul de inferență (raționament). Exemple: sisteme de diagnosticare medicală, planificare financiară, depanare. Folosește reguli if-then pentru rezolvarea problemelor.",
    explanation:
      "Sistemele expert au fost printre primele aplicații practice ale IA, capturând expertiza umană în domenii specializate.",
    questionEn: "What is an expert system?",
    answerEn:
      "Expert system mimics human expert decision-making in specific domains. Contains knowledge base (facts, rules) and inference engine (reasoning). Examples: medical diagnosis systems, financial planning, troubleshooting. Uses if-then rules for problem solving.",
    explanationEn:
      "Expert systems were among the first practical applications of AI, capturing human expertise in specialized domains.",
    category: "AI",
    difficulty: "medium",
  },
  {
    question: "What is fuzzy logic?",
    answer:
      "Logica fuzzy gestionează incertitudinea și adevărul parțial. Spre deosebire de logica binară (adevărat/fals), folosește grade de adevăr (0 la 1). Exemplu: temperatura poate fi 'oarecum caldă' (0.7). Folosită în sisteme de control, IA, luarea deciziilor unde precizia nu este absolută.",
    explanation:
      "Logica fuzzy permite gestionarea informațiilor imprecise și incerte, fiind utilă în multe aplicații din lumea reală.",
    questionEn: "What is fuzzy logic?",
    answerEn:
      "Fuzzy logic handles uncertainty and partial truth. Unlike binary logic (true/false), uses degrees of truth (0 to 1). Example: temperature can be 'somewhat warm' (0.7). Used in control systems, AI, decision-making where precision isn't absolute.",
    explanationEn:
      "Fuzzy logic allows handling imprecise and uncertain information, being useful in many real-world applications.",
    category: "AI",
    difficulty: "hard",
  },
  {
    question: "What do we mean by a neuromorphic computer?",
    answer:
      "Calculul neuromorfic imită structura și funcția creierului. Folosește neuroni și sinapse artificiale, procesează informația ca rețelele neurale biologice. Avantaje: consum redus de energie, procesare paralelă, capacitate de învățare. Exemple: cipurile Intel Loihi, IBM TrueNorth.",
    explanation:
      "Calculul neuromorfic reprezintă o abordare revoluționară care încearcă să reproducă eficiența și capacitățile creierului uman.",
    questionEn: "What do we mean by a neuromorphic computer?",
    answerEn:
      "Neuromorphic computing mimics brain structure and function. Uses artificial neurons and synapses, processes information like biological neural networks. Advantages: low energy consumption, parallel processing, learning capability. Examples: Intel Loihi chips, IBM TrueNorth.",
    explanationEn:
      "Neuromorphic computing represents a revolutionary approach that attempts to reproduce the efficiency and capabilities of the human brain.",
    category: "AI",
    difficulty: "hard",
  },
  {
    question: "What is a perceptron?",
    answer:
      "Perceptronul este cea mai simplă rețea neurală artificială - un singur neuron cu intrări ponderate, bias și funcție de activare. Efectuează clasificare binară. Ia intrări, înmulțește cu ponderi, adaugă bias, aplică funcția prag. Fundația rețelelor neurale moderne.",
    explanation:
      "Perceptronul a fost unul dintre primele modele de rețele neurale și rămâne fundamental pentru înțelegerea IA moderne.",
    questionEn: "What is a perceptron?",
    answerEn:
      "Perceptron is the simplest artificial neural network - single neuron with weighted inputs, bias and activation function. Performs binary classification. Takes inputs, multiplies by weights, adds bias, applies threshold function. Foundation of modern neural networks.",
    explanationEn:
      "The perceptron was one of the first neural network models and remains fundamental to understanding modern AI.",
    category: "AI",
    difficulty: "medium",
  },
  {
    question: "What is an activation function? Give examples.",
    answer:
      "Funcția de activare determină ieșirea neuronului bazată pe suma intrărilor. Introduce non-linearitate. Exemple: Sigmoid (interval 0-1), ReLU (max(0,x)), Tanh (-1 la 1), Softmax (distribuție de probabilitate). Esențială pentru învățarea tiparelor complexe în rețelele neurale.",
    explanation:
      "Funcțiile de activare sunt cruciale pentru capacitatea rețelelor neurale de a învăța și modela relații complexe non-liniare.",
    questionEn: "What is an activation function? Give examples.",
    answerEn:
      "Activation function determines neuron output based on input sum. Introduces non-linearity. Examples: Sigmoid (0-1 range), ReLU (max(0,x)), Tanh (-1 to 1), Softmax (probability distribution). Essential for learning complex patterns in neural networks.",
    explanationEn:
      "Activation functions are crucial for neural networks' ability to learn and model complex non-linear relationships.",
    category: "AI",
    difficulty: "hard",
  },
  {
    question: 'What do we mean by a "learning algorithm"? How are they classified?',
    answer:
      "Algoritmii de învățare permit mașinilor să îmbunătățească performanța prin experiență. Clasificări: Supervizat (date etichetate), Nesupervizat (găsirea tiparelor), Reinforcement (bazat pe recompense), Semi-supervizat (date mixte). Exemple: regresia, clustering, Q-learning.",
    explanation:
      "Algoritmii de învățare sunt inima inteligenței artificiale, permițând sistemelor să se adapteze și să îmbunătățească performanța.",
    questionEn: 'What do we mean by a "learning algorithm"? How are they classified?',
    answerEn:
      "Learning algorithms enable machines to improve performance through experience. Classifications: Supervised (labeled data), Unsupervised (pattern finding), Reinforcement (reward-based), Semi-supervised (mixed data). Examples: regression, clustering, Q-learning.",
    explanationEn:
      "Learning algorithms are the heart of artificial intelligence, enabling systems to adapt and improve performance.",
    category: "AI",
    difficulty: "hard",
  },
  {
    question: "What is the backpropagation algorithm and how does it work.",
    answer:
      "Backpropagation antrenează rețelele neurale propagând erorile înapoi. Trecerea înainte calculează ieșirea, trecerea înapoi calculează gradienții, ponderile se actualizează folosind gradient descent. Minimizează eroarea între ieșirile prezise și cele reale prin ajustări iterative ale ponderilor.",
    explanation:
      "Backpropagation este algoritmul fundamental care a făcut posibilă antrenarea eficientă a rețelelor neurale profunde.",
    questionEn: "What is the backpropagation algorithm and how does it work?",
    answerEn:
      "Backpropagation trains neural networks by propagating errors backward. Forward pass calculates output, backward pass calculates gradients, weights update using gradient descent. Minimizes error between predicted and actual outputs through iterative weight adjustments.",
    explanationEn:
      "Backpropagation is the fundamental algorithm that made efficient training of deep neural networks possible.",
    category: "AI",
    difficulty: "hard",
  },
  {
    question: "What does Deep Neural Networks and Deep Learning mean?",
    answer:
      "Rețelele Neurale Profunde au multiple straturi ascunse (de obicei 3+). Deep Learning folosește aceste rețele pentru a învăța reprezentări ierarhice. Fiecare strat învață caracteristici din ce în ce mai complexe. Permite performanțe revoluționare în recunoașterea imaginilor, NLP, procesarea vorbirii.",
    explanation:
      "Deep Learning a revoluționat IA prin capacitatea de a învăța automat caracteristici complexe din date brute.",
    questionEn: "What do Deep Neural Networks and Deep Learning mean?",
    answerEn:
      "Deep Neural Networks have multiple hidden layers (usually 3+). Deep Learning uses these networks to learn hierarchical representations. Each layer learns increasingly complex features. Enables breakthrough performance in image recognition, NLP, speech processing.",
    explanationEn:
      "Deep Learning has revolutionized AI through the ability to automatically learn complex features from raw data.",
    category: "AI",
    difficulty: "hard",
  },
  {
    question: "What does Recurrent Neural Networks mean?",
    answer:
      "RNN-urile procesează date secvențiale menținând memoria internă. Ieșirea depinde de intrarea curentă și stările anterioare. Potrivite pentru serii temporale, limbaj natural, vorbire. Variante: LSTM (long short-term memory), GRU (gated recurrent unit) rezolvă problema gradientului care dispare.",
    explanation:
      "RNN-urile sunt specializate pentru date secvențiale și au fost fundamentale în dezvoltarea aplicațiilor de procesare a limbajului natural.",
    questionEn: "What does Recurrent Neural Networks mean?",
    answerEn:
      "RNNs process sequential data while maintaining internal memory. Output depends on current input and previous states. Suitable for time series, natural language, speech. Variants: LSTM (long short-term memory), GRU (gated recurrent unit) solve vanishing gradient problem.",
    explanationEn:
      "RNNs are specialized for sequential data and have been fundamental in developing natural language processing applications.",
    category: "AI",
    difficulty: "hard",
  },
  {
    question: "What does Convolutional Neural Networks mean?",
    answer:
      "CNN-urile excelează la procesarea datelor în formă de grilă (imagini). Folosesc straturi de convoluție pentru detectarea caracteristicilor locale, straturi de pooling pentru reducerea dimensiunilor. Învățare ierarhică de caracteristici: margini → forme → obiecte. Dominante în viziunea computerizată, clasificarea imaginilor, detectarea obiectelor.",
    explanation:
      "CNN-urile au revoluționat viziunea computerizată prin capacitatea de a învăța automat caracteristici vizuale ierarhice.",
    questionEn: "What does Convolutional Neural Networks mean?",
    answerEn:
      "CNNs excel at processing grid-like data (images). Use convolution layers for local feature detection, pooling layers for dimension reduction. Hierarchical feature learning: edges → shapes → objects. Dominant in computer vision, image classification, object detection.",
    explanationEn:
      "CNNs have revolutionized computer vision through the ability to automatically learn hierarchical visual features.",
    category: "AI",
    difficulty: "hard",
  },
  {
    question: "Why are graphic accelerators used for AI?",
    answer:
      "GPU-urile excelează la procesarea paralelă - mii de nuclee vs puținele nuclee ale CPU. Calculele IA (operații matriciale, antrenarea rețelelor neurale) sunt foarte paralelizabile. GPU-urile oferă accelerare masivă pentru antrenarea modelelor de deep learning, făcând IA complexă fezabilă.",
    explanation:
      "GPU-urile au făcut posibilă revoluția deep learning prin accelerarea masivă a calculelor necesare pentru antrenarea rețelelor neurale mari.",
    questionEn: "Why are graphic accelerators used for AI?",
    answerEn:
      "GPUs excel at parallel processing - thousands of cores vs few CPU cores. AI computations (matrix operations, neural network training) are highly parallelizable. GPUs provide massive acceleration for deep learning model training, making complex AI feasible.",
    explanationEn:
      "GPUs have made the deep learning revolution possible through massive acceleration of computations needed for training large neural networks.",
    category: "AI",
    difficulty: "medium",
  },
  {
    question: "Enumerate and exemplify different types of robots.",
    answer:
      "Roboți industriali (linii de asamblare), Roboți de serviciu (curățenie, livrare), Roboți medicali (chirurgie, reabilitare), Roboți militari (drone, dezamorsare bombe), Roboți umanoizi (cercetare, asistență), Vehicule autonome (mașini self-driving), Roboți spațiali (rovere pe Marte).",
    explanation:
      "Robotica a evoluat de la aplicații industriale simple la sisteme complexe care pot funcționa în diverse medii și îndeplini sarcini variate.",
    questionEn: "Enumerate and exemplify different types of robots.",
    answerEn:
      "Industrial robots (assembly lines), Service robots (cleaning, delivery), Medical robots (surgery, rehabilitation), Military robots (drones, bomb disposal), Humanoid robots (research, assistance), Autonomous vehicles (self-driving cars), Space robots (Mars rovers).",
    explanationEn:
      "Robotics has evolved from simple industrial applications to complex systems that can operate in diverse environments and perform varied tasks.",
    category: "AI",
    difficulty: "easy",
  },
]

export const getQuestionsByLanguage = (questions: Question[], language: "ro" | "en") => {
  return questions.map((question) => {
    if (language === "en") {
      return {
        ...question,
        question: question.questionEn || question.question,
        answer: question.answerEn || question.answer,
        explanation: question.explanationEn || question.explanation,
      }
    }
    return question
  })
}
