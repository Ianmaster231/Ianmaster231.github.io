// app.js
// document.addEventListener('DOMContentLoaded', () => {
//     const sections = document.querySelectorAll('section');
//     const navLinks = document.createElement('nav');
    
//     sections.forEach(section => {
//         const link = document.createElement('a');
//         link.href = `#${section.id}`;
//         link.textContent = section.querySelector('h2').textContent;
//         navLinks.appendChild(link);
//     });

//     document.body.insertBefore(navLinks, document.getElementById('app'));
//     styleNavLinks(navLinks);
// });

// function styleNavLinks(nav) {
//     nav.style.display = 'flex';
//     nav.style.justifyContent = 'space-around';
//     nav.style.backgroundColor = '#007acc';
//     nav.style.padding = '10px 0';
// }

document.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('nav a');
    const fromTop = window.scrollY;

    navLinks.forEach(link => {
        const section = document.querySelector(link.hash);

        if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
            link.style.color = '#f0f8ff';
        } else {
            link.style.color = '#333';
        }
    });
});

const username = "ianmaster231";

// Fetch and display GitHub repositories
async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await response.json();

        // Sort repositories by creation date in descending order (latest first)
        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const repoContainer = document.getElementById('repo-list');
        repoContainer.innerHTML = ''; // Clear the "Loading..." text

        repos.forEach(repo => {
            const repoElement = document.createElement('div');
            repoElement.classList.add('repo');
            repoElement.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || 'No description available.'}</p>
                <p><strong>⭐ Stars:</strong> ${repo.stargazers_count} | <strong>🍴 Forks:</strong> ${repo.forks_count}</p>
            `;
            repoContainer.appendChild(repoElement);
        });
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        document.getElementById('repo-list').innerHTML = '<p>Failed to load repositories.</p>';
    }
}

// Initialize GitHub calendar
function loadGitHubCalendar() {
    new GitHubCalendar(".calendar", username);
}

// Load repositories and calendar on page load
fetchGitHubRepos();
loadGitHubCalendar();

