// Get the modal and button elements
const projectsModal = document.getElementById('projects-modal');
const projectsBtn = document.getElementById('projects-btn');
const experienceModal = document.getElementById('experience-modal');
const experienceBtn = document.querySelector('.button[href="https://drive.google.com/drive/folders/1B0xrlyDggvmL9ja4CRpASt6WgqGrovc3"]');
const instituteModal = document.getElementById('institute-modal');
const instituteBtn = document.querySelector('.role-link');
const skillsModal = document.getElementById('skills-modal');
const skillsBtn = document.getElementById('skills-btn');
const closeButtons = document.getElementsByClassName('close');

// When user clicks the projects button, open projects modal 
projectsBtn.onclick = function(e) {
    e.preventDefault();
    projectsModal.style.display = 'block';
}

// When user clicks the experience button, open experience modal
experienceBtn.onclick = function(e) {
    e.preventDefault();
    experienceModal.style.display = 'block';
    return false; // Prevent default link behavior
}

// When user clicks the institute link, open institute modal
instituteBtn.onclick = function(e) {
    e.preventDefault();
    instituteModal.style.display = 'block';
}

// When user clicks the skills button, open skills modal
skillsBtn.onclick = function(e) {
    e.preventDefault();
    skillsModal.style.display = 'block';
}

// Close modals when clicking (x)
for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function() {
        projectsModal.style.display = 'none';
        experienceModal.style.display = 'none';
        instituteModal.style.display = 'none';
        skillsModal.style.display = 'none';
    }
}

// When user clicks anywhere outside modal, close it
window.onclick = function(event) {
    if (event.target == projectsModal) {
        projectsModal.style.display = 'none';
    }
    if (event.target == experienceModal) {
        experienceModal.style.display = 'none';
    }
    if (event.target == instituteModal) {
        instituteModal.style.display = 'none';
    }
    if (event.target == skillsModal) {
        skillsModal.style.display = 'none';
    }
}
