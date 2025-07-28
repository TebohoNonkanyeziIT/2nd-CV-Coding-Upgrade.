document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute ('href')).scrollIntoView({
            behavior: 'smooth'
        })
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    window.scrollY > 50 ?
    navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
    navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';

});

const commentForm = document.getElementById('comment-form');
const commentsList = document.getElementById('comments-list');
const commentText = document.getElementById('comment-text');
const commentUpload = document.getElementById('comment-upload');

const dummyComments = [
    { text: "Great website! Very informative.", date: "2025-06-17", file: null },
    { text: "I found the bio section really interesting.", date: "2025-06-16", file: null },
    { text: "Here's a picture I took!", date: "2025-06-15", file: null }
];

function displayComments() {
    commentsList.innerHTML = ''; 
        dummyComments.forEach(comment => {
            const commentItem = document.createElement('div');
            commentItem.classList.add('comment-item');
            commentItem.innerHTML = `
                <p>${comment.text}</p>
                <small>Posted on: ${comment.date}</small>
                ${comment.file ? <div class="uploaded-file"><img src="${comment.file}" alt="Uploaded file"></div> : ''}
            `;
        commentsList.prepend(commentItem);
    });
}

displayComments(); 

commentForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

const newCommentText = commentText.value.trim();
const uploadedFile = commentUpload.files[0];
let fileUrl = null;

if (uploadedFile) {
            if (uploadedFile.type.startsWith('image/')) {
                fileUrl = URL.createObjectURL(uploadedFile);
            } else {
                fileUrl = "data:image/rolex GMT brown nipple dial ref 16758.webp";
            }
        }

        if (newCommentText) {
            const newComment = {
                text: newCommentText,
                date: new Date().toISOString().slice(0, 10), 
                file: fileUrl
            };
            dummyComments.push(newComment); 
            displayComments();

            commentText.value = ''; 
            commentUpload.value = ''; 
        } else if (uploadedFile) {
             const newComment = {
                text: "(No text comment)",
                date: new Date().toISOString().slice(0, 10),
                file: fileUrl
            };
            dummyComments.push(newComment);
            displayComments();
            commentUpload.value = '';
        } else {
            alert('Please enter a comment or upload a file.');
        }
    }
);
