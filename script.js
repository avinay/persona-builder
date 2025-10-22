// Initialize Supabase client
const supabaseUrl = 'https://uuojoxkazsoyolgqbtmx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1b2pveGthenNveW9sZ3FidG14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MjAxOTYsImV4cCI6MjA3NTk5NjE5Nn0.CnzN61XmP4mdlW8OaEo9IiiuEgY8bQXExvAE6i5bGaU'

// Create Supabase client using the global Supabase object
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

// Global variables
let currentPersonaId = null
let allPersonas = []

// Get all form inputs
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const educationInput = document.getElementById('education');
const statusInput = document.getElementById('status');
const occupationInput = document.getElementById('occupation');
const locationInput = document.getElementById('location');
const techLiteracyInput = document.getElementById('techLiteracy');
const goalsInput = document.getElementById('goals');
const frustrationsInput = document.getElementById('frustrations');
const quoteInput = document.getElementById('quote');
const imageUrlInput = document.getElementById('imageUrl');

// Get all preview elements
const previewName = document.getElementById('previewName');
const previewAge = document.getElementById('previewAge');
const previewEducation = document.getElementById('previewEducation');
const previewStatus = document.getElementById('previewStatus');
const previewOccupation = document.getElementById('previewOccupation');
const previewLocation = document.getElementById('previewLocation');
const previewTechLiteracy = document.getElementById('previewTechLiteracy');
const previewGoals = document.getElementById('previewGoals');
const previewFrustrations = document.getElementById('previewFrustrations');
const previewQuote = document.getElementById('previewQuote');
const previewAvatar = document.getElementById('previewAvatar');
const avatarPlaceholder = document.getElementById('avatarPlaceholder');

// Get row elements for conditional display
const educationRow = document.getElementById('educationRow');
const statusRow = document.getElementById('statusRow');
const locationRow = document.getElementById('locationRow');
const techLiteracyRow = document.getElementById('techLiteracyRow');

// Add event listeners for live updates
nameInput.addEventListener('input', updateName);
ageInput.addEventListener('input', updateAge);
educationInput.addEventListener('input', updateEducation);
statusInput.addEventListener('input', updateStatus);
occupationInput.addEventListener('input', updateOccupation);
locationInput.addEventListener('input', updateLocation);
techLiteracyInput.addEventListener('change', updateTechLiteracy);
goalsInput.addEventListener('input', updateGoals);
frustrationsInput.addEventListener('input', updateFrustrations);
quoteInput.addEventListener('input', updateQuote);
imageUrlInput.addEventListener('input', updateImage);

// Update functions
function updateName() {
    const value = nameInput.value.trim();
    previewName.textContent = value || 'Enter a name';
    previewName.classList.toggle('placeholder-text', !value);
}

function updateAge() {
    const value = ageInput.value.trim();
    previewAge.textContent = value || '--';
}

function updateEducation() {
    const value = educationInput.value.trim();
    previewEducation.textContent = value || '--';
    educationRow.style.display = value ? 'flex' : 'none';
}

function updateStatus() {
    const value = statusInput.value.trim();
    previewStatus.textContent = value || '--';
    statusRow.style.display = value ? 'flex' : 'none';
}

function updateOccupation() {
    const value = occupationInput.value.trim();
    previewOccupation.textContent = value || '--';
}

function updateLocation() {
    const value = locationInput.value.trim();
    previewLocation.textContent = value || '--';
    locationRow.style.display = value ? 'flex' : 'none';
}

function updateTechLiteracy() {
    const value = techLiteracyInput.value;
    previewTechLiteracy.textContent = value || '--';
    techLiteracyRow.style.display = value ? 'flex' : 'none';
}

function updateGoals() {
    const value = goalsInput.value.trim();
    previewGoals.textContent = value || "Enter the persona's goals...";
    previewGoals.classList.toggle('placeholder-text', !value);
}

function updateFrustrations() {
    const value = frustrationsInput.value.trim();
    previewFrustrations.textContent = value || "Enter the persona's frustrations...";
    previewFrustrations.classList.toggle('placeholder-text', !value);
}

function updateQuote() {
    const value = quoteInput.value.trim();
    previewQuote.textContent = value || 'Add a quote...';
    previewQuote.classList.toggle('placeholder-text', !value);
}

function updateImage() {
    const url = imageUrlInput.value.trim();
    
    if (url) {
        // Test if the image loads successfully
        const img = new Image();
        img.onload = function() {
            previewAvatar.src = url;
            previewAvatar.classList.add('show');
            avatarPlaceholder.classList.add('hide');
        };
        img.onerror = function() {
            // If image fails to load, show placeholder
            previewAvatar.classList.remove('show');
            avatarPlaceholder.classList.remove('hide');
        };
        img.src = url;
    } else {
        // No URL provided, show placeholder
        previewAvatar.classList.remove('show');
        avatarPlaceholder.classList.remove('hide');
    }
}

// Reset form function
function resetForm() {
    if (confirm('Are you sure you want to clear all fields?')) {
        document.getElementById('personaForm').reset();
        currentPersonaId = null;
        
        // Reset all preview elements
        updateName();
        updateAge();
        updateEducation();
        updateStatus();
        updateOccupation();
        updateLocation();
        updateTechLiteracy();
        updateGoals();
        updateFrustrations();
        updateQuote();
        updateImage();
    }
}

// Download persona card as image
async function downloadCard() {
    try {
        // Check if html2canvas is loaded
        if (typeof html2canvas === 'undefined') {
            alert('Download feature requires html2canvas library. Loading...');
            
            // Load html2canvas dynamically
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
            script.onload = function() {
                downloadCardWithLibrary();
            };
            document.head.appendChild(script);
            return;
        }
        
        downloadCardWithLibrary();
    } catch (error) {
        console.error('Download error:', error);
        alert('Unable to download card. Please try taking a screenshot instead.');
    }
}

async function downloadCardWithLibrary() {
    const card = document.getElementById('personaCard');
    
    try {
        const canvas = await html2canvas(card, {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false,
            useCORS: true
        });
        
        // Convert to blob and download
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const personaName = nameInput.value.trim() || 'persona';
            link.download = `${personaName.toLowerCase().replace(/\s+/g, '-')}-card.png`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        });
    } catch (error) {
        console.error('Download error:', error);
        alert('Unable to download card. Please try taking a screenshot instead.');
    }
}

// Add sample data for demonstration (optional)
function loadSampleData() {
    nameInput.value = 'Kristin Watson';
    ageInput.value = '27';
    educationInput.value = 'Masters in Business';
    statusInput.value = 'Single';
    occupationInput.value = 'Sales Manager';
    locationInput.value = 'Sydney';
    techLiteracyInput.value = 'High';
    goalsInput.value = 'Launch innovative products that solve real user problems and drive business growth. Build and lead high-performing product teams.';
    frustrationsInput.value = 'Too many meetings that could be emails. Difficulty aligning stakeholders on product priorities. Lack of direct user feedback during development cycles.';
    quoteInput.value = '"Data informs, but intuition and user empathy guide great product decisions."';
    imageUrlInput.value = 'https://randomuser.me/api/portraits/women/44.jpg';
    
    // Trigger all updates
    updateName();
    updateAge();
    updateEducation();
    updateStatus();
    updateOccupation();
    updateLocation();
    updateTechLiteracy();
    updateGoals();
    updateFrustrations();
    updateQuote();
    updateImage();
}

// Uncomment the line below to load sample data on page load for testing
// loadSampleData();

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to clear form
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        resetForm();
    }
});

// Tab management
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Load personas if manage tab is selected
    if (tabName === 'manage') {
        loadPersonas();
    }
}

// Save persona to Supabase
async function savePersona() {
    try {
        const personaData = {
            name: nameInput.value.trim(),
            age: ageInput.value ? parseInt(ageInput.value) : null,
            education: educationInput.value.trim() || null,
            status: statusInput.value.trim() || null,
            occupation: occupationInput.value.trim(),
            location: locationInput.value.trim() || null,
            tech_literacy: techLiteracyInput.value || null,
            goals: goalsInput.value.trim() || null,
            frustrations: frustrationsInput.value.trim() || null,
            quote: quoteInput.value.trim() || null,
            image_url: imageUrlInput.value.trim() || null
        };

        // Validate required fields
        if (!personaData.name || !personaData.occupation) {
            alert('Please fill in the required fields (Name and Occupation)');
            return;
        }

        let result;
        if (currentPersonaId) {
            // Update existing persona
            result = await supabase
                .from('personas')
                .update(personaData)
                .eq('id', currentPersonaId)
                .select()
                .single();
        } else {
            // Create new persona
            result = await supabase
                .from('personas')
                .insert([personaData])
                .select()
                .single();
        }

        if (result.error) throw result.error;

        alert(currentPersonaId ? 'Persona updated successfully!' : 'Persona saved successfully!');
        resetForm();
        
        // Switch to manage tab to show the saved persona
        showTab('manage');
        
    } catch (error) {
        console.error('Error saving persona:', error);
        alert('Error saving persona. Please try again.');
    }
}

// Load all personas
async function loadPersonas() {
    try {
        const { data, error } = await supabase
            .from('personas')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        allPersonas = data || [];
        displayPersonas(allPersonas);
    } catch (error) {
        console.error('Error loading personas:', error);
        document.getElementById('personasList').innerHTML = `
            <div class="empty-state">
                <h3>Error loading personas</h3>
                <p>Please try refreshing the page.</p>
            </div>
        `;
    }
}

// Display personas in the Dribbble-style grid
function displayPersonas(personas) {
    const personasList = document.getElementById('personasList');
    
    // Update stats
    updateStats(personas);
    
    if (personas.length === 0) {
        personasList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">👥</div>
                <h3>No personas yet</h3>
                <p>Create your first persona to get started building your user research library!</p>
                <button class="btn-primary" onclick="showTab('create')">Create Your First Persona</button>
            </div>
        `;
        return;
    }

    personasList.innerHTML = personas.map(persona => `
        <div class="persona-card">
            <div class="persona-card-header">
                <img src="${persona.image_url || 'https://via.placeholder.com/80x80?text=👤'}" 
                     alt="${persona.name}" class="persona-card-avatar">
                <h3 class="persona-card-name">${persona.name}</h3>
                <p class="persona-card-role">${persona.occupation}</p>
            </div>
            <div class="persona-card-body">
                <div class="persona-card-details">
                    <div class="persona-detail-item">
                        <div class="persona-detail-label">Age</div>
                        <div class="persona-detail-value">${persona.age || 'N/A'}</div>
                    </div>
                    <div class="persona-detail-item">
                        <div class="persona-detail-label">Location</div>
                        <div class="persona-detail-value">${persona.location || 'N/A'}</div>
                    </div>
                    <div class="persona-detail-item">
                        <div class="persona-detail-label">Education</div>
                        <div class="persona-detail-value">${persona.education || 'N/A'}</div>
                    </div>
                    <div class="persona-detail-item">
                        <div class="persona-detail-label">Tech Level</div>
                        <div class="persona-detail-value">${persona.tech_literacy || 'N/A'}</div>
                    </div>
                </div>
                <div class="persona-card-actions">
                    <button class="btn-edit" onclick="editPersona('${persona.id}')">Edit</button>
                    <button class="btn-delete" onclick="deletePersona('${persona.id}')">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Update statistics
function updateStats(personas) {
    const totalPersonas = document.getElementById('totalPersonas');
    const recentPersonas = document.getElementById('recentPersonas');
    const activePersonas = document.getElementById('activePersonas');
    
    if (totalPersonas) totalPersonas.textContent = personas.length;
    
    // Calculate recent personas (this week)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const recentCount = personas.filter(persona => 
        new Date(persona.created_at) > oneWeekAgo
    ).length;
    if (recentPersonas) recentPersonas.textContent = recentCount;
    
    // For now, all personas are considered active
    if (activePersonas) activePersonas.textContent = personas.length;
}

// Edit persona
async function editPersona(id) {
    try {
        const { data, error } = await supabase
            .from('personas')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        // Populate form with persona data
        nameInput.value = data.name || '';
        ageInput.value = data.age || '';
        educationInput.value = data.education || '';
        statusInput.value = data.status || '';
        occupationInput.value = data.occupation || '';
        locationInput.value = data.location || '';
        techLiteracyInput.value = data.tech_literacy || '';
        goalsInput.value = data.goals || '';
        frustrationsInput.value = data.frustrations || '';
        quoteInput.value = data.quote || '';
        imageUrlInput.value = data.image_url || '';

        // Update preview
        updateName();
        updateAge();
        updateEducation();
        updateStatus();
        updateOccupation();
        updateLocation();
        updateTechLiteracy();
        updateGoals();
        updateFrustrations();
        updateQuote();
        updateImage();

        // Set current persona ID for update
        currentPersonaId = id;

        // Switch to create tab
        showTab('create');
        
    } catch (error) {
        console.error('Error loading persona for edit:', error);
        alert('Error loading persona. Please try again.');
    }
}

// Delete persona
async function deletePersona(id) {
    if (!confirm('Are you sure you want to delete this persona?')) {
        return;
    }

    try {
        const { error } = await supabase
            .from('personas')
            .delete()
            .eq('id', id);

        if (error) throw error;

        alert('Persona deleted successfully!');
        loadPersonas();
    } catch (error) {
        console.error('Error deleting persona:', error);
        alert('Error deleting persona. Please try again.');
    }
}

// Search personas
function searchPersonas() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredPersonas = allPersonas.filter(persona => 
        persona.name.toLowerCase().includes(searchTerm) ||
        persona.occupation.toLowerCase().includes(searchTerm)
    );
    displayPersonas(filteredPersonas);
}

// Initialize preview on page load
document.addEventListener('DOMContentLoaded', function() {
    updateName();
    updateAge();
    updateEducation();
    updateStatus();
    updateOccupation();
    updateLocation();
    updateTechLiteracy();
    updateGoals();
    updateFrustrations();
    updateQuote();
    updateImage();
});

