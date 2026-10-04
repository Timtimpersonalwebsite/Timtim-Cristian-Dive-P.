/* ======================================== typing animation ================================================ */
if (typeof Typed !== 'undefined') {
    var typed = new Typed(".typing", {
        strings: ["Web Designer", "Web Developer", "UI/UX Designer", "System Developer", "Application Developer", "Database Management", "Hardware & Software Troubleshooting", "PC Assembly & Configuration", "Problem Analysis & Technical Solutions", "System Integration", "Technical Support & Maintenance"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
}

/* ======================================== Aside Navbar Toggle ================================================ */
const navTogglerBtn = document.querySelector(".nav-toggler");
const aside = document.querySelector(".Aside");

if (navTogglerBtn && aside) {
    navTogglerBtn.addEventListener("click", () => {
        asideSectionTogglerBtn();
    });
}

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    if (navTogglerBtn) {
        navTogglerBtn.classList.toggle("open");
    }
}

/* ======================================== Nav Active State & ScrollSpy ================================================ */
const nav = document.querySelector(".nav");
const sections = document.querySelectorAll("section.section");

if (nav && sections.length > 0) {
    const navLinks = nav.querySelectorAll("li a");

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(a => {
        a.addEventListener("click", function () {
            if (aside && aside.classList.contains("open")) {
                asideSectionTogglerBtn();
            }
        });
    });

    // ScrollSpy handler
    function updateActiveNavOnScroll() {
        const scrollPosition = window.scrollY + 250; // Offset line for smooth section activation
        let currentSectionId = "";

        // If user scrolled to the very bottom of the page, select the last section
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            const lastSection = sections[sections.length - 1];
            if (lastSection) {
                currentSectionId = lastSection.getAttribute("id");
            }
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute("id");
                }
            });
        }

        if (currentSectionId) {
            navLinks.forEach(a => {
                const href = a.getAttribute("href");
                if (href === "#" + currentSectionId) {
                    if (!a.classList.contains("active")) {
                        navLinks.forEach(link => link.classList.remove("active"));
                        a.classList.add("active");
                        // Automatically scroll side menu if active item is out of view inside .Aside
                        a.scrollIntoView({ behavior: "smooth", block: "nearest" });
                    }
                }
            });
        }
    }

    let isScrollingFrame = null;
    window.addEventListener("scroll", () => {
        if (isScrollingFrame) cancelAnimationFrame(isScrollingFrame);
        isScrollingFrame = requestAnimationFrame(updateActiveNavOnScroll);
    });
    window.addEventListener("load", updateActiveNavOnScroll);
}

/* ======================================== Contact Form Handler ================================================ */
const contactFormBtn = document.querySelector(".contact-form .btn");
if (contactFormBtn) {
    contactFormBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const formInputs = document.querySelectorAll(".contact-form .form-control");
        let name = "", email = "", subject = "", message = "";

        formInputs.forEach(input => {
            if (input.placeholder === "Name") name = input.value;
            if (input.placeholder === "Email") email = input.value;
            if (input.placeholder === "Subject") subject = input.value;
            if (input.tagName.toLowerCase() === "textarea") message = input.value;
        });

        if (!name || !email || !message) {
            alert("Please fill out your Name, Email, and Message before submitting.");
            return;
        }

        alert(`Thank you, ${name}! Your message has been sent successfully.`);
        formInputs.forEach(input => input.value = "");
    });
}

/* ======================================== TimBot AI Chatbot System ================================================ */
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".chatbot-header .close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input input");
const sendChatBtn = document.querySelector(".chat-input #send-btn");
const suggestBtns = document.querySelectorAll(".suggest-btn");

if (chatbotToggler) {
    chatbotToggler.addEventListener("click", () => {
        document.body.classList.toggle("show-chatbot");
    });
}

if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        document.body.classList.remove("show-chatbot");
    });
}

function createChatLi(message, className) {
    const chatLi = document.createElement("div");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" 
        ? `<div class="chat-content"><p>${escapeHTML(message)}</p></div>`
        : `<div class="bot-avatar-small"><i class="fas fa-robot"></i></div><div class="chat-content"><p>${message}</p></div>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

function getBotResponse(userMsg) {
    const rawMsg = userMsg.trim();
    const msg = rawMsg.toLowerCase().replace(/[^\w\s]/gi, ' ');

    const has = (...keywords) => keywords.some(k => msg.includes(k.toLowerCase()));

    // 1. Name & Full Name / Identity
    if (has("full name", "your name", "my name", "what is your name", "whats your name", "who are you", "who is cristian", "who is timtim", "first name", "last name", "middle name", "surname", "creator", "author", "owner", "developer of this website") || (has("name") && !has("project", "file", "app"))) {
        return `My full name is <strong>Cristian Dive Timtim</strong>! 👨‍💻<br><br>` +
               `• <strong>First Name</strong>: Cristian<br>` +
               `• <strong>Middle Name</strong>: Dive<br>` +
               `• <strong>Last Name</strong>: Timtim<br><br>` +
               `I am a Web Developer, Mobile Developer & IT Solutions Specialist from the Philippines! You can ask me anything about my skills, projects, education, services, or contact info.`;
    }

    // 2. Age / Birthday / Birthdate
    if (has("age", "how old", "birthday", "birthdate", "birth date", "born", "when were you born", "date of birth")) {
        return `🎂 <strong>Birthday & Age</strong>:<br><br>` +
               `• <strong>Birthday</strong>: December 25, 2004 🎈<br>` +
               `• <strong>Age</strong>: 19 years old<br><br>` +
               `Born and raised in Bukidnon, Philippines!`;
    }

    // 3. Location / Address / Where do you live
    if (has("location", "address", "where do you live", "where are you located", "where are you from", "where located", "place", "purok", "panadtalan", "maramag", "bukidnon", "philippines", "country")) {
        return `📍 <strong>Location & Address</strong>:<br><br>` +
               `Cristian is located at:<br>` +
               `<strong>Purok 2B Panadtalan, Maramag, Bukidnon, Philippines</strong> 🇵🇭`;
    }

    // 4. Contact Details (Phone, Email, Reach, Socials)
    if (has("contact", "email", "gmail", "phone", "call", "mobile", "number", "phone number", "reach", "message me", "how to contact", "social")) {
        return `📫 <strong>Get in Touch with Cristian</strong>:<br><br>` +
               `📧 <strong>Email</strong>: CristianTimtim20@gmail.com<br>` +
               `📱 <strong>Phone</strong>: +63 909 532 0917 / +63 992 478 4005<br>` +
               `📍 <strong>Location</strong>: Purok 2B Panadtalan, Maramag, Bukidnon, Philippines<br>` +
               `🌐 <strong>Website</strong>: https://timtim20/home<br>` +
               `💼 <strong>Status</strong>: Available for Freelance & Contract Projects!`;
    }

    // 5. Hiring / Freelance Availability / Rates
    if (has("hire", "freelance", "available", "work with you", "hire me", "job", "contract", "price", "cost", "service price")) {
        return `💼 <strong>Freelance & Hiring Availability</strong>:<br><br>` +
               `Yes! Cristian is <strong>available for freelance projects</strong> and full/part-time technical roles.<br><br>` +
               `He specializes in:<br>` +
               `• Custom Website & Web Application Development<br>` +
               `• Mobile App Development (Kotlin / Android)<br>` +
               `• Database Architecture & Management (MySQL)<br>` +
               `• Computer Repair, PC Assembly & Hardware Troubleshooting<br><br>` +
               `You can send him a message in the <strong>Contact Me</strong> section or email <strong>CristianTimtim20@gmail.com</strong>!`;
    }

    // 6. Education / Degree / School / College
    if (has("education", "school", "college", "degree", "university", "high school", "highschool", "elementary", "study", "studied", "graduate", "graduated", "major", "technopreneur", "technopreneurship", "torres", "countryville")) {
        return `🎓 <strong>Cristian's Educational Background</strong>:<br><br>` +
               `• <strong>College (2023 - 2027)</strong>: Bachelor of Science in Information Technology Major in Technopreneurship at Torres Capitol College & Philippine Countryville College (Graduated as Top Student).<br>` +
               `• <strong>High School (2022 - 2023)</strong>: Philippine Countryville College (Graduated as Top Student in Class).<br>` +
               `• <strong>Elementary (2016 - 2017)</strong>: Maramag Central Elementary School.`;
    }

    // 7. Work Experience & Career History
    if (has("experience", "work history", "career", "jobs", "background", "pisonet", "repair experience")) {
        return `💼 <strong>Work & Technical Experience</strong>:<br><br>` +
               `• <strong>2023 - Present</strong>: Torres Capitol College & Freelance Developer — Designed and developed web applications, customized systems, and mobile apps for academic & commercial clients.<br>` +
               `• <strong>Hardware & PC Support</strong>: Hands-on experience in computer assembly, hardware troubleshooting, OS configuration, and technical maintenance/repair for Pisonet setups and local clients.<br>` +
               `• <strong>AI Workflow Integration</strong>: Leverages AI tools for accelerated prototyping, code optimization, and technical problem analysis.`;
    }

    // 8. Specific Project Inquiries
    if (has("bugss", "da bugss", "auth portal", "login portal")) {
        return `🔐 <strong>Da Bugss Auth & Login Portal</strong>:<br><br>` +
               `A secure multi-role authentication portal built with PHP and MySQL. It features role-based access control separating Super Admin, Administrator, and User login pathways with secure database handling.`;
    }
    if (has("smart secure", "biometrics", "system case", "fingerprint", "solar panel", "smart and secure")) {
        return `🤖 <strong>Smart & Secure System Case Design</strong>:<br><br>` +
               `A hardware architecture and system design blueprint featuring biometric authentication (fingerprint, facial recognition, handprint scanning) integrated with solar panel power supply for maximum portable security.`;
    }
    if (has("delivery app", "order app", "order and delivery", "food app")) {
        return `📱 <strong>Mobile Order & Delivery App</strong>:<br><br>` +
               `A native Android mobile application built with Kotlin and REST APIs. Features real-time order placement, status tracking, item catalogs, and user profile management.`;
    }
    if (has("pos", "inventory", "sales system", "point of sale")) {
        return `🛒 <strong>Sales & Inventory POS System</strong>:<br><br>` +
               `A desktop management system for business retail. Built for real-time inventory control, product stock tracking, sales transaction processing, and financial reporting.`;
    }
    if (has("pcc registration", "enrollment", "registration form", "registration system")) {
        return `🎓 <strong>PCC Student Registration System</strong>:<br><br>` +
               `An automated enrollment processing system built for Philippine Countryville College using PHP and MySQL. Handles student registration forms, photo uploads, and database storage.`;
    }
    if (has("dashboard", "academic dashboard", "student portal", "grades")) {
        return `🏫 <strong>Student Academic Dashboard</strong>:<br><br>` +
               `An interactive student web portal providing real-time access to grades, statements of account, class announcements, clinic schedules, and library services.`;
    }
    if (has("campus portal", "pcc landing", "countryville portal")) {
        return `🏛️ <strong>PCC Campus Portal Landing</strong>:<br><br>` +
               `A custom-branded entrance portal and web landing interface created for Philippine Countryville College, Inc.`;
    }
    if (has("cyber app", "cyber mobile")) {
        return `📲 <strong>Cyber Mobile App</strong>:<br><br>` +
               `A native Android application built with Kotlin, showcasing custom Cyber UI branding, mobile utilities, and application integration.`;
    }

    // 9. Portfolio / All Projects Overview
    if (has("project", "projects", "portfolio", "works", "samples", "apps", "websites built", "built")) {
        return `📁 <strong>Cristian's Featured Projects</strong>:<br><br>` +
               `1. 🔐 <strong>Da Bugss Auth & Login Portal</strong> (PHP, MySQL, Role-based auth)<br>` +
               `2. 🤖 <strong>Smart & Secure System Case</strong> (Biometrics, Fingerprint, Solar Panel)<br>` +
               `3. 📱 <strong>Mobile Order & Delivery App</strong> (Kotlin, Android Studio, REST API)<br>` +
               `4. 🛒 <strong>Sales & Inventory POS System</strong> (Desktop inventory & POS system)<br>` +
               `5. 🎓 <strong>PCC Student Registration System</strong> (PHP, MySQL, Form processing)<br>` +
               `6. 🏫 <strong>Student Academic Dashboard</strong> (Grades, student portal, clinic)<br>` +
               `7. 🏛️ <strong>PCC Campus Portal Landing</strong> (Custom web landing UI)<br>` +
               `8. 🔑 <strong>PCC Multi-User Access Portal</strong> (Role-based authentication)<br>` +
               `9. 📲 <strong>Cyber Mobile App</strong> (Android, Kotlin, Mobile UI)<br><br>` +
               `Click any project in the <strong>Portfolio</strong> section to view full details!`;
    }

    // 10. Skills & Tech Stack
    if (has("skill", "skills", "tech", "stack", "languages", "programming", "tools", "frontend", "backend", "database", "mobile", "html", "css", "js", "javascript", "php", "python", "kotlin", "sql", "mysql", "git", "github", "vs code", "vscode", "xampp")) {
        return `💻 <strong>Cristian's Technical Skills & Stack</strong>:<br><br>` +
               `• <strong>Frontend</strong>: HTML5, CSS3, JavaScript (Responsive UI/UX)<br>` +
               `• <strong>Backend</strong>: PHP, Python, Kotlin (APIs & System Architecture)<br>` +
               `• <strong>Database</strong>: MySQL, SQL (Relational Database Modeling)<br>` +
               `• <strong>Mobile Dev</strong>: Kotlin, Android Studio (Native Android Apps)<br>` +
               `• <strong>Dev Tools</strong>: Git, GitHub, VS Code, XAMPP, AI-Assisted Tools<br>` +
               `• <strong>Hardware & IT</strong>: PC Assembly, Hardware/Software Diagnostics, Pisonet Repair<br><br>` +
               `Scroll to the <strong>Skills</strong> section on the website to see all categories!`;
    }

    // 11. Services Offered & Hardware Support
    if (has("service", "services", "offer", "capabilities", "what can you do", "what do you do", "hardware", "pisonet", "troubleshoot", "repair", "pc assembly", "assembly", "fix")) {
        return `🛠️ <strong>Services Cristian Offers</strong>:<br><br>` +
               `1. 🌐 <strong>Web Design & Frontend</strong>: Modern, fast, responsive websites.<br>` +
               `2. ⚙️ <strong>Backend & Systems Dev</strong>: Custom business applications & REST APIs.<br>` +
               `3. 🗄️ <strong>Database Management</strong>: MySQL schema design & query optimization.<br>` +
               `4. 📱 <strong>Mobile App Development</strong>: Native Android apps built with Kotlin.<br>` +
               `5. 🤖 <strong>AI-Assisted Workflow</strong>: Automated workflows & rapid prototyping.<br>` +
               `6. 🎨 <strong>UI/UX & Branding</strong>: Interface prototypes & visual design.<br>` +
               `7. 🖥️ <strong>Hardware & Technical Support</strong>: PC assembly, hardware diagnostics, OS installation & Pisonet repair.`;
    }

    // 12. AI Use & Workflow
    if (has("ai", "artificial intelligence", "ai tools", "how do you use ai", "ai workflow", "timbot")) {
        return `🤖 <strong>AI Integration & Workflow</strong>:<br><br>` +
               `Cristian uses AI-assisted development tools (like code assistants & AI models) to accelerate workflow, prototype quickly, optimize code logic, and troubleshoot complex bugs, while ensuring complete control over the design and code implementation.<br><br>` +
               `I am <strong>TimBot AI</strong>, his embedded website assistant!`;
    }

    // 13. Website Information
    if (has("website", "this site", "portfolio website", "url", "web page")) {
        return `🌐 <strong>About This Website</strong>:<br><br>` +
               `This is Cristian Dive Timtim's official personal portfolio website.<br>` +
               `• <strong>URL</strong>: https://timtim20/home<br>` +
               `• <strong>Sections</strong>: Home, About Me, Skills, Services, Portfolio, and Contact.<br>` +
               `• <strong>Features</strong>: Interactive AI Chatbot (TimBot), Project Modals, Theme Color Switcher, and Mobile Responsiveness!`;
    }

    // 14. Greetings & Small Talk
    if (has("hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening", "sup", "yo", "kumusta", "kamusta")) {
        return `Hello there! 👋 I'm <strong>TimBot</strong>, Cristian's AI Assistant.<br><br>` +
               `How can I help you today? You can ask me about:<br>` +
               `• His <strong>full name</strong> & bio<br>` +
               `• His <strong>skills</strong> & tech stack<br>` +
               `• His <strong>portfolio projects</strong><br>` +
               `• His <strong>services</strong> & hardware repair<br>` +
               `• His <strong>education</strong> & contact details!`;
    }
    if (has("thank", "thanks", "salamat", "awesome", "great", "cool", "good bot")) {
        return `You're very welcome! 😊 Feel free to ask if you have any other questions about Cristian or his work!`;
    }
    if (has("bye", "goodbye", "see ya", "cya", "farewell")) {
        return `Goodbye! Have a great day ahead! Feel free to chat anytime you return. 👋`;
    }

    // 15. Bio / General About Fallback if "about" or "who" was mentioned
    if (has("who", "about", "cristian", "timtim", "bio")) {
        return `👨‍💻 <strong>About Cristian Dive Timtim</strong>:<br><br>` +
               `Cristian Dive Timtim is a Web Developer, Mobile Developer & IT Solutions Specialist from Bukidnon, Philippines. He builds responsive websites, customized business systems, native Android apps, and provides hardware repair & PC assembly.<br><br>` +
               `Degree: BS in Information Technology (Technopreneurship).`;
    }

    // Default Fallback
    return `Thank you for your question! I can accurately answer anything about <strong>Cristian Dive Timtim</strong> and his personal website:<br><br>` +
           `• 👤 <strong>Full Name & Age</strong><br>` +
           `• 📍 <strong>Location & Contact Details</strong><br>` +
           `• 🎓 <strong>Education & Degree</strong><br>` +
           `• 💻 <strong>Technical Skills & Tools</strong><br>` +
           `• 📁 <strong>Portfolio & Specific Projects</strong><br>` +
           `• 🛠️ <strong>Services Offered (Web, Mobile, Hardware)</strong><br><br>` +
           `What would you like to know?`;
}

function processUserMessage(userMessage) {
    if (!userMessage.trim()) return;

    // Append outgoing user message
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    chatInput.value = "";

    // Append incoming bot message with typing indicator
    const incomingChatLi = createChatLi('<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>', "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // Simulate typing delay for realistic AI feel
    setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        incomingChatLi.querySelector(".chat-content p").innerHTML = botResponse;
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 600);
}

if (sendChatBtn && chatInput) {
    sendChatBtn.addEventListener("click", () => {
        processUserMessage(chatInput.value);
    });

    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            processUserMessage(chatInput.value);
        }
    });
}

if (suggestBtns) {
    suggestBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const query = btn.getAttribute("data-query");
            processUserMessage(query);
        });
    });
}

/* ======================================== Portfolio Filtering & Modal System ================================================ */
const filterBtns = document.querySelectorAll(".portfolio-filter .filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-grid .portfolio-item");
const portfolioModal = document.querySelector(".portfolio-modal");
const modalCloseBtn = document.querySelector(".portfolio-modal .modal-close-btn");

if (filterBtns) {
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute("data-category");
                if (filterValue === "all" || filterValue === itemCategory) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
}

if (portfolioItems && portfolioModal) {
    portfolioItems.forEach(item => {
        const viewBtn = item.querySelector(".view-project-btn");
        if (viewBtn) {
            viewBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const imgSrc = item.querySelector(".portfolio-img img").getAttribute("src");
                const categoryText = item.querySelector(".project-category").textContent;
                const titleText = item.querySelector(".portfolio-info h4").textContent;
                const descText = item.querySelector(".portfolio-info p").textContent;
                const tagsSpans = item.querySelectorAll(".project-tags span");

                portfolioModal.querySelector(".modal-img img").setAttribute("src", imgSrc);
                portfolioModal.querySelector(".modal-category").textContent = categoryText;
                portfolioModal.querySelector(".modal-title").textContent = titleText;
                portfolioModal.querySelector(".modal-desc").textContent = descText;

                const modalTagsWrapper = portfolioModal.querySelector(".tech-tags-wrapper");
                modalTagsWrapper.innerHTML = "";
                tagsSpans.forEach(tag => {
                    const span = document.createElement("span");
                    span.textContent = tag.textContent;
                    modalTagsWrapper.appendChild(span);
                });

                document.body.classList.add("show-modal");
            });
        }
    });
}

if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", () => {
        document.body.classList.remove("show-modal");
    });
}

if (portfolioModal) {
    portfolioModal.addEventListener("click", (e) => {
        if (e.target === portfolioModal) {
            document.body.classList.remove("show-modal");
        }
    });
}


