// Portfolio JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Verificar que jsPDF esté cargado
    function checkLibraries() {
        console.log('window.jspdf:', typeof window.jspdf);
        
        if (typeof window.jspdf === 'undefined') {
            console.log('jsPDF no está disponible, reintentando...');
            setTimeout(checkLibraries, 200);
            return;
        }
        
        console.log('jsPDF cargado correctamente');
    }
    
    // Esperar un poco más para que las librerías se carguen
    setTimeout(checkLibraries, 500);
    
    // Efecto de aparición suave al hacer scroll
    const scrollSections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    scrollSections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
    
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // PDF Generation
    const downloadPdfBtn = document.getElementById('download-pdf');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', function() {
            // Pequeño delay para asegurar que las librerías estén cargadas
            setTimeout(() => {
                generatePDF();
            }, 100);
        });
    }
    
    function generatePDF() {
        const loading = document.getElementById('loading');
        loading.style.display = 'flex';

        // Check if jsPDF is available
        if (typeof window.jspdf === 'undefined') {
            showNotification('Error: jsPDF no está cargado', 'error');
            loading.style.display = 'none';
            return;
        }

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('p', 'mm', 'a4');
            
            // Configuración de página
            const pageWidth = 210;
            const pageHeight = 297;
            let yPosition = 20;
            const margin = 20;
            const lineHeight = 6;
            const sectionSpacing = 10;

            // Header con fondo de color
            doc.setFillColor(41, 128, 185); // Azul profesional
            doc.rect(0, 0, pageWidth, 50, 'F');
            
            // Nombre en blanco sobre fondo azul
            doc.setTextColor(255, 255, 255); // Blanco
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.text("PABLO PEREZ CRUZ", margin, yPosition);
            yPosition += 8;
            
            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            doc.text("Desarrollador Full-Stack | Especialista en Python", margin, yPosition);
            yPosition += 15;

            // Información de contacto con colores
            doc.setTextColor(0, 0, 0); // Negro para el texto
            doc.setFontSize(10);
            doc.text("Telefono: +502 557570855", margin, yPosition);
            doc.text("Email: cpablop1@gmail.com", 70, yPosition);
            doc.text("Ubicacion: Quiche, Guatemala", 130, yPosition);
            yPosition += 5;
            doc.text("LinkedIn: linkedin.com/in/pabloperez", margin, yPosition);
            doc.text("GitHub: github.com/pabloperez", 70, yPosition);
            yPosition += 15;

            // Línea divisoria con color
            doc.setDrawColor(41, 128, 185); // Azul para la línea
            doc.setLineWidth(2);
            doc.line(margin, yPosition, pageWidth - margin, yPosition);
            yPosition += 10;

            // Layout de dos columnas siguiendo el diseño de la imagen
            const leftColumn = margin;
            const rightColumn = 110;
            const leftColumnWidth = 80; // Ancho máximo para columna izquierda
            const rightColumnWidth = 80; // Ancho máximo para columna derecha

            // COLUMNA IZQUIERDA - Experiencia Laboral
            let leftY = yPosition + 5;
            doc.setFillColor(41, 128, 185); // Fondo azul para título
            doc.rect(leftColumn - 2, leftY - 6, 80, 8, 'F');
            doc.setTextColor(255, 255, 255); // Texto blanco
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.text("EXPERIENCIA LABORAL", leftColumn, leftY);
            doc.setTextColor(0, 0, 0); // Volver a negro
            leftY += 10;

            // Senior Full-Stack Developer
            doc.setTextColor(41, 128, 185); // Azul para título del trabajo
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text("Senior Full-Stack Developer", leftColumn, leftY);
            doc.setTextColor(0, 0, 0); // Negro para fecha
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.text("03/2019 - Presente", leftColumn + 60, leftY);
            leftY += 5;
            doc.text("FITCH Solutions | Quiche, Guatemala", leftColumn, leftY);
            leftY += 4;
            doc.setFontSize(8);
            const job1Text1 = "• Lideré el desarrollo de un sistema POS completo utilizando Python/Django,";
            const job1Split1 = doc.splitTextToSize(job1Text1, leftColumnWidth);
            doc.text(job1Split1, leftColumn, leftY);
            leftY += job1Split1.length * 3 + 2;
            const job1Text2 = "  reduciendo el tiempo de procesamiento de transacciones en un 60%";
            const job1Split2 = doc.splitTextToSize(job1Text2, leftColumnWidth);
            doc.text(job1Split2, leftColumn, leftY);
            leftY += job1Split2.length * 3 + 4;
            const job1Text3 = "• Implementé arquitectura de microservicios con Docker y Kubernetes,";
            const job1Split3 = doc.splitTextToSize(job1Text3, leftColumnWidth);
            doc.text(job1Split3, leftColumn, leftY);
            leftY += job1Split3.length * 3 + 2;
            const job1Text4 = "  mejorando la escalabilidad del sistema para manejar 5,000+ transacciones";
            const job1Split4 = doc.splitTextToSize(job1Text4, leftColumnWidth);
            doc.text(job1Split4, leftColumn, leftY);
            leftY += job1Split4.length * 3 + 4;
            const job1Text5 = "• Optimicé APIs REST con Redis y PostgreSQL, disminuyendo la latencia";
            const job1Split5 = doc.splitTextToSize(job1Text5, leftColumnWidth);
            doc.text(job1Split5, leftColumn, leftY);
            leftY += job1Split5.length * 3 + 2;
            const job1Text6 = "  de respuesta de 2.5s a 0.8s";
            const job1Split6 = doc.splitTextToSize(job1Text6, leftColumnWidth);
            doc.text(job1Split6, leftColumn, leftY);
            leftY += job1Split6.length * 3 + 8;

            // Full-Stack Developer
            doc.setTextColor(41, 128, 185); // Azul para título del trabajo
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text("Full-Stack Developer", leftColumn, leftY);
            doc.setTextColor(0, 0, 0); // Negro para fecha
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.text("01/2022 - 11/2022", leftColumn + 60, leftY);
            leftY += 5;
            doc.text("COMPUMARC | Quiche, Guatemala", leftColumn, leftY);
            leftY += 4;
            doc.setFontSize(8);
            const job2Text1 = "• Desarrollé una aplicación web completa con Django y PostgreSQL,";
            const job2Split1 = doc.splitTextToSize(job2Text1, leftColumnWidth);
            doc.text(job2Split1, leftColumn, leftY);
            leftY += job2Split1.length * 3 + 2;
            const job2Text2 = "  automatizando el 90% de procesos administrativos";
            const job2Split2 = doc.splitTextToSize(job2Text2, leftColumnWidth);
            doc.text(job2Split2, leftColumn, leftY);
            leftY += job2Split2.length * 3 + 4;
            const job2Text3 = "• Implementé sistema de gestión académica y financiera, reduciendo";
            const job2Split3 = doc.splitTextToSize(job2Text3, leftColumnWidth);
            doc.text(job2Split3, leftColumn, leftY);
            leftY += job2Split3.length * 3 + 2;
            const job2Text4 = "  el tiempo de generación de reportes de 3 horas a 15 minutos";
            const job2Split4 = doc.splitTextToSize(job2Text4, leftColumnWidth);
            doc.text(job2Split4, leftColumn, leftY);
            leftY += job2Split4.length * 3 + 8;

            // Technical Instructor
            doc.setTextColor(41, 128, 185); // Azul para título del trabajo
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text("Technical Instructor & Developer", leftColumn, leftY);
            doc.setTextColor(0, 0, 0); // Negro para fecha
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.text("01/2018 - 11/2023", leftColumn + 60, leftY);
            leftY += 5;
            doc.text("COMPUMARC | Quiche, Guatemala", leftColumn, leftY);
            leftY += 4;
            doc.setFontSize(8);
            const job3Text1 = "• Diseñé e implementé currículo de programación para 200+ estudiantes,";
            const job3Split1 = doc.splitTextToSize(job3Text1, leftColumnWidth);
            doc.text(job3Split1, leftColumn, leftY);
            leftY += job3Split1.length * 3 + 2;
            const job3Text2 = "  con 95% de tasa de finalización";
            const job3Split2 = doc.splitTextToSize(job3Text2, leftColumnWidth);
            doc.text(job3Split2, leftColumn, leftY);
            leftY += job3Split2.length * 3 + 4;
            const job3Text3 = "• Desarrollé plataforma de aprendizaje online con Django, aumentando";
            const job3Split3 = doc.splitTextToSize(job3Text3, leftColumnWidth);
            doc.text(job3Split3, leftColumn, leftY);
            leftY += job3Split3.length * 3 + 2;
            const job3Text4 = "  la accesibilidad educativa en un 60%";
            const job3Split4 = doc.splitTextToSize(job3Text4, leftColumnWidth);
            doc.text(job3Split4, leftColumn, leftY);
            leftY += job3Split4.length * 3 + 10;

            // Educación
            doc.setFillColor(41, 128, 185); // Fondo azul para título
            doc.rect(leftColumn - 2, leftY - 6, 80, 8, 'F');
            doc.setTextColor(255, 255, 255); // Texto blanco
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.text("EDUCACION", leftColumn, leftY);
            doc.setTextColor(0, 0, 0); // Volver a negro
            leftY += 10;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            const eduText1 = "Ingeniería en Sistemas y Ciencias de la Computación";
            const eduSplit1 = doc.splitTextToSize(eduText1, leftColumnWidth);
            doc.text(eduSplit1, leftColumn, leftY);
            leftY += eduSplit1.length * 4 + 5;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.text("Universidad Mariano Galvez, Quiche", leftColumn, leftY);
            leftY += 4;
            doc.text("02/2018 - Actualidad", leftColumn, leftY);

            // COLUMNA DERECHA - Resumen y Habilidades
            let rightY = yPosition + 5;

            // Resumen Profesional
            doc.setFillColor(41, 128, 185); // Fondo azul para título
            doc.rect(rightColumn - 2, rightY - 6, 80, 8, 'F');
            doc.setTextColor(255, 255, 255); // Texto blanco
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.text("RESUMEN PROFESIONAL", rightColumn, rightY);
            doc.setTextColor(0, 0, 0); // Volver a negro
            rightY += 10;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            const summaryText = "Desarrollador Full-Stack con 5+ anos de experiencia especializado en Python, JavaScript y Django. Experto en arquitecturas de microservicios, APIs REST y desarrollo de aplicaciones web escalables. He contribuido a la reduccion del 40% en tiempo de carga de APIs y optimizado sistemas que manejan mas de 10,000 usuarios concurrentes.";
            const splitSummary = doc.splitTextToSize(summaryText, rightColumnWidth);
            doc.text(splitSummary, rightColumn, rightY);
            rightY += splitSummary.length * 4 + 10;

            // Habilidades Tecnicas
            doc.setFillColor(41, 128, 185); // Fondo azul para título
            doc.rect(rightColumn - 2, rightY - 6, 80, 8, 'F');
            doc.setTextColor(255, 255, 255); // Texto blanco
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.text("HABILIDADES TECNICAS", rightColumn, rightY);
            doc.setTextColor(0, 0, 0); // Volver a negro
            rightY += 10;

            // Lenguajes
            doc.setTextColor(41, 128, 185); // Azul para subtítulo
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.text("Lenguajes de Programacion", rightColumn, rightY);
            doc.setTextColor(0, 0, 0); // Volver a negro
            rightY += 6;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            const langText = "Python 3.8+, JavaScript ES6+, TypeScript, HTML5, CSS3, SQL";
            const langSplit = doc.splitTextToSize(langText, rightColumnWidth);
            doc.text(langSplit, rightColumn, rightY);
            rightY += langSplit.length * 3 + 8;

            // Frameworks
            doc.setTextColor(41, 128, 185); // Azul para subtítulo
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.text("Frameworks y Librerias", rightColumn, rightY);
            doc.setTextColor(0, 0, 0); // Volver a negro
            rightY += 6;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            const frameText = "Django 4.x, Django REST Framework, React.js, Vue.js, FastAPI, Bootstrap 5";
            const frameSplit = doc.splitTextToSize(frameText, rightColumnWidth);
            doc.text(frameSplit, rightColumn, rightY);
            rightY += frameSplit.length * 3 + 8;

            // Bases de Datos
            doc.setTextColor(41, 128, 185); // Azul para subtítulo
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.text("Bases de Datos", rightColumn, rightY);
            doc.setTextColor(0, 0, 0); // Volver a negro
            rightY += 6;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            const dbText = "PostgreSQL, MySQL, SQLite, Redis, MongoDB";
            const dbSplit = doc.splitTextToSize(dbText, rightColumnWidth);
            doc.text(dbSplit, rightColumn, rightY);
            rightY += dbSplit.length * 3 + 8;

            // Herramientas
            doc.setTextColor(41, 128, 185); // Azul para subtítulo
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.text("Herramientas y Plataformas", rightColumn, rightY);
            doc.setTextColor(0, 0, 0); // Volver a negro
            rightY += 6;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            const toolsText = "Docker, Kubernetes, Git, GitHub Actions, AWS, Heroku";
            const toolsSplit = doc.splitTextToSize(toolsText, rightColumnWidth);
            doc.text(toolsSplit, rightColumn, rightY);
            rightY += toolsSplit.length * 3 + 12;

            // Logros Clave
            doc.setFillColor(41, 128, 185); // Fondo azul para título
            doc.rect(rightColumn - 2, rightY - 6, 80, 8, 'F');
            doc.setTextColor(255, 255, 255); // Texto blanco
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.text("LOGROS CLAVE", rightColumn, rightY);
            doc.setTextColor(0, 0, 0); // Volver a negro
            rightY += 10;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            const logro1Text = "Reduccion de Tiempos de Proyecto: Efectivamente reduje los";
            const logro1Split = doc.splitTextToSize(logro1Text, rightColumnWidth);
            doc.text(logro1Split, rightColumn, rightY);
            rightY += logro1Split.length * 3 + 4;
            const logro1Text2 = "tiempos de proyecto en un 30% mediante practicas innovadoras";
            const logro1Split2 = doc.splitTextToSize(logro1Text2, rightColumnWidth);
            doc.text(logro1Split2, rightColumn, rightY);
            rightY += logro1Split2.length * 3 + 6;
            const logro2Text = "Mejora del Engagement: Aumente el engagement de usuarios";
            const logro2Split = doc.splitTextToSize(logro2Text, rightColumnWidth);
            doc.text(logro2Split, rightColumn, rightY);
            rightY += logro2Split.length * 3 + 4;
            const logro2Text2 = "en un 20% con caracteristicas frontend impactantes";
            const logro2Split2 = doc.splitTextToSize(logro2Text2, rightColumnWidth);
            doc.text(logro2Split2, rightColumn, rightY);
            rightY += logro2Split2.length * 3 + 6;
            const logro3Text = "Satisfaccion del Cliente: Logre una tasa de satisfaccion";
            const logro3Split = doc.splitTextToSize(logro3Text, rightColumnWidth);
            doc.text(logro3Split, rightColumn, rightY);
            rightY += logro3Split.length * 3 + 4;
            const logro3Text2 = "del cliente del 95% implementando estrategias efectivas";
            const logro3Split2 = doc.splitTextToSize(logro3Text2, rightColumnWidth);
            doc.text(logro3Split2, rightColumn, rightY);
            rightY += logro3Split2.length * 3 + 6;
            const logro4Text = "Accesibilidad Movil: Aumente la accesibilidad movil en un";
            const logro4Split = doc.splitTextToSize(logro4Text, rightColumnWidth);
            doc.text(logro4Split, rightColumn, rightY);
            rightY += logro4Split.length * 3 + 4;
            const logro4Text2 = "15% mediante mejoras de diseno responsivo";
            const logro4Split2 = doc.splitTextToSize(logro4Text2, rightColumnWidth);
            doc.text(logro4Split2, rightColumn, rightY);
            rightY += logro4Split2.length * 3 + 12;

            // Certificaciones
            doc.setFillColor(41, 128, 185); // Fondo azul para título
            doc.rect(rightColumn - 2, rightY - 6, 80, 8, 'F');
            doc.setTextColor(255, 255, 255); // Texto blanco
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.text("CERTIFICACIONES", rightColumn, rightY);
            doc.setTextColor(0, 0, 0); // Volver a negro
            rightY += 10;
            doc.setTextColor(41, 128, 185); // Azul para títulos de certificaciones
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.text("AWS Certified Developer - Associate", rightColumn, rightY);
            doc.setTextColor(0, 0, 0); // Negro para detalles
            rightY += 5;
            doc.setFontSize(8);
            doc.text("Amazon Web Services | 2023", rightColumn, rightY);
            rightY += 8;
            doc.setTextColor(41, 128, 185); // Azul para títulos de certificaciones
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.text("Scrum Master Certified (SMC)", rightColumn, rightY);
            doc.setTextColor(0, 0, 0); // Negro para detalles
            rightY += 5;
            doc.setFontSize(8);
            doc.text("Scrum Alliance | 2022", rightColumn, rightY);
            rightY += 8;
            doc.setTextColor(41, 128, 185); // Azul para títulos de certificaciones
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.text("Master en Python: Django, Flask y FastAPI", rightColumn, rightY);
            doc.setTextColor(0, 0, 0); // Negro para detalles
            rightY += 5;
            doc.setFontSize(8);
            doc.text("Udemy | 2020", rightColumn, rightY);

            // Guardar PDF
            const fileName = `CV_Pablo_Perez_${new Date().getFullYear()}.pdf`;
            doc.save(fileName);
            
            showNotification('PDF generado exitosamente con texto seleccionable', 'success');
            loading.style.display = 'none';
            
        } catch (error) {
            console.error('Error al generar PDF:', error);
            showNotification('Error al generar PDF: ' + error.message, 'error');
            loading.style.display = 'none';
        }
    }
    
    // Función para mostrar notificaciones
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            z-index: 1001;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideDown 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // Active navigation link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const navSections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        let current = '';
        navSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Typing effect for hero title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Initialize typing effect if element exists
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // Uncomment the line below to enable typing effect
        // typeWriter(heroTitle, originalText, 50);
    }
    
    // Portfolio filter functionality (for future projects section)
    function initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Update active button
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Filter projects
                    projectCards.forEach(card => {
                        if (filter === 'all' || card.classList.contains(filter)) {
                            card.style.display = 'block';
                            card.style.animation = 'fadeIn 0.5s ease';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        }
    }
    
    // Initialize portfolio filter
    initPortfolioFilter();
    
    // Contact form handling (for future contact section)
    function initContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                // Basic validation
                if (!name || !email || !message) {
                    showNotification('Por favor, completa todos los campos', 'error');
                    return;
                }
                
                // Simulate form submission
                showNotification('Mensaje enviado correctamente. Te contactaré pronto.', 'success');
                this.reset();
            });
        }
    }
    
    // Initialize contact form
    initContactForm();
    
    // Lazy loading for images (performance optimization)
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Performance monitoring
    function logPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', function() {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                }, 0);
            });
        }
    }
    
    // Initialize performance monitoring
    logPerformance();
});

// Utility functions
const utils = {
    // Debounce function for performance optimization
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { utils };
}
